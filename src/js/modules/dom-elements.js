/**
 * EVE AI - DOM Elements Module
 * Centralized reference to all DOM elements
 */

export const elements = {
    // Video Elements
    vidEva: document.getElementById('vid-eva'),
    vidEve: document.getElementById('vid-eve'),
    
    // Text Elements
    textContainer: document.getElementById('cinematic-text-container'),
    curtain: document.getElementById('video-curtain'),
    bufferLoader: document.getElementById('video-buffer-loader'),
    navDotsContainer: document.getElementById('video-nav-dots'),
    controlBtn: document.getElementById('video-control-btn'),
    
    // Headline Elements
    elHeadline: document.getElementById('video-headline'),
    elSubtext: document.getElementById('video-subtext'),
    elExtra: document.getElementById('video-extra'),
    
    // Theme Elements
    htmlElement: document.documentElement,
    themeToggles: document.querySelectorAll('#theme-toggle, #theme-toggle-mobile'),
    
    // Mobile Menu
    menuBtn: document.getElementById('mobile-menu-btn'),
    mobileMenu: document.getElementById('mobile-menu'),
    mobileLinks: document.querySelectorAll('.mobile-link'),
    
    // Loader
    loader: document.getElementById('loader')
};
