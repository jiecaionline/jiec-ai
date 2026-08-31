const projects = {
  "credit-sesame": {
    title: "Credit Sesame New User Adoption Prediction",
    lede: "Duke University Datathon, 2018",
    html: `<p>I lead a team of 3 to analyze and predict Credit Sesame's product adoption for new users 30 days within signing up. Won <em>1st place</em> out of 43 teams in Duke Datathon 2018🏆.</p>
      <p>We built a Python Scikit-Learn random forest classifier to predict product adoption probabilities for new users (AUC ROC 0.71), used the model's feature importances to construct a Tableau dashboard visualizing differences between adopters vs non-adopters, and presented a holistic analysis + prediction model using the above.</p>`,
    images: [],
    links: [{ href: "https://github.com/jiecai1997/duke-datathon-2018-team-22", label: "Github" }],
  },
  "robinhood-whm": {
    title: "Robinhood Women Investors, Data-Driven Publications",
    lede: "Robinhood Women's History Month, 2021",
    html: `<p>I created data narratives for articles published during Robinhood's 2021 Women's History Month, focusing on the growth and financial empowerment of Robinhood's women customers. These articles received media coverage from news outlets such as Bloomberg.</p>
      <p>I worked cross-functionally with communications, legal and business operation teams to construct narratives, gather data points and review writing to ensure quality content.</p>
      <div class="callout">The number of women Robinhood customers nearly quadrupled between February 2020 and February 2021. In other words, that is a 369 percent year-over-year increase in women using the Robinhood platform, and now women make up nearly 30 percent of active Robinhood customers.</div>`,
    images: [],
    links: [
      { href: "https://robinhood.com/us/en/newsroom/lets-talk-about-women-and-investing/", label: "Women and Investing" },
      { href: "https://robinhood.com/us/en/newsroom/growing-the-number-of-women-in-crypto/", label: "Women in Crypto" },
    ],
  },
  "ye-nlp": {
    title: "Ye-NLP, NLP Powered Yelp Reviews",
    lede: "Yelp Dataset Challenge, 2018",
    html: `<p>A few peers and I developed a Flask web-app that uses NLP to generate sentiment based ratings for existing Yelp reviews and custom user-input text.</p>
      <p>Ye-NLP includes category-specific ratings broken down by food, ambiance, price and service. The ratings are applied both to real restaurant reviews (provided by the <a href="https://www.yelp.com/dataset" target="_blank" rel="noreferrer">Yelp Open Dataset</a>), as well as custom reviews that users can input within the web-app.</p>`,
    images: [{ src: "assets/projects/ye-nlp.png", alt: "Ye-nlp app screenshot" }],
    links: [{ href: "https://github.com/taranagar/yelp-review-challenge", label: "Github" }],
  },
  covis19: {
    title: "COVIS-19, COVID-19 Interactive Dashboard",
    lede: "Duke University ASA Datafest, 2020",
    html: `<p>I created an interactive data visualization web-app that allows users to explore the health and financial effects of COVID-19 in the US throughout 2020. My project won <em>Best Interactive Dashboard</em> at Duke University ASA Datafest 2020 (virtual)🏆. The web-app is built in Python, using <a href="https://plotly.com/dash/" target="_blank" rel="noreferrer">Dash by Plotly</a>.</p>`,
    images: [
      { src: "assets/projects/covis19-health.png", alt: "COVIS19 health dashboard" },
      { src: "assets/projects/covis19-finance.png", alt: "COVIS19 finance dashboard" },
    ],
    links: [{ href: "https://github.com/jiecai1997/covis19", label: "Github" }],
  },
  "great-pretender": {
    title: "Great Pretender Cats Painting",
    lede: "Oil on Canvas, 2020",
    html: `<p>I painted 3 cats from the ending credits of <a href="https://en.wikipedia.org/wiki/Great_Pretender_(TV_series)" target="_blank" rel="noreferrer">Great Pretender</a>, a Japanese comedy/crime anime series. The painting was gifted as a present, and won some wine + amazon gift card awards within Robinhood data team's art competition.</p>`,
    images: [{ src: "assets/projects/cats.jpg", alt: "Great Pretender cats oil painting" }],
    links: [],
  },
  peaches: {
    title: "Peaches the Calico Cat NFTs",
    lede: "Photography + Digital Art NFTs, 2022",
    html: `<p>Peaches was one of Duke University’s calico cats and campus icons. Unfortunately, she was fatally struck by a car on Aug 17, 2022. I created this collection for a good cause in her honor.</p>
      <p>Peaches the Calico Cat collection contains 40 NFTs based on photos I’ve captured of Peaches over my college years. I was blessed to live nearby Peaches’ favorite spot on campus. I’d give her plenty of pets and cuddles whenever I saw her around — she has even ventured into my dorm room a few times!</p>
      <p>All proceeds from sales (including 5% creator fees, excluding 2.5% platform fee and variable gas fees) were donated to a combination of Peaches’ memorial fund, Mamabean’s (another Duke resident cat) wellness fund, and individual animal shelters. Overall, the project raised $600+ dollars!</p>`,
    images: [{ src: "assets/projects/peaches.png", alt: "Peaches the Calico Cat NFT collection" }],
    links: [{ href: "https://opensea.io/collection/peaches-the-calico-cat?search[sortAscending]=true&search[sortBy]=CREATED_DATE", label: "Collection" }],
  },
  "bull-city": {
    title: "Bull City Community Garden Logo",
    lede: "Digital Vector, 2020",
    html: `<p>I designed a logo for Bull City Community Garden (collaboration between Sustainable Duke and the city of Durham, NC). The logo incorporates Durham's iconic "Bull City" hand gesture. The logo was first drawn on my iPad using Procreate, then translated into a vector using Adobe Illustrator.</p>
      <p>The logo is featured on Bull City Community Garden's <a href="https://X.com/bullcitygarden" target="_blank" rel="noreferrer">X</a> account page.</p>`,
    images: [
      { src: "assets/projects/bull-city-black.jpg", alt: "Bull City Community Garden logo, black" },
      { src: "assets/projects/bull-city-green.jpg", alt: "Bull City Community Garden logo, green" },
    ],
    links: [{ href: "https://X.com/bullcitygarden", label: "X" }],
  },
};

