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
    date: 'Sep 28 2026',
    title: 'Building the Foundation',
    content:
      'This week, I continued refining my understanding of the PCB industry while also expanding my research process. I spent time organizing my sources and thinking more critically about which topics are most valuable for my project and future mentor conversations. One of the biggest lessons I learned is that good research is not just about collecting information, but about asking the right questions and making connections between different ideas.\n\nI also began looking more seriously at how I can present myself professionally in the field of electrical engineering. I am starting to see that being prepared is not only about technical knowledge, but also about communication, planning, and making a clear case for my interests. This helped me better understand how to approach my mentor search and how to frame my goals in a way that is both thoughtful and confident.'
  },
  {
    date: 'Oct 12 2026',
    title: 'Expanding My Perspective',
    content:
      'The past few weeks have reinforced the importance of staying organized and focused in ISM. I have been balancing research, project planning, and professional development, and I have seen how each task supports the others. One area that stood out to me was how much of engineering is rooted in problem-solving skills that go beyond just technical knowledge. Being able to think systematically and communicate clearly is just as important as understanding a circuit or a design process.\n\nI also spent time looking deeper into how PCB design fits into larger industries such as robotics, renewable energy, and consumer electronics. This helped me realize that I want to pursue work that combines practical technology with real-world impact. The more I learn, the more I see how valuable it is to build a strong foundation now, especially before I begin working with a mentor or pursuing more advanced opportunities.'
  },
  {
    date: 'Oct 26 2026',
    title: 'From Research to Direction',
    content:
      'This week, I focused on connecting the information I have gathered to the direction I want my ISM experience to take. The research I have done on PCB design has made me more certain that this is a field I want to study seriously. I am beginning to understand not only what PCBs are, but also how important design choices are in determining performance, reliability, and manufacturability. That understanding has made me more motivated to continue learning and practicing.\n\nAt the same time, I have been thinking more about how to turn my interest into action. I want to build my skills in a way that is meaningful and measurable, so I have been identifying the next steps I should take to grow professionally. I see ISM as a way to refine that path and create a stronger foundation for the future, especially through mentorship, research, and hands-on exploration.'
  },
  {
    date: 'Nov 09 2026',
    title: 'Designing the Next Step',
    content:
      'During this period of ISM, I have started to feel more confident about where my interests are leading me. I understand that my goal is not simply to learn about electrical engineering in general, but to focus specifically on how I can contribute to fields like PCB design and hardware development. The more I study this area, the more I appreciate how much there is to learn about design choices, signal flow, power distribution, and reliability.\n\nI also feel that my ability to organize my work and reflect on my growth is improving. I am beginning to see how the research, project planning, and communication aspects of ISM all fit together. This is helping me move from just accumulating information to turning it into a clearer personal direction, which is an important step in preparing for mentorship and future opportunities.'
  },
  {
    date: 'Nov 23 2026',
    title: 'Turning Interest into Momentum',
    content:
      'This week, I reflected on how far I have come in narrowing my focus and understanding my professional interests. I am becoming more intentional about the direction I want to pursue, especially in areas connected to engineering design and electronics. Research has helped me recognize that I do not just want to learn theory in isolation; I want to build practical understanding that can apply to real products and systems.\n\nI also see the value in continuing to ask questions and stay curious. ISM has pushed me to think beyond just what I am interested in and instead consider how I can apply that interest in meaningful ways. I want to keep building my knowledge, strengthen my skills, and continue preparing myself for future coursework, mentorship, and career opportunities in engineering.'
  }
];

const STORAGE_KEY = 'ismBlogPosts';
const BACKUP_STORAGE_KEY = 'ismBlogPostsBackup';
const MAX_POSTS = 200;
const firebaseConfig = window.firebaseConfig || null;
let firebaseDb = null;
let firebaseReady = false;

async function ensureFirebaseReady() {
  if (!firebaseConfig || firebaseConfig.projectId === 'YOUR_PROJECT_ID') {
    return null;
  }

  if (firebaseDb) {
    return firebaseDb;
  }

  try {
    const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js');
    const { getDatabase } = await import('https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js');

    const app = initializeApp(firebaseConfig);
    firebaseDb = getDatabase(app);
    firebaseReady = true;
    return firebaseDb;
  } catch (error) {
    console.warn('Firebase not configured or unavailable. Falling back to browser storage:', error);
    firebaseReady = false;
    return null;
  }
}

