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
    date: 'Aug 31 2026',
    title: 'Laying the Foundation',
    content:
      'Over the past week, I have been growing accustomed to ISM. We had tons of stuff to do. Firstly, I started updating my calendar, listing everything that might conflict with ISM. Although I am done with it now, I feel like I should spend some time outside or inside of class migrating it to Google Calendars so I can view everything ISM-related with all of my test dates, but there are more important things to do first. One of these things is completing my contact list. The way I am going to accomplish this is by going on LinkedIn, looking for people who I think can guide me on the path I want to go into regarding electrical engineering; hopefully I can find 15 of them soon. An item I have finished was my report on the market I was interested in, the PCB market. I have looked into it using about 5 sources, and I’ve learnt that AI isn’t the only thing supporting the market’s growth, but sectors like renewable energy and the internet are also the cause of its growth. Over the next week, I hope to have a good resume through discussion in class and feedback from my peers, and when I get that, I will code myself a new portfolio website, which I will try to make accessible through the school’s wifi. I hope to adhere to the goals I set for myself, and I will report an update next week.'
  },
  {
    date: 'Sep 14 2026',
    title: 'Tracing the Circuit',
    content:
      'Recently, ISM has really been drowning me in work, but I’ve been getting used to it. Firstly, I’ve been making a new personal website using HTML and CSS since my previous one wasn’t too ISM-focused. Other than the features we have to have on the website by default, I’m planning to make a login feature for myself so I can edit my weekly reports on the website itself instead of writing new code and uploading it again, which is a hassle. I also want to set up a LinkedIn account so I can add it onto my website and prepare myself for contacting professionals. In the previous week, I finished my annotated bibliography on PCB design. From doing it, I learned a lot about how to manage heat to improve reliability, how good routing procedures can help with signal integrity, how a PCB is actually manufactured, how to use DC-DC buck converters to step down voltage, and basic terminology to understand all this. After completing this task, I want to go further into learning common software that can be used to design PCBs, learn how to actually use these tools, and practice them myself. I want to do this so that when I get a mentor, I wouldn’t have to waste time learning these skills then. Overall, I was able to better understand where I need to focus on this week to better prepare myself for the future.'
  },
  {
    date: 'Sep 28 2026',
    title: 'Preparing for the Event',
    content:
      'The past week I’ve been preparing for the professional symposium. I am super interested in meeting professionals and asking for feedback. To ask for this feedback, of course, I need material to get feedback on. I’ve created and published my portfolio website. I’ve made it so that a viewer can just scroll through it instead of navigating through a menu, removing the friction of going through every page. I also made a feature for me to log in to the website so I can edit my weekly reports; now I’m thinking about taking this feature further to be able to edit every element of the webpage. I’ve also linked a LinkedIn account, which I’ve recently made, to my webpage. I hope to connect with many people during the professional symposium. I also want to make business cards to pass so I can connect with professionals and other students. I was also thinking of getting RFID stickers that I can program to open my webpage by tapping a phone against it. I could stick them to the back of my business cards and even my resume. Over the next week, I want to practice my answers to the questions that will be asked at the symposium to be better prepared to interact with professionals.'
  },
  {
    date: 'Oct 12 2026',
    title: 'Recent Lessons',
    content:
      'Recently, I went to the District ISM Professional Symposium, at which I learned about networking, personal branding, and building strong fundamentals. One of the biggest lessons I learned was the importance of planning. I almost arrived late at Panther Creek High School since I didn’t account for small delays. Although this did not cause any huge problems, I realized that I need to allow more time before important events. As I move forward, I plan to at least plan to arrive 10 minutes early and practise the day before with a dry run. During the event, I learned how color consistency and fonts can develop a personal brand. During mock interviews, an architect explained the importance of following requirements through semiconductor manufacturing facilities as an example, from which I learned how important attention to detail is. A software engineer emphasized how important it is to have a strong foundation to make an impact in my career. Overall, I learned that to succeed in ISM and as an engineer, I need more than just technical knowledge. As I move forward, I want to improve my time management, develop my personal brand, build professional connections, and strengthen my fundamentals as I work towards my final project.'
  },
  {
    date: 'Oct 26 2026',
    title: 'Research & Outreach',
    content:
      'Over the past few days, I have focused on finalizing my research proposal for my ISM original work, which involves developing thermally optimized PCBs for microcontrollers. I revised my introduction and review of the literature, made sure the purpose of my research was clear, and outlined the different variables I plan to experiment with, such as copper area, thermal vias, and component placement. I also made sure my sources were relevant to my topic and supported the path of my original work. Alongside my research proposal, I started to look into gaining a potential mentor. I am currently updating my LinkedIn profile so it can better reflect my interests, experiences, and goals in electrical and computer engineering. I want to use LinkedIn as a way to connect with professionals who have experience in PCB design, electronics, and the semiconductor industry. I also created a general email template to use whenever I am reaching out to professionals. I have already drafted two emails that are specific to people and plan to send them out this week. My next steps would be to continue writing and contacting professionals, build connections with them, and incorporate the feedback I receive into my research as I move forward.'
  }
];

const STORAGE_KEY = 'ismBlogPosts';
const BACKUP_STORAGE_KEY = 'ismBlogPostsBackup';
const MAX_POSTS = 200;

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

function loadStoredPosts() {
  const candidates = [STORAGE_KEY, BACKUP_STORAGE_KEY];

  for (const key of candidates) {
    const raw = readStorageValue(key);
    if (!raw) continue;

    try {
      const parsed = JSON.parse(raw);
      const cleaned = normalizeBlogPosts(parsed);
      if (cleaned) {
        if (key === STORAGE_KEY) {
          writeStorageValue(BACKUP_STORAGE_KEY, JSON.stringify(cleaned));
        }
        return cleaned;
      }
    } catch (error) {
      console.warn('Could not load saved blog posts:', error);
    }
  }

  const backup = readStorageValue(BACKUP_STORAGE_KEY);
  if (backup) {
    try {
      const parsed = JSON.parse(backup);
      const cleaned = normalizeBlogPosts(parsed);
      if (cleaned) {
        writeStorageValue(STORAGE_KEY, JSON.stringify(cleaned));
        return cleaned;
      }
    } catch (error) {
      console.warn('Could not restore blog posts from backup storage:', error);
    }
  }

  return [...defaultBlogPosts];
}

let blogPosts = loadStoredPosts();
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
    console.warn('Could not save session backup:', error);
  }
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

renderBlogPosts();
