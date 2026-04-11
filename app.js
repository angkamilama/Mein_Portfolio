const projects = [
  {
    name: "Zwischen_Zeugnis",
    image: "./Zertifikate/Zwischen_Zeugnis.jpg",
    title: "Zwischenzeugnis",
  },
  {
    name: "Linux_Essential",
    image: "./Zertifikate/Linux_Essential.jpg",
    title: "Linux Essentials Zertifikat",
  },
  {
    name: "AZ_900",
    image: "./Zertifikate/AZ_900.jpg",
    title: "Microsoft Azure AZ-900",
  },
  {
    name: "DP_900",
    image: "./Zertifikate/DP_900.jpg",
    title: "Microsoft DP-900",
  },
  {
    name: "Tel_B_one",
    image: "./Zertifikate/Tel_B_one.jpg",
    title: "Deutsch B1 Zertifikat",
  },
  {
    name: "B2_Bescheinigung",
    image: "./Zertifikate/B2_Bescheinigung.jpg",
    title: "Deutsch B2 Bescheinigung",
  },
  { name: "HTML", image: "./Zertifikate/HTML.jpg", title: "HTML Grundlagen" },
  {
    name: "Codeacademy",
    image: "./Zertifikate/Codeacademy.jpg",
    title: "Responsive Webdesign (Codecademy)",
  },
  {
    name: "Datenschutz",
    image: "./Zertifikate/Datenschutz.jpg",
    title: "Datenschutz Zertifikat",
  },
  {
    name: "Brandschutz",
    image: "./Zertifikate/Brandschutz.jpg",
    title: "Brandschutz Schulung",
  },
  {
    name: "Bachelor_Abschluss",
    image: "./Zertifikate/Bachelor_Abschluss.jpg",
    title: "Bachelor in Gender und Diversity (Deutschland)",
  },
  {
    name: "TU_BBS",
    image: "./Zertifikate/TU_BBS.jpg",
    title: "Bachelor in Business Studies (Nepal)",
  },
];