const modal = document.getElementById("project-modal");
const titleEl = document.getElementById("modal-title");
const ledeEl = document.getElementById("modal-lede");
const proseEl = document.getElementById("modal-prose");
const galleryEl = document.getElementById("modal-gallery");
const linksEl = document.getElementById("modal-links");
const panelEl = modal.querySelector(".modal-panel");
const closeBtn = modal.querySelector(".modal-close");
const prevBtn = modal.querySelector(".modal-nav.prev");
const nextBtn = modal.querySelector(".modal-nav.next");
const projectOrder = [...document.querySelectorAll("[data-project]")].map((el) => el.dataset.project);
let currentIndex = 0;

function renderLinks(project) {
  if (!project.links.length) {
    linksEl.hidden = true;
    linksEl.innerHTML = "";
    return;
  }

  const items = project.links
    .map((link) => `<a href="${link.href}" target="_blank" rel="noreferrer">${link.label}</a>`)
    .join(", ");
  linksEl.innerHTML = `🔗 ${items}`;
  linksEl.hidden = false;
}

function showProject(id) {
  const project = projects[id];
  if (!project) return;

  const index = projectOrder.indexOf(id);
  if (index >= 0) currentIndex = index;

  titleEl.textContent = project.title;
  ledeEl.textContent = project.lede;
  renderLinks(project);
  proseEl.innerHTML = project.html;
  galleryEl.innerHTML = project.images
    .map((img) => `<img src="${img.src}" alt="${img.alt}">`)
    .join("");
  panelEl.scrollTop = 0;
}

function openProject(id) {
  showProject(id);
  modal.hidden = false;
  modal.classList.add("is-open");
  document.body.classList.add("modal-open");
  closeBtn.focus();
}

