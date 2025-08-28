/** ---------- Data ---------- */
const projects = [
  {
    name: "Schedule Generator",
    blurb: "Constraint-based EMS scheduling (roles, rest windows, ≤3 consecutive days).",
    impact: "Replaces $6k–$12k/yr SaaS",
    stack: ["Python","FastAPI","PostgreSQL"],
    status: "Private demo — screenshots only",
    thumb: "schedule-generator.png",          // optional
    demo: null,                               // or "https://…" if public
    repo: null                                // or "https://…" if public
  },
  {
    name: "Switchboard (Dispatch App)",
    blurb: "Dispatcher → crew comms with push/SMS and tap-to-route links.",
    impact: "Replaces enterprise dispatch tooling",
    stack: ["React","React Native","FastAPI","FCM/Telnyx"],
    status: "PWA live internally — demo on request",
    thumb: "dispatch_app.png",
    demo: null,
    repo: null
  },
  {
    name: "MediCheck",
    blurb: "Drug & equipment compliance with expiration tracking and PDF exports.",
    impact: "Avoids SafetyCulture licenses ($12k+/yr)",
    stack: ["React","FastAPI","PostgreSQL"],
    status: "Ready; pending MDM rollout",
    thumb: "medicheck.png",
    demo: null,
    repo: null
  },
  {
    name: "Inventory Tracker",
    blurb: "Barcode-driven supply adds/removals with expiration verification.",
    impact: "Fewer stockouts; real-time visibility",
    stack: ["React","FastAPI","PostgreSQL"],
    status: "In use internally",
    thumb: "inventory.png",
    demo: null,
    repo: null
  },
  {
    name: "Availability Calendar",
    blurb: "Collect monthly availability with admin dashboard & export.",
    impact: "Cuts scheduling time dramatically",
    stack: ["React","FastAPI","PostgreSQL"],
    status: "Live",
    thumb: "availability.png",
    demo: null,
    repo: null
  },
  {
    name: "Supervisor Inspections",
    blurb: "As-needed equipment/med supply inspections; pass/fail + notes.",
    impact: "Improves accountability & audit trails",
    stack: ["React","FastAPI","PostgreSQL"],
    status: "Live",
    thumb: "inspections.png",
    demo: null,
    repo: null
  }
];

/** ---------- Helpers ---------- */
const $ = (sel, root=document) => root.querySelector(sel);

function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  Object.entries(props).forEach(([k, v]) => {
    if (v == null) return;
    if (k === "class") node.className = v;
    else if (k in node) node[k] = v;
    else node.setAttribute(k, v);
  });
  for (const c of children) {
    if (c == null) continue;
    node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  }
  return node;
}

function chip(label) {
  return el("span", { class: "badge", role: "listitem" }, label);
}

function ctaGroup(p) {
  const group = el("div", { class: "cta" });
  const hasDemo = !!p.demo;
  const hasRepo = !!p.repo;

  if (hasDemo) {
    group.appendChild(el("a", { href: p.demo, target: "_blank", rel: "noopener", class: "btn" }, "Live demo"));
  } else {
    group.appendChild(
      el("button", { type: "button", class: "btn ghost", "aria-disabled": "true", title: "Private – request access" }, "Request demo")
    );
  }

  if (hasRepo) {
    group.appendChild(el("a", { href: p.repo, target: "_blank", rel: "noopener", class: "btn secondary" }, "View code"));
  }

  return group;
}

/** ---------- Render ---------- */
const grid = $("#project-grid");
const frag = document.createDocumentFragment();

projects.forEach((p) => {
  const card = el("article", { class: "card", role: "region", "aria-label": p.name });

  // Thumbnail (safe element creation; no innerHTML)
  const thumb = el("div", { class: "thumb" });
  const img = el("img", {
    src: p.thumb || "placeholder.png",
    alt: `${p.name} screenshot`,
    loading: "lazy",
    decoding: "async"
  });
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

grid.textContent = ""; // clear if re-rendering
grid.appendChild(frag);

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
