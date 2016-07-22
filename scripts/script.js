"use strict";

var studentArray = [];
var studentArrayCopy = [];
var itemsToShowPerPage = 10;

// Cache DOM Elements
var alertContainer,
    alertMessage,
    page = document.querySelector('.page'),
    pageHeader = document.querySelector('.page-header'),
    paginationLink = document.getElementsByClassName('pagination-link'),
    paginationWrapper = document.getElementsByClassName('.pagination'),
    studentItem = document.querySelectorAll('.student-item'),
    studentList = document.querySelector('.student-list');

searchTemplate();
init();

function showStudents(start, end) {
  // Select which students to show when pagination links are clicked.
  studentList.innerHTML = '';
  for (var i = start; i <= end; i++) {
    try {
      var newStudent = displayStudents(studentArray[i]);
    } catch (err) {}
    studentList.appendChild(newStudent);
  }
}

// Build Search form
function searchTemplate() {
  var pageHeader = document.querySelector('.page-header'),
      searchWrapper = document.createElement('div'),
      searchInput = document.createElement('input'),
      searchButton = document.createElement('button');
  searchWrapper.classList.add('student-search');
  searchButton.classList.add('search-button');
  searchInput.setAttribute('placeholder', 'Search for students...');
  searchInput.classList.add('student-search-input');
  searchButton.textContent = 'Search';
  searchWrapper.appendChild(searchInput);
  searchWrapper.appendChild(searchButton);
  pageHeader.appendChild(searchWrapper);
}

function calculateRequiredPages() {
  var pagesRequired = Math.ceil(studentArray.length / itemsToShowPerPage);
  return pagesRequired;
}

function StudentObject(avatar, name, email, dateJoined) {
  // Student objects will be appended to Student Array
  this.avatar = avatar;
  this.name = name;
  this.email = email;
  this.dateJoined = dateJoined;
}

function filterStudents(arrayToFilter) {
  // Separate student data from HTML.
  // This way, I don't have to deal with hide/show, or save
  // entire HTML snippets as objects in the array.
  var student, name, avatar, email, dateJoined;
  var studentList = document.querySelectorAll('.student-list')[0].children;
  for(var i = 0; i < studentList.length; i++) {
    avatar = studentList[i].children[0].children[0].src;
    name = studentList[i].children[0].children[1].innerHTML;
    email = studentList[i].children[0].children[2].innerHTML;
    dateJoined = studentList[i].children[1].children[0].innerHTML;
    // Declare each item as a new object
    student = new StudentObject(avatar, name, email, dateJoined);
    // Push new objects to the arrays above.
    studentArray.push(student);
    // This is a backup up array to update when the search function
    // overrites the original array.
    studentArrayCopy.push(student);
  }
}

function displayStudents(student) {
  // This function recombines the student data into an html
  // group.
  var studentItem = document.createElement("li"),
      studentDetails = document.createElement("div"),
      img = document.createElement("img"),
      name = document.createElement("h3"),
      email = document.createElement("span"),
      joined = document.createElement("div"),
      date = document.createElement("span");
	studentItem.className = "student-item cf";
	studentDetails.className = "student-details";
	img.className = "avatar";
	img.src = student.avatar;
	name.innerHTML = student.name;
	email.className = "email";
	email.innerHTML = student.email;
	joined.className = "joined-details";
	date.className = "date";
	date.innerHTML = student.dateJoined;
	studentDetails.appendChild(img);
	studentDetails.appendChild(name);
	studentDetails.appendChild(email);
	studentItem.appendChild(studentDetails);
	joined.appendChild(date);
	studentItem.appendChild(joined);
	return studentItem;
}

function displayPaginationLinks() {
  // PagesRequired is used to created the total number
  // of links required in pagination
  var pagesRequired = calculateRequiredPages();
  // Create the pagination template
  var paginationWrapper = document.createElement('div');
  paginationWrapper.classList.add('pagination');
  var paginationLinks = '<ul class="pagination-links">';

  for (var i = 0; i < pagesRequired; i++) {
    paginationLinks += '<li class="pagination-item"><a class="pagination-link" href="#">' + (i + 1) + '</a></li>';
  }

  paginationLinks += '</ul>'
  // Append the links to the pagination template
  paginationWrapper.innerHTML = paginationLinks;
  // Append the template to the page.
  page.appendChild(paginationWrapper);
}

function pagination(e) {
  e.preventDefault();
  var start, end;

  // toggle active class on pagination links
    for(var i = 0; i < paginationLink.length; i++) {
      paginationLink[i].className = "pagination-link"
    }

    this.className = "pagination-link active";

  // Show the 10 items that correspond with the clicked
  // pagination link (click event not in this function)
  start = this.innerHTML * 10 - 10;
  end = this.innerHTML * 10 - 1;

  // If user clicks last link in pagination,
  // ensure that only the remaining student items
  // are displayed
  if (end > studentArray.length) {
    end = studentArray.length -1;
  }

  showStudents(start, end);
}

function init() {
  filterStudents();
  //displayStudents(studentArray);
  if (calculateRequiredPages() > 1) {
    displayPaginationLinks();
    for (var i = 0; i < paginationLink.length; i++) {
      paginationLink[i].addEventListener("click", pagination);
    }
  }

  // If there are any alerts on the page, hide them.
  if(document.querySelector('.alert-message')) {
    document.querySelector('.alert-message').outerHTML = "";
  }

  showStudents(0, 9);
}


function searchFeature() {
  // Capture user search string.
  var searchPhrase = document.querySelector('.student-search-input').value.toLowerCase();

  // If the search string cannot be found in the student Name, or email address:
  for(var i = studentArray.length; i--;){
    if (studentArray[i].name.indexOf(searchPhrase) === -1 && studentArray[i].email.indexOf(searchPhrase) === -1) {
      // ... remove that student from the array.
      studentArray.splice(i, 1);
    }
  }

  // If there aren't any student matches, this will throw an
  // error and bind up the continued process.
  // try is used to allowing continuation of the program
  try {
    document.querySelector('.pagination').outerHTML = '';
  } catch (err) {};

  // Clear the students that are currently being displayed
  studentList.innerHTML = '';

  if(studentArray.length >= 1) {
    // Add the filtered students
    // (assuming one or more student matches from above)
    init();
  } else {
    // Otherwise, display a message indicating no matches.
    alertMessage = "Sorry, none of the students matches match that name or email address";
    alertContainer = document.createElement('p');
    alertContainer.className = 'alert-message';
    alertContainer.innerHTML = alertMessage;
    page.appendChild(alertContainer);
  }

  // Repopulate the studentArray with the copy array
  // to allow for continued searching
  studentArray = studentArrayCopy.slice(0);
}


// Event Listenters
document.querySelector('button').addEventListener("click", searchFeature);
document.querySelector('input').addEventListener("keyup", searchFeature);
for (var i = 0; i < paginationLink.length; i++) {
  paginationLink[i].addEventListener('click', pagination);
}
