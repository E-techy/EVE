/**
 * EVE AI - UI Manager Module
 * Handles general UI interactions (mobile menu, reveal animations)
 */

import { elements } from './dom-elements.js';

/**
 * Setup mobile menu
 */
export function setupMobileMenu() {
    elements.menuBtn.addEventListener('click', () => {
        if (elements.mobileMenu.classList.contains('hidden')) {
            elements.mobileMenu.classList.remove('hidden');
            setTimeout(() => elements.mobileMenu.classList.remove('opacity-0'), 10);
            elements.menuBtn.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            elements.mobileMenu.classList.add('opacity-0');
            setTimeout(() => elements.mobileMenu.classList.add('hidden'), 300);
            elements.menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    elements.mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            elements.mobileMenu.classList.add('opacity-0');
            setTimeout(() => elements.mobileMenu.classList.add('hidden'), 300);
            elements.menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

/**
 * Setup reveal animations on scroll
 */
export function setupRevealAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/**
 * Hide loader after initialization
 */
export function hideLoader() {
    setTimeout(() => {
        elements.loader.style.opacity = '0';
        elements.loader.style.visibility = 'hidden';
    }, 2000);
}
