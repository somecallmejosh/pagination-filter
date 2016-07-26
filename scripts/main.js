"use strict";

// DOM Caching
var itemsToShowPerPage = 10,
    page = $('.page'),
    pageHeader = $('.page-header'),
    studentItem = $('.student-item'),
    studentItemCount = studentItem.length,
    studentSearchForm = $('.student-search input'),
    studentList = $('.student-list'),
    pagesRequired = Math.ceil(studentItemCount / itemsToShowPerPage);

// Initial page load action
displayInit(studentItem);
buildSearchTemplate();
buildPaginationLinks(pagesRequired);

// Event Handlers
$('.pagination').on('click', 'li', displayPaginationContent);
$('.student-search').find('button').on('click', displaySearchContent);
$('.student-search').find('input').keyup(displaySearchContent);

function displayInit(items) {
  studentItem.hide();
  studentItem.slice(0, itemsToShowPerPage).show();
}

function buildSearchTemplate() {
  var searchTemplate = '<div class="student-search"><input placeholder="Search for students..."><button>Search</button></div>';
  pageHeader.append(searchTemplate);
}

function getSearchContent() {
  var searchPhrase = $('.student-search input').val();
  return searchPhrase.toLowerCase();
}

function displaySearchContent() {
  var students = [];
  $('.pagination').remove();
  var textSearched = getSearchContent(),
      searchItemCount = 0;

  $.each( studentItem, function( key, value ) {
    var studentEmail = $(this).find('.email').text().toLowerCase(),
        studentName = $(this).find('h3').text().toLowerCase();
    if (studentEmail.indexOf(textSearched) >=0 || studentName.indexOf(textSearched) >=0 ) {
      searchItemCount = searchItemCount + 1;
	     students.push($(this));
    }
  });

  console.log('Original Pages Required: ' + pagesRequired);
  pagesRequired = Math.ceil(searchItemCount / itemsToShowPerPage);
  console.log('New Pages Required: ' + pagesRequired);
  studentItem = $('.student-item');
  studentList = document.getElementsByClassName("student-list")[0];
  studentList.innerHTML = "";

  for (var i = 0; i < students.length; i++) {
    console.log(students[i][0]);
	  studentList.appendChild(students[i][0]);
  }

  displayInit(studentList);
  students = [];
  buildPaginationLinks(pagesRequired);
  // And then display only the first 10 students
  $('.pagination').on('click', 'li', displayPaginationContent);


  // If there are no matches, display a "no match" statment to the user
  if (searchItemCount == 0) {
    $('.page-header h2').text("No results");
    var resetButton = '<button class="reset">Reset</button>'
    if($('.reset').length < 1) {
      page.append(resetButton);
      $('.reset').on('click', function(){
        location.reload();
      });
    }
  } else {
    $('.page-header h2').text("Search");
  }
}


function buildPaginationLinks($toPaginate) {
  // Build the pagination link template
  var template = '<div class="pagination"><ul></ul></div>';
  if ($toPaginate > 1) {
    $('.page').append(template);
  };
  for(var i = 1; i <= $toPaginate; i++) {
    $('.pagination ul').append('<li class="pagination-link"><a href="#">' + i + '</a></li>');
  }
  $('.pagination-link:first-child a').addClass("active");
}



// Push to an array in a similar manner as above.

function filterContent($itemToSearch) {
  var pagStart = itemsToShowPerPage * ($itemToSearch -1);
  // Subtracting one from $itemToSearch sets index back to zero base.
  if($itemToSearch == 1) {
    studentItem.slice(0, itemsToShowPerPage).fadeIn(1000);
  } else if($itemToSearch > 1 && $itemToSearch < pagesRequired) {
    studentItem.slice(pagStart, pagStart + itemsToShowPerPage).fadeIn(1000);
  } else {
    studentItem.slice(pagStart).fadeIn(1000);
  }
}

function displayPaginationContent(e) {
  e.preventDefault();
  var $this = $(this);
  var pageToShow = $this.text();
  // studentItem.hide();
  $this.closest('ul').find('a').removeClass('active');
  $this.find('a').addClass('active');
  filterContent(pageToShow);
}