function stepProject(delta) {
  const next = (currentIndex + delta + projectOrder.length) % projectOrder.length;
  showProject(projectOrder[next]);
}

function closeModal() {
  modal.hidden = true;
  modal.classList.remove("is-open");
  document.body.classList.remove("modal-open");
}

function captionLineWidth(el) {
  const style = getComputedStyle(el);
  const canvas = captionLineWidth.canvas || (captionLineWidth.canvas = document.createElement("canvas"));
  const context = canvas.getContext("2d");
  context.font = style.font;

  const text = el.textContent.trim();
  const letterSpacing = parseFloat(style.letterSpacing) || 0;
  return Math.ceil(context.measureText(text).width + Math.max(0, text.length - 1) * letterSpacing);
}

function maxCaptionWidth() {
  return Math.max(
    0,
    ...[...document.querySelectorAll("#projects .tile-title, #projects .tile-sub")].map(captionLineWidth)
  );
}

function fitRailColumns() {
  const page = document.querySelector(".wrap");
  if (!page) return;
  const gap = parseFloat(getComputedStyle(page).getPropertyValue("--rail-gap")) || 12;
  const width = page.getBoundingClientRect().width;
  const needed = maxCaptionWidth();
  let cols = 2;
  for (const candidate of [4, 3, 2]) {
    const tile = (width - (candidate - 1) * gap) / candidate;
    if (tile >= needed || candidate === 2) {
      cols = candidate;
      break;
    }
  }
  page.style.setProperty("--rail-cols", String(cols));
}

function setupRails() {
  const page = document.querySelector(".wrap");
  const controllers = [];

  document.querySelectorAll(".rail-wrap").forEach((wrap) => {
    const rail = wrap.querySelector(".rail");
    const prev = wrap.querySelector(".rail-btn.prev");
    const next = wrap.querySelector(".rail-btn.next");

    function step() {
      const first = rail.querySelector(".tile");
      const gap = parseFloat(getComputedStyle(rail).gap) || 12;
      return first ? first.getBoundingClientRect().width + gap : rail.clientWidth;
    }

    function update() {
      const max = rail.scrollWidth - rail.clientWidth;
      const canLeft = rail.scrollLeft > 2;
      const canRight = rail.scrollLeft < max - 2;
      wrap.classList.toggle("can-left", canLeft);
      wrap.classList.toggle("can-right", canRight);
      prev.hidden = !canLeft;
      next.hidden = !canRight;
    }

    function snapToTile() {
      const size = step();
      if (!size) return;
      const index = Math.round(rail.scrollLeft / size);
      rail.scrollTo({ left: index * size });
      update();
    }

    prev.addEventListener("click", () => {
      rail.scrollBy({ left: -step(), behavior: "smooth" });
    });
    next.addEventListener("click", () => {
      rail.scrollBy({ left: step(), behavior: "smooth" });
    });
    rail.addEventListener("scroll", update, { passive: true });
    controllers.push({ snapToTile, update });
    update();
  });

  function relayout() {
    fitRailColumns();
    controllers.forEach((controller) => controller.snapToTile());
  }

  let resizeFrame = 0;
  function onResize() {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(relayout);
  }

  window.addEventListener("resize", onResize);
  if (typeof ResizeObserver !== "undefined" && page) {
    new ResizeObserver(onResize).observe(page);
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(relayout);
  } else {
    relayout();
  }
}

document.querySelectorAll("[data-project]").forEach((tile) => {
  tile.addEventListener("click", () => openProject(tile.dataset.project));
});

setupRails();

modal.querySelectorAll("[data-close]").forEach((el) => {
  el.addEventListener("click", closeModal);
});

prevBtn.addEventListener("click", () => stepProject(-1));
nextBtn.addEventListener("click", () => stepProject(1));

document.addEventListener("keydown", (event) => {
  if (!modal.classList.contains("is-open")) return;
  if (event.key === "Escape") closeModal();
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    stepProject(-1);
  }
  if (event.key === "ArrowRight") {
    event.preventDefault();
    stepProject(1);
  }
});
