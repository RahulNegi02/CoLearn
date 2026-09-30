(() => {
  const pageNames = {
    "/": "NCCT Skills & Learning",
    "/academy/": "NCCT Learning",
    "/academy/courses/": "NCCT Courses",
    "/academy/learner/": "Learner Hub",
    "/academy/simulations/": "Learning Simulations",
    "/academy/lectures/": "Video Lectures",
    "/contact/": "Learner Support",
    "/insights/": "Learning Resources",
    "/work/": "Career Opportunities",
  };
  const path = window.location.pathname.replace(/index\.html$/, "");
  document.title = `CoLearn | ${pageNames[path] || "NCCT Learning"}`;
  document.body.classList.add("colearn");

  // Logo & Wordmark
  document.querySelectorAll("a.brand").forEach((brand) => {
    brand.href = "/";
    brand.setAttribute("aria-label", "CoLearn home");
    if (brand.querySelector(".colearn-wordmark")) return;

    const logoImages = [...brand.querySelectorAll("img")];
    logoImages.forEach((image) => {
      image.alt = "CoLearn";
      image.classList.add("colearn-brand-image");
      image.hidden = true;
      const wordmark = document.createElement("span");
      wordmark.className = `${[...image.classList].filter((name) => name.startsWith("logo-")).join(" ")} colearn-wordmark`;
      wordmark.textContent = "CoLearn";
      wordmark.setAttribute("aria-hidden", "true");
      image.after(wordmark);
    });
  });

  // Learner button
  document.querySelectorAll(".academy-link a.academy-button").forEach((link) => {
    link.href = "/academy/learner/";
    const label = link.querySelector("span");
    if (label) label.textContent = "My learning";
  });

  // Ensure Simulations link in navs
  document.querySelectorAll(".nav-primary ul, .mobile-menu ul").forEach((list) => {
    if (list.querySelector('a[href="/academy/simulations/"]')) return;
    const item = document.createElement("li");
    item.className = "top-level-link";
    const link = document.createElement("a");
    link.href = "/academy/simulations/";
    link.textContent = "Simulations";
    item.append(link);
    list.append(item);
  });

  // Brand icons
  document.querySelectorAll("link[rel='icon'], link[rel='apple-touch-icon']").forEach((icon) => {
    icon.href = "/wp-content/themes/dka/resources/svg/colearn-mark.svg";
  });
  document.querySelectorAll("meta[name='msapplication-TileImage']").forEach((meta) => {
    meta.content = "/wp-content/themes/dka/resources/svg/colearn-mark.svg";
  });

  const labelMap = new Map([
    ["Work", "Careers"],
    ["Expertise", "Courses"],
    ["Academy", "Academy"],
    ["Insights", "Videos"],
    ["Contact", "Support"],
    ["Services", "Courses"],
    ["Culture", "Courses"],
    ["Coaching", "Simulations"],
    ["Talks", "Lectures"],
    ["Learning paths", "Courses"],
    ["Learning resources", "Videos"],
    ["Learner support", "Support"],
    ["NCCT learning", "Academy"],
    ["Video lectures", "Videos"],
    ["My learning", "Learn"],
  ]);

  document.querySelectorAll(".nav-primary a, .mobile-menu a").forEach((link) => {
    const label = link.textContent.trim();
    if (!labelMap.has(label)) return;
    const textNode = [...link.childNodes].find((node) => node.nodeType === Node.TEXT_NODE && node.nodeValue.trim());
    if (textNode) textNode.nodeValue = textNode.nodeValue.replace(label, labelMap.get(label));
  });

  const menuCopy = new Map([
    ["Dismantling inequalities & instilling anti-racism in Welsh education", "Site Safety Essentials"],
    ["Putting the customer first with South Western Railway", "Forklift Operations"],
    ["Design research", "Hazard identification"],
    ["Vision & purpose", "Working at height"],
    ["Service & experience design", "Machine operations"],
    ["Brand strategy", "Digital skills"],
    ["Business proposition", "Skills assessments"],
    ["Change management", "Qualifications & badges"],
    ["Executive training", "Learning support"],
    ["Equity by design", "Inclusive learning"],
    ["Frame", "Foundation"],
    ["Create", "Practice"],
    ["Implement", "Apply"],
    ["Build", "Progress"],
  ]);

  document.querySelectorAll(".dropdown-case-studies, .services-menu").forEach((menu) => {
    const walker = document.createTreeWalker(menu, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      menuCopy.forEach((replacement, original) => {
        node.nodeValue = node.nodeValue.replaceAll(original, replacement);
      });
    }
  });

  if (path === "/academy/") {
    const pathwayMarquee = document.querySelector(".home-partners .marquee .inner");
    const pathways = [
      { label: "NCCT courses", image: "/wp-content/uploads/pho/group-diverse-pupils-engaging-online-course-discussion-via-video-call_482257-123125.avif" },
      { label: "Hydroelectric learning", image: "/Dam/Dam-Simulation/mm/neue-energien/wasserkraft/asset/images/og-image-wasserkraft.jpg" },
      { label: "Solar thermal learning", image: "/Solar/Solar-Panel/mm/neue-energien/solarthermie/asset/images/pages/start/bg-start-page.png" },
      { label: "Wind power learning", image: "/Wind-Power/Wind-Power/mm/neue-energien/windkraft/asset/images/pages/start/bg-start-page.png" },
      { label: "Career pathways", image: "/wp-content/uploads/pho/Online-Education-scaled-1.jpg" },
    ];

    if (pathwayMarquee) {
      const items = pathways.map((pathway) => {
        const item = document.createElement("div");
        item.className = "logo";
        const image = document.createElement("img");
        image.className = "fill";
        image.src = pathway.image;
        image.alt = pathway.label;
        image.width = 320;
        image.height = 320;
        image.loading = "lazy";
        image.decoding = "async";
        item.append(image);
        return item;
      });
      pathwayMarquee.replaceChildren(...items, ...items.map((item) => item.cloneNode(true)));
    }
  }

  // Global URL normalization
  document.querySelectorAll("a[href]").forEach((link) => {
    let url;
    try {
      url = new URL(link.href, window.location.origin);
    } catch {
      return;
    }
    if (url.origin !== window.location.origin) return;

    const originalPath = url.pathname;
    if (originalPath === "/work" || originalPath.startsWith("/work/")) {
      link.href = "/work/";
    } else if (originalPath === "/insights" || originalPath.startsWith("/insights/")) {
      link.href = "/academy/lectures/";
    } else if (originalPath === "/contact" || originalPath.startsWith("/contact/")) {
      link.href = `/contact/${url.search}${url.hash}`;
    } else if (originalPath.startsWith("/services/") || originalPath.startsWith("/expertise/")) {
      link.href = "/academy/courses/#discover";
    } else if (originalPath.startsWith("/academy/culture/")) {
      link.href = "/academy/courses/";
    } else if (originalPath.startsWith("/academy/coaching/")) {
      link.href = "/academy/simulations/";
    } else if (originalPath.startsWith("/academy/talks/")) {
      link.href = "/academy/lectures/";
    } else if (originalPath === "/our-story/" || originalPath === "/terms-conditions/") {
      link.href = "/academy/";
    } else {
      link.href = `${originalPath}${url.search}${url.hash}`;
    }
  });

  // CAPTURE PHASE CLICK INTERCEPTOR:
  // Fixes:
  // 1. Careers navbar click: overrides theme's [data-no-swup] and accordion preventDefault
  // 2. Fatal error on coaching/culture links
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;

    // Check modifier keys
    if (e.ctrlKey || e.metaKey || e.shiftKey) return;

    const href = link.getAttribute("href") || "";
    const text = link.textContent.trim().toLowerCase();

    // 1. Career option in navbar or links
    if (href === "/work/" || href === "/work" || text === "careers" || text === "career opportunities" || text === "carrier") {
      // Don't intercept if already on /work/
      if (window.location.pathname.replace(/\/index\.html$/, "").replace(/\/$/, "") === "/work") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      window.location.href = "/work/";
      return;
    }

    // 2. Fatal error prevention on coaching / culture
    if (href.includes("/academy/coaching")) {
      e.preventDefault();
      e.stopPropagation();
      window.location.href = "/academy/simulations/";
      return;
    }
    if (href.includes("/academy/culture")) {
      e.preventDefault();
      e.stopPropagation();
      window.location.href = "/academy/courses/";
      return;
    }
  }, true);

  // Career Opportunities Page Setup
  if (path === "/work/" || path === "/work" || path.includes("/work") || document.body.classList.contains("work")) {
    document.body.classList.add("career-directory");
    const heading = document.querySelector("#main .case-studies-hero h1");
    if (heading) {
      heading.textContent = "Career opportunities";
    }

    const filters = document.querySelector("#main .filters");
    const cards = document.querySelector("#main .case-studies-list .facetwp-template");

    if (filters && cards) {
      let search = filters.querySelector("#career-search");
      if (!search) {
        filters.removeAttribute("data-module");
        filters.innerHTML = `
          <div class="container" style="display: flex !important; flex-direction: column !important; gap: 1.25rem !important;">
            <p class="heading">Explore career pathways</p>
            <div style="width: 100%; max-width: 480px;">
              <label for="career-search" class="screen-reader-text">Search roles</label>
              <input class="career-search" id="career-search" type="search" placeholder="Search roles, skills or locations..." style="width: 100%;">
            </div>
            <div class="career-filters" role="group" aria-label="Filter career opportunities" style="display: flex; flex-direction: row; flex-wrap: wrap; gap: 0.75rem;">
              <button class="career-filter" type="button" data-career-filter="all" aria-pressed="true">All roles</button>
              <button class="career-filter" type="button" data-career-filter="apprenticeship" aria-pressed="false">Apprenticeships</button>
              <button class="career-filter" type="button" data-career-filter="entry-level" aria-pressed="false">Entry level</button>
              <button class="career-filter" type="button" data-career-filter="renewable" aria-pressed="false">Renewable energy</button>
              <button class="career-filter" type="button" data-career-filter="engineering" aria-pressed="false">Engineering &amp; safety</button>
            </div>
          </div>`;
        search = filters.querySelector("#career-search");
      }

      if (!cards.querySelector("[data-career-category]")) {
        const opportunities = [
          { title: "Mechanical Engineering Apprentice", location: "Leeds", type: "apprenticeship", category: "Apprenticeship", summary: "Learn maintenance, inspection and safe workshop practice with a qualified team.", image: "/Dam/Dam-Simulation/mm/neue-energien/wasserkraft/asset/images/og-image-wasserkraft.jpg" },
          { title: "Manufacturing Operative", location: "Manchester", type: "entry-level", category: "Entry level", summary: "Build production experience, quality awareness and reliable site safety habits.", image: "/wp-content/uploads/pho/virtual-classroom-study-space_23-2149178640-a47e2601d8a84bc0851766cebe43e63b.webp" },
          { title: "Wind Turbine Service Trainee", location: "Newcastle", type: "renewable", category: "Renewable energy", summary: "Start a practical pathway in inspections, maintenance and renewable generation.", image: "/Wind-Power/Wind-Power/mm/neue-energien/windkraft/asset/images/pages/start/bg-start-page.png" },
          { title: "Solar Thermal Installation Assistant", location: "Bristol", type: "apprenticeship", category: "Apprenticeship", summary: "Support solar thermal installations while developing electrical and customer skills.", image: "/Solar/Solar-Panel/mm/neue-energien/solarthermie/asset/images/pages/start/bg-start-page.png" },
          { title: "Site Safety Coordinator", location: "Birmingham", type: "engineering", category: "Engineering & Safety", summary: "Coordinate risk assessments, site inductions and safe systems of work across teams.", image: "/wp-content/uploads/pho/group-diverse-pupils-engaging-online-course-discussion-via-video-call_482257-123125.avif" },
          { title: "Electrical Maintenance Trainee", location: "Sheffield", type: "apprenticeship", category: "Apprenticeship", summary: "Master electrical diagrams, industrial wiring inspections and equipment maintenance.", image: "/wp-content/uploads/pho/front-view-stacked-books-graduation-cap-ladders-education-day.jpg" },
        ];

        cards.innerHTML = opportunities.map((opportunity) => `
          <a class="project-card" href="/academy/learner/#careers" data-career-category="${opportunity.type}" data-career-search="${opportunity.title} ${opportunity.location} ${opportunity.summary}">
            <figure class="image">
              <div class="tags"><div class="tag">${opportunity.category}</div></div>
              <div class="project-heading fill"><p>${opportunity.summary}</p></div>
              <div class="cover fill"></div>
              <img class="fill" src="${opportunity.image}" alt="${opportunity.title} career pathway" loading="lazy">
            </figure>
            <p class="project-title"><span>${opportunity.title}</span><br><span>${opportunity.location}</span></p>
          </a>`).join("") + '<p class="career-empty" id="career-empty" hidden>No career opportunities match your search.</p>';
      }

      const careerCards = [...cards.querySelectorAll("[data-career-category]")];
      const filterButtons = [...filters.querySelectorAll("[data-career-filter]")];
      let activeFilter = "all";
      let emptyMsg = cards.querySelector("#career-empty");
      if (!emptyMsg) {
        emptyMsg = document.createElement("p");
        emptyMsg.className = "career-empty";
        emptyMsg.id = "career-empty";
        emptyMsg.textContent = "No career opportunities match your search.";
        emptyMsg.hidden = true;
        cards.append(emptyMsg);
      }

      const applyCareerFilters = () => {
        const query = search ? search.value.trim().toLowerCase() : "";
        let visible = 0;
        careerCards.forEach((card) => {
          const category = card.dataset.careerCategory || "";
          const searchText = (card.dataset.careerSearch || card.textContent).toLowerCase();
          const matchesType = activeFilter === "all" || category === activeFilter;
          const matchesQuery = !query || searchText.includes(query);
          card.hidden = !matchesType || !matchesQuery;
          if (!card.hidden) visible += 1;
        });
        emptyMsg.hidden = visible > 0;
      };

      if (search) {
        search.addEventListener("input", applyCareerFilters);
      }
      filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
          activeFilter = button.dataset.careerFilter;
          filterButtons.forEach((filter) => filter.setAttribute("aria-pressed", String(filter === button)));
          applyCareerFilters();
        });
      });
    }
  }

  // ==========================================================================
  // CoLearn AI Chatbot (Bottom-Left Widget with Open API & Smart Engine)
  // ==========================================================================
  function initCoLearnChatbot() {
    if (document.querySelector("#colearn-chat-trigger")) return;

    // Trigger button
    const trigger = document.createElement("button");
    trigger.id = "colearn-chat-trigger";
    trigger.className = "colearn-chat-trigger";
    trigger.type = "button";
    trigger.setAttribute("aria-label", "Open CoLearn AI Chatbot");
    trigger.setAttribute("aria-expanded", "false");
    trigger.innerHTML = `
      <span class="colearn-chat-pulse"></span>
      <svg class="colearn-chat-icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
      <svg class="colearn-chat-close-icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    `;

    // Chatbot Panel
    const bot = document.createElement("aside");
    bot.id = "colearn-chatbot";
    bot.className = "colearn-chatbot";
    bot.setAttribute("aria-hidden", "true");
    bot.setAttribute("role", "dialog");
    bot.setAttribute("aria-labelledby", "colearn-chat-title");
    bot.innerHTML = `
      <header class="colearn-chat-header">
        <div class="colearn-chat-avatar">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        </div>
        <div class="colearn-chat-header-info">
          <h3 id="colearn-chat-title">CoLearn AI Assistant</h3>
          <p class="colearn-chat-status"><span class="colearn-status-dot"></span> Online · Vocational Guidance</p>
        </div>
        <div class="colearn-chat-actions">
          <button class="colearn-chat-btn-key" id="colearn-chat-btn-key" type="button" title="Configure OpenAI API Key">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6M15.5 7.5l3 3M18.5 4.5l3 3"/></svg>
          </button>
          <button class="colearn-chat-close" id="colearn-chat-close" type="button" aria-label="Close Chat">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </header>

      <div class="colearn-chat-key-drawer" id="colearn-chat-key-drawer" hidden>
        <label for="colearn-api-key-input">OpenAI API Key (Optional):</label>
        <div class="colearn-key-input-row">
          <input type="password" id="colearn-api-key-input" placeholder="sk-proj-...">
          <button type="button" id="colearn-api-key-save">Save</button>
        </div>
        <small>Key is saved in local browser storage. If omitted, built-in CoLearn smart engine is used.</small>
      </div>

      <div class="colearn-chat-messages" id="colearn-chat-messages" role="log" aria-live="polite"></div>

      <div class="colearn-chat-chips" id="colearn-chat-chips">
        <button class="colearn-chat-chip" type="button" data-prompt="Show me all career apprenticeships">Apprenticeships</button>
        <button class="colearn-chat-chip" type="button" data-prompt="How do I launch the 3D simulations?">Simulations</button>
        <button class="colearn-chat-chip" type="button" data-prompt="What courses are available in site safety?">Site Safety</button>
        <button class="colearn-chat-chip" type="button" data-prompt="How can I contact a vocational career advisor?">Advisors</button>
      </div>

      <form class="colearn-chat-input-bar" id="colearn-chat-form">
        <input type="text" id="colearn-chat-input" placeholder="Ask about courses, careers, simulations..." autocomplete="off">
        <button type="submit" id="colearn-chat-send" aria-label="Send Message">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </form>
    `;

    document.body.append(trigger, bot);

    const messagesEl = bot.querySelector("#colearn-chat-messages");
    const formEl = bot.querySelector("#colearn-chat-form");
    const inputEl = bot.querySelector("#colearn-chat-input");
    const keyDrawer = bot.querySelector("#colearn-chat-key-drawer");
    const keyBtn = bot.querySelector("#colearn-chat-btn-key");
    const keyInput = bot.querySelector("#colearn-api-key-input");
    const keySave = bot.querySelector("#colearn-api-key-save");
    const closeBtn = bot.querySelector("#colearn-chat-close");

    let apiKey = localStorage.getItem("COLEARN_OPENAI_KEY") || window.COLEARN_API_KEY || "";
    if (apiKey) keyInput.value = apiKey;

    keyBtn.addEventListener("click", () => {
      keyDrawer.hidden = !keyDrawer.hidden;
      if (!keyDrawer.hidden) keyInput.focus();
    });

    keySave.addEventListener("click", () => {
      apiKey = keyInput.value.trim();
      if (apiKey) {
        localStorage.setItem("COLEARN_OPENAI_KEY", apiKey);
        addBotMessage("OpenAI API key saved. Chatbot will now stream live responses from OpenAI!");
      } else {
        localStorage.removeItem("COLEARN_OPENAI_KEY");
        addBotMessage("OpenAI API key cleared. Using CoLearn smart built-in knowledge engine.");
      }
      keyDrawer.hidden = true;
    });

    const toggleChat = (open) => {
      const isOpen = open !== undefined ? open : !bot.classList.contains("is-open");
      bot.classList.toggle("is-open", isOpen);
      trigger.classList.toggle("is-active", isOpen);
      trigger.setAttribute("aria-expanded", String(isOpen));
      bot.setAttribute("aria-hidden", String(!isOpen));
      if (isOpen) {
        inputEl.focus();
        if (messagesEl.children.length === 0) {
          addBotMessage(`Hello! 👋 I'm your **CoLearn Vocational Assistant**.\n\nI can help you explore:\n• **<a href="/work/">Career Opportunities & Apprenticeships</a>**\n• **<a href="/academy/courses/">Vocational Courses</a>** (Site Safety, Forklift, Digital Tools)\n• **<a href="/academy/simulations/">Interactive 3D Simulations</a>** (Hydro, Solar, Wind)\n• **<a href="/academy/lectures/">Video Lectures & Resources</a>**\n\nHow can I help you today?`);
        }
      }
    };

    trigger.addEventListener("click", () => toggleChat());
    closeBtn.addEventListener("click", () => toggleChat(false));

    function formatTime() {
      const now = new Date();
      return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }

    function addUserMessage(text) {
      const msg = document.createElement("div");
      msg.className = "colearn-chat-msg user";
      msg.innerHTML = `
        <div class="colearn-chat-bubble">${escapeHtml(text)}</div>
        <span class="colearn-chat-time">${formatTime()}</span>
      `;
      messagesEl.append(msg);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function addBotMessage(text) {
      const msg = document.createElement("div");
      msg.className = "colearn-chat-msg bot";
      // Convert basic markdown formatting to HTML
      const formatted = renderMarkdown(text);
      msg.innerHTML = `
        <div class="colearn-chat-bubble">${formatted}</div>
        <span class="colearn-chat-time">${formatTime()}</span>
      `;
      messagesEl.append(msg);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function showTyping() {
      const typing = document.createElement("div");
      typing.id = "colearn-chat-typing";
      typing.className = "colearn-chat-typing";
      typing.innerHTML = `<span></span><span></span><span></span>`;
      messagesEl.append(typing);
      messagesEl.scrollTop = messagesEl.scrollHeight;
      return typing;
    }

    function removeTyping() {
      const typing = document.querySelector("#colearn-chat-typing");
      if (typing) typing.remove();
    }

    function escapeHtml(string) {
      const div = document.createElement("div");
      div.textContent = string;
      return div.innerHTML;
    }

    function renderMarkdown(md) {
      let html = md
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        .replace(/\n\n/g, "<br><br>")
        .replace(/\n/g, "<br>");
      return html;
    }

    // Context-aware vocational fallback answers
    function generateVocationalResponse(query) {
      const q = query.toLowerCase();

      if (q.includes("apprenticeship") || q.includes("career") || q.includes("job") || q.includes("role") || q.includes("work")) {
        return `We have 6 verified vocational pathways open on our **<a href="/work/">Career Opportunities</a>** page:\n\n` +
          `1. **Mechanical Engineering Apprentice** (Leeds · Advanced Apprenticeship)\n` +
          `2. **Manufacturing Operative** (Manchester · Full-time)\n` +
          `3. **Wind Turbine Service Trainee** (Newcastle · Renewable Generation)\n` +
          `4. **Solar Thermal Installation Assistant** (Bristol · Clean Heat)\n` +
          `5. **Site Safety Coordinator** (Birmingham · NCCT Pathway)\n` +
          `6. **Electrical Maintenance Trainee** (Sheffield · Level 3)\n\n` +
          `Visit **<a href="/work/">Careers</a>** to search and filter roles, or visit the **<a href="/academy/learner/">Learner Hub</a>** to apply.`;
      }

      if (q.includes("simulation") || q.includes("sim") || q.includes("vr") || q.includes("cardboard") || q.includes("3d") || q.includes("dam") || q.includes("wind") || q.includes("solar")) {
        return `You can launch 3 interactive energy simulations with video walkthroughs:\n\n` +
          `â€¢ **<a href="/Dam/Dam-Simulation/mm/neue-energien/wasserkraft/index.html" target="_blank">Hydroelectric Power Plant (Francis Turbine & Penstock) â†—</a>**\n` +
          `â€¢ **<a href="/Solar/Solar-Panel/mm/neue-energien/solarthermie/index.html" target="_blank">Solar Thermal Circulation (Vacuum Tube Collectors & Glycol Loop) â†—</a>**\n` +
          `â€¢ **<a href="/Wind-Power/Wind-Power/mm/neue-energien/windkraft/index.html" target="_blank">Wind Power Generation (Aerodynamic Pitch & Yaw Controls) â†—</a>**\n\n` +
          `All simulations launch in a **new tab** and feature dedicated **video walkthroughs** on our **<a href="/academy/simulations/">Simulations Page</a>**.`;
      }

      if (q.includes("course") || q.includes("safety") || q.includes("forklift") || q.includes("digital") || q.includes("learn") || q.includes("certificate") || q.includes("clean energy") || q.includes("automation") || q.includes("plc") || q.includes("electrical")) {
        return `CoLearn offers 6 accredited vocational courses aligned with CITB, City & Guilds and EUSR standards:\n\n` +
          `1. **Site Safety Essentials** (NCCT Level 2 Â· 6 Modules Â· CSCS Route)\n` +
          `2. **Forklift & Plant Operations** (NCCT Level 2 Â· 8 Modules Â· RTITB/FLTA)\n` +
          `3. **Digital Tools on Site** (NCCT Level 2 Â· 5 Modules Â· BIM Ready)\n` +
          `4. **Renewable Energy Systems (Wind & Solar)** (NCCT Level 3 Â· 7 Modules)\n` +
          `5. **Industrial Automation & PLC Logic** (NCCT Level 3 Â· 8 Modules)\n` +
          `6. **Electrical Safety & Safe Isolation** (NCCT Level 3 Â· 6 Modules Â· 18th Edition Prep)\n\n` +
          `Browse all courses on **<a href="/academy/courses/">Courses</a>** or track your progress in the **<a href="/academy/learner/">Learner Hub</a>**.`;
      }

      if (q.includes("lecture") || q.includes("video") || q.includes("youtube") || q.includes("watch")) {
        return `We provide 10 practical technical demonstrations and simulation walkthroughs:\n\n` +
          `â€¢ **Simulation Walkthroughs**: Hydroelectric Dam Flow, Wind Turbine Nacelle Controls, Solar Thermal Closed-Loop, and Virtual Lab Diagnostics.\n` +
          `â€¢ **Site Demonstrations**: Working safely at height, Forklift pre-use inspections, Industrial automation & PLC, Safe isolation (LOTO), and 360 Excavator groundworks.\n\n` +
          `Watch them all on the **<a href="/academy/lectures/">Video Lectures Page</a>** or on the **<a href="/academy/simulations/#simulation-videos">Simulations Page</a>**.`;
      }

      if (q.includes("contact") || q.includes("advisor") || q.includes("help") || q.includes("support")) {
        return `Our career advisors and NCCT mentors are available to support your vocational pathway.\n\n` +
          `You can reach out directly through the **<a href="/contact/">Learner Support & Contact Page</a>** or talk to an advisor via the **<a href="/academy/learner/">Learner Hub</a>**.`;
      }

      return `Thanks for asking! I'm here to guide you through CoLearn's vocational training ecosystem:\n\n` +
        `• **<a href="/work/">Explore Career Opportunities & Apprenticeships</a>**\n` +
        `• **<a href="/academy/courses/">Browse NCCT Courses & Certifications</a>**\n` +
        `• **<a href="/academy/simulations/">Launch 3D Energy Simulations in New Tab</a>**\n` +
        `• **<a href="/contact/">Get 1-on-1 Learner Support</a>**\n\n` +
        `What specific topic or skill would you like to know more about?`;
    }

    const conversationHistory = [
      {
        role: "system",
        content: "You are the CoLearn Vocational Assistant, an expert AI advisor for the CoLearn NCCT platform. You help learners discover vocational courses (Site Safety Essentials, Forklift Operations, Digital Tools), explore renewable energy & engineering apprenticeships (in Leeds, Manchester, Newcastle, Bristol, Birmingham, Sheffield), navigate interactive 3D simulations (Hydroelectric, Solar Thermal, Wind Power), and find career pathways. Answer concisely, practically, warmly, and include relevant links using HTML: /work/ for careers, /academy/courses/ for courses, /academy/simulations/ for simulations, /academy/lectures/ for lectures, /contact/ for support."
      }
    ];

    async function handleUserSubmit(text) {
      if (!text.trim()) return;
      addUserMessage(text);
      conversationHistory.push({ role: "user", content: text });

      const typing = showTyping();

      if (apiKey) {
        try {
          const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model: "gpt-4o-mini",
              messages: conversationHistory,
              temperature: 0.7,
              max_tokens: 300,
            }),
          });

          if (!response.ok) {
            throw new Error(`OpenAI API error ${response.status}`);
          }

          const data = await response.json();
          removeTyping();
          const reply = data.choices && data.choices[0] && data.choices[0].message
            ? data.choices[0].message.content
            : generateVocationalResponse(text);

          conversationHistory.push({ role: "assistant", content: reply });
          addBotMessage(reply);
          return;
        } catch (err) {
          console.warn("OpenAI API call failed, falling back to built-in knowledge engine:", err);
          // Fall through to smart engine
        }
      }

      // Built-in intelligent engine (instant fallback or offline mode)
      setTimeout(() => {
        removeTyping();
        const reply = generateVocationalResponse(text);
        conversationHistory.push({ role: "assistant", content: reply });
        addBotMessage(reply);
      }, 500);
    }

    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
      const val = inputEl.value.trim();
      if (!val) return;
      inputEl.value = "";
      handleUserSubmit(val);
    });

    bot.querySelectorAll(".colearn-chat-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        const prompt = chip.dataset.prompt;
        if (prompt) {
          handleUserSubmit(prompt);
        }
      });
    });
  }

  // Mount chatbot on DOM load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCoLearnChatbot);
  } else {
    initCoLearnChatbot();
  }

})();