/* ============================================================
   AI Tools Marketplace — Just Ask AVA
   app.js
   ============================================================ */

/* --- DATA --- */
const tools = [
  {
    id: 1, name: "ChatGPT", emoji: "🤖",
    logo: "https://logo.clearbit.com/openai.com",
    category: "assistant", price: "Freemium", priceDetail: "Free / $20 mo",
    rating: 4.8, reviews: 120,
    desc: "OpenAI's flagship conversational AI. Handles writing, analysis, coding, math, and much more. The most widely used AI assistant globally.",
    tags: ["OpenAI", "GPT-4o", "Conversational"],
    integrations: ["API", "Zapier", "Slack"],
    uses: ["Writing assistance", "Code debugging", "Research", "Customer support", "Brainstorming"],
    url: "https://chat.openai.com"
  },
  {
    id: 2, name: "Claude", emoji: "🧠",
    logo: "https://logo.clearbit.com/claude.ai",
    category: "assistant", price: "Freemium", priceDetail: "Free / $20 mo",
    rating: 4.8, reviews: 98,
    desc: "Anthropic's AI assistant. Excels at long-form writing, nuanced analysis, and safe, thoughtful conversations. Known for accuracy and context handling.",
    tags: ["Anthropic", "Safety", "Long context"],
    integrations: ["API", "Slack", "Notion"],
    uses: ["Document analysis", "Creative writing", "Code review", "Research", "Automation"],
    url: "https://claude.ai"
  },
  {
    id: 3, name: "Midjourney", emoji: "🎨",
    logo: "https://logo.clearbit.com/midjourney.com",
    category: "image", price: "Paid", priceDetail: "From $10/mo",
    rating: 4.9, reviews: 145,
    desc: "Industry-leading AI image generator known for stunning artistic quality. Creates highly detailed and stylized visuals from text prompts.",
    tags: ["Text-to-image", "Art", "Discord"],
    integrations: ["Discord", "API (beta)"],
    uses: ["Marketing visuals", "Concept art", "Product mockups", "Social media", "Illustrations"],
    url: "https://midjourney.com"
  },
  {
    id: 4, name: "DALL·E 3", emoji: "🖼️",
    logo: "https://logo.clearbit.com/openai.com",
    category: "image", price: "Freemium", priceDetail: "Free w/ ChatGPT",
    rating: 4.5, reviews: 88,
    desc: "OpenAI's image generation model. Integrated directly into ChatGPT for seamless text-to-image creation with precise prompt adherence.",
    tags: ["OpenAI", "Text-to-image", "Integrated"],
    integrations: ["ChatGPT", "API", "Bing"],
    uses: ["Blog images", "Presentations", "Prototyping", "Social posts"],
    url: "https://openai.com/dall-e-3"
  },
  {
    id: 5, name: "Stable Diffusion", emoji: "🌊",
    logo: "https://logo.clearbit.com/stability.ai",
    category: "image", price: "Free", priceDetail: "Open source",
    rating: 4.4, reviews: 76,
    desc: "Open-source image generation model. Runs locally or in the cloud. Highly customizable with thousands of community models and fine-tunes.",
    tags: ["Open source", "Local", "Customizable"],
    integrations: ["ComfyUI", "A1111", "API"],
    uses: ["Custom model training", "Batch generation", "Local privacy", "Art projects"],
    url: "https://stability.ai"
  },
  {
    id: 6, name: "Adobe Firefly", emoji: "🔥",
    logo: "https://logo.clearbit.com/adobe.com",
    category: "image", price: "Freemium", priceDetail: "Free / $4.99 mo",
    rating: 4.3, reviews: 62,
    desc: "Adobe's commercially safe AI image generator. Deeply integrated into Photoshop and Express. Perfect for teams with commercial rights concerns.",
    tags: ["Adobe", "Commercial safe", "Photoshop"],
    integrations: ["Photoshop", "Express", "Illustrator"],
    uses: ["Marketing assets", "Brand graphics", "Photo editing", "Design mockups"],
    url: "https://firefly.adobe.com"
  },
  {
    id: 7, name: "Jasper", emoji: "✍️",
    logo: "https://logo.clearbit.com/jasper.ai",
    category: "writing", price: "Paid", priceDetail: "From $39/mo",
    rating: 4.4, reviews: 71,
    desc: "AI writing assistant built for marketing teams. Generates on-brand content for blogs, ads, email, and social with tone and style controls.",
    tags: ["Marketing", "Long-form", "Brand voice"],
    integrations: ["Surfer SEO", "Grammarly", "Google Docs"],
    uses: ["Blog posts", "Ad copy", "Email campaigns", "SEO content", "Social media"],
    url: "https://jasper.ai"
  },
  {
    id: 8, name: "Copy.ai", emoji: "📝",
    logo: "https://logo.clearbit.com/copy.ai",
    category: "writing", price: "Freemium", priceDetail: "Free / $36 mo",
    rating: 4.2, reviews: 58,
    desc: "Fast AI copywriting for marketing content. Great for generating multiple variations of ad copy, product descriptions, and social captions.",
    tags: ["Copywriting", "Marketing", "Variations"],
    integrations: ["Zapier", "HubSpot", "API"],
    uses: ["Ad copy", "Product descriptions", "Email subject lines", "Social captions"],
    url: "https://copy.ai"
  },
  {
    id: 9, name: "Grammarly", emoji: "✅",
    logo: "https://logo.clearbit.com/grammarly.com",
    category: "writing", price: "Freemium", priceDetail: "Free / $12 mo",
    rating: 4.6, reviews: 134,
    desc: "AI-powered writing assistant for grammar, style, tone, and clarity. Works across browsers, docs, and email as a real-time writing partner.",
    tags: ["Grammar", "Style", "Real-time"],
    integrations: ["Chrome", "Word", "Google Docs", "Outlook"],
    uses: ["Proofreading", "Tone adjustment", "Business writing", "Academic writing"],
    url: "https://grammarly.com"
  },
  {
    id: 10, name: "Notion AI", emoji: "📓",
    logo: "https://logo.clearbit.com/notion.so",
    category: "writing", price: "Paid", priceDetail: "$8/mo add-on",
    rating: 4.5, reviews: 89,
    desc: "AI built natively into Notion. Summarize pages, draft content, extract action items, and translate — all without leaving your workspace.",
    tags: ["Notion", "Integrated", "Workspace"],
    integrations: ["Notion", "Slack", "API"],
    uses: ["Meeting summaries", "Content drafting", "Q&A from docs", "Task extraction", "Translation"],
    url: "https://notion.so/product/ai"
  },
  {
    id: 11, name: "Perplexity", emoji: "🔎",
    logo: "https://logo.clearbit.com/perplexity.ai",
    category: "writing", price: "Freemium", priceDetail: "Free / $20 mo",
    rating: 4.6, reviews: 82,
    desc: "AI-powered search engine that gives cited, conversational answers. Perfect for research with real-time web access and source transparency.",
    tags: ["Search", "Research", "Citations"],
    integrations: ["API", "Chrome extension"],
    uses: ["Research", "Fact-checking", "Market analysis", "Competitive intel", "Learning"],
    url: "https://perplexity.ai"
  },
  {
    id: 12, name: "HeyGen", emoji: "🎬",
    logo: "https://logo.clearbit.com/heygen.com",
    category: "video", price: "Freemium", priceDetail: "Free / $29 mo",
    rating: 4.7, reviews: 93,
    desc: "AI video generator with realistic avatars and voice cloning. Create professional talking-head videos without filming. Used widely for training and marketing.",
    tags: ["Avatar", "Voice clone", "Training"],
    integrations: ["Zapier", "HubSpot", "API"],
    uses: ["Training videos", "Marketing content", "Multilingual content", "Product demos", "Personalized outreach"],
    url: "https://heygen.com"
  },
  {
    id: 13, name: "Synthesia", emoji: "🎭",
    logo: "https://logo.clearbit.com/synthesia.io",
    category: "video", price: "Paid", priceDetail: "From $29/mo",
    rating: 4.6, reviews: 78,
    desc: "Create studio-quality AI videos from text with 150+ AI avatars and 120+ languages. Enterprise-grade for L&D and internal comms.",
    tags: ["Avatar", "Enterprise", "Multilingual"],
    integrations: ["LMS", "API", "Zapier"],
    uses: ["eLearning", "Internal comms", "HR onboarding", "Product training", "Localization"],
    url: "https://synthesia.io"
  },
  {
    id: 14, name: "RunwayML", emoji: "🎞️",
    logo: "https://logo.clearbit.com/runwayml.com",
    category: "video", price: "Freemium", priceDetail: "Free / $15 mo",
    rating: 4.5, reviews: 67,
    desc: "Creative AI platform for video generation and editing. Offers text-to-video, image-to-video, and advanced video editing powered by Gen-2.",
    tags: ["Text-to-video", "Gen-2", "Creative"],
    integrations: ["Adobe Premiere", "API"],
    uses: ["Creative projects", "Short films", "Video editing", "Social content", "Product visualization"],
    url: "https://runwayml.com"
  },
  {
    id: 15, name: "Zapier AI", emoji: "⚡",
    logo: "https://logo.clearbit.com/zapier.com",
    category: "automation", price: "Freemium", priceDetail: "Free / $19.99 mo",
    rating: 4.6, reviews: 108,
    desc: "The leading no-code automation platform with built-in AI actions. Connect 6,000+ apps and use AI to process, classify, and route data automatically.",
    tags: ["No-code", "6000+ apps", "Workflows"],
    integrations: ["Gmail", "Slack", "Salesforce", "HubSpot", "Notion"],
    uses: ["Email automation", "Lead routing", "Data sync", "Notifications", "Report generation"],
    url: "https://zapier.com"
  },
  {
    id: 16, name: "Make", emoji: "🔗",
    logo: "https://logo.clearbit.com/make.com",
    category: "automation", price: "Freemium", priceDetail: "Free / $9 mo",
    rating: 4.5, reviews: 84,
    desc: "Visual automation builder for complex multi-step workflows. More powerful than Zapier for technical users who need conditional logic and data manipulation.",
    tags: ["Visual builder", "Complex workflows", "API"],
    integrations: ["1000+ apps", "Webhooks", "API", "Google Workspace"],
    uses: ["Data processing", "Complex routing", "API integrations", "Batch processing", "Reporting"],
    url: "https://make.com"
  },
  {
    id: 17, name: "n8n", emoji: "🔀",
    logo: "https://logo.clearbit.com/n8n.io",
    category: "automation", price: "Free", priceDetail: "Open source / $20 mo",
    rating: 4.4, reviews: 61,
    desc: "Open-source workflow automation. Self-hostable for full data control. Ideal for technical teams building complex automations with code flexibility.",
    tags: ["Open source", "Self-hosted", "Developer"],
    integrations: ["400+ nodes", "API", "Webhooks", "Databases"],
    uses: ["Internal tooling", "Data pipelines", "AI workflows", "Custom integrations", "Self-hosted privacy"],
    url: "https://n8n.io"
  },
  {
    id: 18, name: "Bardeen", emoji: "🤝",
    logo: "https://logo.clearbit.com/bardeen.ai",
    category: "automation", price: "Freemium", priceDetail: "Free / $10 mo",
    rating: 4.3, reviews: 47,
    desc: "AI automation for your browser. Automate repetitive web tasks like scraping, form filling, and data collection without any code.",
    tags: ["Browser", "No-code", "Scraping"],
    integrations: ["LinkedIn", "Salesforce", "Airtable", "Notion"],
    uses: ["Lead scraping", "CRM updates", "Data collection", "Research automation", "Outreach"],
    url: "https://bardeen.ai"
  },
  {
    id: 19, name: "GitHub Copilot", emoji: "💻",
    logo: "https://logo.clearbit.com/github.com",
    category: "coding", price: "Paid", priceDetail: "$10/mo",
    rating: 4.7, reviews: 119,
    desc: "AI pair programmer that suggests code and full functions in real-time inside your editor. Trained on billions of lines of public code.",
    tags: ["GitHub", "VS Code", "Autocomplete"],
    integrations: ["VS Code", "JetBrains", "Neovim", "GitHub"],
    uses: ["Code completion", "Test generation", "Docs writing", "Refactoring", "Learning to code"],
    url: "https://github.com/features/copilot"
  },
  {
    id: 20, name: "Cursor", emoji: "🖱️",
    logo: "https://logo.clearbit.com/cursor.sh",
    category: "coding", price: "Freemium", priceDetail: "Free / $20 mo",
    rating: 4.8, reviews: 97,
    desc: "AI-first code editor built on VS Code. Chat with your codebase, make multi-file edits, and debug with AI that understands your entire project.",
    tags: ["Code editor", "Chat", "Multi-file"],
    integrations: ["GitHub", "Vercel", "Claude", "GPT-4"],
    uses: ["Full-stack development", "Codebase Q&A", "Refactoring", "Bug fixing", "Code explanation"],
    url: "https://cursor.sh"
  },
  {
    id: 21, name: "Tabnine", emoji: "🔮",
    logo: "https://logo.clearbit.com/tabnine.com",
    category: "coding", price: "Freemium", priceDetail: "Free / $12 mo",
    rating: 4.3, reviews: 58,
    desc: "AI code completion that can run locally for full privacy. Supports 30+ languages and integrates with all major IDEs. Enterprise-ready.",
    tags: ["Local", "Privacy", "Enterprise"],
    integrations: ["VS Code", "IntelliJ", "Eclipse", "Neovim"],
    uses: ["Code completion", "Privacy-first teams", "Enterprise compliance", "Multi-language support"],
    url: "https://tabnine.com"
  },
  {
    id: 22, name: "ElevenLabs", emoji: "🎙️",
    logo: "https://logo.clearbit.com/elevenlabs.io",
    category: "audio", price: "Freemium", priceDetail: "Free / $5 mo",
    rating: 4.9, reviews: 102,
    desc: "Best-in-class AI voice synthesis and cloning. Create ultra-realistic voiceovers in 29 languages with custom voice clones from just a few seconds of audio.",
    tags: ["Voice clone", "TTS", "Multilingual"],
    integrations: ["API", "Zapier", "HeyGen", "Make"],
    uses: ["Voiceovers", "Podcasts", "Audiobooks", "Character voices", "Multilingual content"],
    url: "https://elevenlabs.io"
  },
  {
    id: 23, name: "Suno", emoji: "🎵",
    logo: "https://logo.clearbit.com/suno.ai",
    category: "audio", price: "Freemium", priceDetail: "Free / $8 mo",
    rating: 4.6, reviews: 74,
    desc: "AI music generator that creates full songs with vocals and instrumentals from a text prompt. Create professional-quality music in any style instantly.",
    tags: ["Music generation", "Vocals", "Styles"],
    integrations: ["API (beta)"],
    uses: ["Background music", "Jingles", "Content creation", "Personal projects", "Brand audio"],
    url: "https://suno.ai"
  },
  {
    id: 24, name: "Otter.ai", emoji: "📊",
    logo: "https://logo.clearbit.com/otter.ai",
    category: "productivity", price: "Freemium", priceDetail: "Free / $8.33 mo",
    rating: 4.5, reviews: 86,
    desc: "AI meeting assistant that transcribes, summarizes, and identifies action items from your meetings in real-time. Integrates with Zoom, Teams, and Meet.",
    tags: ["Transcription", "Meetings", "Action items"],
    integrations: ["Zoom", "Teams", "Meet", "Slack", "Salesforce"],
    uses: ["Meeting notes", "Action item tracking", "Searchable transcripts", "Team async updates", "CRM sync"],
    url: "https://otter.ai"
  }
];

