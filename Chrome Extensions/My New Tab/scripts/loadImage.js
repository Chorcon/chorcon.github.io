const numberOfImages = 25;
let selectImage = Math.ceil(Math.random() * numberOfImages);
console.log(`Loading image: (${selectImage}).jpg`);
document.querySelector(
  "HTML"
).style.backgroundImage = `url("images/ (${selectImage}).jpg")`;
