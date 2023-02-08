'use strict';

// Declare variables for manipulating DOM
const body = document.querySelector('#body');
const mainContent = document.querySelector('#mainContent');
const searchInput = document.querySelector('#searchInput');
const searchButton = document.querySelector('#searchButton');
const closeSearchX = document.querySelector('#closeSearch');
// DOM - Book details
const bookCover = document.querySelector('#bookCover');
const bookTitle = document.querySelector('#bookTitle');
const bookAuthor = document.querySelector('#bookAuthor');
const bookSynopsis = document.querySelector('#bookSynopsis');

// Initial setup
body.classList.add('fullpage');
mainContent.classList.add('hidden');
closeSearchX.classList.add('hidden');

// DEBUG purposes
// body.classList.remove('fullpage');
// mainContent.classList.remove('hidden');
// searchInput.classList.remove('largeFont');
// searchButton.classList.remove('largeFont');

// Add event listeners
searchInput.addEventListener('keypress', searchBook);
searchButton.addEventListener('click', searchBook);
closeSearchX.addEventListener('click', displaySearchResult);

function searchBook(e) {
  // If a keypress is not enter, stop looking
  if (e.type === 'keypress' && e.key !== 'Enter') return;
  const searchString = searchInput.value; // fetch search string
  if (!searchString) return; // abort if no string

  displaySearchResult();
  console.log(`Searching for: ${searchString}`);
  GBooksAPILookUp(searchString);
}

function displaySearchResult() {
  searchInput.addEventListener('focus', focusSearch);
  searchInput.blur();
  body.classList.remove('fullpage');
  mainContent.classList.remove('hidden');
  searchInput.classList.remove('largeFont');
  searchButton.classList.remove('largeFont');
  closeSearchX.classList.add('hidden');
  searchInput.value = '';
}

function focusSearch() {
  searchInput.focus();
  body.classList.add('fullpage');
  mainContent.classList.add('hidden');
  searchInput.classList.add('largeFont');
  searchButton.classList.add('largeFont');
  closeSearchX.classList.remove('inactive');
  closeSearchX.classList.remove('hidden');
}

function GBooksAPILookUp(searchString) {
  // Testing the google books api
  const APIKey = 'AIzaSyAV7Z4TEwgEV9SARRrxU6bJhYJexmz-g6k';
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchString}`)
    .then(response => response.json())
    .then(data => presentData(data));
}

function presentData(data) {
  const volumeInfo = data.items[0].volumeInfo;
  const bookObject = {
    title: volumeInfo.title,
    author: volumeInfo.authors,
    category: volumeInfo.categories,
    description: volumeInfo.description,
    image: volumeInfo.imageLinks.thumbnail,
  };

  // Update DOM
  bookCover.src = bookObject.image;
  bookTitle.textContent = bookObject.title;
  bookAuthor.textContent = bookObject.author;
  bookSynopsis.textContent = bookObject.description;
}
