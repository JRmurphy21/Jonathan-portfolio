/** ---------- Config ---------- */
const CONTACT_EMAIL = "murphy2136@gmail.com"; // used for "Request demo" mailto
const PLACEHOLDER_IMG = "placeholder.png";    // fallback thumbnail

/** ---------- Data ---------- */
const projects = [
  {
    name: "Switchboard (Dispatch App)",
    blurb: "Dispatcher → crew comms with push/SMS and tap-to-route links.",
    impact: "Reduces navigation errors and improves routing.",
    stack: ["React","React Native","FastAPI","FCM/Telnyx"],
    status: "PWA live internally — demo on request",
    thumb: "switchboard.jpeg",
    demo: null,
    repo: null
  },
  {
    name: "MediCheck",
    blurb: "Drug & equipment compliance with expiration tracking and PDF exports.",
    impact: "Streamlined vehicle inspections and compliance checks.",
    stack: ["React","FastAPI","PostgreSQL"],
    status: "Ready; pending MDM rollout",
    thumb: "medicheck.png",
    demo: null,
    repo: null
  },
  {
    name: "Availability Calendar",
    blurb: "Collect monthly availability with admin dashboard & export.",
    impact: "Cut scheduling time dramatically.",
    stack: ["React","FastAPI","PostgreSQL"],
    status: "Live",
    thumb: "availability.png",
    demo: null,
    repo: null
  },
];

/** ---------- Helpers ---------- */
const $ = (sel, root=document) => root.querySelector(sel);

function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (v == null) continue;
    if (k === "class") node.className = v;
    else if (k in node) node[k] = v;
    else node.setAttribute(k, v);
  }
  for (const c of children) {
    if (c == null) continue;
    node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  }
  return node;
}

function chip(label) {
  return el("span", { class: "badge", role: "listitem" }, label);
}

function mailtoFor(p) {
  const subject = encodeURIComponent(`Portfolio demo request — ${p.name}`);
  const body = encodeURIComponent(`Hi Jonathan,\n\nCould I see a demo of "${p.name}"?\n\nThanks!`);
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

function ctaGroup(p) {
  const group = el("div", { class: "cta" });
  if (p.demo) {
    group.appendChild(el("a", { href: p.demo, target: "_blank", rel: "noopener", class: "btn" }, "Live demo"));
  } else {
    group.appendChild(el("a", { href: mailtoFor(p), class: "btn ghost" }, "Request demo"));
  }
  if (p.repo) {
    group.appendChild(el("a", { href: p.repo, target: "_blank", rel: "noopener", class: "btn secondary" }, "View code"));
  }
  return group;
}

function normalizeThumb(src) {
  if (!src) return PLACEHOLDER_IMG;
  // If it looks like a relative filename, keep it; otherwise allow full/absolute paths.
  return /^(https?:)?\//.test(src) ? src : src;
}

/** ---------- Sort: Live → In use → Ready → Private/other ---------- */
const STATUS_RANK = [
  /^live$/i,
  /^in use/i,
  /^ready/i,
  /^pwa live/i,
  /^private/i
];
function statusScore(s="") {
  const i = STATUS_RANK.findIndex(rx => rx.test(s));
  return i === -1 ? STATUS_RANK.length : i;
}

/** ---------- Render ---------- */
(function render() {
  const grid = $("#project-grid");
  if (!grid) return;

  const frag = document.createDocumentFragment();

  projects
    .slice()
    .sort((a, b) => statusScore(a.status) - statusScore(b.status) || a.name.localeCompare(b.name))
    .forEach((p) => {
      const card = el("article", { class: "card", role: "region", "aria-label": p.name });

      // Thumbnail (safe; lazy; fallback)
      const thumb = el("div", { class: "thumb" });
      const img = el("img", {
        src: normalizeThumb(p.thumb),
        alt: `${p.name} screenshot`,
        loading: "lazy",
        decoding: "async"
      });
      img.addEventListener("error", () => { img.src = PLACEHOLDER_IMG; });
      thumb.appendChild(img);

      // Body
      const header = el("header", { class: "card-head" }, el("h3", {}, p.name));
      const meta = el("dl", { class: "meta" },
        el("dt", {}, "What it does"),
        el("dd", {}, p.blurb),
        el("dt", {}, "Impact"),
        el("dd", {}, p.impact),
        el("dt", {}, "Status"),
        el("dd", {}, p.status)
      );
      const tech = el("div", { class: "badges", role: "list", "aria-label": "Tech stack" }, ...p.stack.map(chip));

      const body = el("div", { class: "inner" }, header, meta, tech, ctaGroup(p));
      card.append(thumb, body);
      frag.appendChild(card);
    });

  grid.textContent = "";
  grid.appendChild(frag);

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
