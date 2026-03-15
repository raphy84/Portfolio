// Supabase Configuration
const SUPABASE_URL = "https://uhbauyqdrqinpggxgazr.supabase.co";
const SUPABASE_ANON_KEY = "sb_secret_aIHo6VPUuJfbxbDxDVokeQ_hfd2I5bI";

const supabaseClient = (typeof supabase !== 'undefined') 
    ? supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) 
    : null;

const PASSWORD = "admin123";

// Initial project data (used as fallback or for export)
const initialProjects = [
    {
        id: 1,
        name: "Synthwave Show Dawn",
        name_fr: "Synthwave Show Dawn",
        image: "https://via.placeholder.com/400x250/080808/e02828?text=SYNTHWAVE+SHOW+DAWN",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        time: "1 Year",
        time_fr: "1 An",
        linkTitle: "Student Project",
        linkTitle_fr: "Projet Étudiant",
        desc: "Rhythmic Hero Shooter - 4v4 Multiplayer using Unreal Engine 5.",
        desc_fr: "Hero Shooter Rythmique - Multijoueur 4v4 utilisant Unreal Engine 5.",
        role: "I worked as a Game Designer, Gameplay Balancer, Multiplayer Developer, and Lead Backup.",
        role_fr: "J'ai travaillé en tant que Game Designer, Équilibreur de Gameplay, Développeur Multijoueur et Lead Backup.",
        longDesc: "Synthwave Show Dawn is a high-octane 4v4 multiplayer shooter that combines rhythmic mechanics with tactical gameplay. Developed in Unreal Engine 5, the project focused on synchronized audio-visual feedback and complex network architecture.",
        longDesc_fr: "Synthwave Show Dawn est un jeu de tir multijoueur 4v4 énergique qui combine des mécaniques rythmiques avec un gameplay tactique. Développé sous Unreal Engine 5, le projet s'est concentré sur un retour audio-visuel synchronisé et une architecture réseau complexe."
    },
    {
        id: 2,
        name: "Linked",
        name_fr: "Linked",
        image: "https://via.placeholder.com/400x250/080808/e02828?text=LINKED",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        time: "Game Jam",
        time_fr: "Game Jam",
        linkTitle: "Itch.io",
        linkTitle_fr: "Itch.io",
        desc: "Created during the Brassart Game Jam 2024.",
        desc_fr: "Créé pendant la Brassart Game Jam 2024.",
        role: "Winner of the 1st Place! A short, intensive burst of creativity and prototyping under a tight deadline.",
        role_fr: "Gagnant de la 1ère place ! Une courte explosion intensive de créativité et de prototypage sous une échéance serrée.",
        longDesc: "Linked was the winner of the Brassart Game Jam 2024. It explores the concept of connection through physics-based puzzles and abstract narrative design. Built in just 48 hours.",
        longDesc_fr: "Linked a remporté la Brassart Game Jam 2024. Il explore le concept de connexion à travers des énigmes basées sur la physique et un design narratif abstrait. Construit en seulement 48 heures."
    },
    {
        id: 3,
        name: "Babyboom",
        name_fr: "Babyboom",
        image: "https://via.placeholder.com/400x250/080808/e02828?text=BABYBOOM",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        time: "Game Jam",
        time_fr: "Game Jam",
        linkTitle: "Itch.io",
        linkTitle_fr: "Itch.io",
        desc: "Created during the Brassart Game Jam 2025.",
        desc_fr: "Créé pendant la Brassart Game Jam 2025.",
        role: "Awarded the 2nd Place. Focused on fun, immediate gameplay loops, and engaging mechanics.",
        role_fr: "Récompensé par la 2ème place. Axé sur le plaisir, les boucles de gameplay immédiates et des mécaniques engageantes.",
        longDesc: "Babyboom took home 2nd place at the 2025 Brassart Game Jam. It's a chaotic action game featuring procedural generation and explosive chain reactions, developed with a focus on 'juice' and player feedback.",
        longDesc_fr: "Babyboom a remporté la 2ème place à la Brassart Game Jam 2025. C'est un jeu d'action chaotique avec génération procédurale et réactions en chaîne explosives, développé avec un accent sur le 'juice' et le ressenti joueur."
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

    const currentLang = localStorage.getItem('portfolio_lang') || 'en';

    container.innerHTML = projects.map(p => {
        const name = currentLang === 'fr' ? (p.name_fr || p.name) : p.name;
        const time = currentLang === 'fr' ? (p.time_fr || p.time) : p.time;
        const linkTitle = currentLang === 'fr' ? (p.linkTitle_fr || p.linkTitle) : p.linkTitle;
        const desc = currentLang === 'fr' ? (p.desc_fr || p.desc) : p.desc;
        const role = currentLang === 'fr' ? (p.role_fr || p.role) : p.role;
        const viewMore = currentLang === 'fr' ? "Cliquez pour en voir plus" : "Click to view more";
        const wipText = currentLang === 'fr' ? (translations.fr.wip_link) : (translations.en.wip_link);

        const cardOnClick = (p.isWIP && !isAdmin) ? '' : `onclick="window.location.href='project-detail.html?id=${p.id}'"`;
        const footerText = p.isWIP ? `<span class="view-more wip-status">${wipText}</span>` : `<span class="view-more">${viewMore}</span>`;

        return `
    <div class="project-card ${p.isWIP ? 'wip-card' : ''}" ${cardOnClick}>
      <div class="card-actions">
        <button class="card-action-btn move-left" title="Move left" onclick="event.stopPropagation(); moveProjectLeft(${p.id})">
          <svg viewBox="0 0 24 24"><path fill="currentColor" d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" /></svg>
        </button>
        <button class="card-action-btn move-right" title="Move right" onclick="event.stopPropagation(); moveProjectRight(${p.id})">
          <svg viewBox="0 0 24 24"><path fill="currentColor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" /></svg>
        </button>
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
        <h3 class="project-name">${name}</h3>
        <div class="project-meta">
          <span class="meta-tag"><div class="icon-time"></div> ${time}</span>
          <span class="meta-tag"><div class="icon-link"></div> ${linkTitle}</span>
        </div>
        <p class="project-desc">${desc}</p>
        <p class="project-role">${role}</p>
        ${footerText}
      </div>
    </div>
  `}).join('');
}

// Carousel Logic
function getScrollAmount() {
    const container = document.getElementById('projects-carousel');
    return container ? container.clientWidth + 30 : 1230;
}

function setupCarousel() {
    const container = document.getElementById('projects-carousel');
    const prevBtn = document.getElementById('prev-project');
    const nextBtn = document.getElementById('next-project');

    if (!container || !prevBtn || !nextBtn) return;

    prevBtn.onclick = () => {
        container.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    };

    nextBtn.onclick = () => {
        container.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    };
}

// CRUD Operations
function moveProjectLeft(id) {
    const index = projects.findIndex(p => p.id === id);
    if (index > 0) {
        const temp = projects[index];
        projects[index] = projects[index - 1];
        projects[index - 1] = temp;
        saveAndRefresh(true);
    }
}

function moveProjectRight(id) {
    const index = projects.findIndex(p => p.id === id);
    if (index > -1 && index < projects.length - 1) {
        const temp = projects[index];
        projects[index] = projects[index + 1];
        projects[index + 1] = temp;
        saveAndRefresh(true);
    }
}

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
    document.getElementById('p-time').value = project.time;
    document.getElementById('p-link').value = project.linkTitle;
    document.getElementById('p-desc').value = project.desc;
    document.getElementById('p-role').value = project.role;
    document.getElementById('p-wip').checked = !!project.isWIP;

    const detailBtn = document.getElementById('btn-view-detail');
    detailBtn.style.display = 'inline-block';
    detailBtn.href = `project-detail.html?id=${id}`;
}