/* --- STATE --- */
let currentCategory = 'all';
let currentPrice    = 'all';

/* --- HELPERS --- */
function logoColor(cat) {
  const map = {
    assistant:   'rgba(43,58,143,0.1)',
    image:       'rgba(139,92,246,0.1)',
    video:       'rgba(239,68,68,0.1)',
    writing:     'rgba(59,130,246,0.1)',
    automation:  'rgba(251,146,60,0.1)',
    coding:      'rgba(34,197,94,0.1)',
    audio:       'rgba(236,72,153,0.1)',
    productivity:'rgba(234,179,8,0.1)'
  };
  return map[cat] || 'rgba(30,40,80,0.05)';
}

function priceClass(price) {
  if (price === 'Free')     return 'price-free';
  if (price === 'Freemium') return 'price-freemium';
  return 'price-paid';
}

/* --- RENDER --- */
function renderTools() {
  const search = document.getElementById('searchInput').value.toLowerCase();

  const filtered = tools.filter(t => {
    const matchCat    = currentCategory === 'all' || t.category === currentCategory;
    const matchPrice  = currentPrice === 'all'    || t.price === currentPrice;
    const matchSearch = !search
      || t.name.toLowerCase().includes(search)
      || t.desc.toLowerCase().includes(search)
      || t.tags.some(tag => tag.toLowerCase().includes(search))
      || t.uses.some(u   => u.toLowerCase().includes(search));
    return matchCat && matchPrice && matchSearch;
  });

  document.getElementById('visibleCount').textContent = filtered.length;

  document.getElementById('toolsGrid').innerHTML = filtered.map((t, i) => `
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
        ${t.integrations.slice(0, 3).map(i => `<span class="int-badge">${i}</span>`).join('')}
      </div>
      <div class="tool-tags">
        ${t.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
      <div class="card-footer">
        <div class="tool-price ${priceClass(t.price)}">${t.priceDetail}</div>
        <div class="card-actions">
          <button class="btn-save" onclick="event.stopPropagation(); toggleSave(${t.id}, this)" title="Save">♡</button>
          <a class="btn-visit" href="${t.url}" target="_blank" onclick="event.stopPropagation()">Visit →</a>
        </div>
      </div>
    </div>
  `).join('');
}

