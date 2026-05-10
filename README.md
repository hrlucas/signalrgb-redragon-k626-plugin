# 🚀 SignalRGB Redragon Ashe K626 Plugin

<p align="center">
  <a href="https://github.com/hrlucas">
    <img src="https://img.shields.io/badge/GitHub-hrlucas-181717?style=for-the-badge&logo=github">
  </a>
  <a href="https://www.linkedin.com/in/lucas-hochmann-rosa">
    <img src="https://img.shields.io/badge/LinkedIn-Lucas_Hochmann_Rosa-0A66C2?style=for-the-badge&logo=linkedin">
  </a>
  <a href="https://signalrgb.com/">
    <img src="https://img.shields.io/badge/SignalRGB-Plugin-ff6b00?style=for-the-badge">
  </a>
  <a href="#-license">
    <img src="https://img.shields.io/badge/License-MIT-2ea44f?style=for-the-badge">
  </a>
</p>

<p align="center">
  <a href="README.pt-BR.md">Português (Brasil)</a>
</p>

> I developed this plugin to add SignalRGB support for the **Redragon Ashe RGB K626-KB-B PT-BROWN ABNT2 keyboard**, with a physical LED map built specifically for the Brazilian layout. This project belongs to **Lucas Hochmann Rosa / hrlucas.dev**, is open to community improvements, and is distributed under the MIT license with author attribution.

---

## 📌 Overview

The **signalrgb-redragon-k626-plugin** allows SignalRGB to recognize and control the **Redragon Ashe K626 ABNT2** mechanical keyboard using the Sinowealth base protocol and a fixed 79-LED layout mapped manually.

---

## 🧠 Features

- Device identification by VID/PID (`0x258A` / `0x0049`).
- HID endpoint validation through interface `1`.
- Physical ABNT2 mapping with 79 controllable LEDs.
- 18 x 5 visual layout on the SignalRGB canvas.
- **Canvas** mode to use the active SignalRGB effect.
- **Forced** mode to apply a fixed color to the keyboard.
- Configurable shutdown/suspend color.
- Author, documentation, and device image metadata.
- Ignores Fn secondary functions such as PrtSc, ScrLk, and Pause because they do not have dedicated LEDs in this mapping.

---

## 🏗️ Architecture

```text
signalrgb-redragon-k626-plugin/
│
├── Redragon_Ashe_K626.js       # SignalRGB plugin for the Redragon Ashe K626 ABNT2
├── assets/
│   ├── .gitkeep                # Keeps the assets directory versioned
│   └── Redragon-Ashe-K626.png  # Keyboard image for repository documentation
├── README.md                   # Main documentation in English
├── README.pt-BR.md             # Brazilian Portuguese documentation
└── LICENSE                     # MIT License
```

### Organization

- **Redragon_Ashe_K626.js**: device identification, configurable parameters, LED mapping, and RGB packet delivery.
- **assets/**: visual assets used by the project.
- **LICENSE**: terms for use, modification, and distribution under MIT.

---

## 🛠️ Technologies

- JavaScript ES Modules
- SignalRGB Plugin API
- HID reports through `device.send_report`
- Sinowealth base protocol
- Redragon Ashe RGB K626-KB-B PT-BROWN ABNT2

---

## ⚙️ Requirements

- Windows with SignalRGB installed.
- **Redragon Ashe RGB K626-KB-B PT-BROWN ABNT2** keyboard.
- Access to the local SignalRGB plugins directory.

> This plugin was developed and mapped for the K626 ABNT2. Other models, revisions, or layouts may require changes to the VID/PID, endpoint, physical LED indexes, or visual layout.

---

## 🔧 Installation

Copy the plugin file:

```txt
Redragon_Ashe_K626.js
```

to the local SignalRGB plugins directory:

```txt
C:\Users\YOUR_USER\Documents\WhirlwindFX\Plugins
```

Then fully close SignalRGB from the Windows system tray and open it again.

---

## ▶️ Usage

In SignalRGB, select the device recognized as **Redragon Ashe K626 ABNT2** and configure the available parameters:

| Parameter | Description |
| --------- | ----------- |
| `Lighting Mode` | Switches between the SignalRGB canvas effect and a fixed color |
| `Forced Color` | Color applied when `Forced` mode is enabled |
| `Shutdown Color` | Color sent to the keyboard during shutdown or suspend |

---

## 🧩 Device Details

| Field | Value |
| ----- | ----- |
| Model | Redragon Ashe RGB K626-KB-B PT-BROWN |
| Physical layout | ABNT2 |
| Mapped LEDs | 79 |
| VID | `0x258A` |
| PID | `0x0049` |
| Validated interface | `1` |
| Base protocol | Sinowealth |
| Canvas size | `18 x 5` |

---

## 🖼️ Device Image

The repository keeps the keyboard image at `assets/Redragon-Ashe-K626.png` for documentation and project organization.

The plugin uses the GitHub Raw URL directly so SignalRGB receives the PNG with the expected transparency and formatting:

```js
const DEVICE_IMAGE_URL = "https://raw.githubusercontent.com/hrlucas/signalrgb-redragon-k626-plugin/main/assets/Redragon-Ashe-K626.png";
```

---

## 🧪 Local Validation

After installing the file, restart SignalRGB and confirm:

- The keyboard appears as **Redragon Ashe K626 ABNT2**.
- **Canvas** mode follows the active SignalRGB effect.
- **Forced** mode applies the selected color to all mapped keys.
- The ABNT2 Enter key appears visually across two rows but uses only one physical LED.
- Keys without dedicated LEDs do not appear as independent LEDs.

---

## 🔐 Repository Best Practices

- Keep `README.md`, `README.pt-BR.md`, and `LICENSE` up to date.
- Do not publish credentials, tokens, or sensitive data.
- Use branches and pull requests for relevant changes.
- Enable Dependabot alerts, secret scanning, push protection, and code scanning on GitHub when the repository is published.
- Use Git LFS if large images or assets become part of the project history.

---

## 📄 License

Licensed under MIT. You may use, modify, and distribute this project while keeping the copyright notice and crediting **Lucas Hochmann Rosa / hrlucas.dev**.

This is an independent community plugin. SignalRGB and Redragon trademarks belong to their respective owners.

---

## 👨‍💻 Author

**Lucas Hochmann Rosa / hrlucas.dev** — Full Stack Developer

- GitHub: https://github.com/hrlucas
- LinkedIn: https://www.linkedin.com/in/lucas-hochmann-rosa-456bb7339/
- License: MIT (credit the author when using or deriving this project)
