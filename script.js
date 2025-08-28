const projects = [
  {
    name: "Schedule Generator",
    blurb: "Constraint-based EMS scheduling (roles, rest windows, ≤3 consecutive days).",
    impact: "Replaces $6k–$12k/yr SaaS",
    stack: ["Python","FastAPI","PostgreSQL"],
    link: "#",
    status: "Private demo — screenshots only"
  },
  {
    name: "Switchboard (Dispatch App)",
    blurb: "Dispatcher → crew comms with push/SMS and tap-to-route links.",
    impact: "Replaces enterprise dispatch tooling",
    stack: ["React","React Native","FastAPI","FCM/Telnyx"],
    link: "#",
    status: "PWA live internally — demo on request"
  },
  {
    name: "MediCheck",
    blurb: "Drug & equipment compliance with expiration tracking and PDF exports.",
    impact: "Avoids SafetyCulture licenses ($12k+/yr)",
    stack: ["React","FastAPI","PostgreSQL"],
    link: "#",
    status: "Ready; pending MDM rollout"
  },
  {
    name: "Inventory Tracker",
    blurb: "Barcode-driven supply adds/removals with expiration verification.",
    impact: "Fewer stockouts; real-time visibility",
    stack: ["React","FastAPI","PostgreSQL"],
    link: "#",
    status: "In use internally"
  },
  {
    name: "Availability Calendar",
    blurb: "Collect monthly availability with admin dashboard & export.",
    impact: "Cuts scheduling time dramatically",
    stack: ["React","FastAPI","PostgreSQL"],
    link: "#",
    status: "Live"
  },
  {
    name: "Supervisor Inspections",
    blurb: "As‑needed equipment/med supply inspections; pass/fail + notes.",
    impact: "Improves accountability & audit trails",
    stack: ["React","FastAPI","PostgreSQL"],
    link: "#",
    status: "Live"
  }
];

function badge(label){ const span=document.createElement('span'); span.className='badge'; span.textContent=label; return span; }

const grid = document.getElementById('project-grid');
projects.forEach(p => {
  const card = document.createElement('article');
  card.className = 'card';
  const thumb = document.createElement('div');
  thumb.className = 'thumb';
  thumb.textContent = "<div class="thumb"><img src="Dispatch_App.png" alt="Switchboard screenshot" style="width:100%;height:100%;object-fit:cover"></div>";
  const inner = document.createElement('div');
  inner.className = 'inner';
  const h4 = document.createElement('h4'); h4.textContent = p.name;
  const p1 = document.createElement('p'); p1.textContent = p.blurb;
  const p2 = document.createElement('p'); p2.textContent = p.impact;
  const p3 = document.createElement('p'); p3.textContent = p.status;
  const chips = document.createElement('div'); chips.className='badges'; p.stack.forEach(s => chips.appendChild(badge(s)));
  inner.append(h4,p1,p2,p3,chips);
  const a = document.createElement('a'); a.href = p.link; a.target = "_blank"; a.rel="noopener"; a.textContent = p.link==="#" ? "Request demo" : "View project";
  inner.appendChild(a);
  card.append(thumb, inner);
  grid.appendChild(card);
});

document.getElementById('year').textContent = new Date().getFullYear();
