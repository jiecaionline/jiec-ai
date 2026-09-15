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

const albumEmbed = document.querySelector("#album-embed");
const surpriseButton = document.querySelector("#surprise-album");
let currentAlbumIndex = -1;

function nextRandomIndex() {
  if (spotifyAlbumIds.length < 2) return 0;
  const offset = 1 + Math.floor(Math.random() * (spotifyAlbumIds.length - 1));
  return (currentAlbumIndex + offset) % spotifyAlbumIds.length;
}

function showRandomAlbum(animate = true) {
  if (!albumEmbed || spotifyAlbumIds.length === 0) return;

  currentAlbumIndex = nextRandomIndex();
  const iframe = document.createElement("iframe");
  iframe.src = `https://open.spotify.com/embed/album/${spotifyAlbumIds[currentAlbumIndex]}?utm_source=generator`;
  iframe.title = "Spotify album player";
  iframe.loading = "lazy";
  iframe.allowFullscreen = true;
  iframe.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
  albumEmbed.replaceChildren(iframe);

  if (animate && surpriseButton) {
    surpriseButton.classList.remove("is-refreshing");
    void surpriseButton.offsetWidth;
    surpriseButton.classList.add("is-refreshing");
  }
}

surpriseButton?.addEventListener("click", () => showRandomAlbum());
showRandomAlbum(false);
