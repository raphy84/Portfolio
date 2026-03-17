/**
 * translations.js
 * Handles UI text translations and language switching.
 */

const translations = {
    en: {
        nav_home: "Home",
        nav_projects: "Projects",
        nav_about: "About",
        nav_contact: "Contact",
        hero_title: "Raphaël Barrière",
        hero_subtitle: "Game/System Designer",
        hero_desc_1: "Hi, and welcome to my website! I'm Raphaël Barrière, a 20 year old <strong>system designer</strong>, and free as the air. I’m currently studying at the Brassart campus in Aix-en-Provence, in the Game Design department.",
        hero_desc_2: "I’m <strong>joyful</strong>, <strong>imaginative</strong>, and <strong>ambitious</strong> <strong>person</strong>. I strive to create engaging experiences by focusing first on the <strong>fun</strong> the player will experience and the <strong>originality</strong> of the mechanics.",
        hero_desc_3: "I'm currently a game design student looking for <strong>new adventures and projects</strong>!",
        resume: "Resume",
        section_projects: "Projects",
        projects_disclaimer: "Here is a selection of my best projects. To see all my prototypes and other creations, visit <a href=\"https://blackstarstudio.itch.io/\" target=\"_blank\">my Itch.io</a>!",
        admin_modify: "Modify Projects",
        admin_add: "+ Add New Project",
        section_about: "About me",
        skill_system: "System Design",
        skill_system_desc: "I specialize in <strong>game systems</strong>, <strong>3Cs</strong>, and <strong>balancing</strong>, with a deep passion for designing <strong>multiplayer games</strong> that create engaging player experiences.",
        skill_management: "Management",
        skill_management_desc: "High capacity in <strong>project management</strong>, <strong>team coordination</strong>, and <strong>tracking progress</strong>.",
        skill_engines: "Game Engines",
        skill_graphics: "Imaging & Graphics",
        personal_statement: "I am curious to discover new experiences and ready to go anywhere for new adventures.",
        interests_title: "Interests",
        interest_sports: "Sports | ",
        interest_creative: "Creative | ",
        interest_games: "Favorite Games | ",
        section_contact: "Contact me",
        contact_desc: "Feel free to contact me, I will try to answer as soon as possible.",
        thanks: "Thanks you for visiting!",
        go_back: "Go Back",
        admin_edit_project: "Edit Project",
        watch_youtube: "Watch on YouTube",
        view_itch: "View on Itch.io",
        view_website: "View Web Site",
        no_content: "No content yet.",
        wip_link: "Work in progress",
        wip_status: "Working Progress",
        view_project_detail: "View Project Page"
    },
    fr: {
        nav_home: "Accueil",
        nav_projects: "Projets",
        nav_about: "À propos",
        nav_contact: "Contact",
        hero_title: "Raphaël Barrière",
        hero_subtitle: "Game/System Designer",
        hero_desc_1: "Bonjour, et bienvenue sur mon site ! Je suis Raphaël Barrière, un <strong>system designer</strong> de 20 ans, libre comme l'air. J'étudie actuellement au campus Brassart d'Aix-en-Provence, au département Game Design.",
        hero_desc_2: "Je suis une personne <strong>joyeuse</strong>, <strong>imaginative</strong> et <strong>ambitieuse</strong>. Je m'efforce de créer des expériences engageantes en me concentrant d'abord sur le <strong>plaisir</strong> que le joueur éprouvera et l'<strong>originalité</strong> des mécaniques.",
        hero_desc_3: "Je suis actuellement un étudiant en game design à la recherche de <strong>nouvelles aventures et projets</strong> !",
        resume: "CV",
        section_projects: "Projets",
        projects_disclaimer: "Voici une sélection de mes meilleurs projets. Pour voir tous mes prototypes et autres créations, visitez <a href=\"https://blackstarstudio.itch.io/\" target=\"_blank\">mon Itch.io</a> !",
        admin_modify: "Modifier Projets",
        admin_add: "+ Ajouter Nouveau Projet",
        section_about: "À propos",
        skill_system: "System Design",
        skill_system_desc: "Je me spécialise dans les <strong>systèmes de jeu</strong>, les <strong>3Cs</strong> et l'<strong>équilibrage</strong>, avec une passion profonde pour la conception de <strong>jeux multijoueurs</strong> créant des expériences marquantes.",
        skill_management: "Management",
        skill_management_desc: "Grande capacité en <strong>gestion de projet</strong>, <strong>coordination d'équipe</strong> et <strong>suivi des progrès</strong>.",
        skill_engines: "Moteurs de Jeu",
        skill_graphics: "Imagerie & Graphisme",
        personal_statement: "Je suis curieux de découvrir de nouvelles expériences et prêt à aller n'importe où pour de nouvelles aventures.",
        interests_title: "Centres d'intérêt",
        interest_sports: "Sports | ",
        interest_creative: "Créativité | ",
        interest_games: "Jeux Préférés | ",
        section_contact: "Contactez-moi",
        contact_desc: "N'hésitez pas à me contacter, j'essaierai de vous répondre dès que possible.",
        thanks: "Merci de votre visite !",
        go_back: "Retour",
        admin_edit_project: "Modifier Projet",
        watch_youtube: "Regarder sur YouTube",
        view_itch: "Voir sur Itch.io",
        view_website: "Voir le Site Web",
        no_content: "Pas encore de contenu.",
        wip_link: "En cours de développement",
        wip_status: "Work in Progress",
        view_project_detail: "Voir la page du projet"
    }
};

function updateLanguage(lang) {
    localStorage.setItem('portfolio_lang', lang);
    document.documentElement.lang = lang;

    // Update static text elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    // Update active state of language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('onclick').includes(`'${lang}'`));
    });

    // Special case for projects (if projects.js is loaded and renderProjects exists)
    if (typeof renderProjects === 'function') {
        renderProjects();
    }
    
    // Special case for project detail page
    if (typeof renderProject === 'function') {
        renderProject();
    }
}

// Initialize language on load
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('portfolio_lang') || 'en';
    updateLanguage(savedLang);
});
