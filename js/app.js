/* ============================================================
   AI Tools Marketplace — Just Ask AVA
   app.js — Data loaded from Google Sheets (published as CSV)
   ============================================================ */

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRS3Nr_JX47-jMQTSuz7BD8v5zMfP-qyr0EgCnCq2XJ-6qvM01mHAoEmXJ1Y1B6R4oqkYKBkjq41bbM/pub?gid=1295646484&single=true&output=csv";

/* --- STATE --- */
let allTools = [];
let currentCategory = "all";
let currentPrice = "all";

/* --- HELPERS --- */
function logoColor(cat) {
  const map = {
    assistant: "rgba(43,58,143,0.1)",
    image: "rgba(139,92,246,0.1)",
    video: "rgba(239,68,68,0.1)",
    writing: "rgba(59,130,246,0.1)",
    automation: "rgba(251,146,60,0.1)",
    coding: "rgba(34,197,94,0.1)",
    audio: "rgba(236,72,153,0.1)",
    productivity: "rgba(234,179,8,0.1)",
  };
  return map[cat] || "rgba(30,40,80,0.05)";
}

function priceClass(price) {
  if (price === "Free") return "price-free";
  if (price === "Freemium") return "price-freemium";
  return "price-paid";
}

/* --- CSV PARSER (handles commas inside quoted fields) --- */
function parseCSVRow(row) {
  const result = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < row.length; i++) {
    if (row[i] === '"') {
      inQuotes = !inQuotes;
    } else if (row[i] === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += row[i];
    }
  }
  result.push(current.trim());
  return result;
}

/* --- LOAD FROM GOOGLE SHEETS --- */
async function loadFromNotion() {
  document.getElementById("toolsGrid").innerHTML = `
    <div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--muted)">
      Loading tools...
    </div>`;

  try {
    const res = await fetch(SHEET_URL);
    const text = await res.text();
    const rows = text.trim().split("\n");
    const headers = parseCSVRow(rows[0]);

    allTools = rows
      .slice(1)
      .map((row, i) => {
        const cols = parseCSVRow(row);
        const get = (col) => cols[headers.indexOf(col)] || "";
        return {
          id: i + 1,
          name: get("Name"),
          desc: get("Description"),
          category: get("Category").toLowerCase(),
          price: get("Price"),
          priceDetail: get("Price Detail"),
          rating: parseFloat(get("Rating")) || 0,
          reviews: parseInt(get("Reviews")) || 0,
          url: get("URL"),
          logo: get("Logo"),
          tags: get("Tags").split("|").filter(Boolean),
          integrations: get("Integrations").split("|").filter(Boolean),
          uses: get("Uses").split("|").filter(Boolean),
          emoji: "🤖",
        };
      })
      .filter((t) => t.name); // remove empty rows

    // Update total count in hero stats
    const totalEl = document.getElementById("totalToolsCount");
    if (totalEl) totalEl.textContent = allTools.length;

    // Update "All Tools" count in sidebar
    const countAll = document.getElementById("count-all");
    if (countAll) countAll.textContent = allTools.length;

    // Update per-category counts in sidebar
    const categoryCounts = {};
    allTools.forEach((t) => {
      categoryCounts[t.category] = (categoryCounts[t.category] || 0) + 1;
    });
    document.querySelectorAll("[data-category]").forEach((el) => {
      const cat = el.getAttribute("data-category");
      el.textContent = categoryCounts[cat] || 0;
    });

    renderTools();
  } catch (e) {
    console.error("Failed to load tools from Google Sheets:", e);
    document.getElementById("toolsGrid").innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--muted)">
        Could not load tools. Please try again later.
      </div>`;
  }
}

/* --- RENDER TOOL CARDS --- */
function renderTools() {
  const search = document.getElementById("searchInput").value.toLowerCase();

  const filtered = allTools.filter((t) => {
    const matchCat =
      currentCategory === "all" || t.category === currentCategory;
    const matchPrice = currentPrice === "all" || t.price === currentPrice;
    const matchSearch =
      !search ||
      t.name.toLowerCase().includes(search) ||
      t.desc.toLowerCase().includes(search) ||
      t.tags.some((tag) => tag.toLowerCase().includes(search)) ||
      t.uses.some((u) => u.toLowerCase().includes(search));
    return matchCat && matchPrice && matchSearch;
  });

  document.getElementById("visibleCount").textContent = filtered.length;

  if (filtered.length === 0) {
    document.getElementById("toolsGrid").innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--muted)">
        No tools found. Try a different search or filter.
      </div>`;
    return;
  }

  document.getElementById("toolsGrid").innerHTML = filtered
    .map(
      (t, i) => `
    <div class="tool-card" style="animation-delay:${i * 0.04}s" onclick="openModal(${t.id})">
      <div class="card-top">
        <div class="tool-logo" style="background:${logoColor(t.category)}">
          <img
            src="${t.logo}"
            alt="${t.name}"
            onerror="this.style.display='none';this.parentNode.innerHTML='${t.emoji}'"
            style="width:28px;height:28px;object-fit:contain;border-radius:4px"
          >
        </div>
        <div class="tool-meta">
          <div class="tool-name">${t.name}</div>
          <div class="tool-category">${t.category}</div>
        </div>
        <div class="tool-rating">★ ${t.rating}</div>
      </div>
      <div class="tool-desc">${t.desc}</div>
      <div class="integrations">
        <span class="int-label">Integrates:</span>
        ${t.integrations
          .slice(0, 3)
          .map((i) => `<span class="int-badge">${i}</span>`)
          .join("")}
      </div>
      <div class="tool-tags">
        ${t.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
      </div>
      <div class="card-footer">
        <div class="tool-price ${priceClass(t.price)}">${t.priceDetail}</div>
        <div class="card-actions">
          <button class="btn-save" onclick="event.stopPropagation(); toggleSave(${t.id}, this)" title="Save">♡</button>
          <a class="btn-visit" href="${t.url}" target="_blank" onclick="event.stopPropagation()">Visit →</a>
        </div>
      </div>
    </div>
  `,
    )
    .join("");
}