async function syncProjectsWithSupabase() {
    if (!supabaseClient) {
        console.log("Supabase not configured. Using local data.");
        return;
    }

    try {
        const { data, error } = await supabaseClient
            .from('projects')
            .select('*')
            .order('id', { ascending: true });

        if (error) throw error;

        if (data && data.length > 0) {
            projects = data;
            localStorage.setItem('portfolio_projects', JSON.stringify(projects));
            renderProjects();
            console.log("Projects synced from Supabase");
        }
    } catch (err) {
        console.error("Error syncing with Supabase:", err.message);
    }
}

async function saveAndRefresh(keepScroll = false) {
    const container = document.getElementById('projects-carousel');
    const scrollPos = (container && keepScroll) ? container.scrollLeft : 0;

    // Local save
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
    renderProjects();

    if (container && keepScroll) {
        const newContainer = document.getElementById('projects-carousel');
        if (newContainer) newContainer.scrollLeft = scrollPos;
    }

    // Remote save (Supabase)
    if (isAdmin && supabaseClient) {
        try {
            const { error } = await supabaseClient
                .from('projects')
                .upsert(projects);

            if (error) throw error;
            console.log("Changes synced to Supabase!");
        } catch (err) {
            console.error("Failed to sync to Supabase:", err.message);
            alert("Local save successful, but Sync to Database failed: " + err.message);
        }
    } else if (isAdmin) {
        console.log("Changes saved locally. Use 'Export' for permanent update (Supabase not connected).");
    }
}

