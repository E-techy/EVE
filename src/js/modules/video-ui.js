/**
 * EVE AI - Video UI Module
 * Handles video section UI elements (dots, buttons, loaders)
 */

import { state } from './state.js';
import { elements } from './dom-elements.js';
import { jumpToVideo } from './video-controller.js';

/**
 * Render navigation dots
 */
export function renderNavDots() {
    const character = state.isEva ? 'eva' : 'eve';
    const list = state.playlists[character];
    elements.navDotsContainer.innerHTML = '';

    if (!list) return;

    list.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.className = `nav-dot ${idx === state.indices[character] ? 'active' : ''}`;
        dot.onclick = (e) => {
            e.stopPropagation();
            jumpToVideo(idx);
        };
        elements.navDotsContainer.appendChild(dot);
    });
}

/**
 * Update control button icon
 */
export function updateControlIcon() {
    const video = state.isEva ? elements.vidEva : elements.vidEve;
    const icon = elements.controlBtn.querySelector('i');
    const isTimerPaused = state.inReadingPhase && state.sequenceTimer === null;

    if (state.manualPause || video.paused || isTimerPaused) {
        icon.className = 'fas fa-play';
    } else {
        icon.className = 'fas fa-pause';
    }
}

/**
 * Show buffer loader
 */
export function showBufferLoader() {
    elements.bufferLoader.classList.add('active');
}

/**
 * Hide buffer loader
 */
export function hideBufferLoader() {
    elements.bufferLoader.classList.remove('active');
}
