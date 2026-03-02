// app.js — Polaris (Menu + i18n + Smooth Scroll + Open Hidden Sections)

(function () {
  const $ = (id) => document.getElementById(id);

  // Year
  const yearEl = $("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Menu elements
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
  // Collapsible sections (open only when clicked)
  // =========================
  function openSection(selector) {
    const sec = document.querySelector(selector);
    if (!sec) return;

    // if hidden, show it
    if (sec.classList.contains("is-hidden")) {
      sec.classList.remove("is-hidden");
    }

    // smooth scroll
    sec.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // handle clicks:
  // - in-page anchors
  // - open hidden sections via data-open-section
  document.addEventListener("click", (e) => {
    const openEl = e.target.closest("[data-open-section]");
    if (openEl) {
      const targetSel = openEl.getAttribute("data-open-section");
      if (targetSel) {
        e.preventDefault();
        openSection(targetSel);
        return;
      }
    }

    const a = e.target.closest('a[href^="#"]');
    if (!a) return;

    const href = a.getAttribute("href");
    const target = document.querySelector(href);
    if (!target) return;

    // if target is hidden, open it first
    if (target.classList && target.classList.contains("is-hidden")) {
      e.preventDefault();
      openSection(href);
      return;
    }

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // =========================
  // i18n (EN / AR)
  // =========================
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

      cta_apply: "Apply",
      cta_catalog: "Browse Courses",

      pill_how: "How It Works",
      pill_program: "Program",
      pill_courses: "Courses",

      courses_title: "Courses",
      courses_sub: "A curated set of courses will appear here next week.",

      chip_all: "All",
      chip_polaris: "Polaris Programs",
      chip_curated: "Curated Tracks (MIT/Harvard)",

      badge_ai: "AI",
      badge_sec: "SEC",
      badge_build: "BUILD",
      org_polaris: "Polaris",
      org_curated: "Curated",

      c1_title: "AI Foundations (Core Program)",
      c1_desc: "A structured start: mental models, practice, and project output.",
      c1_m1: "12 weeks",
      c1_m2: "Beginner → Intermediate",
      c1_m3: "Project-based",

      c2_title: "Cybersecurity Essentials (Curated Track)",
      c2_desc: "A clean path from trusted partners, wrapped into a Polaris track.",
      c2_m1: "6–8 weeks",
      c2_m2: "Intro",
      c2_m3: "Guided",

      c3_title: "Software Engineering — Builder Track",
      c3_desc: "Ship real features, review code, and develop production habits.",
      c3_m1: "10 weeks",
      c3_m2: "Intermediate",
      c3_m3: "Build + Review",

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
      wk_1_t_full: "Weeks 1–3 — Foundations",
      wk_1_meta: "Mental models + core clarity",
      wk_1_p: "Mental models, core concepts, and practical clarity.",
      wk_2_t_full: "Weeks 4–7 — Applied Track",
      wk_2_meta: "Mini-projects + iteration",
      wk_2_p: "Build mini-projects, iterate, and refine.",
      wk_3_t_full: "Weeks 8–10 — Security Track",
      wk_3_meta: "Defensive thinking",
      wk_3_p: "Defensive thinking and responsible implementation.",
      wk_4_t_full: "Weeks 11–12 — Capstone",
      wk_4_meta: "Ship + present + review",
      wk_4_p: "Ship a real project and present it with peer review.",

      apply_title: "Apply to Join Polaris",
      apply_p: "Start with a small circle of committed learners. Apply to the founding cohort.",
      apply_btn: "Open Application",
      apply_note: "Applications open soon.",

      footer_tag: "Structured learning. Built to scale.",
      footer_email_label: "Email:",
      menu_note: "Clean, structured learning — built to scale.",

      nav_courses: "Courses",
      nav_how: "How It Works",
      nav_program: "Program",
      nav_apply: "Apply",
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

      cta_apply: "التقديم",
      cta_catalog: "استعراض الدورات",

      pill_how: "كيف يعمل",
      pill_program: "البرنامج",
      pill_courses: "الدورات",

      courses_title: "الدورات",
      courses_sub: "سيتم إضافة مجموعة دورات مختارة هنا الأسبوع القادم.",

      chip_all: "الكل",
      chip_polaris: "برامج بولاريس",
      chip_curated: "مسارات مختارة (MIT/Harvard)",

      badge_ai: "AI",
      badge_sec: "SEC",
      badge_build: "BUILD",
      org_polaris: "Polaris",
      org_curated: "Curated",

      c1_title: "أساسيات الذكاء الاصطناعي (البرنامج الأساسي)",
      c1_desc: "بداية منظمة: نماذج ذهنية، تدريب، ومخرجات مشروع.",
      c1_m1: "12 أسبوعًا",
      c1_m2: "مبتدئ → متوسط",
      c1_m3: "تعلم بالمشاريع",

      c2_title: "أساسيات الأمن السيبراني (مسار مختار)",
      c2_desc: "مسار نظيف من جهات موثوقة، ضمن إطار بولاريس.",
      c2_m1: "6–8 أسابيع",
      c2_m2: "مقدمة",
      c2_m3: "موجّه",

      c3_title: "هندسة البرمجيات — مسار البناء",
      c3_desc: "بناء ميزات حقيقية، مراجعة كود، وتطوير عادات إنتاجية.",
      c3_m1: "10 أسابيع",
      c3_m2: "متوسط",
      c3_m3: "بناء + مراجعة",

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
      wk_1_t_full: "الأسابيع 1–3 — الأساسيات",
      wk_1_meta: "نماذج ذهنية + وضوح",
      wk_1_p: "نماذج ذهنية ومفاهيم أساسية ووضوح عملي.",
      wk_2_t_full: "الأسابيع 4–7 — المسار التطبيقي",
      wk_2_meta: "مشاريع صغيرة + تحسين",
      wk_2_p: "بناء مشاريع صغيرة وتحسينها خطوة بخطوة.",
      wk_3_t_full: "الأسابيع 8–10 — مسار الأمن",
      wk_3_meta: "تفكير دفاعي",
      wk_3_p: "تفكير دفاعي وتطبيق مسؤول.",
      wk_4_t_full: "الأسابيع 11–12 — مشروع التخرج",
      wk_4_meta: "إطلاق + عرض + مراجعة",
      wk_4_p: "إطلاق مشروع حقيقي وعرضه مع مراجعة جماعية.",

      apply_title: "التقديم للانضمام إلى Polaris",
      apply_p: "ابدأ بدائرة صغيرة من متعلمين ملتزمين. قدّم للفوج التأسيسي.",
      apply_btn: "فتح نموذج التقديم",
      apply_note: "التقديم سيفتح قريباً.",

      footer_tag: "تعليم منظم. قابل للتوسع.",
      footer_email_label: "البريد:",
      menu_note: "تعليم نظيف ومنظم — قابل للتوسع.",

      nav_courses: "الدورات",
      nav_how: "كيف يعمل",
      nav_program: "البرنامج",
      nav_apply: "التقديم",
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

    // Toggle button label
    if (langToggle) langToggle.textContent = isArabic ? "English" : "العربية";

    // Apply translations
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const val = dict[lang]?.[key];
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
