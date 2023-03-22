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
document.querySelector('.brand-statement p').textContent = data['brand_statement'];

const makeExperienceSummary = experience => {
  let container = document.createElement('div');
  container.className = 'project-list-item';
  // Header
  let header = document.createElement('header');
  header.className = 'project-list-item-header';
  header.textContent = experience.title;
  // Company and Years
  let contextContainer = document.createElement('div');
  contextContainer.className = 'experience-list-item-context';
  let context = new Array(2).fill(null).map(() => document.createElement('p'));
  context[0].textContent = experience.company;
  context[1].textContent = experience.years;
  contextContainer.append(...context);
  // Description
  let descriptionContainer = document.createElement('div');
  descriptionContainer.className = 'experience-list-item-description';
  let summaryTxt = document.createElement('p');
  summaryTxt.className = 'experience-list-item-daily';
  summaryTxt.textContent = experience.description;
  let accomplishments = document.createElement('ul');
  accomplishments.className = 'experience-list-item-accomplishments';
  experience.accomplishments.forEach(point => {
    let pointLI = document.createElement('li');
    let pointP = document.createElement('p');
    pointP.textContent = point;
    pointLI.append(pointP);
    accomplishments.append(pointLI);
  });
  descriptionContainer.append(summaryTxt, accomplishments)

  container.append(header, contextContainer, descriptionContainer)
  return container
}

const makeProjectSummary = project => {
  let container = document.createElement('div');
  container.className = 'project-list-item';
  // Header
  let header = document.createElement('header');
  header.className = 'project-list-item-header';
  header.textContent = project.title;
  container.append(header);
  // Summary
  if (project.summary) {
    let summary = document.createElement('p');
    summary.className = 'project-list-item-summary';
    summary.textContent = project.summary;
    container.append(summary);
  }
  // Technologies Used
  let tech = document.createElement('div');
  tech.className = 'project-list-item-tech';
  let techList = project.tech.map(item => {
    let techContainer = document.createElement('div');
    techContainer.className = 'project-list-item-tech-item';

    let techPizazz = document.createElement('div');
    techPizazz.className = 'project-list-item-tech-item-pizazz';
    techContainer.append(techPizazz);

    let techName = document.createElement('p');
    techName.className = 'project-list-item-tech-item-name';
    techName.textContent = item;
    techContainer.append(techName)

    return techContainer;
  })
  techList.forEach(elem => tech.append(elem));
  container.append(tech);
  // Link
  let links = document.createElement('div');
  links.className = 'project-list-item-links';

  let liveLink = document.createElement('a');
  liveLink.href = project.link
  liveLink.target = '_blank';
  if (project.link) {
    liveLink.className = `project-list-item-link`;
    liveLink.textContent = project.linkType === 'code' ? "Code" : "Website";
  } else {
    liveLink.className = `project-list-item-link disabled`;
    liveLink.textContent = 'Unavailable'
  }

  links.append(liveLink);
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

let experienceItems = data.experience.map(makeExperienceSummary)
document.querySelector('.experience-list').append(...experienceItems)

for (const subj in data.programming) {
  let projectItems = data.programming[subj].map(makeProjectSummary);
  switch (subj) {
    case 'professional':
      projectItems.forEach(item => document.querySelector('.project-list-Professional').append(item));
      break;
    case 'personal':
      projectItems.forEach(item => document.querySelector('.project-list-Personal').append(item));
      break;
    case 'educational':
      projectItems.forEach(item => document.querySelector('.project-list-Educational').append(item));
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

const displayProj = () => {
  let ed = document.querySelector('.project-list-Educational');
  let proj = document.querySelector('.project-list-Personal');
  let fl = document.querySelector('.project-list-Professional');

  switch (projectFilter.name) {
    case 'Educational':
      ed.classList.remove('hidden');
      proj.classList.add('hidden');
      fl.classList.add('hidden');
      break;
    case 'Personal':
      ed.classList.add('hidden');
      proj.classList.remove('hidden');
      fl.classList.add('hidden');
      break;
    case 'Professional':
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

// Filter click
let skillFilter = {
  name: 'All',
  ref: document.querySelector('.skills .filter-btn')
}
let projectFilter = {
  name: 'All',
  ref: document.querySelector('.projects .filter-btn')
}

document.querySelector('.skills .filters-container').addEventListener('click', e => setFilter(e, skillFilter, displaySkills))

document.querySelector('.projects .filters-container').addEventListener('click', e => setFilter(e, projectFilter, displayProj))