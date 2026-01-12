/**
 * EVE AI - Persona Manager Module
 * Handles persona switching and content updates
 */

import { state, personalityContent } from './state.js';
import { updateVideoTextContent, syncVideoVisibility, switchVideoSource } from './video-controller.js';
import { renderNavDots } from './video-ui.js';
import { updateCharacterVisibility } from './three-scene.js';

/**
 * Check for saved persona preference and initialize
 */
export function checkPersistence() {
    const savedPersona = localStorage.getItem('eve_persona');
    if (savedPersona) {
        state.isEva = savedPersona === 'eva';
        state.userHasInteracted = true;
        updateStaticContent(state.isEva);
        updateUIButtons(state.isEva);
    } else {
        state.isEva = true;
        state.userHasInteracted = false;
        updateStaticContent(true);
        updateUIButtons(true);
        state.autoSwitchInterval = setInterval(autoRotateHero, 8000);
    }
    syncVideoVisibility();
    // Initialize character visibility after a small delay to ensure meshes are loaded
    setTimeout(() => {
        updateCharacterVisibility(state.isEva);
    }, 1000);
}

/**
 * Auto-rotate between personas (hero section)
 */
function autoRotateHero() {
    if (state.userHasInteracted) return;
    const nextEva = !state.isEva;
    state.isEva = nextEva;
    updateStaticContent(nextEva);
    updateUIButtons(nextEva);
    
    // Sync image change with text change (after 500ms delay)
    setTimeout(() => {
        updateCharacterVisibility(nextEva);
    }, 500);
}

/**
 * Stop auto-rotation
 */
export function stopAutoRotation() {
    if (state.autoSwitchInterval) {
        clearInterval(state.autoSwitchInterval);
        state.autoSwitchInterval = null;
    }
    state.userHasInteracted = true;
}

/**
 * Select persona from hero section
 */
export function selectPersonaFromHero(isEva) {
    stopAutoRotation();
    state.isEva = isEva;
    state.userHasInteracted = true;
    localStorage.setItem('eve_persona', isEva ? 'eva' : 'eve');

    updateStaticContent(isEva);
    updateUIButtons(isEva);
    
    // Sync image change with text change (after 500ms delay)
    setTimeout(() => {
        updateCharacterVisibility(isEva);
    }, 500);

    syncVideoVisibility();
    updateVideoTextContent(isEva ? 'eva' : 'eve', state.indices[isEva ? 'eva' : 'eve']);
    renderNavDots();
}

/**
 * Select persona from video section
 */
export function selectPersonaFromVideo(isEva) {
    if (state.isEva === isEva) return;
    stopAutoRotation();

    state.isEva = isEva;
    state.userHasInteracted = true;
    localStorage.setItem('eve_persona', isEva ? 'eva' : 'eve');

    updateStaticContent(isEva);
    updateUIButtons(isEva);
    
    // Sync image change with text change (after 500ms delay)
    setTimeout(() => {
        updateCharacterVisibility(isEva);
    }, 500);
    
    switchVideoSource(isEva);
}

/**
 * Update static content based on selected persona
 */
export function updateStaticContent(isEva) {
    const data = isEva ? personalityContent.eva : personalityContent.eve;
    const elementIds = [
        'system-status-text', 'hero-headline', 'hero-subtext', 'hero-cta',
        'capabilities-title', 'card-1-title', 'card-1-desc',
        'card-2-title', 'card-2-desc', 'card-3-title', 'card-3-desc'
    ];

    // Hide all elements
    elementIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.classList.add('text-content-swap');
            el.classList.add('hidden');
        }
    });

    // Update content after delay
    setTimeout(() => {
        document.getElementById('system-status-text').textContent = data.status;
        document.getElementById('hero-headline').innerHTML = data.headline;
        document.getElementById('hero-subtext').textContent = data.subtext;
        document.getElementById('hero-cta').textContent = data.btn;
        document.getElementById('capabilities-title').innerHTML = 
            `Designed for <span class="italic text-slate-400">${data.capabilitiesTitle}</span>`;
        document.getElementById('card-1-title').textContent = data.card1.title;
        document.getElementById('card-1-desc').textContent = data.card1.desc;
        document.getElementById('card-2-title').textContent = data.card2.title;
        document.getElementById('card-2-desc').textContent = data.card2.desc;
        document.getElementById('card-3-title').textContent = data.card3.title;
        document.getElementById('card-3-desc').textContent = data.card3.desc;

        // Show all elements
        elementIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.remove('hidden');
        });
    }, 500);
}

/**
 * Update UI button states
 */
export function updateUIButtons(isEva) {
    const allEvaBtns = document.querySelectorAll('.persona-btn-eva');
    const allEveBtns = document.querySelectorAll('.persona-btn-eve');

    if (isEva) {
        allEvaBtns.forEach(b => b.classList.add('active'));
        allEveBtns.forEach(b => b.classList.remove('active'));
    } else {
        allEveBtns.forEach(b => b.classList.add('active'));
        allEvaBtns.forEach(b => b.classList.remove('active'));
    }
}