/* --- FILTERS --- */
function setCategory(cat, btn) {
  currentCategory = cat;
  document.querySelectorAll(".sidebar .filter-btn").forEach((b) => {
    if (
      b.getAttribute("onclick") &&
      b.getAttribute("onclick").includes("setCategory")
    ) {
      b.classList.remove("active");
    }
  });
  btn.classList.add("active");
  renderTools();
}

function setPrice(price, btn) {
  currentPrice = price;
  document.querySelectorAll(".sidebar .filter-btn").forEach((b) => {
    if (
      b.getAttribute("onclick") &&
      b.getAttribute("onclick").includes("setPrice")
    ) {
      b.classList.remove("active");
    }
  });
  btn.classList.add("active");
  renderTools();
}

function filterTools() {
  renderTools();
}

/* --- SORT --- */
function sortTools(by) {
  if (by === "rating") {
    allTools.sort((a, b) => b.rating - a.rating);
  } else if (by === "name") {
    allTools.sort((a, b) => a.name.localeCompare(b.name));
  } else if (by === "price") {
    const order = { Free: 0, Freemium: 1, Paid: 2 };
    allTools.sort((a, b) => (order[a.price] || 0) - (order[b.price] || 0));
  }
  renderTools();
}

/* --- MODAL --- */
function openModal(id) {
  const t = allTools.find((x) => x.id === id);
  if (!t) return;

  document.getElementById("modalBody").innerHTML = `
    <div class="modal-logo" style="background:${logoColor(t.category)}">
      <img src="${t.logo}" alt="${t.name}"
        onerror="this.style.display='none';this.parentNode.innerHTML='${t.emoji}'"
        style="width:36px;height:36px;object-fit:contain;border-radius:6px">
    </div>
    <h2>${t.name}</h2>
    <div class="modal-rating-row">
      <span style="color:#fbbf24">★ ${t.rating}</span>
      <span>${t.reviews.toLocaleString()} reviews</span>
      <span style="text-transform:uppercase;font-size:0.75rem;letter-spacing:0.06em">${t.category}</span>
    </div>
    <p class="modal-desc">${t.desc}</p>
    <div class="modal-section-title">Pricing & Details</div>
    <div class="modal-grid">
      <div class="modal-info-box">
        <div class="modal-info-label">Price</div>
        <div class="modal-info-value ${priceClass(t.price)}">${t.priceDetail}</div>
      </div>
      <div class="modal-info-box">
        <div class="modal-info-label">Type</div>
        <div class="modal-info-value">${t.price}</div>
      </div>
    </div>
    <div class="modal-section-title">Tags</div>
    <div class="modal-tags">
      ${t.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
    </div>
    <div class="modal-section-title">Integrations</div>
    <div class="modal-tags" style="margin-bottom:1.5rem">
      ${t.integrations.map((i) => `<span class="tag">${i}</span>`).join("")}
    </div>
    <div class="modal-section-title">Common Use Cases</div>
    <ul class="modal-uses">
      ${t.uses.map((u) => `<li>${u}</li>`).join("")}
    </ul>
    <div class="modal-footer">
      <a class="btn-primary" href="${t.url}" target="_blank">Visit ${t.name} →</a>
    </div>
  `;

  document.getElementById("modal").classList.add("open");
}

function closeModal(e) {
  if (e.target === document.getElementById("modal")) closeModalDirect();
}

function closeModalDirect() {
  document.getElementById("modal").classList.remove("open");
}

/* --- SAVE TOGGLE --- */
function toggleSave(id, btn) {
  const saved = btn.textContent === "♥";
  btn.textContent = saved ? "♡" : "♥";
  btn.style.color = saved ? "" : "var(--accent3)";
}

/* --- KEYBOARD SHORTCUTS --- */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModalDirect();
});

/* --- REDDIT FEED --- */
async function loadReddit() {
  try {
    const res = await fetch(
      "https://www.reddit.com/r/artificial/hot.json?limit=10",
    );
    const data = await res.json();
    document.getElementById("redditFeed").innerHTML = data.data.children
      .map((p) => {
        const post = p.data;
        return `
        <a class="reddit-post" href="https://reddit.com${post.permalink}" target="_blank">
          <div class="reddit-post-title">${post.title}</div>
          <div class="reddit-post-meta">
            <span>⬆️ ${post.ups.toLocaleString()}</span>
            <span>💬 ${post.num_comments} comments</span>
            <span>u/${post.author}</span>
          </div>
        </a>`;
      })
      .join("");
  } catch (e) {
    document.getElementById("redditFeed").innerHTML =
      '<p style="color:var(--muted);padding:1rem">Could not load posts. <a href="https://reddit.com/r/artificial" target="_blank">Visit Reddit →</a></p>';
  }
}

/* --- INIT --- */
loadFromNotion();

/* --- SIDEBAR TOGGLE (mobile) --- */
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebarOverlay");
  sidebar.classList.toggle("open");
  overlay.classList.toggle("visible");
}
