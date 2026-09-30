(() => {
  const root = document.querySelector("#colearn-portal");
  if (!root) return;

  const storageKey = "colearn-ncct-demo-v2";
  const initialState = {
    enrolled: [],
    completedModules: [0, 1, 2],
    currentModule: 3,
    quizPassed: false,
    quizScore: null,
    attendanceCheckedIn: false,
    savedJobs: [],
    dismissedNotifications: [],
    certificateId: "",
  };

  let state = initialState;
  try {
    const savedState = JSON.parse(localStorage.getItem(storageKey));
    if (savedState && typeof savedState === "object") {
      state = { ...initialState, ...savedState };
    }
  } catch {
    state = initialState;
  }

  const save = () => localStorage.setItem(storageKey, JSON.stringify(state));

  const feedback = (id, message) => {
    const target = root.querySelector(`#${id}`);
    if (target) {
      target.textContent = message;
      if (message) {
        target.removeAttribute("hidden");
      }
    }
  };

  // Module curriculum definitions
  const courseModules = [
    {
      num: "01",
      title: "Introduction to safe sites",
      meta: "VIDEO LECTURE · 15 MINS",
      desc: "Understand core site safety rules, exclusion zones, induction requirements, and personal responsibility on active worksites.",
      videoUrl: "https://www.youtube.com/results?search_query=HSE+construction+site+induction+safety+training",
      resourceUrl: "https://www.hse.gov.uk/pubns/priced/hsg150.pdf",
      resourceText: "Download HSE Health & Safety in Construction (PDF)",
      img: "/wp-content/uploads/pho/group-diverse-pupils-engaging-online-course-discussion-via-video-call_482257-123125.avif"
    },
    {
      num: "02",
      title: "Personal protective equipment",
      meta: "VIDEO LECTURE · 20 MINS",
      desc: "Select, inspect, fit, and care for essential PPE: hard hats, high-visibility clothing, safety footwear, eye, hearing, and respiratory protection.",
      videoUrl: "https://www.youtube.com/results?search_query=construction+PPE+personal+protective+equipment+training",
      resourceUrl: "https://www.hse.gov.uk/pubns/indg174.pdf",
      resourceText: "Download PPE at Work Regulations Guide (PDF)",
      img: "/wp-content/uploads/pho/pngtree-illustration-of-3d-rendered-laptop-computer-showcasing-the-concept-of-e-image_3752947.jpg"
    },
    {
      num: "03",
      title: "Hazard identification",
      meta: "PRACTICAL GUIDE · 25 MINS",
      desc: "Spot hidden site hazards: trailing cables, chemical storage, moving plant machinery, and apply the hierarchy of risk control.",
      videoUrl: "https://www.youtube.com/results?search_query=hazard+identification+risk+assessment+construction",
      resourceUrl: "https://www.hse.gov.uk/risk/controlling-risks.htm",
      resourceText: "Open HSE Risk Control Guidance",
      img: "/Wind-Power/Wind-Power/mm/neue-energien/windkraft/asset/images/pages/start/bg-start-page.png"
    },
    {
      num: "04",
      title: "Working safely at height",
      meta: "VIDEO LECTURE · 22 MINS",
      desc: "Recognise fall risks, select approved access equipment, carry out pre-use tower scaffold checks, and implement edge protection.",
      videoUrl: "https://www.youtube.com/results?search_query=HSE+working+at+height+construction+safety+training",
      resourceUrl: "https://www.hse.gov.uk/construction/safetytopics/workingatheight.htm",
      resourceText: "Open HSE Working at Height Guidance",
      img: "/wp-content/uploads/pho/group-diverse-pupils-engaging-online-course-discussion-via-video-call_482257-123125.avif"
    },
    {
      num: "05",
      title: "Manual handling",
      meta: "PRACTICAL DEMO · 18 MINS",
      desc: "Master kinetic lifting techniques, assess load weight, coordinate team lifts, and prevent musculoskeletal strain on site.",
      videoUrl: "https://www.youtube.com/results?search_query=manual+handling+kinetic+lifting+technique+HSE",
      resourceUrl: "https://www.hse.gov.uk/msd/manual-handling/index.htm",
      resourceText: "Open HSE Manual Handling at Work Guide",
      img: "/wp-content/uploads/pho/pngtree-illustration-of-3d-rendered-laptop-computer-showcasing-the-concept-of-e-image_3752947.jpg"
    },
    {
      num: "06",
      title: "Knowledge check",
      meta: "ASSESSMENT · 5 QUESTIONS · PASS MARK 80%",
      desc: "Validate your site safety knowledge across all modules. Score 80% or higher (at least 4 of 5) to unlock your verified certificate.",
      videoUrl: "https://www.youtube.com/results?search_query=CITB+health+safety+environment+test+revision",
      resourceUrl: "https://www.hse.gov.uk/pubns/priced/hsg150.pdf",
      resourceText: "Download Complete Construction Safety Reference (PDF)",
      img: "/Dam/Dam-Simulation/mm/neue-energien/wasserkraft/asset/images/og-image-wasserkraft.jpg"
    }
  ];

  const modules = [...root.querySelectorAll("[data-module-index]")];
  const completed = new Set(state.completedModules);

  // Update Certificate Status & Buttons
  function updateCertificate() {
    const allModulesDone = completed.size === courseModules.length;
    const ready = allModulesDone && state.quizPassed;
    const downloadButton = root.querySelector("#download-certificate");
    const status = root.querySelector("#certificate-status");

    if (downloadButton) {
      downloadButton.disabled = !ready;
    }

    if (status) {
      if (ready) {
        if (!state.certificateId) {
          state.certificateId = `NCCT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
          save();
        }
        status.innerHTML = `<strong>Course completed!</strong> Verified Certificate <code>${state.certificateId}</code> is ready to download.`;
      } else {
        const remaining = [];
        if (completed.size < courseModules.length) remaining.push(`${courseModules.length - completed.size} modules remaining`);
        if (!state.quizPassed) remaining.push("assessment required (80% pass mark)");
        status.textContent = `In progress · ${remaining.join(" and ")} to unlock your certificate.`;
      }
    }
  }

  // Render Lesson Content for Current Active Module
  function renderActiveLesson(index) {
    const mod = courseModules[index];
    if (!mod) return;

    const lessonBox = root.querySelector(".colearn-lesson");
    if (!lessonBox) return;

    const heading = lessonBox.querySelector("h4");
    if (heading) heading.textContent = mod.title;

    const meta = lessonBox.querySelector(".colearn-course-meta");
    if (meta) meta.textContent = mod.meta;

    const desc = lessonBox.querySelector("p:not(.colearn-course-meta)");
    if (desc) desc.textContent = mod.desc;

    const thumbLink = lessonBox.querySelector(".colearn-video-thumbnail");
    if (thumbLink) {
      thumbLink.href = mod.videoUrl;
      const img = thumbLink.querySelector("img");
      if (img) {
        img.src = mod.img;
        img.alt = `Video lecture thumbnail: ${mod.title}`;
      }
    }

    const videoWrapLink = lessonBox.querySelector(".colearn-video-link a");
    if (videoWrapLink) {
      videoWrapLink.href = mod.videoUrl;
      videoWrapLink.textContent = `Watch "${mod.title}" lecture on YouTube`;
    }

    const resourceBtn = lessonBox.querySelector("a.button");
    if (resourceBtn) {
      resourceBtn.href = mod.resourceUrl;
      const textSpan = resourceBtn.querySelector(".button-text");
      if (textSpan) textSpan.textContent = mod.resourceText;
    }

    const completeBtn = lessonBox.querySelector("#complete-module");
    if (completeBtn) {
      const isDone = completed.has(index);
      const textSpan = completeBtn.querySelector(".button-text");
      if (textSpan) {
        textSpan.textContent = isDone ? "✓ Module complete" : "Mark module complete";
      }
      completeBtn.disabled = isDone;
    }
  }

  // Render Module List and Coursera Progress Bar
  function renderModules() {
    modules.forEach((button) => {
      const index = Number(button.dataset.moduleIndex);
      const isComplete = completed.has(index);
      const isCurrent = index === state.currentModule && !isComplete;

      button.classList.toggle("is-complete", isComplete);
      button.classList.toggle("is-current", isCurrent);

      const statusSpan = button.querySelector("span:last-child");
      if (statusSpan) {
        statusSpan.textContent = isComplete
          ? "✓ Complete"
          : isCurrent
            ? "In progress"
            : index === 5
              ? "Assessment"
              : "Not started";
      }
    });

    const progress = Math.round((completed.size / courseModules.length) * 100);
    const progressBar = root.querySelector("#course-progress-bar");
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
      const progressTrack = progressBar.parentElement;
      if (progressTrack) {
        progressTrack.setAttribute("aria-valuenow", String(completed.size));
      }
    }

    const progressLabel = root.querySelector("#course-progress-label");
    if (progressLabel) {
      progressLabel.textContent = `Site Safety Essentials · ${completed.size} of ${courseModules.length} modules complete (${progress}%)`;
    }

    const progressStat = root.querySelector("#progress-stat");
    if (progressStat) {
      progressStat.textContent = `${progress}%`;
    }

    renderActiveLesson(state.currentModule);
    updateCertificate();
  }

  // Module item clicks
  modules.forEach((button) => {
    button.addEventListener("click", () => {
      state.currentModule = Number(button.dataset.moduleIndex);
      renderModules();
      save();
    });
  });

  // Complete Module Button Click
  const completeModuleBtn = root.querySelector("#complete-module");
  if (completeModuleBtn) {
    completeModuleBtn.addEventListener("click", () => {
      completed.add(state.currentModule);
      state.completedModules = [...completed].sort((a, b) => a - b);

      // Find next incomplete module
      const nextIncomplete = courseModules.findIndex((_, idx) => !completed.has(idx));
      if (nextIncomplete !== -1) {
        state.currentModule = nextIncomplete;
      }

      renderModules();
      save();
    });
  }

  // Course Filter & Search in Discover Section
  const courseCards = [...root.querySelectorAll(".colearn-course")];
  let activeFilter = "all";

  function filterCourses() {
    const searchInput = root.querySelector("#course-search");
    const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
    let visibleCount = 0;

    courseCards.forEach((card) => {
      const matchesCategory = activeFilter === "all" || card.dataset.category === activeFilter;
      const cardText = `${card.dataset.search || ""} ${card.textContent}`.toLowerCase();
      const matchesSearch = !query || cardText.includes(query);
      const isVisible = matchesCategory && matchesSearch;
      card.hidden = !isVisible;
      if (isVisible) visibleCount++;
    });

    feedback("course-feedback", visibleCount === 0 ? "No courses match your search or filter." : "");
  }

  const courseSearch = root.querySelector("#course-search");
  if (courseSearch) {
    courseSearch.addEventListener("input", filterCourses);
  }

  root.querySelectorAll("[data-course-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.courseFilter;
      root.querySelectorAll("[data-course-filter]").forEach((filter) => {
        filter.setAttribute("aria-pressed", String(filter === button));
      });
      filterCourses();
    });
  });

  // Course Enrolment Buttons
  root.querySelectorAll("[data-enroll]").forEach((button) => {
    const courseId = button.dataset.enroll;
    const btnText = button.querySelector(".button-text") || button;

    if (state.enrolled.includes(courseId)) {
      btnText.textContent = "✓ Enrolled";
      button.disabled = true;
    }

    button.addEventListener("click", () => {
      if (!state.enrolled.includes(courseId)) {
        state.enrolled.push(courseId);
      }
      btnText.textContent = "✓ Enrolled";
      button.disabled = true;
      feedback("course-feedback", "Successfully enrolled. Course modules added to My learning.");
      save();
    });
  });

  // Multi-Question Knowledge Assessment with 80% pass mark
  const quizForm = root.querySelector("#knowledge-check");
  if (quizForm) {
    // If the form only has 1 question in the DOM, let's inject a comprehensive 5-question assessment
    const existingFieldsets = quizForm.querySelectorAll("fieldset");
    if (existingFieldsets.length <= 1) {
      quizForm.innerHTML = `
        <fieldset>
          <legend>1. Before using a mobile access tower, what should you do first?</legend>
          <label><input type="radio" name="q1" value="a" required> Check it is level, complete, inspected and tagged</label>
          <label><input type="radio" name="q1" value="b"> Ask a colleague to hold it steady from the base</label>
          <label><input type="radio" name="q1" value="c"> Climb up and test the stability carefully</label>
        </fieldset>
        <fieldset>
          <legend>2. What is the mandatory procedure before clearing a conveyor belt jam?</legend>
          <label><input type="radio" name="q2" value="a"> Reduce the motor speed to minimum</label>
          <label><input type="radio" name="q2" value="b" required> Isolate the electrical power and apply Lockout/Tagout (LOTO)</label>
          <label><input type="radio" name="q2" value="c"> Use a wooden lever while the belt continues moving</label>
        </fieldset>
        <fieldset>
          <legend>3. In the hierarchy of risk control, what is the most effective measure?</legend>
          <label><input type="radio" name="q3" value="a"> Issuing Personal Protective Equipment (PPE)</label>
          <label><input type="radio" name="q3" value="b" required> Elimination of the hazard at source</label>
          <label><input type="radio" name="q3" value="c"> Placing high-visibility warning signage</label>
        </fieldset>
        <fieldset>
          <legend>4. What is the correct kinetic manual handling technique for lifting a heavy load?</legend>
          <label><input type="radio" name="q4" value="a"> Bend at the waist with straight legs and pull upward</label>
          <label><input type="radio" name="q4" value="b" required> Bend knees, maintain straight back, and keep load close to body</label>
          <label><input type="radio" name="q4" value="c"> Twist your torso quickly while lifting to maintain momentum</label>
        </fieldset>
        <fieldset>
          <legend>5. When must a full-body fall arrest harness be inspected by the user?</legend>
          <label><input type="radio" name="q5" value="a"> Annually by an external safety officer</label>
          <label><input type="radio" name="q5" value="b" required> Pre-use check before each work shift and daily use</label>
          <label><input type="radio" name="q5" value="c"> Only after it has successfully arrested an actual fall</label>
        </fieldset>
        <button class="button" type="submit"><span class="button-text">Submit assessment</span></button>
        <p class="colearn-feedback" id="quiz-feedback" role="status" aria-live="polite"></p>
      `;
    }

    quizForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(quizForm);
      const answers = {
        q1: formData.get("q1") || formData.get("safety-answer"),
        q2: formData.get("q2") || "b",
        q3: formData.get("q3") || "b",
        q4: formData.get("q4") || "b",
        q5: formData.get("q5") || "b",
      };

      const correctAnswers = { q1: "a", q2: "b", q3: "b", q4: "b", q5: "b" };
      let score = 0;
      const totalQuestions = 5;

      Object.keys(correctAnswers).forEach((key) => {
        if (answers[key] === correctAnswers[key]) score++;
      });

      const percentage = Math.round((score / totalQuestions) * 100);
      const passed = percentage >= 80;

      state.quizScore = percentage;
      state.quizPassed = passed;

      if (passed) {
        completed.add(5); // Mark module 06 complete
        state.completedModules = [...completed].sort((a, b) => a - b);
        feedback(
          "quiz-feedback",
          `✓ Passed with ${percentage}% (${score}/${totalQuestions} correct)! Pass mark is 80%. You have demonstrated core safety competencies.`
        );

        // Update badge count
        const badgeStat = root.querySelector("#badge-stat");
        if (badgeStat) badgeStat.textContent = "5";

        // Add badge to skills list if not present
        const badgesList = root.querySelector(".colearn-badges");
        if (badgesList && !badgesList.querySelector(".badge-safety-champ")) {
          const badgeLi = document.createElement("li");
          badgeLi.className = "badge-earned badge-safety-champ";
          badgeLi.textContent = "Site Safety Champion";
          badgesList.appendChild(badgeLi);
        }
      } else {
        feedback(
          "quiz-feedback",
          `Score: ${percentage}% (${score}/${totalQuestions} correct). Pass mark is 80% (4 of 5). Please review the lecture materials and try again.`
        );
      }

      renderModules();
      updateCertificate();
      save();
    });
  }

  // Learner Profile Session Attendance Check-in
  const checkInBtn = root.querySelector("#check-in");
  const attendanceDisplay = root.querySelector("#learner-profile p strong");

  function updateAttendanceUI() {
    if (state.attendanceCheckedIn) {
      if (checkInBtn) {
        checkInBtn.disabled = true;
        const btnText = checkInBtn.querySelector(".button-text") || checkInBtn;
        btnText.textContent = "✓ Checked in";
      }
      if (attendanceDisplay && attendanceDisplay.parentElement) {
        attendanceDisplay.parentElement.innerHTML = `<strong>13 of 14 sessions</strong> attended · 93% attendance`;
      }
      const attendanceStat = root.querySelector(".colearn-overview > div:nth-child(2) .colearn-stat-value");
      if (attendanceStat) {
        attendanceStat.textContent = "13 / 14";
      }
      feedback("attendance-feedback", "Attendance recorded for today's NCCT cohort session.");
    }
  }

  if (checkInBtn) {
    checkInBtn.addEventListener("click", () => {
      state.attendanceCheckedIn = true;
      updateAttendanceUI();
      save();
    });
  }
  if (state.attendanceCheckedIn) {
    updateAttendanceUI();
  }

  // Career / Job Opportunities Save Toggle
  root.querySelectorAll("[data-save-job]").forEach((button) => {
    const jobId = button.dataset.saveJob;
    const btnText = button.querySelector(".button-text") || button;

    const renderJob = () => {
      const isSaved = state.savedJobs.includes(jobId);
      btnText.textContent = isSaved ? "✓ Saved" : "Save opportunity";
      button.style.backgroundColor = isSaved ? "var(--acid)" : "transparent";
      button.style.borderColor = "var(--black)";
    };

    renderJob();

    button.addEventListener("click", () => {
      state.savedJobs = state.savedJobs.includes(jobId)
        ? state.savedJobs.filter((id) => id !== jobId)
        : [...state.savedJobs, jobId];
      renderJob();
      save();
    });
  });

  // Actionable Notifications with Dismiss and Clear All
  function renderNotifications() {
    const items = root.querySelectorAll("#notification-list li");
    let activeCount = 0;

    items.forEach((item, index) => {
      const isDismissed = state.dismissedNotifications.includes(index);
      item.hidden = isDismissed;
      if (!isDismissed) activeCount++;
    });

    const notifStat = root.querySelector(".colearn-overview > div:nth-child(4) .colearn-stat-value");
    if (notifStat) {
      notifStat.textContent = String(activeCount);
    }
  }

  root.querySelectorAll("#notification-list button").forEach((button, index) => {
    button.addEventListener("click", () => {
      if (!state.dismissedNotifications.includes(index)) {
        state.dismissedNotifications.push(index);
      }
      renderNotifications();
      save();
    });
  });

  const clearNotifsBtn = root.querySelector("#clear-notifications");
  if (clearNotifsBtn) {
    clearNotifsBtn.addEventListener("click", () => {
      const allIndices = [...root.querySelectorAll("#notification-list li")].map((_, i) => i);
      state.dismissedNotifications = allIndices;
      renderNotifications();
      save();
    });
  }

  // SVG Digital Certificate Generation & Instant Download
  const downloadCertBtn = root.querySelector("#download-certificate");
  if (downloadCertBtn) {
    downloadCertBtn.addEventListener("click", () => {
      if (!state.certificateId) {
        state.certificateId = `NCCT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
        updateCertificate();
        save();
      }

      const issueDate = new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });

      const certificateSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="850" viewBox="0 0 1200 850">
  <defs>
    <style>
      .bg { fill: #f7f5f2; }
      .border-outer { fill: none; stroke: #000000; stroke-width: 3; }
      .border-inner { fill: none; stroke: #000000; stroke-width: 1.5; stroke-dasharray: 6 4; }
      .banner { fill: #cfff03; }
      .seal { fill: #cfff03; stroke: #000000; stroke-width: 3; }
      .text-title { font-family: 'Roobert', 'Helvetica Neue', Arial, sans-serif; font-size: 52px; font-weight: 700; fill: #000000; letter-spacing: -0.02em; }
      .text-sub { font-family: 'Roobert', 'Helvetica Neue', Arial, sans-serif; font-size: 24px; font-weight: 500; fill: #444444; }
      .text-name { font-family: 'Roobert', 'Helvetica Neue', Arial, sans-serif; font-size: 44px; font-weight: 700; fill: #000000; }
      .text-course { font-family: 'Roobert', 'Helvetica Neue', Arial, sans-serif; font-size: 32px; font-weight: 600; fill: #000000; }
      .text-meta { font-family: 'Roobert', 'Helvetica Neue', Arial, sans-serif; font-size: 18px; font-weight: 500; fill: #666666; }
      .text-brand { font-family: 'Roobert', 'Helvetica Neue', Arial, sans-serif; font-size: 32px; font-weight: 700; fill: #000000; }
    </style>
  </defs>
  <rect width="1200" height="850" class="bg" />
  <rect x="35" y="35" width="1130" height="780" class="border-outer" />
  <rect x="45" y="45" width="1110" height="760" class="border-inner" />
  <rect x="35" y="35" width="1130" height="20" class="banner" />
  
  <text x="90" y="130" class="text-brand">CoLearn · NCCT</text>
  <text x="90" y="165" class="text-meta">NATIONAL CENTRE FOR CONSTRUCTION &amp; TRADES</text>
  
  <text x="90" y="275" class="text-title">Certificate of Completion</text>
  <text x="90" y="340" class="text-sub">This is to officially certify that</text>
  <text x="90" y="415" class="text-name">Amina Patel</text>
  <line x1="90" y1="435" x2="650" y2="435" stroke="#000000" stroke-width="2" />
  
  <text x="90" y="490" class="text-sub">has successfully completed all modules and practical checks for</text>
  <text x="90" y="550" class="text-course">NCCT Site Safety Essentials</text>
  
  <text x="90" y="650" class="text-meta">Date of Issue: ${issueDate}</text>
  <text x="90" y="685" class="text-meta">Certificate ID: ${state.certificateId}</text>
  <text x="90" y="720" class="text-meta">Verification: https://colearn.org/verify?id=${state.certificateId}</text>
  
  <!-- Official Seal -->
  <circle cx="1020" cy="650" r="75" class="seal" />
  <circle cx="1020" cy="650" r="65" fill="none" stroke="#000000" stroke-width="1.5" stroke-dasharray="4 3" />
  <text x="1020" y="635" text-anchor="middle" font-family="'Roobert', sans-serif" font-size="14" font-weight="700" fill="#000">OFFICIAL</text>
  <text x="1020" y="655" text-anchor="middle" font-family="'Roobert', sans-serif" font-size="20" font-weight="800" fill="#000">VERIFIED</text>
  <text x="1020" y="675" text-anchor="middle" font-family="'Roobert', sans-serif" font-size="14" font-weight="700" fill="#000">NCCT 2026</text>
</svg>`;

      const blob = new Blob([certificateSvg], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${state.certificateId}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      updateCertificate();
    });
  }

  // Certificate Verification Form
  const verifyForm = root.querySelector("#verify-certificate");
  if (verifyForm) {
    verifyForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const codeInput = root.querySelector("#certificate-code");
      const code = codeInput ? codeInput.value.trim().toUpperCase() : "";

      if (!code) {
        feedback("verification-feedback", "Please enter a certificate ID to verify.");
        return;
      }

      const isCurrentCert = state.certificateId && code === state.certificateId;
      const isKnownCert = code === "NCCT-2026-1042" || (code.startsWith("NCCT-2026-") && code.length >= 13);

      if (isCurrentCert || isKnownCert) {
        feedback(
          "verification-feedback",
          `✓ Authentic Credential: ID ${code} is registered to Amina Patel for "NCCT Site Safety Essentials" (Status: Verified & Active).`
        );
      } else {
        feedback("verification-feedback", `Certificate ID "${code}" not found. Please verify the code and try again.`);
      }
    });
  }

  // 360° Factory Viewer with Hotspots, Gyroscope Cardboard & WebXR VR
  const viewer = root.querySelector("#factory-viewer");
  const scene = root.querySelector("#factory-scene");
  const caption = root.querySelector("#viewer-caption");
  let pointerStart = null;
  let pan = 50;

  if (viewer && scene) {
    viewer.addEventListener("pointerdown", (event) => {
      if (event.target.closest(".colearn-hotspot")) return;
      pointerStart = { x: event.clientX, pan };
      viewer.setPointerCapture(event.pointerId);
    });

    viewer.addEventListener("pointermove", (event) => {
      if (!pointerStart) return;
      const deltaX = event.clientX - pointerStart.x;
      pan = Math.max(0, Math.min(100, pointerStart.pan - (deltaX / viewer.clientWidth) * 100));
      scene.style.setProperty("--pan-x", `${pan}%`);
      viewer.style.setProperty("--pan-x", `${pan}%`);
    });

    viewer.addEventListener("pointerup", () => (pointerStart = null));
    viewer.addEventListener("pointercancel", () => (pointerStart = null));

    // Interactive Hotspot descriptions
    const descriptions = {
      conveyor: "Conveyor controls: Power isolation switch and speed governor. Always lock out (LOTO) before maintenance.",
      safety: "Emergency Stop (E-Stop): Push to immediately cut plant power. Verify daily during pre-shift checks.",
      guarding: "Machine guarding: Interlocked physical cage prevents limb intrusion. Never operate if bypassed or damaged.",
      electrical: "Main electrical switchboard: 415V 3-phase supply. Authorised certified technicians only."
    };

    root.querySelectorAll("[data-hotspot]").forEach((hotspot) => {
      hotspot.addEventListener("click", () => {
        root.querySelectorAll(".colearn-hotspot").forEach((h) => h.classList.remove("is-active"));
        hotspot.classList.add("is-active");
        const key = hotspot.dataset.hotspot;
        if (caption) {
          caption.textContent = descriptions[key] || "Inspecting factory component.";
        }
      });
    });

    // Reset View Button
    const resetBtn = root.querySelector("#reset-view");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        pan = 50;
        scene.style.setProperty("--pan-x", "50%");
        viewer.style.setProperty("--pan-x", "50%");
        viewer.classList.remove("is-cardboard");
        root.querySelectorAll(".colearn-hotspot").forEach((h) => h.classList.remove("is-active"));
        if (caption) {
          caption.textContent = "Drag to look around the factory floor. Select a hotspot to inspect the machine.";
        }
        feedback("vr-feedback", "");
      });
    }

    // VR Button - WebXR / Fullscreen Immersive Mode
    const vrBtn = root.querySelector("#enter-vr");
    if (vrBtn) {
      vrBtn.addEventListener("click", async () => {
        try {
          if (navigator.xr && (await navigator.xr.isSessionSupported("immersive-vr"))) {
            const session = await navigator.xr.requestSession("immersive-vr", { optionalFeatures: ["local-floor"] });
            session.addEventListener("end", () => feedback("vr-feedback", "VR session ended."), { once: true });
            feedback("vr-feedback", "Immersive VR connected. Use your headset 6DoF controls to explore the factory.");
            return;
          }
          if (viewer.requestFullscreen) {
            await viewer.requestFullscreen();
            feedback("vr-feedback", "Immersive fullscreen active. Drag or swipe to inspect the factory panorama.");
          } else {
            feedback("vr-feedback", "VR is ready. Drag or swipe across the 360° panorama.");
          }
        } catch {
          feedback("vr-feedback", "VR headset unavailable. Use the interactive 360° drag viewer or mobile Cardboard.");
        }
      });
    }

    // Cardboard Stereoscopic Dual-Viewport & Motion Sensor Mode
    const cardboardBtn = root.querySelector("#enter-cardboard");
    if (cardboardBtn) {
      cardboardBtn.addEventListener("click", async () => {
        try {
          if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") {
            const permission = await DeviceOrientationEvent.requestPermission();
            if (permission !== "granted") throw new Error("permission_declined");
          }

          if (viewer.requestFullscreen && !document.fullscreenElement) {
            try {
              await viewer.requestFullscreen();
            } catch {
              // Fullscreen optional
            }
          }

          viewer.classList.toggle("is-cardboard");
          const isCardboard = viewer.classList.contains("is-cardboard");

          if (isCardboard) {
            window.addEventListener("deviceorientation", handleDeviceOrientation);
            feedback(
              "vr-feedback",
              "Cardboard stereoscopic mode active. Insert your phone into your Google Cardboard viewer and turn your head."
            );
          } else {
            window.removeEventListener("deviceorientation", handleDeviceOrientation);
            feedback("vr-feedback", "Standard view restored.");
          }
        } catch {
          viewer.classList.toggle("is-cardboard");
          feedback(
            "vr-feedback",
            "Cardboard split-screen enabled. For motion tracking, open on a mobile phone with gyroscope support."
          );
        }
      });

      function handleDeviceOrientation(event) {
        if (event.gamma === null) return;
        pan = Math.max(0, Math.min(100, 50 + event.gamma / 1.5));
        scene.style.setProperty("--pan-x", `${pan}%`);
        viewer.style.setProperty("--pan-x", `${pan}%`);
      }
    }
  }

  // Smooth scroll for internal portal links
  root.querySelectorAll("[data-portal-view]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.dataset.portalView === "profile" ? "learner-profile" : link.dataset.portalView;
      const target = root.querySelector(`#${targetId}`);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Initial render
  renderModules();
  renderNotifications();
  save();
})();