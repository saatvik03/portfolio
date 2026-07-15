const projects = [
  {
    title: 'Plant Soil Moisture Monitoring System',
    description: 'Designed and programmed an ESP32-based soil moisture monitoring system that collects real-time sensor data and displays plant moisture levels on a TFT display. Integrated analog sensors, implemented embedded software in Arduino C++, and developed a simple interface for monitoring plant health.',
    image: 'images/IMG_2237.webp',
  },
  {
    title: 'Reaction Time Game',
    description: 'Designed and programmed an Arduino reaction time game using LEDs and push buttons to measure user response speed. Implemented randomized timing, real-time reaction measurement, and serial output for performance tracking using Arduino C++.',
    image: 'images/WiringRTG (1).jpeg',
  },
  {
    title: 'Memory Game',
    description: 'Designed and programmed an Arduino memory game featuring LED sequence generation and button-based user input. Implemented randomized patterns, input validation, and progressive difficulty using Arduino C++ and digital I/O.',
    image: 'images/IMG_1596.jpeg',
  },
  {
    title: 'Wifi Controlled Car',
    description: 'Designed and programmed a WiFi-controlled RC car using an ESP32, integrating embedded programming, motor control, and a web-based control system. Implemented real-time control, responsive web interface, and motor driver integration using Arduino C++ and web technologies.',
    image: 'images/IMG_2244.webp',
  },
];

let currentProjectIndex = 0;
let autoRotateTimer = null;

const projectTitle = document.querySelector('.project-title');
const projectDescription = document.querySelector('.project-description');
const projectImage = document.querySelector('.project-image img');
const projectCard = document.querySelector('.project-card');
const dotButtons = document.querySelectorAll('.project-dot');
const prevButton = document.querySelector('.prev-btn');
const nextButton = document.querySelector('.next-btn');

function setActiveControl(index) {
  dotButtons.forEach((button) => {
    button.classList.toggle('active', Number(button.dataset.index) === index);
  });
}

function updateProject(index) {
  const project = projects[index];
  if (!project) return;

  projectTitle.textContent = project.title;
  projectDescription.textContent = project.description;
  projectImage.src = project.image;
  projectImage.alt = `${project.title} screenshot`;
  setActiveControl(index);
  currentProjectIndex = index;
}

function animateProject(index) {
  if (index === currentProjectIndex) return;

  projectCard.classList.add('fade-out');
  clearInterval(autoRotateTimer);

  setTimeout(() => {
    updateProject(index);
    projectCard.classList.remove('fade-out');
    projectCard.classList.add('fade-in');

    window.requestAnimationFrame(() => {
      projectCard.classList.remove('fade-in');
    });
  }, 260);

  resetAutoRotate();
}

function nextProject() {
  const nextIndex = (currentProjectIndex + 1) % projects.length;
  animateProject(nextIndex);
}

function prevProject() {
  const prevIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
  animateProject(prevIndex);
}

function resetAutoRotate() {
  clearInterval(autoRotateTimer);
  autoRotateTimer = setInterval(nextProject, 10000);
}

function initializeProjects() {
  updateProject(0);
  resetAutoRotate();

  dotButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const index = Number(button.dataset.index);
      animateProject(index);
    });
  });

  prevButton.addEventListener('click', prevProject);
  nextButton.addEventListener('click', nextProject);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeProjects);
} else {
  initializeProjects();
}
