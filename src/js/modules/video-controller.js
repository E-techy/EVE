/**
 * EVE AI - Video Controller Module
 * Handles video playback, sequencing, and controls
 */

import { state, VIDEO_BASE_PATH } from './state.js';
import { elements } from './dom-elements.js';
import { renderNavDots, updateControlIcon, showBufferLoader, hideBufferLoader } from './video-ui.js';

/**
 * Load playlists from JSON
 */
export async function loadPlaylists() {
    try {
        const response = await fetch('urls.json');
        const data = await response.json();
        state.playlists.eva = data.eva;
        state.playlists.eve = data.eve;

        if (state.playlists.eva.length > 0) {
            elements.vidEva.src = VIDEO_BASE_PATH + state.playlists.eva[0][0];
        }
        if (state.playlists.eve.length > 0) {
            elements.vidEve.src = VIDEO_BASE_PATH + state.playlists.eve[0][0];
        }

        updateVideoTextContent(state.isEva ? 'eva' : 'eve', 0);
        renderNavDots();
    } catch (error) {
        console.error("Failed to load urls.json.", error);
    }
}

/**
 * Update video text content
 */
export function updateVideoTextContent(character, index) {
    const data = state.playlists[character][index];
    if (!data) return;
    elements.elHeadline.innerHTML = data[1];
    elements.elSubtext.innerHTML = data[2];
    elements.elExtra.innerHTML = data[3] || "";
}

/**
 * Sync video visibility
 */
export function syncVideoVisibility() {
    if (state.isEva) {
        elements.vidEva.style.opacity = '1';
        elements.vidEve.style.opacity = '0';
        elements.vidEve.muted = true;
        elements.vidEve.pause();
    } else {
        elements.vidEve.style.opacity = '1';
        elements.vidEva.style.opacity = '0';
        elements.vidEva.muted = true;
        elements.vidEva.pause();
    }
}

/**
 * Switch video source
 */
export function switchVideoSource(toEva) {
    syncVideoVisibility();
    renderNavDots();

    const char = toEva ? 'eva' : 'eve';
    state.manualPause = false;

    if (state.isPlaying || state.videoSectionInView) {
        playVideoSequence(char, state.indices[char]);
    } else {
        updateVideoTextContent(char, state.indices[char]);
    }
}

/**
 * Jump to specific video
 */
export function jumpToVideo(index) {
    const character = state.isEva ? 'eva' : 'eve';

    if (state.indices[character] === index) return;
    state.manualPause = false;
    updateControlIcon();
    playVideoSequence(character, index);
}

/**
 * Toggle play/pause
 */
export function togglePlayPause() {
    const video = state.isEva ? elements.vidEva : elements.vidEve;

    if (state.inReadingPhase) {
        if (state.sequenceTimer) {
            clearTimeout(state.sequenceTimer);
            state.sequenceTimer = null;
            state.manualPause = true;
        } else {
            state.manualPause = false;
            finishReadingPhase(video);
        }
    } else {
        if (video.paused) {
            state.manualPause = false;
            playVideoSafe(video);
        } else {
            state.manualPause = true;
            video.pause();
        }
    }
    updateControlIcon();
}

/**
 * Play next video in playlist
 */
export function playNextInPlaylist(character) {
    const list = state.playlists[character];
    if (!list || list.length === 0) return;
    const nextIndex = (state.indices[character] + 1) % list.length;
    playVideoSequence(character, nextIndex);
}

/**
 * Play video sequence with cinematic transition
 */
export function playVideoSequence(character, index) {
    if (state.sequenceTimer) clearTimeout(state.sequenceTimer);

    const list = state.playlists[character];
    const currentVideoEl = character === 'eva' ? elements.vidEva : elements.vidEve;

    state.indices[character] = index;
    const nextData = list[index];

    state.inReadingPhase = true;
    elements.curtain.classList.add('active');
    elements.textContainer.classList.remove('mode-playing');
    elements.textContainer.classList.add('mode-hidden');

    setTimeout(() => {
        syncVideoVisibility();
        updateVideoTextContent(character, index);
        renderNavDots();

        currentVideoEl.src = VIDEO_BASE_PATH + nextData[0];
        currentVideoEl.load();

        elements.textContainer.classList.remove('mode-hidden');
        elements.textContainer.classList.add('mode-reading');

        if (!state.manualPause) {
            state.sequenceTimer = setTimeout(() => {
                finishReadingPhase(currentVideoEl);
            }, 6000);
        } else {
            updateControlIcon();
        }
    }, 1000);
}

/**
 * Finish reading phase and start video
 */
function finishReadingPhase(videoEl) {
    state.inReadingPhase = false;
    state.sequenceTimer = null;

    playVideoSafe(videoEl, () => {
        elements.curtain.classList.remove('active');
        elements.textContainer.classList.remove('mode-reading');
        elements.textContainer.classList.add('mode-playing');
    });
}

/**
 * Safely play video with buffering handling
 */
function playVideoSafe(video, onSuccess) {
    if (state.lazyLoadTriggered) video.loop = false;

    if (state.manualPause) {
        updateControlIcon();
        return;
    }

    const attemptPlay = () => {
        hideBufferLoader();
        video.play().then(() => {
            if (onSuccess) onSuccess();
            updateControlIcon();
        }).catch(e => console.log("Play interrupted", e));

        if (state.soundAllowed) video.muted = false;
    };

    if (video.readyState >= 3) {
        attemptPlay();
    } else {
        showBufferLoader();
        video.pause();
        const onCanPlay = () => {
            hideBufferLoader();
            attemptPlay();
        };
        video.addEventListener('canplay', onCanPlay, { once: true });
    }
}

/**
 * Start experience (enable sound)
 */
export function startExperience() {
    state.isPlaying = true;
    state.soundAllowed = true;

    document.getElementById('sound-permission').style.opacity = '0';
    elements.controlBtn.style.opacity = '1';
    setTimeout(() => {
        document.getElementById('sound-permission').style.display = 'none';
    }, 500);

    state.lazyLoadTriggered = true;
    const char = state.isEva ? 'eva' : 'eve';

    state.manualPause = false;
    playVideoSequence(char, state.indices[char]);
}

/**
 * Setup video event listeners
 */
export function setupVideoListeners() {
    elements.vidEva.addEventListener('ended', () => playNextInPlaylist('eva'));
    elements.vidEve.addEventListener('ended', () => playNextInPlaylist('eve'));

    // Video section observer
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            state.videoSectionInView = entry.isIntersecting;
            const video = state.isEva ? elements.vidEva : elements.vidEve;

            if (entry.isIntersecting) {
                state.lazyLoadTriggered = true;
                if (state.isPlaying && !state.manualPause) {
                    if (!state.inReadingPhase) playVideoSafe(video);
                }
            } else {
                elements.vidEva.pause();
                elements.vidEve.pause();
                updateControlIcon();
            }
        });
    }, { threshold: 0.5 });

    videoObserver.observe(document.getElementById('immersion'));
}
