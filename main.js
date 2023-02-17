import "./style.css";
import * as videos from "./videos.json";

// The video directory varies depending on if
// we're running in a normal browser or a BrightSign
// since the Brightsign requires a flat file structure.
const videoDir = Object.prototype.hasOwnProperty.call(
  import.meta.env,
  "VITE_VIDEO_DIR"
)
  ? import.meta.env.VITE_VIDEO_DIR
  : "videos";

// Screensaver settings.
const screensaver = "_idle.mp4";
const screensaverTimeSeconds = 5;

// Run the app on load.
document.addEventListener("DOMContentLoaded", () => {
  window.focus();

  const videoEl = document.getElementById("app");
  let buffer = [];

  // Play the screensaver.
  const showScreensaver = () => {
    videoEl.setAttribute("src", screensaver);
    videoEl.loop = true;
    videoEl.play();
  };

  // Play the selected video.
  const playVideo = (file) => {
    buffer = [];

    if (videos.default.includes(file)) {
      videoEl.setAttribute("src", `${videoDir}/${file}`);
      videoEl.loop = false;
      videoEl.play();
      videoEl.onended = () => {
        setTimeout(showScreensaver, 1000 * screensaverTimeSeconds);
      };
      console.log(`Playing ${file}`);
    } else {
      console.warn(`Invalid video code: ${file}`);
    }
  };

  // Capture scanner input and trigger the video.
  const activate = () => {
    setTimeout(() => {
      if (buffer.length) {
        playVideo(buffer.join(""));
        buffer = [];
      }
    }, 200);
  };

  // Watch for input from the scanner.
  const ignoreKeys = ["Shift", "Enter", "Tab"];
  document.addEventListener("keydown", (e) => {
    if (!ignoreKeys.includes(e.key)) {
      buffer.push(e.key);
      activate();
    }
  });
});
