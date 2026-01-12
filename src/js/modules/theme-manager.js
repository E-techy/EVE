/**
 * EVE AI - Theme Manager Module
 * Handles light/dark theme switching
 */

import { elements } from './dom-elements.js';
import { updateHologramBlending } from './three-scene.js';

/**
 * Initialize theme from localStorage or system preference
 */
export function initTheme() {
    if (localStorage.theme === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        elements.htmlElement.classList.add('dark');
    } else {
        elements.htmlElement.classList.remove('dark');
    }
}

/**
 * Setup theme toggle listeners
 */
export function setupThemeToggle() {
    elements.themeToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            elements.htmlElement.classList.toggle('dark');
            const isDark = elements.htmlElement.classList.contains('dark');
            localStorage.theme = isDark ? 'dark' : 'light';
            updateHologramBlending(isDark);
        });
    });
}