document.addEventListener("DOMContentLoaded", () => {

  // ─── HAMBURGER MENU ────────────────────────────────────────────────────────
  const menuBtn = document.getElementById("menu-btn");
  const navList = document.getElementById("nav-list");
  const bar1 = document.getElementById("bar1");
  const bar2 = document.getElementById("bar2");
  const bar3 = document.getElementById("bar3");

  if (menuBtn && navList) {
    menuBtn.addEventListener("click", () => {
      navList.classList.toggle("hidden");
      navList.classList.toggle("flex");

      const isOpen = navList.classList.contains("flex");
      menuBtn.setAttribute("aria-expanded", String(isOpen));

      if (bar1 && bar2 && bar3) {
        bar1.classList.toggle("translate-y-[7px]", isOpen);
        bar1.classList.toggle("rotate-45", isOpen);
        bar2.classList.toggle("opacity-0", isOpen);
        bar3.classList.toggle("-translate-y-[7px]", isOpen);
        bar3.classList.toggle("-rotate-45", isOpen);
      }
    });
  }

  // ─── SLIDER (index.html) ───────────────────────────────────────────────────
  const prevBtn = document.querySelector(".btn-prev");
  const nextBtn = document.querySelector(".btn-next");
  const projectInfo = document.querySelector(".project-info");

  if (prevBtn && nextBtn && projectInfo) {
    let index = 0;

    function showAnotherProject(nextIndex) {
      index =
        ((nextIndex % projects.length) + projects.length) % projects.length;
      displayProject();
    }

    function displayProject() {
      const p = projects[index];
      projectInfo.innerHTML = `
        <div class="flex flex-col items-center w-fit mx-auto h-full">
          <h2 class="text-xl text-center mb-3 font-semibold font-['Poppins',sans-serif]">
            ${p.title}
          </h2>
          <img
            src="${p.image}"
            alt="${p.name}"
            class="block max-h-[420px] w-auto object-contain border-4 border-sky-200 rounded-lg shadow-md"
          />
        </div>`;
    }

    prevBtn.addEventListener("click", () => showAnotherProject(index - 1));
    nextBtn.addEventListener("click", () => showAnotherProject(index + 1));
    displayProject();
  }

  // ─── CERTIFICATE GRID (Zertifikate.html) ──────────────────────────────────
  const grid = document.getElementById("cert-grid");

  if (grid) {
    projects.forEach((p) => {
      const card = document.createElement("div");
      card.className = "flex flex-col items-center gap-2 cursor-pointer group";
      card.innerHTML = `
        <div class="w-full overflow-hidden rounded-lg border-2 border-sky-200 shadow hover:shadow-lg transition-shadow duration-200 mb-1">
          <img
            src="${p.image}"
            alt="${p.name}"
            loading="lazy"
            ondragstart="return false;"
            class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <p class="text-xs text-center text-slate-700 px-1 font-medium mb-6">${p.title}</p>
      `;

      const imgElement = card.querySelector("img");
      imgElement.addEventListener("contextmenu", (e) => e.preventDefault());

      card.addEventListener("click", () => openCert(p.image, p.title));
      grid.appendChild(card);
    });

    document.getElementById("btn-zoom-in").addEventListener("click", zoomIn);
    document.getElementById("btn-zoom-out").addEventListener("click", zoomOut);
    document.getElementById("btn-close").addEventListener("click", closeModal);

    document.getElementById("certModal").addEventListener("click", (e) => {
      if (e.target.id === "certModal") closeModal();
    });

    document
      .getElementById("certModalImage")
      .addEventListener("contextmenu", (e) => {
        e.preventDefault();
      });

    document.addEventListener("keydown", (e) => {
      const modal = document.getElementById("certModal");
      if (modal && !modal.classList.contains("hidden")) {
        if (e.key === "Escape") closeModal();
        if (e.key === "+") zoomIn();
        if (e.key === "-") zoomOut();
      }
    });
  }

  // ─── EMAILJS / KONTAKT FORM (Kontakt.html) ────────────────────────────────
  const form = document.getElementById("form");
  const sendBtn = document.getElementById("Nachricht_button");

  if (form && sendBtn) {
    emailjs.init("E1t_0LZES1YhuyeUP");

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      sendBtn.value = "Sending...";

      const serviceID = "service_psdvyc9";
      const templateID = "template_wwncdiq";

      emailjs.sendForm(serviceID, templateID, this).then(
        () => {
          sendBtn.value = "Nachricht senden";
          alert("Email erfolgreich gesendet!");
          form.reset();
        },
        (err) => {
          sendBtn.value = "Nachricht senden";
          alert("Fehler beim Senden: " + JSON.stringify(err));
        }
      );
    });
  }

});

// ─── ZOOM ─────────────────────────────────────────────────────────────────────
let currentZoom = 75;
const ZOOM_STEP = 25;
const ZOOM_MIN = 50;
const ZOOM_MAX = 200;

function applyZoom() {
  const img = document.getElementById("certModalImage");
  if (img) {
    img.style.width = currentZoom + "%";
  }
}

function zoomIn() {
  if (currentZoom < ZOOM_MAX) {
    currentZoom += ZOOM_STEP;
    applyZoom();
  }
}

function zoomOut() {
  if (currentZoom > ZOOM_MIN) {
    currentZoom -= ZOOM_STEP;
    applyZoom();
  }
}

function resetZoom() {
  currentZoom = 100;
  applyZoom();
}

// ─── MODAL ────────────────────────────────────────────────────────────────────
function openCert(src, title) {
  const modal = document.getElementById("certModal");
  const container = document.getElementById("modalImageContainer");
  if (!modal) return;

  currentZoom = 75;
  applyZoom();

  if (container) {
    container.scrollTop = 0;
    container.scrollLeft = 0;
  }

  document.getElementById("certModalImage").src = src;
  document.getElementById("certModalTitle").textContent = title;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeModal() {
  const modal = document.getElementById("certModal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}
