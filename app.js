// app.js — Polaris (Menu + i18n + Smooth Scroll + How Toggle)

(function () {
  const $ = (id) => document.getElementById(id);

  // Year
  const yearEl = $("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // =========================
  // Menu elements
  // =========================
  const menuBtn = $("menuBtn");
  const menuPanel = $("menuPanel");
  const menuClose = $("menuClose");
  const menuBackdrop = $("menuBackdrop");

  // About accordion inside menu
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

  // Close menu when clicking any menu link
  if (menuPanel) {
    menuPanel.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (a) closeMenu();
    });
  }

  // About accordion in menu
  function toggleMenuAbout() {
    if (!menuAboutToggle || !menuAboutPanel) return;
    const isOpen = menuAboutToggle.getAttribute("aria-expanded") === "true";
    menuAboutToggle.setAttribute("aria-expanded", String(!isOpen));
    menuAboutPanel.hidden = isOpen;
  }
  if (menuAboutToggle) menuAboutToggle.addEventListener("click", toggleMenuAbout);

  // =========================
  // Smooth Scroll for in-page anchors
  // =========================
  function scrollToEl(el) {
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;

    const href = a.getAttribute("href");
    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    scrollToEl(target);
  });

  // =========================
  // How It Works Toggle (fix: section was half-open / visible)
  // =========================
  const howToggle = $("howToggle");
  const howSection = $("how");

  function setHowOpen(open) {
    if (!howSection || !howToggle) return;

    // Because in your HTML you used: style="display:none;"
    howSection.style.display = open ? "" : "none";
    howSection.setAttribute("aria-hidden", open ? "false" : "true");
    howToggle.setAttribute("aria-expanded", open ? "true" : "false");

    if (open) {
      // small delay so layout settles then scroll
      setTimeout(() => scrollToEl(howSection), 40);
    }
  }

  // start CLOSED always (important)
  if (howSection) {
    howSection.style.display = "none";
    howSection.setAttribute("aria-hidden", "true");
  }
  if (howToggle) {
    howToggle.setAttribute("aria-expanded", "false");
    howToggle.addEventListener("click", () => {
      const isHidden = howSection && howSection.style.display === "none";
      setHowOpen(isHidden);
    });
  }

  // If user loads with #how in URL, open it
  if (window.location.hash === "#how") {
    setTimeout(() => setHowOpen(true), 60);
  }

  // =========================
  // i18n (EN / AR)
  // =========================
  const langToggle = $("langToggle");
  const html = document.documentElement;

  // IMPORTANT:
  // Your HTML uses keys like: cta_primary, filter_all, pill_catalog...
  // Previously your dict had different keys (cta_apply, chip_all...),
  // so translation was missing for some parts.
  // Now we support ALL keys used in index.html.

  const dict = {
    en: {
      // top
      brand_name: "Polaris Global Institute",
      menu: "Menu",
      signin: "Sign in",

      // hero
      badge: "A Global Academic Learning Platform",
      hero_title: "Polaris Global Institute",
      hero_subtitle: "Structured learning for AI, cybersecurity, and future skills — built with academic rigor.",

      cta_primary: "Apply to Founding Fellowship",
      cta_secondary: "Explore Courses",

      pill_catalog: "Browse Catalog",
      pill_program: "Fellowship Program",
      pill_how: "How It Works",

      // courses
      courses_title: "Courses",
      courses_sub: "A curated set of courses will appear here next week.",

      filter_all: "All",
      filter_polaris: "Polaris Programs",
      filter_curated: "Curated Tracks (MIT/Harvard)",

      // buttons
      btn_view: "View",
      btn_enroll: "Enroll",

      // how section
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

      // program
      program_title: "Founding Fellowship — Cohort 01",
      program_sub: "A selective group. Deep learning. Real outcomes.",
      wk_1_title: "Weeks 1–3 — Foundations",
      wk_1_meta: "Mental models + core clarity",
      wk_1_p: "Mental models, core concepts, and practical clarity.",
      wk_2_title: "Weeks 4–7 — Applied Track",
      wk_2_meta: "Mini-projects + iteration",
      wk_2_p: "Build mini-projects, iterate, and refine.",
      wk_3_title: "Weeks 8–10 — Security Track",
      wk_3_meta: "Defensive thinking",
      wk_3_p: "Defensive thinking and responsible implementation.",
      wk_4_title: "Weeks 11–12 — Capstone",
      wk_4_meta: "Ship + present + review",
      wk_4_p: "Ship a real project and present it with peer review.",

      // apply
      apply_title: "Apply to Join Polaris",
      apply_p: "Start with a small circle of committed learners. Apply to the founding cohort.",
      apply_btn: "Open Application",
      apply_note: "Applications open soon.",

      // footer
      footer_tag: "Structured learning. Built to scale.",
      footer_email_label: "Email:",

      // menu nav
      nav_courses: "Courses",
      nav_program: "Program",
      nav_principles: "Principles",
      nav_terms: "Terms",
      nav_privacy: "Privacy",
      nav_contact: "Contact",
      nav_dashboard: "My Learning",

      // about
      about_title: "About Polaris",
      about_p1: "Polaris Global Institute is an independent learning initiative focused on rigorous, structured education.",
      about_p2: "We start small, build real capability, and scale with quality — not noise.",
      pillars_title: "Program Pillars",
      pl_1: "Clear mental models",
      pl_2: "Applied projects",
      pl_3: "Peer review",
      pl_4: "Progress tracking",

      menu_note: "Clean, structured learning — built to scale."
    },

    ar: {
      // top
      brand_name: "معهد بولاريس العالمي",
      menu: "القائمة",
      signin: "تسجيل الدخول",

      // hero
      badge: "منصة تعليمية أكاديمية عالمية",
      hero_title: "Polaris Global Institute",
      hero_subtitle: "تعليم منظم للذكاء الاصطناعي والأمن السيبراني ومهارات المستقبل — بجودة أكاديمية.",

      cta_primary: "التقديم للفوج التأسيسي",
      cta_secondary: "استعراض الدورات",

      pill_catalog: "استعراض الكتالوج",
      pill_program: "برنامج الفوج",
      pill_how: "كيف يعمل",

      // courses
      courses_title: "الدورات",
      courses_sub: "سيتم إضافة مجموعة دورات مختارة هنا الأسبوع القادم.",

      filter_all: "الكل",
      filter_polaris: "برامج بولاريس",
      filter_curated: "مسارات مختارة (MIT/Harvard)",

      // buttons
      btn_view: "عرض",
      btn_enroll: "الانضمام",

      // how section
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

      // program
      program_title: "البرنامج التأسيسي — Cohort 01",
      program_sub: "مجموعة منتقاة. تعلم عميق. نتائج حقيقية.",
      wk_1_title: "الأسابيع 1–3 — الأساسيات",
      wk_1_meta: "نماذج ذهنية + وضوح",
      wk_1_p: "نماذج ذهنية ومفاهيم أساسية ووضوح عملي.",
      wk_2_title: "الأسابيع 4–7 — المسار التطبيقي",
      wk_2_meta: "مشاريع صغيرة + تحسين",
      wk_2_p: "بناء مشاريع صغيرة وتحسينها خطوة بخطوة.",
      wk_3_title: "الأسابيع 8–10 — مسار الأمن",
      wk_3_meta: "تفكير دفاعي",
      wk_3_p: "تفكير دفاعي وتطبيق مسؤول.",
      wk_4_title: "الأسابيع 11–12 — مشروع التخرج",
      wk_4_meta: "إطلاق + عرض + مراجعة",
      wk_4_p: "إطلاق مشروع حقيقي وعرضه مع مراجعة جماعية.",

      // apply
      apply_title: "التقديم للانضمام إلى Polaris",
      apply_p: "ابدأ بدائرة صغيرة من متعلمين ملتزمين. قدّم للفوج التأسيسي.",
      apply_btn: "فتح نموذج التقديم",
      apply_note: "التقديم سيفتح قريباً.",

      // footer
      footer_tag: "تعليم منظم. قابل للتوسع.",
      footer_email_label: "البريد:",

      // menu nav
      nav_courses: "الدورات",
      nav_program: "البرنامج",
      nav_principles: "المبادئ",
      nav_terms: "الشروط",
      nav_privacy: "الخصوصية",
      nav_contact: "التواصل",
      nav_dashboard: "تعلمي",

      // about
      about_title: "عن Polaris",
      about_p1: "Polaris مبادرة تعليمية مستقلة تركّز على تعليم منظم بجودة عالية.",
      about_p2: "نبدأ صغيراً، نبني قدرة حقيقية، ثم نتوسع بالجودة — لا بالضجيج.",
      pillars_title: "ركائز البرنامج",
      pl_1: "نماذج ذهنية واضحة",
      pl_2: "مشاريع تطبيقية",
      pl_3: "مراجعة جماعية",
      pl_4: "تتبع التقدم",

      menu_note: "تعليم نظيف ومنظم — قابل للتوسع."
    }
  };

  function applyLang(lang) {
    const isArabic = lang === "ar";
    html.setAttribute("lang", isArabic ? "ar" : "en");
    html.setAttribute("dir", isArabic ? "rtl" : "ltr");

    // Toggle button label
    if (langToggle) langToggle.textContent = isArabic ? "English" : "العربية";

    // Apply translations
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const val = dict[lang] && dict[lang][key];
      if (val) el.textContent = val;
    });

    // save
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
})();
