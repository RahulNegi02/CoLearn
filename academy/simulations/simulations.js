(() => {
  const simulations = {
    dam: {
      title: "Hydroelectric power plant",
      source: "/Dam/Dam-Simulation/mm/neue-energien/wasserkraft/",
    },
    solar: {
      title: "Solar thermal circulation",
      source: "/Solar/Solar-Panel/mm/neue-energien/solarthermie/",
    },
    wind: {
      title: "Wind power generation",
      source: "/Wind-Power/Wind-Power/mm/neue-energien/windkraft/",
    },
  };

  const frame = document.querySelector("#simulation-frame");
  const title = document.querySelector("#simulation-view-title");
  const instructions = document.querySelector("#simulation-instructions");

  function setEmbeddedSimulation(name) {
    const simulation = simulations[name];
    if (!simulation) return;

    if (frame) {
      frame.src = simulation.source;
      frame.title = `${simulation.title} interactive simulation`;
    }
    if (title) title.textContent = `${simulation.title} (Live Lab)`;
    if (instructions) {
      instructions.innerHTML = `Loaded <strong>${simulation.title}</strong> in the interactive canvas. <a href="${simulation.source}" target="_blank" rel="noopener" style="text-decoration:underline; font-weight:700; margin-left:0.5rem; color:var(--black);">Open full window in new tab ↗</a>`;
    }
    document.querySelectorAll("[data-simulation]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.simulation === name));
    });
  }

  function launchInTab(name) {
    const simulation = simulations[name];
    if (!simulation) return;
    
    // Open in a new tab immediately
    window.open(simulation.source, "_blank", "noopener,noreferrer");
    setEmbeddedSimulation(name);
  }

  // Bind launch buttons
  document.querySelectorAll("[data-launch-simulation]").forEach((button) => {
    button.addEventListener("click", (e) => {
      const name = button.dataset.launchSimulation;
      if (name) {
        launchInTab(name);
      }
    });
  });

  // Bind embedded tab switchers
  document.querySelectorAll("[data-simulation]").forEach((button) => {
    button.addEventListener("click", (e) => {
      const name = button.dataset.simulation;
      if (name) {
        // If it's an explicit launch button or has target="_blank", open tab
        if (button.tagName === "A" && button.getAttribute("target") === "_blank") {
          launchInTab(name);
        } else {
          setEmbeddedSimulation(name);
        }
      }
    });
  });
})();
