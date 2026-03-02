// app.js — Polaris (Menu + i18n + Smooth Scroll + Brand Typing)

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

  // Smooth scroll for in-page anchors
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;

    const href = a.getAttribute("href");
    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // About accordion in menu
  function toggleMenuAbout() {
    if (!menuAboutToggle || !menuAboutPanel) return;
    const isOpen = menuAboutToggle.getAttribute("aria-expanded") === "true";
    menuAboutToggle.setAttribute("aria-expanded", String(!isOpen));
    menuAboutPanel.hidden = isOpen;
  }
  if (menuAboutToggle) menuAboutToggle.addEventListener("click", toggleMenuAbout);

  // =========================
  // Brand Typing (LEFT only)
  // =========================
  const brandTypingEl = $("brandTyping");

  // Only the left brand text types & switches EN/AR automatically
  // (Does NOT change the whole page language)
  const BRAND_SEQUENCE = [
    { text: "Polaris", dir: "ltr" },
    { text: "بولاريس", dir: "rtl" },
  ];

  // Timing (feel free to tweak later)
  const TYPE_SPEED = 65;     // ms per character
  const DELETE_SPEED = 38;   // ms per character
  const HOLD_FULL = 950;     // pause after full word typed
  const HOLD_EMPTY = 260;    // pause after delete completed

  let brandIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingTimer = null;

  function setBrandDirection(dir) {
    if (!brandTypingEl) return;
    // Keep it clean: only the typing element changes direction
    brandTypingEl.style.direction = dir;
    brandTypingEl.style.unicodeBidi = "plaintext";
  }

  function stopBrandTyping() {
    if (typingTimer) clearTimeout(typingTimer);
    typingTimer = null;
  }

  function startBrandTyping() {
    if (!brandTypingEl) return;

    // Respect reduced motion
    const reduceMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      const first = BRAND_SEQUENCE[0];
      setBrandDirection(first.dir);
      brandTypingEl.textContent = first.text;
      return;
    }

    stopBrandTyping();

    const tick = () => {
      if (!brandTypingEl) return;

      const item = BRAND_SEQUENCE[brandIndex % BRAND_SEQUENCE.length];
      const full = item.text;

      setBrandDirection(item.dir);

      if (!isDeleting) {
        // typing forward
        charIndex = Math.min(charIndex + 1, full.length);
        brandTypingEl.textContent = full.slice(0, charIndex);

        if (charIndex === full.length) {
          // hold then start deleting
          isDeleting = true;
          typingTimer = setTimeout(tick, HOLD_FULL);
          return;
        }

        typingTimer = setTimeout(tick, TYPE_SPEED);
        return;
      }

      // deleting
      charIndex = Math.max(charIndex - 1, 0);
      brandTypingEl.textContent = full.slice(0, charIndex);

      if (charIndex === 0) {
        isDeleting = false;
        brandIndex = (brandIndex + 1) % BRAND_SEQUENCE.length;
        typingTimer = setTimeout(tick, HOLD_EMPTY);
        return;
      }

      typingTimer = setTimeout(tick, DELETE_SPEED);
    };

    tick();
  }

  startBrandTyping();

  // =========================
  // i18n (EN / AR) — site toggle
  // =========================
  const langToggle = $("langToggle");
  const html = document.documentElement;

  const dict = {
    en: {
      brand_sub: "Global Institute",
      menu: "Menu",
      signin: "Sign in",
      badge: "A Global Academic Learning Platform",
      hero_title: "Polaris Global Institute",
      hero_subtitle:
        "Structured learning for AI, cybersecurity, and future skills — built with academic rigor.",
      cta_primary: "Apply to Founding Fellowship",
      cta_secondary: "Explore Courses",
      stat_1: "Founding Fellows",
      stat_2: "Structured Program",
      stat_3: "Real Output",
      courses_title: "Courses",
      courses_sub: "A curated set of courses will appear here next week.",
      program_title: "Founding Fellowship — Cohort 01",
      program_sub: "A selective group. Deep learning. Real outcomes.",
      wk_1_t: "Foundations",
      wk_1_p: "Mental models, core concepts, and practical clarity.",
      wk_2_t: "Applied Track",
      wk_2_p: "Build mini-projects, iterate, and refine.",
      wk_3_t: "Security Track",
      wk_3_p: "Defensive thinking and responsible implementation.",
      wk_4_t: "Capstone",
      wk_4_p: "Ship a real project and present it with peer review.",
      apply_title: "Apply to Join Polaris",
      apply_p:
        "Start with a small circle of committed learners. Apply to the founding cohort.",
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
      about_p1:
        "Polaris Global Institute is an independent learning initiative focused on rigorous, structured education.",
      about_p2:
        "We start small, build real capability, and scale with quality — not noise.",
      pillars_title: "Program Pillars",
      pl_1: "Clear mental models",
      pl_2: "Applied projects",
      pl_3: "Peer review",
      pl_4: "Progress tracking",
    },
    ar: {
      brand_sub: "المعهد العالمي",
      menu: "القائمة",
      signin: "تسجيل الدخول",
      badge: "منصة تعليمية أكاديمية عالمية",
      hero_title: "Polaris Global Institute",
      hero_subtitle:
        "تعليم منظم للذكاء الاصطناعي والأمن السيبراني ومهارات المستقبل — بجودة أكاديمية.",
      cta_primary: "التقديم للفوج التأسيسي",
      cta_secondary: "استعراض الدورات",
      stat_1: "الفوج التأسيسي",
      stat_2: "برنامج 12 أسبوعاً",
      stat_3: "بناء + مراجعة",
      courses_title: "الدورات",
      courses_sub: "سيتم إضافة مجموعة دورات مختارة هنا الأسبوع القادم.",
      program_title: "البرنامج التأسيسي — Cohort 01",
      program_sub: "مجموعة منتقاة. تعلم عميق. نتائج حقيقية.",
      wk_1_t: "الأساسيات",
      wk_1_p: "نماذج ذهنية ومفاهيم أساسية ووضوح عملي.",
      wk_2_t: "المسار التطبيقي",
      wk_2_p: "بناء مشاريع صغيرة وتحسينها خطوة بخطوة.",
      wk_3_t: "مسار الأمن",
      wk_3_p: "تفكير دفاعي وتطبيق مسؤول.",
      wk_4_t: "مشروع التخرج",
      wk_4_p: "إطلاق مشروع حقيقي وعرضه مع مراجعة جماعية.",
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
      about_p1:
        "Polaris مبادرة تعليمية مستقلة تركّز على تعليم منظم بجودة عالية.",
      about_p2:
        "نبدأ صغيراً، نبني قدرة حقيقية، ثم نتوسع بالجودة — لا بالضجيج.",
      pillars_title: "ركائز البرنامج",
      pl_1: "نماذج ذهنية واضحة",
      pl_2: "مشاريع تطبيقية",
      pl_3: "مراجعة جماعية",
      pl_4: "تتبع التقدم",
    },
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
    try {
      localStorage.setItem("pgi_lang", lang);
    } catch {}
  }

  function getSavedLang() {
    try {
      return localStorage.getItem("pgi_lang");
    } catch {
      return null;
    }
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
