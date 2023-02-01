'use strict';

// Declare variables for manipulating DOM
const searchInput = document.querySelector('#searchInput');
const searchButton = document.querySelector('#searchButton');

// Add event listeners
searchInput.addEventListener('keypress', searchBook);
searchButton.addEventListener('click', searchBook);

function searchBook(e) {
  // If a keypress is not enter, stop looking
  if (e.type === 'keypress' && e.key !== 'Enter') return;
  const searchString = searchInput.value; // fetch search string
  if (!searchString) return; // abort if no string

  console.log(searchString);
}
