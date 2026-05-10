/*
 * Redragon Ashe K626 ABNT2 - SignalRGB Plugin
 * Author: Lucas Hochmann Rosa
 * GitHub: https://github.com/hrlucas
 * Repository: https://github.com/hrlucas/signalrgb-redragon-k626-plugin
 *
 * Developed and mapped for the Redragon Ashe K626-KB-B ABNT2 layout.
 * Physical LED mapping by Lucas Hochmann Rosa.
 * Protocol base: Sinowealth HID keyboard protocol.
 *
 * Device:
 *   Redragon Ashe RGB K626-KB-B PT-BROWN
 *   VID: 0x258A
 *   PID: 0x0049
 *
 * Notes:
 *   - This plugin forces the K626 ABNT2 model layout.
 *   - Physical layout: 79 LEDs.
 *   - Enter ABNT2 occupies two rows visually, but has only one LED.
 *   - Fn secondary functions such as PrtSc, ScrLk and Pause are intentionally ignored.
 *
 * License: MIT.
 */

import DeviceDiscovery from "@SignalRGB/DeviceDiscovery";

const AUTHOR = "Lucas Hochmann Rosa";
const AUTHOR_GITHUB_URL = "https://github.com/hrlucas";
const DOCUMENTATION_URL = "https://github.com/hrlucas/signalrgb-redragon-k626-plugin";
const DEVICE_NAME = "Redragon Ashe K626 ABNT2";
const VENDOR_ID = 0x258a;
const PRODUCT_ID = 0x0049;
const FORCED_MODEL_ID = 626;
const LAYOUT_KEY = "K626 Ashe ABNT2 79";
const REPORT_LENGTH = 382;
const REPORT_HEADER = [0x08, 0x0a, 0x7a, 0x01];
const RGB_DATA_LENGTH = REPORT_LENGTH - REPORT_HEADER.length;
const DEVICE_IMAGE_URL = "https://cdn.jsdelivr.net/gh/hrlucas/signalrgb-redragon-k626-plugin@main/assets/Redragon-Ashe-K626.png";

export function Name() { return DEVICE_NAME; }
export function VendorId() { return VENDOR_ID; }
export function ProductId() { return [PRODUCT_ID]; }
export function Publisher() { return AUTHOR; }
export function Documentation() { return DOCUMENTATION_URL; }
export function Size() { return [18, 5]; }
export function DeviceType() { return "keyboard"; }
export function Validate(endpoint) { return endpoint.interface === 1; }
export function ImageUrl() { return DEVICE_IMAGE_URL; }

/* global
device:readonly
console:readonly
shutdownColor:readonly
LightingMode:readonly
forcedColor:readonly
*/

export function ControllableParameters() {
	return [
		{
			property: "shutdownColor",
			group: "lighting",
			label: "Shutdown Color",
			description: "Color applied to the device when the system or SignalRGB is shutting down.",
			min: "0",
			max: "360",
			type: "color",
			default: "#000000"
		},
		{
			property: "LightingMode",
			group: "lighting",
			label: "Lighting Mode",
			description: "Canvas uses the active SignalRGB effect. Forced overrides it with a fixed color.",
			type: "combobox",
			values: ["Canvas", "Forced"],
			default: "Canvas"
		},
		{
			property: "forcedColor",
			group: "lighting",
			label: "Forced Color",
			description: "Color used when Forced Lighting Mode is enabled.",
			min: "0",
			max: "360",
			type: "color",
			default: "#009bde"
		},
	];
}

export function Initialize() {
	K626.Initialize();
}

export function Render() {
	K626.sendColors();
}

export function Shutdown(systemSuspending) {
	const color = systemSuspending ? "#000000" : shutdownColor;
	K626.sendColors(color);
}

class RedragonAsheK626Protocol {
	constructor() {
		this.Config = {
			DeviceProductID: 0x0000,
			DeviceName: DEVICE_NAME,
			DeviceEndpoint: { interface: 1, usage: 0x0001, usage_page: 0xFF00, collection: 0x0005 },
			ModelID: FORCED_MODEL_ID,
			LedNames: [],
			LedPositions: [],
			Leds: [],
		};
	}

