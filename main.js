// --------- Helper Functions
const randoRGB = () => Math.floor(Math.random()*256);

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
  'altruism',
  'plant',
  'Seattle',
  'art',
  'D&D',
  'growth',
  'video game',
  'Rainier',
  'good vibes',
  'music',
];
let currentIndex = 0;

let rotateLikes = setInterval(() => {
  // noun.classList.add('hidden');
  currentIndex = currentIndex === likes.length - 1 ? 0 : currentIndex + 1;
  noun.innerText = likes[currentIndex];
}, 5000); 

setTimeout(() => {
  noun.className = 'fade-out'
  setInterval(() => noun.className = 'fade-out', 5000)
}, 3000)
setTimeout(() => {
  noun.className = 'fade-in'
  setInterval(() => noun.className = 'fade-in', 5000)
}, 5001)

// --------- Why
const makeSummary = project => {
  let container = document.createElement('div');
  container.className = 'experience-list-item';
  // Header
  let header = document.createElement('header');
  header.className = 'experience-list-item-header';
  header.textContent = project.title;
  container.append(header);
  // Summary
  if (project.summary) {
    let summary = document.createElement('p');
    summary.className = 'experience-list-item-summary';
    summary.textContent = project.summary;
    container.append(summary);
  }
  // Technologies Used
  let tech = document.createElement('div');
  tech.className = 'experience-list-item-tech';
  let techList = project.tech.map(item => {
    let techContainer = document.createElement('div');
    techContainer.className = 'experience-list-item-tech-item';

    let techPizazz = document.createElement('div');
    techPizazz.className = 'experience-list-item-tech-item-pizazz';
    techContainer.append(techPizazz);

    let techName = document.createElement('p');
    techName.className = 'experience-list-item-tech-item-name';
    techName.textContent = item;
    techContainer.append(techName)

    return techContainer;
  })
  techList.forEach(elem => tech.append(elem));
  container.append(tech);
  // Links
  let links = document.createElement('div');
  links.className = 'experience-list-item-links';

  let liveLink = document.createElement('a');
  liveLink.className = `experience-list-item-link ${project.link ? '' : 'disabled'}`;
  liveLink.href = project.link
  liveLink.target = '_blank';
  liveLink.textContent = 'Website';

  let github = document.createElement('a');
  github.className = `experience-list-item-link ${project.github ? '' : 'disabled'}`;
  github.href = project.github;
  github.target = '_blank';
  github.textContent = 'Code'

  links.append(liveLink);
  links.append(github);
  container.append(links);

  // Return it all
  return container;
}

// Populate Fields
data.skills.forEach(skill => {
  let lang = document.querySelector('.skill-strings-Languages');
  let dbs = document.querySelector('.skill-strings-Databases');
  let fnt = document.querySelector('.skill-strings-FNT');
  switch (skill.category) {
    case 'Languages':
      lang.innerText = `${lang.innerText}${lang.innerText ? ',' : ''} ${skill.name}`
      break;
    case 'Frameworks and Tools':
      fnt.innerText = `${fnt.innerText}${fnt.innerText ? ',' : ''} ${skill.name}`
      break;
    case 'Databases':
      dbs.innerText = `${dbs.innerText}${dbs.innerText ? ',' : ''} ${skill.name}`
      break;
  }
})

for (const subj in data.programming) {
  let expItems = data.programming[subj].map(makeSummary);
  console.log(expItems)
  switch (subj) {
    case 'freelance':
      expItems.forEach(item => document.querySelector('.experience-list-Freelance').append(item));
      break;
    case 'projects':
      expItems.forEach(item => document.querySelector('.experience-list-Projects').append(item));
      break;
    case 'educational':
      expItems.forEach(item => document.querySelector('.experience-list-Educational').append(item));
      break;
  }
}

// Filter Displays
const setFilter = (e, obj, displayFunc) => {
  obj.ref.classList.remove('selected');
  obj.ref = e.target;
  e.target.classList.add('selected');
  obj.name = e.target.innerText;
  displayFunc();
}

const displaySkills = () => {
  let lang = document.querySelector('.skill-strings-Languages');
  let dbs = document.querySelector('.skill-strings-Databases');
  let fnt = document.querySelector('.skill-strings-FNT');

  switch (skillFilter.name) {
    case 'Languages':
      lang.classList.remove('hidden');
      dbs.classList.add('hidden');
      fnt.classList.add('hidden');
      break;
    case 'Databases':
      lang.classList.add('hidden');
      dbs.classList.remove('hidden');
      fnt.classList.add('hidden');
      break;
    case 'Frameworks & Tools':
      lang.classList.add('hidden');
      dbs.classList.add('hidden');
      fnt.classList.remove('hidden');
      break;
    default:
      lang.classList.remove('hidden');
      dbs.classList.remove('hidden');
      fnt.classList.remove('hidden');
      break;
  }
}

const displayExp = () => {
  let ed = document.querySelector('.experience-list-Educational');
  let proj = document.querySelector('.experience-list-Projects');
  let fl = document.querySelector('.experience-list-Freelance');

  switch (expFilter.name) {
    case 'Educational':
      ed.classList.remove('hidden');
      proj.classList.add('hidden');
      fl.classList.add('hidden');
      break;
    case 'Projects':
      ed.classList.add('hidden');
      proj.classList.remove('hidden');
      fl.classList.add('hidden');
      break;
    case 'Freelance':
      ed.classList.add('hidden');
      proj.classList.add('hidden');
      fl.classList.remove('hidden');
      break;
    default:
      ed.classList.remove('hidden');
      proj.classList.remove('hidden');
      fl.classList.remove('hidden');
      break;
  }
}

// Populate Experience


// Filter click
let skillFilter = {
  name: 'All',
  ref: document.querySelector('.skills .filter-btn')
}
let expFilter = {
  name: 'All',
  ref: document.querySelector('.experience .filter-btn')
}

document.querySelector('.skills .filters-container').addEventListener('click', e => setFilter(e, skillFilter, displaySkills))

document.querySelector('.experience .filters-container').addEventListener('click', e => setFilter(e, expFilter, displayExp))