// --------- Helper Functions
const randoRGB = () => Math.floor(Math.random()*256)

// --------- Emphasis
let descriptors = document.querySelectorAll('.emphasis');

descriptors.forEach(descriptor => {
  let baseColor = [randoRGB(), randoRGB(), randoRGB()]
  descriptor.style.border = `2px solid rgb(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]})`
  descriptor.style.backgroundColor = `rgb(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, 0.375)`
})

// --------- Enthusiast
let likes = [
  'mountain',
  'dog',
  'woodworking', 
  'compassion',
  'plant',
  'woodworking',
  'love',
  'art',
  'D&D',
  'growth',
  'video game',
  'Rainier',
  'good vibes',
  'Cork',
];
let currentIndex = 0;

let rotateLikes = setInterval(() => {
  // noun.classList.add('hidden');
  currentIndex = currentIndex === likes.length - 1 ? 0 : currentIndex + 1;
  noun.innerText = likes[currentIndex];
}, 5000); 

setTimeout(() => {
  noun.className = 'fade-out'
  setInterval(() => noun.className = "fade-out", 5000)
}, 3000)
setTimeout(() => {
  noun.className = 'fade-in'
  setInterval(() => noun.className = "fade-in", 5000)
}, 5001)

// --------- Why
// Skills