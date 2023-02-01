'use strict';

// Declare variables for manipulating DOM
const body = document.querySelector('#body');
const mainContent = document.querySelector('#mainContent');
const searchInput = document.querySelector('#searchInput');
const searchButton = document.querySelector('#searchButton');
const closeSearchX = document.querySelector('#closeSearch');

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
  console.log(searchString);
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
