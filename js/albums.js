const spotifyAlbumIds = Object.freeze([
  "3qGInqGfOePTekb0y7AZ4s",
  "6WlGOgNNtpwFt2gfRFfqgZ",
  "5861K3sQgAwu1sswhe5Gw8",
  "1HMLpmZAnNyl9pxvOnTovV",
  "2FwpEC226o3WpXoptGbk85",
  "2IAVHJdaRPFA6MQqXHoG75",
  "7iwGw8ob3YLqZrbKzGFnHi",
  "09mWpzpUOSjjvK2iNqEIYn",
  "1QhonXpNQq8wrGEKX0ofbk",
  "1jpUMnKpRlng1OJN7LJauV",
  "1Gi6ij4Jxc4qE35i3I0gqS",
  "5EYKrEDnKhhcNxGedaRQeK",
  "4NZWRpoMuXaHU7csTjWdB5",
  "22MbdINYz4lQ1Y087qG7YO",
  "392p3shh2jkxUxY2VHvlH8",
  "08ipn1MH7xqgoqhUbtvCTy",
  "46jYkyZi8Ql9jfuJ2IQ8vF",
  "2gwNU1WsZEOcCSyKHsXKs5",
  "1nAQbHeOWTfQzbOoFrvndW",
  "0fAfTDRDjfWjs4YryqQARn",
  "3rhOyuUoF8cpN1vPumdBSm"
]);

const EMBED_HEIGHT = 152;
const SPIN_DURATION_MS = 8000;

const albumEmbed = document.querySelector("#album-embed");
const surpriseButton = document.querySelector("#surprise-album");
const surpriseDisc = document.querySelector(".surprise-disc");

let embedController = null;
let currentAlbumIndex = -1;
let isPlaying = false;
let discAnimation = null;
let discRotationDeg = 0;

function nextRandomIndex() {
  if (spotifyAlbumIds.length < 2) return 0;
  const offset = 1 + Math.floor(Math.random() * (spotifyAlbumIds.length - 1));
  return (currentAlbumIndex + offset) % spotifyAlbumIds.length;
}

function albumUri(index) {
  return `spotify:album:${spotifyAlbumIds[index]}`;
}

function rotationFromTransform(transform) {
  if (!transform || transform === "none") return 0;
  const match = transform.match(/^matrix\((.+)\)$/);
  if (!match) return discRotationDeg;
  const [a, b] = match[1].split(",").map((v) => Number(v.trim()));
  return (Math.atan2(b, a) * 180) / Math.PI;
}

function captureDiscRotation() {
  if (!surpriseDisc) return discRotationDeg;
  discRotationDeg = rotationFromTransform(getComputedStyle(surpriseDisc).transform);
  return discRotationDeg;
}

function stopDiscSpin() {
  captureDiscRotation();
  if (discAnimation) {
    discAnimation.cancel();
    discAnimation = null;
  }
  if (!surpriseDisc) return;
  surpriseDisc.style.transform = `rotate(${discRotationDeg}deg)`;
}

function startDiscSpin() {
  if (!surpriseDisc || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  captureDiscRotation();
  if (discAnimation) {
    discAnimation.cancel();
    discAnimation = null;
  }

  surpriseDisc.style.transform = `rotate(${discRotationDeg}deg)`;
  discAnimation = surpriseDisc.animate(
    [
      { transform: `rotate(${discRotationDeg}deg)` },
      { transform: `rotate(${discRotationDeg + 360}deg)` },
    ],
    {
      duration: SPIN_DURATION_MS,
      iterations: Infinity,
      easing: "linear",
    }
  );
}

function setPlaying(nextPlaying) {
  const next = Boolean(nextPlaying);
  if (next === isPlaying) return;

  if (next) startDiscSpin();
  else stopDiscSpin();

  isPlaying = next;
  albumEmbed?.classList.toggle("is-playing", next);
}

function showRandomAlbum() {
  if (!embedController || spotifyAlbumIds.length === 0) return;

  setPlaying(false);
  currentAlbumIndex = nextRandomIndex();
  embedController.loadUri(albumUri(currentAlbumIndex));
}

function bindEmbedController(controller) {
  embedController = controller;

  controller.addListener("playback_update", (event) => {
    setPlaying(!event.data.isPaused);
  });

  controller.addListener("playback_started", () => {
    setPlaying(true);
  });
}

function initSpotifyEmbed(IFrameAPI) {
  if (!albumEmbed || spotifyAlbumIds.length === 0) return;

  currentAlbumIndex = nextRandomIndex();
  const host = document.createElement("div");
  albumEmbed.replaceChildren(host);

  IFrameAPI.createController(
    host,
    {
      uri: albumUri(currentAlbumIndex),
      width: "100%",
      height: EMBED_HEIGHT,
    },
    bindEmbedController
  );
}

surpriseButton?.addEventListener("click", () => showRandomAlbum());

window.onSpotifyIframeApiReady = initSpotifyEmbed;

const spotifyApiScript = document.createElement("script");
spotifyApiScript.src = "https://open.spotify.com/embed/iframe-api/v1";
spotifyApiScript.async = true;
document.body.appendChild(spotifyApiScript);
