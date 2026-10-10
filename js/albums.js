// Spotify album embeds via the official iFrame API.
// Full-length playback requires the visitor to be logged into Spotify Premium
// in their browser (album and track embeds share that rule).
const spotifyAlbumIds = Object.freeze([
  "3qGInqGfOePTekb0y7AZ4s", // ADÉLA — Ain't In LA
  "6WlGOgNNtpwFt2gfRFfqgZ", // Victoria Monét — JAGUAR II
  "5861K3sQgAwu1sswhe5Gw8", // SG Lewis — AudioLust & HigherLove
  "1HMLpmZAnNyl9pxvOnTovV", // NewJeans — NewJeans 1st EP 'New Jeans'
  "2FwpEC226o3WpXoptGbk85", // MAX — Colour Vision
  "2IAVHJdaRPFA6MQqXHoG75", // Gryffin — Gravity
  "7iwGw8ob3YLqZrbKzGFnHi", // 6LACK — FREE 6LACK
  "09mWpzpUOSjjvK2iNqEIYn", // Olly Alexander (Years & Years) — Communion (Deluxe)
  "1QhonXpNQq8wrGEKX0ofbk", // WALK THE MOON — Walk The Moon
  "1jpUMnKpRlng1OJN7LJauV", // Lady Gaga — The Fame
  "1Gi6ij4Jxc4qE35i3I0gqS", // XG — SHOOTING STAR
  "5EYKrEDnKhhcNxGedaRQeK", // Ariana Grande — eternal sunshine
  "4NZWRpoMuXaHU7csTjWdB5", // Flume — Skin
  "22MbdINYz4lQ1Y087qG7YO", // AlunaGeorge — Body Music
  "392p3shh2jkxUxY2VHvlH8", // Frank Ocean — channel ORANGE
  "08ipn1MH7xqgoqhUbtvCTy", // Disclosure — Caracal (Deluxe)
  "46jYkyZi8Ql9jfuJ2IQ8vF", // thủy — wings
  "2gwNU1WsZEOcCSyKHsXKs5", // SG Lewis — Dusk
  "1nAQbHeOWTfQzbOoFrvndW", // Doja Cat — Planet Her
  "0fAfTDRDjfWjs4YryqQARn", // Bella Poarch — Stay Gone
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

function albumEntity(index) {
  const id = spotifyAlbumIds[index];
  return `https://open.spotify.com/album/${id}?theme=0`;
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
  if (typeof embedController.loadEntity === "function") {
    embedController.loadEntity(albumEntity(currentAlbumIndex));
  } else {
    embedController.loadUri(`spotify:album:${spotifyAlbumIds[currentAlbumIndex]}`);
  }
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
      url: albumEntity(currentAlbumIndex),
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
