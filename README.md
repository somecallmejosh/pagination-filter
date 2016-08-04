JS Pagination and Search Project
================================
## Completed Demos
- [54 students](https://somecallmejosh.github.io/pagination-filter/)
- [44 students](https://somecallmejosh.github.io/pagination-filter/samples/44contacts.html)
- [64 students](https://somecallmejosh.github.io/pagination-filter/samples/64contacts.html)

## Requirements

- [x] Use the filters-example.html file to guide your decision making. Using progressive enhancement, your work should affect the index.html file.

- [x] Since only 10 students should be shown at a time, your programming needs to calculate the number of pages needed and add the appropriate number of links to the bottom of the page.

- [x] Hide all but the first 10 students when the page loads.

- [x] When a user clicks on “2” in the pagination, students 11 through 20 are shown. When a user clicks “3”, students 21 through 30 are shown. And so on. When “6” is clicked 51 through 55 should be shown.

- [x] Using progressive enhancement, add the student search markup as presented in the filters-example.html file to the index.html file.

- [x] Add an event listener to the search button. When the user clicks on the button it should use the text in the search input to filter the results. Searching should be case insensitive. e.g. a search for “Susan” should return results for “susan” and “Susan".

- [x] Users should be able to search by name or e-mail address. And partial matches, like just a first name, should be displayed in the results.

- [x] Search results should also be paginated. For example, if the search returns more than 10 results, those results should be paginated too.

- [x] Before you submit your project for review, make sure you can check off all of the items on the Student Project Submission Checklist. The checklist is designed to help you make sure you’ve met the grading requirements and that your project is complete and ready to be submitted!


## Extra Credit

- [x] Include simple animations when transitioning between pages.

- [x] As the user types in the search box, dynamically filter the student listings. In other words, after each letter is typed into the search box, display any listings that match .

- [x] If no matches are found, include a message in the HTML to tell the user there are no matches.

## Reviewers Comments:

Excellent work using the principles of unobtrusive JavaScript to code this project! Glad to see you take out the numbers next to each first student (you missed the first one). Sometimes we use little markers like these or console.log statements to debug, but it's best to go through a project when you're done and remove these little debugging helpers.

You have the correct number of pagination links. Well done!

Last review of this rubric I mentioned limiting the number of global variables you're using and making functions take arguments and return values instead of manipulating global variables outside of themselves. I notice you've started to use a module pattern in this new version to limit the amount of global variables. Great work!

You asked me for any more comments I might have. I keep thinking about something Kenneth Love said in a class I took each time I grade this project. He said, "I'm going to show you how to do this, but if I were doing it, I would solve it completely differently." These days I have the same feelings, but that's because I learned how to do it the way you're doing, and spent quite some time doing it that way before I felt comfortable moving on. So, I'm going to give you a link to a site with a couple new concepts and exercises. Bookmark it and come back to it a few months from now if at first go it blows your mind, because the likelihood you're ready for it is low, but it's good to expose yourself to code you don't understand yet: [http://reactivex.io/learnrx/](http://reactivex.io/learnrx/)

You're doing well on the paginantion. I even see you got the animation to work when clicking the pagination links. It's working in the pagination links because in the pagination function on lines 135 through 140, you're manipulating the opacity, which is one of the css properties that's animated on line 126 of design.css. But because your directly attaching the elements in the search process without manipulating a similarly animated css property, you don't get that animated behavior during the search.

Your HTML markup is in the right place when the page loads. Good work uses the principles of progressive enhancement.

Your pagination buttons update depending on the number of search results. That's great!

Well done, your code is free of syntax errors!

Your code comments are thorough and detailed, and it's clear how your code functions. Thanks for including those notes on the 'this' context. Trust me, no one remembers what 'this' is 6 months from now.

Great work on this project, and I'm thrilled to see you trying to work out some of the more difficult problems. I've left a few more notes on how you can get them in places I saw you trying. As you move on to the next project, remember to make a note to come back to these earlier projects and improve them from time to time with new things you learn. They can end up teaching you so more that way. Great work and happy coding, this one's a wrap!
