/**
 * EVE AI - Main Application Entry Point
 * Initializes all modules and exposes global functions
 */

import { checkPersistence, selectPersonaFromHero, selectPersonaFromVideo } from './modules/persona-manager.js';
import { loadPlaylists, setupVideoListeners, togglePlayPause, startExperience } from './modules/video-controller.js';
import { initThreeJS } from './modules/three-scene.js';
import { initTheme, setupThemeToggle } from './modules/theme-manager.js';
import { setupMobileMenu, setupRevealAnimations, hideLoader } from './modules/ui-manager.js';

/**
 * Initialize application
 */
function init() {
    // Initialize theme
    initTheme();
    setupThemeToggle();

    // Initialize persona system
    checkPersistence();

    // Load video playlists
    loadPlaylists();

    // Setup video listeners
    setupVideoListeners();

    // Setup UI
    setupMobileMenu();

    // Wait for page load
    window.addEventListener('load', () => {
        hideLoader();
        initThreeJS();
        setupRevealAnimations();
    });
}

// Expose functions to global scope for onclick handlers
window.selectPersonaFromHero = selectPersonaFromHero;
window.selectPersonaFromVideo = selectPersonaFromVideo;
window.togglePlayPause = togglePlayPause;
window.startExperience = startExperience;

// Initialize app
init();
