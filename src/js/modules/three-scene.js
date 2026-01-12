/**
 * EVE AI - Three.js 3D Scene Module
 * Handles 3D holographic visualization
 */

import { state } from './state.js';

let scene, camera, renderer, particles, characterGroup;
let evaMesh, eveMesh;
let currentBaseScale = new THREE.Vector3(4.5, 4.5, 4.5);

/**
 * Initialize Three.js scene
 */
export function initThreeJS() {
    const container = document.getElementById('canvas-container');
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const dLight = new THREE.DirectionalLight(0x3b82f6, 2.0);
    dLight.position.set(5, 3, 10);
    scene.add(dLight);

    // Particle system
    createParticleSystem();

    // Character group
    characterGroup = new THREE.Group();
    scene.add(characterGroup);

    updateCharacterPosition();
    loadHologramTextures();

    // Mouse tracking
    let normX = 0, normY = 0;
    document.addEventListener('mousemove', (event) => {
        normX = event.clientX / window.innerWidth;
        normY = 1 - (event.clientY / window.innerHeight);
    });

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Animate particles
        animateParticles();

        // Animate character
        if (characterGroup) {
            animateCharacter(elapsedTime, normX, normY);
        }

        renderer.render(scene, camera);
    };
    animate();

    // Window resize handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        updateCharacterPosition();
    });
}

/**
 * Create particle system
 */
function createParticleSystem() {
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 2000;
    const posArray = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 50;
        posArray[i + 1] = (Math.random() - 0.5) * 50;
        posArray[i + 2] = Math.random() * 100 - 50;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0x88ccff,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
}

/**
 * Animate particles
 */
function animateParticles() {
    const positions = particles.geometry.attributes.position.array;
    for (let i = 2; i < positions.length; i += 3) {
        positions[i] += 0.2;
        if (positions[i] > 5) positions[i] = -50;
    }
    particles.geometry.attributes.position.needsUpdate = true;
    particles.rotation.z += 0.0005;
}

/**
 * Animate character
 */
function animateCharacter(elapsedTime, normX, normY) {
    let baseY = -1.8;
    if (window.innerWidth >= 768 && window.innerWidth < 1024) baseY = -1.5;
    if (window.innerWidth < 768) baseY = -2.0;

    characterGroup.position.y = baseY + Math.sin(elapsedTime * 0.8) * 0.1;

    const zoomIntensity = 0.3;
    const inputFactor = (normX + normY) / 2;
    const targetScaleVal = currentBaseScale.x * (1 + inputFactor * zoomIntensity);

    const currentScale = characterGroup.scale.x;
    const smoothedScale = THREE.MathUtils.lerp(currentScale, targetScaleVal, 0.05);
    characterGroup.scale.set(smoothedScale, smoothedScale, smoothedScale);

    characterGroup.rotation.y = 0;
    characterGroup.rotation.x = 0;
}

/**
 * Update character position based on screen size
 */
function updateCharacterPosition() {
    if (window.innerWidth >= 1024) {
        characterGroup.position.set(4.5, -1.8, -3);
        currentBaseScale.set(4.5, 4.5, 4.5);
        characterGroup.scale.copy(currentBaseScale);
    } else if (window.innerWidth >= 768) {
        characterGroup.position.set(3, -1.5, -3);
        currentBaseScale.set(3.8, 3.8, 3.8);
        characterGroup.scale.copy(currentBaseScale);
    } else {
        characterGroup.position.set(0, -2.0, -3);
        currentBaseScale.set(3.8, 3.8, 3.8);
        characterGroup.scale.copy(currentBaseScale);
    }
}

/**
 * Load hologram textures
 */
function loadHologramTextures() {
    const textureLoader = new THREE.TextureLoader();
    const isDark = document.documentElement.classList.contains('dark');

    textureLoader.load('public/bg/eva-bg.png', (texture) => {
        const hologramMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false,
            blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending
        });
        evaMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(4, 4 * (texture.image.height / texture.image.width)),
            hologramMaterial
        );
        evaMesh.visible = state.isEva;
        characterGroup.add(evaMesh);
    });

    textureLoader.load('public/bg/eve-bg.png', (texture) => {
        const hologramMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false,
            blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending
        });
        eveMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(4, 4 * (texture.image.height / texture.image.width)),
            hologramMaterial
        );
        eveMesh.visible = !state.isEva;
        characterGroup.add(eveMesh);
    });
}

/**
 * Update hologram blending mode
 */
export function updateHologramBlending(isDark) {
    const newBlending = isDark ? THREE.AdditiveBlending : THREE.NormalBlending;
    if (evaMesh) {
        evaMesh.material.blending = newBlending;
        evaMesh.material.needsUpdate = true;
    }
    if (eveMesh) {
        eveMesh.material.blending = newBlending;
        eveMesh.material.needsUpdate = true;
    }
}

/**
 * Update character visibility
 */
export function updateCharacterVisibility(isEva) {
    if (evaMesh && eveMesh) {
        evaMesh.visible = isEva;
        eveMesh.visible = !isEva;
    }
}
