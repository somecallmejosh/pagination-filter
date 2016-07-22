"use strict";

// DOM Caching
var itemsToShowPerPage = 10,
    page = $('.page'),
    pageHeader = $('.page-header'),
    // searchPhrase is a temp variable to help construct search
    // functionality
    studentItem = $('.student-item'),
    studentItemCount = studentItem.length,
    studentSearchForm = $('.student-search input'),

    studentList = $('.student-list'),
    // pages required will become a reusable function to offer reuse
    // to search based pagination and default pagination.
    // Math.ceil rounds up to the nearest whole number to account for the
    // the proper number of pages
    initialPagesRequired = Math.ceil(studentItemCount / itemsToShowPerPage);

// Initial page load action
displayInit();

// Event Handlers
$('.pagination').on('click', 'li', displayPaginationContent);
$('.student-search').find('button').on('click', displaySearchContent);
$('.student-search').find('input').keyup(displaySearchContent);

function displayInit() {
  // This is the default page layout.
  // This adds the pagination links to the bottom of the page.
  buildPaginationLinks(initialPagesRequired);
  // Adds the search bar to the top right of the page.
  buildSearchTemplate();
  // Hide all students
  studentItem.hide();
  // And then display only the first 10 students
  studentItem.slice(0, itemsToShowPerPage).show();
}

function buildSearchTemplate() {
  var searchTemplate = '<div class="student-search"><input placeholder="Search for students..."><button>Search</button></div>';
  pageHeader.append(searchTemplate);
}

function getSearchContent() {
  // Gets the string entered by the user
  var searchPhrase = $('.student-search input').val();
  // returns the string to be used by another function
  return searchPhrase.toLowerCase();
}

function displaySearchContent() {
  // Remove the default pagination
  $('.pagination').remove();
  // function scope variables
  var textSearched = getSearchContent(),
      searchItemCount = 0;

  if(textSearched.length > 0) {
    $.each( studentItem, function( key, value ) {
      // Block scope variables
      var studentEmail = $(this).find('.email').text().toLowerCase(),
          studentName = $(this).find('h3').text().toLowerCase();

      // Check to see the if the user entered string matches anything in the
      // student email or student name elements.
      if (studentEmail.indexOf(textSearched) >=0 || studentName.indexOf(textSearched) >=0 ) {
        // If there is a match, add one to searchItem Count
        // Search item count will be used to determine the number of
        // required pagination links to add (used at the end of this function)
        searchItemCount = searchItemCount + 1;
        // If there's a match, display the student
        // This is were pagination should occur - I think
        $(this).show();
      } else {
        // If there's no match, hide the student
        $(this).hide();
      }
    });
  } else {
    // If search field is blank, when event handler is triggered,
    // reload the page.
    location.reload();
  }

  // If there are no matches, display a "no match" statment to the user
  if (searchItemCount == 0) {
    $('.page-header h2').text("No results");
    var resetButton = '<button class="reset">Reset</button>'

    // All the user to reset/reload the page, but be sure to
    // only append the reset button once.
    if($('.reset').length < 1) {
      page.append(resetButton);
      $('.reset').on('click', function(){
        location.reload();
      });
    }
  }

  // Calculate the number of pagination links required.
  var searchPagesRequired = Math.ceil(searchItemCount / itemsToShowPerPage);
  // console.log(searchItemCount);
  // console.log(searchPagesRequired);
  // Pass the calculated pagination links the build paination function.
  buildPaginationLinks(searchPagesRequired);
}

function buildPaginationLinks($toPaginate) {
  // Build the pagination link template
  var template = '<div class="pagination"><ul></ul></div>';
  // Append the template to the .page container
  if ($toPaginate > 1) {
    $('.page').append(template);
  };
  // Create pagination links and append to the pagination template
  for(var i = 1; i <= $toPaginate; i++) {
    $('.pagination ul').append('<li class="pagination-link"><a href="#">' + i + '</a></li>');
  }

  // Set first pagination link to be active.
  // Will be overridden by
  $('.pagination-link:first-child a').addClass("active");
}

function filterContent($itemToSearch, $filteredFrom) {
  var pagStart = itemsToShowPerPage * ($itemToSearch -1);
  // Subtracting one from $itemToSearch sets index back to zero base.
  if($itemToSearch == 1) {
    studentItem.slice(0, itemsToShowPerPage).fadeIn(1000);
  } else if($itemToSearch > 1 && $itemToSearch < $filteredFrom) {
    studentItem.slice(pagStart, pagStart + itemsToShowPerPage).fadeIn(1000);
  } else {
    studentItem.slice(pagStart).fadeIn(1000);
  }
}

function displayPaginationContent(e) {
  // Prevent anchor link from following #hash
  e.preventDefault();
  // Memoize $(this) so we don't have to access the DOM too many times
  var $this = $(this);
  // The content of the pagination link that was clicked
  // will determine what group of students are in view.
  var pageToShow = $this.text();
  studentItem.hide();
  $this.closest('ul').find('a').removeClass('active');
  $this.find('a').addClass('active');
  filterContent(pageToShow, initialPagesRequired);
}