/* --- FILTERS --- */
function setCategory(cat, btn) {
  currentCategory = cat;
  document.querySelectorAll('.sidebar .filter-btn').forEach(b => {
    if (b.onclick && b.onclick.toString().includes('setCategory')) b.classList.remove('active');
  });
  btn.classList.add('active');
  renderTools();
}

function setPrice(price, btn) {
  currentPrice = price;
  document.querySelectorAll('.sidebar .filter-btn').forEach(b => {
    if (b.onclick && b.onclick.toString().includes('setPrice')) b.classList.remove('active');
  });
  btn.classList.add('active');
  renderTools();
}

function filterTools() { renderTools(); }

/* --- SORT --- */
function sortTools(by) {
  if (by === 'rating') {
    tools.sort((a, b) => b.rating - a.rating);
  } else if (by === 'name') {
    tools.sort((a, b) => a.name.localeCompare(b.name));
  } else if (by === 'price') {
    const order = { Free: 0, Freemium: 1, Paid: 2 };
    tools.sort((a, b) => order[a.price] - order[b.price]);
  }
  renderTools();
}

/* --- MODAL --- */
function openModal(id) {
  const t = tools.find(x => x.id === id);

  document.getElementById('modalBody').innerHTML = `
    <div class="modal-logo" style="background:${logoColor(t.category)}">
      <img src="${t.logo}" alt="${t.name}"
        onerror="this.style.display='none';this.parentNode.innerHTML='${t.emoji}'"
        style="width:36px;height:36px;object-fit:contain;border-radius:6px">
    </div>
    <h2>${t.name}</h2>
    <div class="modal-rating-row">
      <span style="color:#fbbf24">★ ${t.rating}</span>
      <span>${t.reviews} reviews</span>
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
      ${t.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
    </div>

    <div class="modal-section-title">Integrations</div>
    <div class="modal-tags" style="margin-bottom:1.5rem">
      ${t.integrations.map(i => `<span class="tag">${i}</span>`).join('')}
    </div>

    <div class="modal-section-title">Common Use Cases</div>
    <ul class="modal-uses">
      ${t.uses.map(u => `<li>${u}</li>`).join('')}
    </ul>

    <div class="modal-footer">
      <a class="btn-primary" href="${t.url}" target="_blank">Visit ${t.name} →</a>
    </div>
  `;

  document.getElementById('modal').classList.add('open');
}

function closeModal(e) {
  if (e.target === document.getElementById('modal')) closeModalDirect();
}

function closeModalDirect() {
  document.getElementById('modal').classList.remove('open');
}

/* --- SAVE TOGGLE --- */
function toggleSave(id, btn) {
  const saved = btn.textContent === '♥';
  btn.textContent  = saved ? '♡' : '♥';
  btn.style.color  = saved ? '' : 'var(--accent3)';
}

/* --- KEYBOARD --- */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModalDirect();
});

/* --- INIT --- */
renderTools();
