"use strict";

(function(){

  // DOM Caching
  var itemsToShowPerPage = 10,
      page = $('.page'),
      // searchPhrase is a temp variable to help construct search
      // functionality
      searchPhrase = 'dua',
      studentItem = $('.student-item'),
      studentItemCount = studentItem.length,
      studentList = $('.student-list'),
      // pages required will become a reusable function to offer reuse
      // to search based pagination and default pagination.
      // Math.ceil rounds up to the nearest whole number to account for the
      // the proper number of pages
      pagesRequired = Math.ceil(studentItemCount / itemsToShowPerPage);

  // Function Invocation
  displayInit();
  buildPagination(pagesRequired);

  // Event Handlers
  $('.pagination').on("click", 'li', displayPaginationLinks);

  function displayInit() {
    // Displays first 10 students
    studentItem.hide();
    studentItem.slice(0, itemsToShowPerPage).show();
  }

  function buildPagination($toPaginate){
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

  function displayPaginatedContent($itemToSearch) {
    var pagStart = itemsToShowPerPage * ($itemToSearch -1);
    // Subtracting one from $itemToSearch sets index back to zero base.
    if($itemToSearch == 1) {
      studentItem.slice(0, itemsToShowPerPage).show();
    } else if($itemToSearch > 1 && $itemToSearch < pagesRequired) {
      studentItem.slice(pagStart, pagStart + itemsToShowPerPage).show();
    } else {
      studentItem.slice(pagStart).show();
    }
  }

  function displayPaginationLinks(e) {
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
    displayPaginatedContent(pageToShow);
  }
})();
