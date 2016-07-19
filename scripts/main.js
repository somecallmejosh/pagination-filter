"use strict";

(function(){

  // DOM Caching
  var itemsToShowPerPage = 10,
      page = document.querySelector('.page'),
      pagesRequired,
      studentItem = document.querySelectorAll('.student-item'),
      studentItemCount = 0,
      studentList = document.querySelector('.student-list');

  // Determine the number of students
  function getStudentCount() {
    // Count the total number of students 'on the page';
    for(var i = 0; i < studentItem.length; i++) {
      studentItemCount += 1;
    }
    return studentItemCount;
  }

  // Determine the number of pages required to display 10 students per page
  function getPageCount() {
    var numberOfPagesRequired = Math.ceil(getStudentCount() / itemsToShowPerPage);
    return numberOfPagesRequired;
  }

  // Build the pagination links
  function buildPaginationLinks() {
    // Create the parent pagination contianer <div class="pagination">
      var template = '<div class="pagination"><ul><li><a href="#">1</a></ul></div>',
      // Create the unordered list
      // Create the appropriate number of list items
        // Create anchor links
        // Add the list item idex (+1) as the content of the anchor link
    // Append the pagination links to the .page container
  }

  // Hide all but the first 10 students when the page loads.

  // Show the students that correspond to the pagination click;


  buildPaginationLiks();

})();
