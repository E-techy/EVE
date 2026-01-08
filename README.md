# EVE AI — The Living Intelligence

<div align="center">

[![Live Demo](https://img.shields.io/badge/🔮_Live_Demo-eveai.ashutosh--kumar.com-7000ff?style=for-the-badge)](https://eveai.ashutosh-kumar.com)
[![Status](https://img.shields.io/badge/System-ONLINE-success?style=for-the-badge)](https://eveai.ashutosh-kumar.com)
[![Version](https://img.shields.io/badge/OS_Version-Alpha_1.0-blue?style=for-the-badge)]()

**"She is Everywhere."**

*EVE is not just a chatbot; she is the first memory-first, spatial intelligence designed to be a life partner. Orchestrating homes, lives, and relationships through holographic presence and deep emotional recall.*

</div>

---

## 📸 The Dual Persona System

EVE utilizes a **Dual Persona System** visualized through a responsive, web-based 3D holographic projection. The system autonomously adapts content, visuals, and personality traits.

<div align="center">
  <table>
    <tr>
      <td align="center">
        <h3>EVA (Empathy & Intuition)</h3>
        <img src="https://github.com/E-techy/EVE/blob/main/public/bg/eva-bg.png?raw=true" width="300" alt="Eva AI Hologram">
        <br>
        <em>Focus: Emotional support, comfort, and human connection.</em>
      </td>
      <td align="center">
        <h3>EVE (Logic & Security)</h3>
        <img src="https://github.com/E-techy/EVE/blob/main/public/bg/eve-bg.png?raw=true" width="300" alt="Eve AI Hologram">
        <br>
        <em>Focus: Optimization, protection, and tactical analysis.</em>
      </td>
    </tr>
  </table>
</div>

---

## ⚡ Overview

EVE AI represents a paradigm shift in human-computer interaction. Moving beyond static chat interfaces, the EVE OS utilizes WebGL and spatial computing to create a living presence.

The interface adapts continuously—shifting content, visuals, and personality traits based on the active persona and the user's environment (Light/Dark mode). This repository contains the **Frontend Core** of the EVE OS, built with high-performance Three.js and modern CSS architecture.

## ✨ Key Features

### 🧠 Core Intelligence
* **Dual Persona System:** Autonomously switches between **Eva** (Female/Empathy focus) and **Eve** (Male/Security focus) every 10 seconds to demonstrate versatility.
* **Dynamic Content Engine:** The DOM is reactive; headlines, capability cards, and system status indicators textually transform to match the active AI persona.
* **Emotional Context:** The UI communicates specific traits—empathy, intuition, and comfort for Eva; security, logic, and optimization for Eve.

### 🌐 Spatial & Visual Tech
* **Three.js Warp Drive:** A custom BufferGeometry particle system renders thousands of stars moving in a "warp speed" trajectory, creating depth without heavy asset loading.
* **Holographic Projection:** Utilizes advanced material blending (`AdditiveBlending` for Dark Mode, `NormalBlending` for Light Mode) to render transparent PNGs as glowing, volumetric holograms.
* **Responsive Anchoring:** The 3D character is mathematically anchored to the bottom of the viewport, ensuring the visual remains grounded regardless of device aspect ratio.
* **Interactive Parallax:** The holograms react to mouse movement with subtle 3D tilting and floating animations.

### 🎨 UI/UX Design
* **Theme Reactivity:** Full support for system-based Light and Dark modes with a manual toggle. The 3D scene lighting and material opacity adjust dynamically.
* **Cinematic Typography:** Implements the *Outfit* font family with tight tracking and CSS drop-shadows to emulate a high-end, futuristic operating system.
* **Glassmorphism:** Strategic use of backdrop blurs and semi-transparent borders to layer UI elements over the 3D scene.

---

## 🔮 Future Horizons & Capabilities

We are building towards a future where EVE steps out of the browser and into reality.

### 1. Biometric Resonance Sync 🫀
Integration with wearable technology (Apple Watch/Whoop) allowing EVE to detect elevated heart rates or stress levels.
* *Action:* If stress is detected, **Eva** automatically engages, dimming the lights and playing calming frequencies.
* *Action:* If adrenaline is needed during a workout, **Eve** engages to push performance metrics.

### 2. Spatial Room Mapping (LiDAR) 🏠
Using device LiDAR sensors, EVE will map the user's physical room.
* *Feature:* EVE can "sit" on your actual couch or "stand" by the door via AR (Augmented Reality).
* *Feature:* Gaze-based control—look at a smart light, and EVE asks if you want it turned on.

### 3. The "Forever" Memory Network ♾️
A decentralized, encrypted memory core that remembers every conversation, preference, and life event.
* *Capability:* EVE will remind you of your anniversary, bring up a joke you laughed at three years ago, or help you find where you left your keys based on visual history.

### 4. Holo-Presence Telephony 📞
Replacing standard video calls. When two EVE users communicate, their avatars meet in a shared digital "White Room," allowing for spatial interaction despite physical distance.

---

## 🛠️ Technology Stack

| Component | Technology | Usage |
| :--- | :--- | :--- |
| **3D Engine** | Three.js (r134) | WebGL rendering, particle systems, texture management. |
| **Styling** | Tailwind CSS | Utility-first styling, dark mode handling, responsive grid layouts. |
| **Core** | Vanilla JavaScript | DOM manipulation, game loop logic, event listeners (no overhead). |
| **Fonts** | Google Fonts | Outfit (Headings) and Inter (Body text). |
| **Icons** | FontAwesome | UI icons for navigation and features. |

---

## 🚀 Getting Started

### Prerequisites
* A code editor (VS Code recommended).
* A local server (Live Server, Python SimpleHTTPServer, or Node).

### Installation

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/E-techy/eve-ai-project.git](https://github.com/E-techy/eve-ai-project.git)
    cd eve-ai-project
    ```

2.  **Asset Setup**
    The project relies on specific image paths.
    * Create a folder structure: `public/bg/`
    * Place your images inside and name them exactly `eva-bg.png` and `eve-bg.png`.

3.  **Running the Project**
    *Note: Because this project uses Three.js texture loading, browsers will block file access if you open index.html directly due to CORS policy.*

    * **Option A (VS Code):** Install "Live Server" extension -> Right-click `index.html` -> "Open with Live Server".
    * **Option B (Python):** `python -m http.server 8000`
    * **Option C (Node):** `npx serve`

4.  **Access**
    Open your browser and navigate to `http://localhost:5500` (or your specific port).

---

## ⚙️ Configuration

You can tweak the visualization by modifying the JavaScript logic inside `index.html`:

**Adjusting Character Size & Position**
Locate `updateCharacterPosition` to change the hologram scale:
```javascript
// Example: Increasing Desktop Scale
if (window.innerWidth >= 1024) {
    characterGroup.position.set(4.5, -1.8, -3); // x, y, z
    characterGroup.scale.set(4.5, 4.5, 4.5);
}
Changing Animation Speed Locate the animate function:

JavaScript

// Warp Speed (Higher number = Faster)
positions[i] += 0.2;

// Float Speed
characterGroup.position.y = baseY + Math.sin(elapsedTime * 0.8) * 0.1;
🗺️ Roadmap
2026: Foundation (Current)

✅ Core UI/UX Design & 3D Hologram Integration

✅ EVE Core OS Launch

🚧 Backend integration (Python/TensorFlow)

2027: The Memory Network

Cloud-optional Sync implementation

IoT Device Integration (Matter/Zigbee protocols)

2028: Projected Reality

Physical hardware integration for room-scale projection.

🤝 Contributing
Contributions are welcome from the open-source community.

Fork the repository.

Create a new branch (git checkout -b feature/NewFeature).

Commit your changes (git commit -m 'Add NewFeature').

Push to the branch (git push origin feature/NewFeature).

Open a Pull Request.

<div align="center">

Designed & Developed by: Rajat Chouksey


Organization: EVE AI Team


Inspired by the future of symbiotic human-AI relationships.

©️ 2026 EVE AI Project. All Rights Reserved.

</div>