function exportProjectData() {
    // We want to export the data in a format that can be pasted directly into initialProjects
    // We remove the IDs that were generated by Date.now() for new projects if we want to keep them clean, 
    // but actually keeping them is fine.
    
    const dataStr = JSON.stringify(projects, null, 4);
    const codeTemplate = `// Copy this and replace the initialProjects array in projects.js\nconst initialProjects = ${dataStr};`;
    
    // Create a temporary textarea to copy to clipboard
    const textArea = document.createElement("textarea");
    textArea.value = codeTemplate;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        alert("Project data exported and copied to clipboard!\n\nNow, open 'projects.js' and replace the 'initialProjects' array with what you just copied.");
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
        // If copy fails, show in a prompt
        prompt("Copy the project data below:", codeTemplate);
    }
    document.body.removeChild(textArea);
}

// Admin Logic
function setupAdmin() {
    const addBtn = document.getElementById('admin-add-project-new');
    const pwdModal = document.getElementById('password-modal');
    const projModal = document.getElementById('project-modal');

    // Secret shortcut listener: Alt + Shift + Enter
    document.addEventListener('keydown', (e) => {
        // Use e.key for broad compatibility
        if (e.altKey && e.shiftKey && e.key === 'Enter') {
            e.preventDefault(); // Stop default browser behavior
            if (!isAdmin) {
                pwdModal.classList.add('active');
                document.getElementById('admin-password').focus();
            } else {
                isAdmin = false;
                editingProjectId = null;
                renderProjects();
                console.log("Admin mode deactivated");
                alert("Mode administrateur désactivé");
            }
        }
    });

    if (!addBtn) return;

    addBtn.onclick = () => {
        editingProjectId = null;
        projModal.classList.add('active');
        document.querySelector('#project-modal .modal-title').innerText = 'Add New Project';
        document.querySelector('#project-modal button[type="submit"]').innerText = 'Create Project';
        document.getElementById('project-form').reset();
        document.getElementById('btn-view-detail').style.display = 'none';
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
            time: document.getElementById('p-time').value,
            linkTitle: document.getElementById('p-link').value,
            desc: document.getElementById('p-desc').value,
            role: document.getElementById('p-role').value,
            isWIP: document.getElementById('p-wip').checked,
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
    syncProjectsWithSupabase(); // Load from DB
    renderProjects();
    setupCarousel();
    setupAdmin();
});
