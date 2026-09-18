const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main .section');

const updateActiveLink = () => {
  const scrollY = window.scrollY + 120;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    const isInView = scrollY >= top && scrollY < top + height;
    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('active', isActive && isInView);
    });
  });
};

window.addEventListener('scroll', updateActiveLink, { passive: true });
window.addEventListener('load', updateActiveLink);

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
const projectImage = document.querySelector('.project-image-wrap img');
const projectCard = document.querySelector('.project-card-main');
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
  if (!projectTitle || !projectDescription || !projectImage || !projectCard || !dotButtons.length) return;

  updateProject(0);
  resetAutoRotate();

  dotButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const index = Number(button.dataset.index);
      animateProject(index);
    });
  });

  prevButton?.addEventListener('click', prevProject);
  nextButton?.addEventListener('click', nextProject);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeProjects);
} else {
  initializeProjects();
}

const defaultBlogPosts = [
  {
    date: 'Sep 14 2026',
    title: 'Tracing the Circuit',
    content:
      'Recently, ISM has really been drowning me in work, but I’ve been getting used to it. Firstly, I’ve been making a new personal website using HTML and CSS since my previous one wasn’t too ISM-focused. Other than the features we have to have on the website by default, I’m planning to make a login feature for myself so I can edit my weekly reports on the website itself instead of writing new code and uploading it again, which is a hassle. I also want to set up a LinkedIn account so I can add it onto my website and prepare myself for contacting professionals.\n\nIn the previous week, I finished my annotated bibliography on PCB design. From doing it, I learned a lot about how to manage heat to improve reliability, how good routing procedures can help with signal integrity, how a PCB is actually manufactured, how to use DC-DC buck converters to step down voltage, and basic terminology to understand all this. After completing this task, I want to go further into learning common software that can be used to design PCBs, learn how to actually use these tools, and practice them myself. I want to do this so that when I get a mentor, I wouldn’t have to waste time learning these skills then. Overall, I was able to better understand where I need to focus on this week to better prepare myself for the future.'
  },
  {
    date: 'Aug 31 2026',
    title: 'Laying the Foundation',
    content:
      'Over the past week I have been growing accustomed to ISM. We had tons of stuff to do. Firstly I started updating my calendar listing everything that might conflict with ISM, although I am done with it now I feel like I should spend some time outside or inside of class migrating it to google calendars so I can view everything ISM related with all of my test dates, but there are more important things to do first.\n\nOne of these things is completing my contact list. The way I am going to accomplish this is by going on linkedIn looking for people who I think can guide me on the path I want to go into regarding electrical engineering, hopefully I can find 15 of them soon. An item I have finished was my report on the market I was interested in, the PCB market. I have looked into it using about 5 sources and I’ve learnt that AI isn’t the only thing supporting the market’s growth, but sectors like renewable energy and internet are also the cause of its growth.'
  }
];

const STORAGE_KEY = 'ismBlogPosts';
let blogPosts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultBlogPosts;
let blogEditorEnabled = false;

const blogList = document.getElementById('blogList');
const blogEditorControls = document.getElementById('blogEditorControls');
const addBlogButton = document.getElementById('addBlogButton');
const blogSecretToggle = document.getElementById('blogSecretToggle');
const blogSecretLink = document.querySelector('.blog-secret-link');

function saveBlogPosts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(blogPosts));
}

function renderBlogPosts() {
  if (!blogList) return;

  blogList.innerHTML = '';

  blogPosts.forEach((post, index) => {
    const article = document.createElement('article');
    article.className = 'blog-card';
    if (index === 0) article.classList.add('newest');

    const date = document.createElement('span');
    date.className = 'blog-date';
    date.textContent = post.date;

    const title = document.createElement('h4');
    title.textContent = post.title;

    const content = document.createElement('div');
    content.className = 'blog-content';
    content.innerHTML = post.content
      .split('\n\n')
      .map((paragraph) => `<p>${paragraph}</p>`)
      .join('');

    article.appendChild(date);
    article.appendChild(title);
    article.appendChild(content);

    if (blogEditorEnabled) {
      const actions = document.createElement('div');
      actions.className = 'blog-actions';

      const editButton = document.createElement('button');
      editButton.type = 'button';
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => editBlogPost(index));

      const deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => deleteBlogPost(index));

      actions.appendChild(editButton);
      actions.appendChild(deleteButton);
      article.appendChild(actions);
    }

    blogList.appendChild(article);
  });
}

function toggleBlogEditor() {
  const enteredPassword = window.prompt('Enter password to edit blog posts:');

  if (enteredPassword === 'ISM') {
    blogEditorEnabled = !blogEditorEnabled;
    blogEditorControls.classList.toggle('hidden', !blogEditorEnabled);
    if (blogEditorEnabled) {
      addBlogButton.focus();
    }
    renderBlogPosts();
  }
}

function addBlogPost() {
  const title = window.prompt('Blog title:');
  if (!title) return;

  const date = window.prompt('Date (example: Sep 14 2026):', 'Sep 18 2026');
  const content = window.prompt('Blog content:');

  if (!date || !content) return;

  blogPosts.unshift({
    date: date.trim() || 'Sep 18 2026',
    title: title.trim(),
    content: content.trim()
  });

  saveBlogPosts();
  renderBlogPosts();
}

function editBlogPost(index) {
  const post = blogPosts[index];
  if (!post) return;

  const newTitle = window.prompt('Edit title:', post.title);
  if (newTitle === null) return;

  const newDate = window.prompt('Edit date:', post.date);
  if (newDate === null) return;

  const newContent = window.prompt('Edit content:', post.content);
  if (newContent === null) return;

  blogPosts[index] = {
    date: newDate.trim() || post.date,
    title: newTitle.trim() || post.title,
    content: newContent.trim() || post.content
  };

  saveBlogPosts();
  renderBlogPosts();
}

function deleteBlogPost(index) {
  const confirmed = window.confirm('Delete this blog post?');
  if (!confirmed) return;

  blogPosts.splice(index, 1);
  saveBlogPosts();
  renderBlogPosts();
}

blogSecretToggle?.addEventListener('dblclick', toggleBlogEditor);
blogSecretLink?.addEventListener('dblclick', toggleBlogEditor);
addBlogButton?.addEventListener('click', addBlogPost);

renderBlogPosts();
