// app.js — Polaris (Menu + i18n + Smooth Scroll + How Toggle + Dynamic Catalog)

(function () {
  const $ = (id) => document.getElementById(id);

  // -------------------------
  // Helpers: base-safe URLs (GitHub Pages project OR custom domain)
  // -------------------------
  const BASE_URL = new URL(document.baseURI); // always correct for current page
  function url(path) {
    // path like "images/..." or "data/courses.json"
    return new URL(path, BASE_URL).toString();
  }

  // -------------------------
  // Year
  // -------------------------
  const yearEl = $("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // -------------------------
  // Menu (drawer)
  // -------------------------
  const menuBtn = $("menuBtn");
  const menuPanel = $("menuPanel");
  const menuClose = $("menuClose");
  const menuBackdrop = $("menuBackdrop");

  const menuAboutToggle = $("menuAboutToggle");
  const menuAboutPanel = $("menuAboutPanel");

  function openMenu() {
    if (!menuPanel || !menuBackdrop || !menuBtn) return;
    menuPanel.classList.add("is-open");
    menuBackdrop.classList.add("is-open");
    menuPanel.setAttribute("aria-hidden", "false");
    menuBackdrop.setAttribute("aria-hidden", "false");
    menuBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    if (!menuPanel || !menuBackdrop || !menuBtn) return;
    menuPanel.classList.remove("is-open");
    menuBackdrop.classList.remove("is-open");
    menuPanel.setAttribute("aria-hidden", "true");
    menuBackdrop.setAttribute("aria-hidden", "true");
    menuBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  if (menuBtn) menuBtn.addEventListener("click", openMenu);
  if (menuClose) menuClose.addEventListener("click", closeMenu);
  if (menuBackdrop) menuBackdrop.addEventListener("click", closeMenu);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  if (menuPanel) {
    menuPanel.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (a) closeMenu();
    });
  }

  function toggleMenuAbout() {
    if (!menuAboutToggle || !menuAboutPanel) return;
    const isOpen = menuAboutToggle.getAttribute("aria-expanded") === "true";
    menuAboutToggle.setAttribute("aria-expanded", String(!isOpen));
    menuAboutPanel.hidden = isOpen;
  }
  if (menuAboutToggle) menuAboutToggle.addEventListener("click", toggleMenuAbout);

  // -------------------------
  // How It Works toggle (fix half-open)
  // -------------------------
  const howToggle = $("howToggle");
  const howSection = $("how");

  function setHow(open) {
    if (!howSection || !howToggle) return;

    howSection.classList.toggle("is-open", open);
    howSection.classList.toggle("is-collapsed", !open);

    // IMPORTANT: do NOT rely on CSS "display:none" only
    howSection.style.display = open ? "" : "none";

    howSection.setAttribute("aria-hidden", String(!open));
    howToggle.setAttribute("aria-expanded", String(open));

    if (open) howSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (howSection) {
    howSection.classList.add("is-collapsed");
    howSection.classList.remove("is-open");
    howSection.style.display = "none";
    howSection.setAttribute("aria-hidden", "true");
  }
  if (howToggle) {
    howToggle.setAttribute("aria-expanded", "false");
    howToggle.addEventListener("click", () => {
      const isOpen = howToggle.getAttribute("aria-expanded") === "true";
      setHow(!isOpen);
    });
  }

  // Smooth scroll for anchors
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;

    const href = a.getAttribute("href");
    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    if (href === "#how") setHow(true);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // -------------------------
  // i18n (EN / AR)
  // -------------------------
  const langToggle = $("langToggle");
  const html = document.documentElement;

  const dict = {
    en: {
      brand_name: "Polaris Global Institute",
      menu_title: "Polaris",
      menu: "Menu",
      signin: "Sign in",
      badge: "A Global Academic Learning Platform",
      hero_title: "Polaris Global Institute",
      hero_subtitle: "Structured learning for AI, cybersecurity, and future skills — built with academic rigor.",
      cta_primary: "Apply to Founding Fellowship",
      cta_secondary: "Explore Courses",
      pill_how: "How It Works",
      pill_program: "Fellowship Program",
      pill_catalog: "Browse Catalog",
      courses_title: "Courses",
      courses_sub: "A curated set of courses will appear here next week.",
      filter_all: "All",
      filter_polaris: "Polaris Programs",
      filter_curated: "Curated Tracks (MIT/Harvard)",
      btn_view: "View",
      btn_enroll: "Enroll",
      how_title: "How Polaris Works",
      how_sub: "A clean system: learn with structure, build real output, and earn review.",
      how_1_t: "Cohort Learning",
      how_1_p: "Small groups. Strong focus. Clear weekly rhythm.",
      how_1_m1: "Cohort 01",
      how_1_m2: "Account-based",
      how_2_t: "12-Week Structure",
      how_2_p: "Foundations → applied track → security thinking → capstone.",
      how_2_m1: "12 weeks",
      how_2_m2: "Structured program",
      how_3_t: "Build + Review",
      how_3_p: "Ship real work. Get peer feedback. Improve the craft.",
      how_3_m1: "Projects",
      how_3_m2: "Peer review",
      program_title: "Founding Fellowship — Cohort 01",
      program_sub: "A selective group. Deep learning. Real outcomes.",
      apply_title: "Apply to Join Polaris",
      apply_p: "Start with a small circle of committed learners. Apply to the founding cohort.",
      apply_btn: "Open Application",
      apply_note: "Applications open soon.",
      footer_tag: "Structured learning. Built to scale.",
      footer_email_label: "Email:",
      menu_note: "Clean, structured learning — built to scale.",
      nav_courses: "Courses",
      nav_program: "Program",
      nav_principles: "Principles",
      nav_terms: "Terms",
      nav_privacy: "Privacy",
      nav_contact: "Contact",
      nav_dashboard: "My Learning",
      about_title: "About Polaris",
      about_p1: "Polaris Global Institute is an independent learning initiative focused on rigorous, structured education.",
      about_p2: "We start small, build real capability, and scale with quality — not noise.",
      pillars_title: "Program Pillars",
      pl_1: "Clear mental models",
      pl_2: "Applied projects",
      pl_3: "Peer review",
      pl_4: "Progress tracking",
    },

    ar: {
      brand_name: "معهد بولاريس العالمي",
      menu_title: "بولاريس",
      menu: "القائمة",
      signin: "تسجيل الدخول",
      badge: "منصة تعليمية أكاديمية عالمية",
      hero_title: "Polaris Global Institute",
      hero_subtitle: "تعليم منظم للذكاء الاصطناعي والأمن السيبراني ومهارات المستقبل — بجودة أكاديمية.",
      cta_primary: "التقديم للفوج التأسيسي",
      cta_secondary: "استكشاف الدورات",
      pill_how: "كيف يعمل",
      pill_program: "البرنامج التأسيسي",
      pill_catalog: "تصفح المحتوى",
      courses_title: "الدورات",
      courses_sub: "سيتم إضافة مجموعة دورات مختارة هنا الأسبوع القادم.",
      filter_all: "الكل",
      filter_polaris: "برامج بولاريس",
      filter_curated: "مسارات مختارة (MIT/Harvard)",
      btn_view: "عرض",
      btn_enroll: "الانضمام",
      how_title: "كيف يعمل Polaris",
      how_sub: "نظام نظيف: تعلم منظم، مخرجات حقيقية، ومراجعة مستمرة.",
      how_1_t: "تعلم ضمن مجموعة",
      how_1_p: "مجموعات صغيرة. تركيز قوي. إيقاع أسبوعي واضح.",
      how_1_m1: "الفوج 01",
      how_1_m2: "بحساب المستخدم",
      how_2_t: "هيكل 12 أسبوعًا",
      how_2_p: "أساسيات → تطبيق → تفكير أمني → مشروع ختامي.",
      how_2_m1: "12 أسبوعًا",
      how_2_m2: "برنامج منظم",
      how_3_t: "بناء + مراجعة",
      how_3_p: "ابنِ عملًا حقيقيًا. احصل على ملاحظات. حسّن الحرفة.",
      how_3_m1: "مشاريع",
      how_3_m2: "مراجعة جماعية",
      program_title: "البرنامج التأسيسي — Cohort 01",
      program_sub: "مجموعة منتقاة. تعلم عميق. نتائج حقيقية.",
      apply_title: "التقديم للانضمام إلى Polaris",
      apply_p: "ابدأ بدائرة صغيرة من متعلمين ملتزمين. قدّم للفوج التأسيسي.",
      apply_btn: "فتح نموذج التقديم",
      apply_note: "التقديم سيفتح قريباً.",
      footer_tag: "تعليم منظم. قابل للتوسع.",
      footer_email_label: "البريد:",
      menu_note: "تعليم نظيف ومنظم — قابل للتوسع.",
      nav_courses: "الدورات",
      nav_program: "البرنامج",
      nav_principles: "المبادئ",
      nav_terms: "الشروط",
      nav_privacy: "الخصوصية",
      nav_contact: "التواصل",
      nav_dashboard: "تعلمي",
      about_title: "عن Polaris",
      about_p1: "Polaris مبادرة تعليمية مستقلة تركّز على تعليم منظم بجودة عالية.",
      about_p2: "نبدأ صغيراً، نبني قدرة حقيقية، ثم نتوسع بالجودة — لا بالضجيج.",
      pillars_title: "ركائز البرنامج",
      pl_1: "نماذج ذهنية واضحة",
      pl_2: "مشاريع تطبيقية",
      pl_3: "مراجعة جماعية",
      pl_4: "تتبع التقدم",
    }
  };

  function applyLang(lang) {
    const isArabic = lang === "ar";
    html.setAttribute("lang", isArabic ? "ar" : "en");
    html.setAttribute("dir", isArabic ? "rtl" : "ltr");

    if (langToggle) langToggle.textContent = isArabic ? "English" : "العربية";

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const val = dict[lang]?.[key];
      if (val) el.textContent = val;
    });

    try { localStorage.setItem("pgi_lang", lang); } catch {}
  }

  function getSavedLang() {
    try { return localStorage.getItem("pgi_lang"); } catch { return null; }
  }

  const saved = getSavedLang();
  const initial = saved || "en";
  applyLang(initial);

  if (langToggle) {
    langToggle.addEventListener("click", () => {
      const current = html.getAttribute("lang") === "ar" ? "ar" : "en";
      applyLang(current === "ar" ? "en" : "ar");
    });
  }

  // -------------------------
  // Dynamic Catalog (courses.json) + Filters
  // -------------------------
  const grid = $("catalogGrid");
  const filterBar = document.querySelector(".catalogFilters");

  // ✅ Image-only card (no overlay text at all)
  function cardHTML(c) {
    const href = c.href || "#";

    // support both "image" and "img" from JSON
    const imgPath = c.image || c.img || "";
    const imgSrc = imgPath ? url(imgPath) : "";

    const title = c.title || "Course";

    return `
      <article class="catalogCard catalogCard--imageOnly" data-cat="${(c.category || c.type || "all").toLowerCase()}">
        <a class="cardLink" href="${href}" aria-label="${title}"></a>

        <div class="catalogMedia">
          ${imgSrc ? `<img class="catalogImg" src="${imgSrc}" alt="${title} cover" loading="lazy" onerror="this.style.display='none'">` : ""}
        </div>
      </article>
    `;
  }

  function applyFilter(cat) {
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll(".catalogCard"));
    cards.forEach((el) => {
      const c = (el.getAttribute("data-cat") || "all").toLowerCase();
      const show = (cat === "all") || (c === cat);
      el.style.display = show ? "" : "none";
    });
  }

  async function loadCourses() {
    if (!grid) return;

    const jsonURL = url("data/courses.json");

    try {
      const res = await fetch(jsonURL, { cache: "no-store" });
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
      const data = await res.json();

      const list = Array.isArray(data) ? data : (data.courses || []);
      if (!Array.isArray(list) || list.length === 0) throw new Error("Empty courses list");

      grid.innerHTML = list.map(cardHTML).join("");
      applyFilter("all");
    } catch (err) {
      console.error("Catalog load error:", err);
      grid.innerHTML = `
        <div class="p muted" style="padding:14px;">
          Catalog could not load. Please check <b>data/courses.json</b> path and GitHub Pages deployment.
        </div>
      `;
    }
  }

  // Filter clicks
  if (filterBar) {
    filterBar.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-filter]");
      if (!btn) return;

      const allBtns = Array.from(filterBar.querySelectorAll("button[data-filter]"));
      allBtns.forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      const cat = (btn.getAttribute("data-filter") || "all").toLowerCase();
      applyFilter(cat);
    });
  }

  loadCourses();
})();
