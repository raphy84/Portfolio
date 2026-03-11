/**
 * projects.js
 * Handles dynamic project management, carousel logic and admin features.
 */

const PASSWORD = "admin123";

// Initial project data
const initialProjects = [
    {
        id: 1,
        name: "Synthwave Show Dawn",
        image: "https://via.placeholder.com/400x250/080808/e02828?text=SYNTHWAVE+SHOW+DAWN",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        time: "1 Year",
        linkTitle: "Student Project",
        desc: "Rhythmic Hero Shooter - 4v4 Multiplayer using Unreal Engine 5.",
        role: "I worked as a Game Designer, Gameplay Balancer, Multiplayer Developer, and Lead Backup.",
        longDesc: "Synthwave Show Dawn is a high-octane 4v4 multiplayer shooter that combines rhythmic mechanics with tactical gameplay. Developed in Unreal Engine 5, the project focused on synchronized audio-visual feedback and complex network architecture."
    },
    {
        id: 2,
        name: "Linked",
        image: "https://via.placeholder.com/400x250/080808/e02828?text=LINKED",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        time: "Game Jam",
        linkTitle: "Itch.io",
        desc: "Created during the Brassart Game Jam 2024.",
        role: "Winner of the 1st Place! A short, intensive burst of creativity and prototyping under a tight deadline.",
        longDesc: "Linked was the winner of the Brassart Game Jam 2024. It explores the concept of connection through physics-based puzzles and abstract narrative design. Built in just 48 hours."
    },
    {
        id: 3,
        name: "Babyboom",
        image: "https://via.placeholder.com/400x250/080808/e02828?text=BABYBOOM",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        time: "Game Jam",
        linkTitle: "Itch.io",
        desc: "Created during the Brassart Game Jam 2025.",
        role: "Awarded the 2nd Place. Focused on fun, immediate gameplay loops, and engaging mechanics.",
        longDesc: "Babyboom took home 2nd place at the 2025 Brassart Game Jam. It's a chaotic action game featuring procedural generation and explosive chain reactions, developed with a focus on 'juice' and player feedback."
    }
];

let projects = JSON.parse(localStorage.getItem('portfolio_projects')) || initialProjects;
let isAdmin = false;
let editingProjectId = null;

// Render logic
function renderProjects() {
    const container = document.getElementById('projects-carousel');
    if (!container) return;

    if (isAdmin) {
        document.body.classList.add('admin-active');
    } else {
        document.body.classList.remove('admin-active');
    }

    container.innerHTML = projects.map(p => `
    <div class="project-card" onclick="if(!isAdmin) window.location.href='project-detail.html?id=${p.id}'">
      <div class="card-actions">
        <button class="card-action-btn edit" title="Modify project" onclick="event.stopPropagation(); startEditProject(${p.id})">
          <svg viewBox="0 0 24 24"><path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"/></svg>
        </button>
        <button class="card-action-btn delete" title="Delete project" onclick="event.stopPropagation(); deleteProject(${p.id})">
          <svg viewBox="0 0 24 24"><path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/></svg>
        </button>
      </div>
      <div class="project-image" style="background-image: url('${p.image}'); background-size: cover; background-position: center;">
      </div>
      <div class="project-info">
        <h3 class="project-name">${p.name}</h3>
        <div class="project-meta">
          <span class="meta-tag"><div class="icon-time"></div> ${p.time}</span>
          <span class="meta-tag"><div class="icon-link"></div> ${p.linkTitle}</span>
        </div>
        <p class="project-desc">${p.desc}</p>
        <p class="project-role">${p.role}</p>
        <span class="view-more">Click to view more</span>
      </div>
    </div>
  `).join('');
}

// Carousel Logic
const scrollAmount = 410; // Card width (380) + gap (30)

function setupCarousel() {
    const container = document.getElementById('projects-carousel');
    const prevBtn = document.getElementById('prev-project');
    const nextBtn = document.getElementById('next-project');

    if (!container || !prevBtn || !nextBtn) return;

    prevBtn.onclick = () => {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    };

    nextBtn.onclick = () => {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };
}

// CRUD Operations
function deleteProject(id) {
    if (confirm('Are you sure you want to delete this project?')) {
        projects = projects.filter(p => p.id !== id);
        saveAndRefresh();
    }
}

function startEditProject(id) {
    const project = projects.find(p => p.id === id);
    if (!project) return;

    editingProjectId = id;
    const modal = document.getElementById('project-modal');
    modal.classList.add('active');

    document.querySelector('#project-modal .modal-title').innerText = 'Modify Project';
    document.querySelector('#project-modal button[type="submit"]').innerText = 'Modify Project';

    document.getElementById('p-name').value = project.name;
    document.getElementById('p-image').value = project.image;
    document.getElementById('p-video').value = project.video;
    document.getElementById('p-time').value = project.time;
    document.getElementById('p-link').value = project.linkTitle;
    document.getElementById('p-desc').value = project.desc;
    document.getElementById('p-role').value = project.role;
}

function saveAndRefresh() {
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
    renderProjects();
}

// Admin Logic
function setupAdmin() {
    const modifyBtn = document.getElementById('admin-modify-projects');
    const addBtn = document.getElementById('admin-add-project-new');
    const pwdModal = document.getElementById('password-modal');
    const projModal = document.getElementById('project-modal');

    if (!modifyBtn) return;

    modifyBtn.onclick = () => {
        if (!isAdmin) {
            pwdModal.classList.add('active');
        } else {
            isAdmin = false;
            editingProjectId = null;
            renderProjects();
        }
    };

    addBtn.onclick = () => {
        editingProjectId = null;
        projModal.classList.add('active');
        document.querySelector('#project-modal .modal-title').innerText = 'Add New Project';
        document.querySelector('#project-modal button[type="submit"]').innerText = 'Create Project';
        document.getElementById('project-form').reset();
    };

    document.getElementById('cancel-password').onclick = () => {
        pwdModal.classList.remove('active');
        document.getElementById('admin-password').value = '';
    };

    document.getElementById('submit-password').onclick = () => {
        const input = document.getElementById('admin-password');
        if (input.value === PASSWORD) {
            isAdmin = true;
            pwdModal.classList.remove('active');
            input.value = '';
            renderProjects();
        } else {
            alert('Incorrect Password');
        }
    };

    document.getElementById('cancel-project').onclick = () => {
        projModal.classList.remove('active');
        editingProjectId = null;
    };

    document.getElementById('project-form').onsubmit = (e) => {
        e.preventDefault();
        const projectData = {
            name: document.getElementById('p-name').value,
            image: document.getElementById('p-image').value,
            video: document.getElementById('p-video').value,
            time: document.getElementById('p-time').value,
            linkTitle: document.getElementById('p-link').value,
            desc: document.getElementById('p-desc').value,
            role: document.getElementById('p-role').value,
            longDesc: editingProjectId ? (projects.find(p => p.id === editingProjectId)?.longDesc || '') : ''
        };

        if (editingProjectId) {
            const index = projects.findIndex(p => p.id === editingProjectId);
            projects[index] = { ...projectData, id: editingProjectId };
        } else {
            projects.push({ ...projectData, id: Date.now() });
        }

        saveAndRefresh();
        projModal.classList.remove('active');
        document.getElementById('project-form').reset();
        editingProjectId = null;
    };
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    setupCarousel();
    setupAdmin();
});