async function readRemoteBlogPosts() {
  const db = await ensureFirebaseReady();
  if (!db) return null;

  try {
    const { ref, get } = await import('https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js');
    const snapshot = await get(ref(db, 'blogPosts'));

    if (!snapshot.exists()) {
      return null;
    }

    const remotePosts = normalizeBlogPosts(snapshot.val());
    if (remotePosts) {
      writeStorageValue(STORAGE_KEY, JSON.stringify(remotePosts));
      writeStorageValue(BACKUP_STORAGE_KEY, JSON.stringify(remotePosts));
      return remotePosts;
    }
  } catch (error) {
    console.warn('Could not read blog posts from Firebase:', error);
  }

  return null;
}

async function writeRemoteBlogPosts(posts) {
  const db = await ensureFirebaseReady();
  if (!db) return false;

  try {
    const { ref, set } = await import('https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js');
    await set(ref(db, 'blogPosts'), posts.slice(0, MAX_POSTS));
    return true;
  } catch (error) {
    console.warn('Could not save blog posts to Firebase. Browser backup remains intact:', error);
    return false;
  }
}

function readStorageValue(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

function writeStorageValue(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.warn('Could not save blog posts to browser storage:', error);
  }
}

function normalizeBlogPosts(value) {
  if (!Array.isArray(value)) return null;

  const normalizedPosts = value
    .filter((post) => post && typeof post === 'object')
    .map((post) => ({
      date: typeof post.date === 'string' && post.date.trim() ? post.date.trim() : 'No date',
      title: typeof post.title === 'string' && post.title.trim() ? post.title.trim() : 'Untitled post',
      content: typeof post.content === 'string' ? post.content.trim() : ''
    }))
    .filter((post) => post.content || post.title);

  return normalizedPosts.length ? normalizedPosts : null;
}

async function loadBlogPosts() {
  const remotePosts = await readRemoteBlogPosts();
  if (remotePosts) {
    return remotePosts;
  }

  const storageCandidates = [
    { key: STORAGE_KEY, label: 'primary' },
    { key: BACKUP_STORAGE_KEY, label: 'backup' }
  ];

  for (const candidate of storageCandidates) {
    const storedValue = readStorageValue(candidate.key);
    if (!storedValue) continue;

    try {
      const parsedValue = JSON.parse(storedValue);
      const normalizedPosts = normalizeBlogPosts(parsedValue);

      if (normalizedPosts) {
        if (candidate.key === STORAGE_KEY) {
          writeStorageValue(BACKUP_STORAGE_KEY, JSON.stringify(normalizedPosts));
        }
        return normalizedPosts;
      }
    } catch (error) {
      console.warn(`Could not parse blog posts from ${candidate.label} storage:`, error);
    }
  }

  const backupValue = readStorageValue(BACKUP_STORAGE_KEY);
  if (backupValue) {
    try {
      const parsedValue = JSON.parse(backupValue);
      const normalizedPosts = normalizeBlogPosts(parsedValue);
      if (normalizedPosts) {
        writeStorageValue(STORAGE_KEY, JSON.stringify(normalizedPosts));
        return normalizedPosts;
      }
    } catch (error) {
      console.warn('Could not restore blog posts from backup storage:', error);
    }
  }

  return [...defaultBlogPosts];
}

let blogPosts = [...defaultBlogPosts];
let blogEditorEnabled = false;

const blogList = document.getElementById('blogList');
const blogEditorControls = document.getElementById('blogEditorControls');
const addBlogButton = document.getElementById('addBlogButton');
const blogSecretToggle = document.getElementById('blogSecretToggle');
const blogSecretLink = document.querySelector('.blog-secret-link');

function saveBlogPosts() {
  const trimmedPosts = blogPosts.slice(0, MAX_POSTS);
  const serializedPosts = JSON.stringify(trimmedPosts);

  writeStorageValue(STORAGE_KEY, serializedPosts);
  writeStorageValue(BACKUP_STORAGE_KEY, serializedPosts);

  try {
    sessionStorage.setItem(STORAGE_KEY, serializedPosts);
  } catch (error) {
    console.warn('Could not save a session backup of blog posts:', error);
  }

  writeRemoteBlogPosts(trimmedPosts);
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

window.addEventListener('storage', (event) => {
  if (event.key !== STORAGE_KEY || !event.newValue) return;

  try {
    const parsedValue = JSON.parse(event.newValue);
    const normalizedPosts = normalizeBlogPosts(parsedValue);
    if (normalizedPosts) {
      blogPosts = normalizedPosts;
      renderBlogPosts();
    }
  } catch (error) {
    console.warn('Could not sync blog posts from another tab:', error);
  }
});

async function initializeBlogPosts() {
  blogPosts = (await loadBlogPosts()) || [...defaultBlogPosts];
  renderBlogPosts();
}

initializeBlogPosts();