	Initialize() {
		this.Config.DeviceProductID = device.productId();

		const DeviceProperties = K626DeviceLibrary.LEDLibrary[FORCED_MODEL_ID];

		if (!DeviceProperties) {
			device.notify("Unknown device", "Redragon Ashe K626 layout was not found in this plugin.", 1);
			console.log("Model not found in library!");
			console.log("Unknown protocol for " + FORCED_MODEL_ID);

			DeviceDiscovery.foundVirtualDevice({
				type: "keyboard",
				name: DEVICE_NAME,
				supported: false,
				vendorId: VENDOR_ID
			});

			return;
		}

		const layout = K626DeviceLibrary.LEDLayout[DeviceProperties.layout];

		this.Config.ModelID = FORCED_MODEL_ID;
		this.Config.DeviceName = DeviceProperties.name;
		this.Config.LedNames = layout.vLedNames;
		this.Config.LedPositions = layout.vLedPositions;
		this.Config.Leds = layout.vLeds;

		device.log("Device model found: " + this.Config.DeviceName);
		device.log("Plugin author: " + AUTHOR + " - " + AUTHOR_GITHUB_URL);
		device.log("Plugin documentation: " + DOCUMENTATION_URL);
		device.setName(this.Config.DeviceName);
		device.setSize(layout.size);
		device.setControllableLeds(this.Config.LedNames, this.Config.LedPositions);
		device.setImageFromUrl(DeviceProperties.image);
	}

	sendColors(overrideColor) {
		if (!this.Config.ModelID) {
			return;
		}

		const rgbData = new Array(RGB_DATA_LENGTH).fill(0);

		for (let i = 0; i < this.Config.Leds.length; i++) {
			const [x, y] = this.Config.LedPositions[i];
			const ledIndex = this.Config.Leds[i];

			let color;

			if (overrideColor) {
				color = hexToRgb(overrideColor);
			} else if (LightingMode === "Forced") {
				color = hexToRgb(forcedColor);
			} else {
				color = device.color(x, y);
			}

			rgbData[(ledIndex * 3)] = color[0];
			rgbData[(ledIndex * 3) + 1] = color[1];
			rgbData[(ledIndex * 3) + 2] = color[2];
		}

		this.writeRGBPackage(rgbData);
	}

	writeRGBPackage(data) {
		const packet = REPORT_HEADER.concat(data);

		device.send_report(packet, REPORT_LENGTH);
		device.pause(1);
	}
}

class DeviceLibrary {
	constructor() {
		this.LEDLibrary = {
			[FORCED_MODEL_ID]: {
				name: DEVICE_NAME,
				image: DEVICE_IMAGE_URL,
				layout: LAYOUT_KEY
			}
		};

		this.LEDLayout = {
			[LAYOUT_KEY]: {
				// Physical ABNT2 LED map by Lucas Hochmann Rosa.
				// 79 LED entries: 17 + 17 + 16 + 17 + 12.
				// Enter ABNT2 is a single LED shared visually between rows 2 and 3.
				vLedNames: [
					"Esc", "1 !", "2 @", "3 #", "4 $", "5 %", "6 ¨", "7 &", "8 *", "9 (", "0 )", "-_", "=+", "Backspace", "NumLock", "Num +", "Num -",
					"Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "´ `", "[ {", "Enter", "Num 7", "Num 8", "Num 9",
					"CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Ç", "~ ^", "] }", "Num 4", "Num 5", "Num 6",
					"Left Shift", "\\ |", "Z", "X", "C", "V", "B", "N", "M", ", <", ". >", "; :", "/ ?", "Up Arrow", "Num 1", "Num 2", "Num 3",
					"Left Ctrl", "Left Win", "Left Alt", "Space", "Right Alt", "Fn", "Right Ctrl", "Left Arrow", "Down Arrow", "Right Arrow", "Num 0", "Num . Del"
				],

				// Physical LED indexes used by the Sinowealth protocol.
				vLeds: [
					1, 7, 13, 19, 25, 31, 37, 43, 49, 55, 61, 67, 73, 79, 85, 91, 97,
					2, 8, 14, 20, 26, 32, 38, 44, 50, 56, 62, 68, 74, 81, 86, 92, 98,
					3, 9, 15, 21, 27, 33, 39, 45, 51, 57, 63, 69, 75, 87, 93, 99,
					4, 70, 10, 16, 22, 28, 34, 40, 46, 52, 58, 64, 76, 82, 88, 94, 100,
					5, 11, 17, 35, 53, 59, 65, 77, 83, 89, 95, 101
				],

				// Visual positions in SignalRGB's canvas.
				vLedPositions: [
					[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0], [13, 0], [14, 0], [15, 0], [16, 0],
					[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [13, 1], [14, 1], [15, 1], [16, 1],
					[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2], [14, 2], [15, 2], [16, 2],
					[0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3], [13, 3], [14, 3], [15, 3], [16, 3],
					[0, 4], [1, 4], [2, 4], [6, 4], [10, 4], [11, 4], [12, 4], [13, 4], [14, 4], [15, 4], [16, 4], [17, 4]
				],

				size: [18, 5],
			}
		};
	}
}

const K626DeviceLibrary = new DeviceLibrary();
const K626 = new RedragonAsheK626Protocol();

function hexToRgb(hex) {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

	if (!result) {
		return [0, 0, 0];
	}

	return [
		parseInt(result[1], 16),
		parseInt(result[2], 16),
		parseInt(result[3], 16)
	];
}
