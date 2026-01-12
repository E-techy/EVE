/**
 * EVE AI - State Management Module
 * Manages global application state
 */

export const state = {
    isEva: true,
    userHasInteracted: false,
    soundAllowed: false,
    videoSectionInView: false,
    autoSwitchInterval: null,
    playlists: { eva: [], eve: [] },
    indices: { eva: 0, eve: 0 },
    lazyLoadTriggered: false,
    isPlaying: false,
    manualPause: false,
    sequenceTimer: null,
    inReadingPhase: false
};

export const VIDEO_BASE_PATH = 'public/bg/video/';

export const personalityContent = {
    eva: {
        status: "EVA Online",
        headline: "She is <br> <span class='font-light text-slate-400 dark:text-slate-500 italic'>Everywhere.</span>",
        subtext: "The first emotional AI life partner. Eva learns from your feelings, remembers your moments, and manages your home with care.",
        btn: "Meet Eva",
        capabilitiesTitle: "Empathy",
        card1: {
            title: "Emotional Recall",
            desc: "Eva remembers how you felt during every conversation, creating a lifelong emotional bond that deepens over time."
        },
        card2: {
            title: "Comfort Management",
            desc: "Eva manages lighting and climate to match your mood. Soft lights for relaxation, bright for focus."
        },
        card3: {
            title: "Intuitive Care",
            desc: "She anticipates your needs before you ask. From ordering groceries to suggesting a break when you're stressed."
        }
    },
    eve: {
        status: "EVE Online",
        headline: "He is <br> <span class='font-light text-slate-400 dark:text-slate-500 italic'>Everywhere.</span>",
        subtext: "The ultimate secure home guardian. Eve optimizes your ecosystem, protects your privacy, and ensures tactical efficiency.",
        btn: "Meet Eve",
        capabilitiesTitle: "Security",
        card1: {
            title: "Tactical Monitoring",
            desc: "Eve continuously scans perimeter sensors and network traffic, identifying threats before they materialize."
        },
        card2: {
            title: "System Optimization",
            desc: "Maximizes energy efficiency and network latency. Eve ensures your home operates at peak performance."
        },
        card3: {
            title: "Strategic Logic",
            desc: "He provides data-driven advice for your schedule, finances, and health, removing chaos from your daily life."
        }
    }
};
