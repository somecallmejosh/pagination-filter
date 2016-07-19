"use strict";

(function(){

  // DOM Caching
  var itemsToShowPerPage = 10,
      page = document.querySelector('.page'),
      pagesRequired,
      paginationTemplate = '<div class="pagination"><ul></ul></div>',
      studentItem = document.querySelectorAll('.student-item'),
      studentItemCount = 0,
      studentList = document.querySelector('.student-list');

  function getStudentCount() {
    // Count the total number of students 'on the page';
    for(var i = 0; i < studentItem.length; i++) {
      studentItemCount += 1;
    }
    return studentItemCount;
  }

  function getPageCount() {
    // Determine how many pages are required to display 10 students per page.
    var numberOfPagesRequired = Math.ceil(getStudentCount() / itemsToShowPerPage);
    return numberOfPagesRequired;
  }

  function buildPaginationLinks() {
    if(studentItemCount > itemsToShowPerPage) {

    }
  }

  function showRequestedPage() {

  }

  buildPaginationLiks();

})();
