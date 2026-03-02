// app.js — Polaris (Menu + i18n + Smooth Scroll) — UPDATED (no typing)

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
  // i18n (EN / AR)
  // =========================
  const langToggle = $("langToggle");
  const html = document.documentElement;

  // Brand (NO typing) — we will set text directly
  const brandTypingEl = $("brandTyping");

  const dict = {
    en: {
      // Brand
      brand_name: "Polaris Global Institute",
      brand_sub: "Global Institute",

      // Topbar
      menu: "Menu",
      signin: "Sign in",

      // Hero
      badge: "A Global Academic Learning Platform",
      hero_title: "Polaris Global Institute",
      hero_subtitle:
        "Structured learning for AI, cybersecurity, and future skills — built with academic rigor.",
      cta_primary: "Apply to Founding Fellowship",
      cta_secondary: "Explore Courses",

      // Quick pills (make them translatable)
      pill_catalog: "Browse Catalog",
      pill_program: "Fellowship Program",
      pill_how: "How It Works",

      // Courses section
      courses_title: "Courses",
      courses_sub: "A curated set of courses will appear here next week.",
      filter_all: "All",
      filter_polaris: "Polaris Programs",
      filter_curated: "Curated Tracks (MIT/Harvard)",

      // Cards
      card1_title: "AI Foundations (Core Program)",
      card1_desc: "A structured start: mental models, practice, and project output.",
      card1_meta1: "12 weeks",
      card1_meta2: "Beginner → Intermediate",
      card1_meta3: "Project-based",
      card_view: "View",
      card_enroll: "Enroll",

      card2_title: "Cybersecurity Essentials (Curated Track)",
      card2_desc: "A clean path from trusted partners, wrapped into a Polaris track.",
      card2_meta1: "6–8 weeks",
      card2_meta2: "Intro",
      card2_meta3: "Guided",

      card3_title: "Software Engineering — Builder Track",
      card3_desc: "Ship real features, review code, and develop production habits.",
      card3_meta1: "10 weeks",
      card3_meta2: "Intermediate",
      card3_meta3: "Build + Review",

      // How
      how_title: "How Polaris Works",
      how_sub: "A clean system: learn with structure, build real output, and earn review.",
      how1_t: "Cohort Learning",
      how1_p: "Small groups. Strong focus. Clear weekly rhythm.",
      how2_t: "12-Week Structure",
      how2_p: "Foundations → applied track → security thinking → capstone.",
      how3_t: "Build + Review",
      how3_p: "Ship real work. Get peer feedback. Improve the craft.",

      // Program
      program_title: "Founding Fellowship — Cohort 01",
      program_sub: "A selective group. Deep learning. Real outcomes.",
      wk_1_p: "Mental models, core concepts, and practical clarity.",
      wk_2_p: "Build mini-projects, iterate, and refine.",
      wk_3_p: "Defensive thinking and responsible implementation.",
      wk_4_p: "Ship a real project and present it with peer review.",

      // Apply
      apply_title: "Apply to Join Polaris",
      apply_p:
        "Start with a small circle of committed learners. Apply to the founding cohort.",
      apply_btn: "Open Application",
      apply_note: "Applications open soon.",

      // Footer + menu
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
      // Brand
      brand_name: "بولاريس — المعهد العالمي",
      brand_sub: "المعهد العالمي",

      // Topbar
      menu: "القائمة",
      signin: "تسجيل الدخول",

      // Hero
      badge: "منصة تعليمية أكاديمية عالمية",
      hero_title: "Polaris Global Institute",
      hero_subtitle:
        "تعليم منظم للذكاء الاصطناعي والأمن السيبراني ومهارات المستقبل — بجودة أكاديمية.",
      cta_primary: "التقديم للفوج التأسيسي",
      cta_secondary: "استعراض الدورات",

      // Quick pills
      pill_catalog: "استعراض الدليل",
      pill_program: "برنامج الزمالة",
      pill_how: "كيف نعمل",

      // Courses section
      courses_title: "الدورات",
      courses_sub: "سيتم إضافة مجموعة دورات مختارة هنا الأسبوع القادم.",
      filter_all: "الكل",
      filter_polaris: "برامج بولاريس",
      filter_curated: "مسارات مختارة (MIT/Harvard)",

      // Cards
      card1_title: "أساسيات الذكاء الاصطناعي (البرنامج الأساسي)",
      card1_desc: "بداية منظمة: نماذج ذهنية، تمارين، ومخرجات مشروع.",
      card1_meta1: "12 أسبوعاً",
      card1_meta2: "مبتدئ → متوسط",
      card1_meta3: "قائم على المشاريع",
      card_view: "عرض",
      card_enroll: "تسجيل",

      card2_title: "أساسيات الأمن السيبراني (مسار مختار)",
      card2_desc: "مسار واضح من جهات موثوقة، ضمن إطار بولاريس.",
      card2_meta1: "6–8 أسابيع",
      card2_meta2: "مقدمة",
      card2_meta3: "موجّه",

      card3_title: "هندسة البرمجيات — مسار البنّاء",
      card3_desc: "بناء ميزات حقيقية، مراجعة كود، وعادات إنتاجية.",
      card3_meta1: "10 أسابيع",
      card3_meta2: "متوسط",
      card3_meta3: "بناء + مراجعة",

      // How
      how_title: "كيف يعمل Polaris",
      how_sub: "نظام نظيف: تعلم منظم، بناء مخرجات، ومراجعة مستمرة.",
      how1_t: "تعلم جماعي",
      how1_p: "مجموعات صغيرة. تركيز قوي. إيقاع أسبوعي واضح.",
      how2_t: "بنية 12 أسبوعاً",
      how2_p: "أساسيات → تطبيق → أمن → مشروع تخرج.",
      how3_t: "بناء + مراجعة",
      how3_p: "إنجاز عمل حقيقي. ملاحظات من الآخرين. تحسين مستمر.",

      // Program
      program_title: "البرنامج التأسيسي — Cohort 01",
      program_sub: "مجموعة منتقاة. تعلم عميق. نتائج حقيقية.",
      wk_1_p: "نماذج ذهنية ومفاهيم أساسية ووضوح عملي.",
      wk_2_p: "بناء مشاريع صغيرة وتحسينها خطوة بخطوة.",
      wk_3_p: "تفكير دفاعي وتطبيق مسؤول.",
      wk_4_p: "إطلاق مشروع حقيقي وعرضه مع مراجعة جماعية.",

      // Apply
      apply_title: "التقديم للانضمام إلى Polaris",
      apply_p: "ابدأ بدائرة صغيرة من متعلمين ملتزمين. قدّم للفوج التأسيسي.",
      apply_btn: "فتح نموذج التقديم",
      apply_note: "التقديم سيفتح قريباً.",

      // Footer + menu
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
    },
  };

  function applyLang(lang) {
    const isArabic = lang === "ar";
    html.setAttribute("lang", isArabic ? "ar" : "en");
    html.setAttribute("dir", isArabic ? "rtl" : "ltr");

    // Toggle button label
    if (langToggle) langToggle.textContent = isArabic ? "English" : "العربية";

    // Brand name becomes fixed text (no typing)
    if (brandTypingEl) {
      brandTypingEl.textContent = dict[lang]?.brand_name || "Polaris Global Institute";
      // force normal direction on brand (so it never looks broken in rtl)
      brandTypingEl.style.direction = "ltr";
      brandTypingEl.style.unicodeBidi = "plaintext";
    }

    // Apply translations for all elements that have data-i18n
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const val = dict[lang]?.[key];
      if (val) el.textContent = val;
    });

    // Extra: translate some UI text that didn't have data-i18n before
    // (we map common selectors safely without breaking your HTML)
    const mapText = (selector, value) => {
      const el = document.querySelector(selector);
      if (el && value) el.textContent = value;
    };

    // Hero pills (they were hardcoded)
    const pills = document.querySelectorAll(".hero__pills .pill");
    if (pills && pills.length >= 3) {
      if (dict[lang]?.pill_catalog) pills[0].textContent = dict[lang].pill_catalog;
      if (dict[lang]?.pill_program) pills[1].textContent = dict[lang].pill_program;
      if (dict[lang]?.pill_how) pills[2].textContent = dict[lang].pill_how;
    }

    // Catalog filters (they were hardcoded)
    const chips = document.querySelectorAll(".catalogFilters .chip");
    if (chips && chips.length >= 3) {
      if (dict[lang]?.filter_all) chips[0].textContent = dict[lang].filter_all;
      if (dict[lang]?.filter_polaris) chips[1].textContent = dict[lang].filter_polaris;
      if (dict[lang]?.filter_curated) chips[2].textContent = dict[lang].filter_curated;
    }

    // Cards content (titles/descriptions/meta/actions were hardcoded)
    const cards = document.querySelectorAll(".catalogGrid .catalogCard");
    if (cards && cards.length >= 3) {
      // Card 1
      mapText(".catalogGrid .catalogCard:nth-child(1) .h3", dict[lang]?.card1_title);
      mapText(".catalogGrid .catalogCard:nth-child(1) .p.muted", dict[lang]?.card1_desc);
      const c1m = document.querySelectorAll(".catalogGrid .catalogCard:nth-child(1) .metaRow .meta");
      if (c1m.length >= 3) {
        c1m[0].textContent = dict[lang]?.card1_meta1 || c1m[0].textContent;
        c1m[1].textContent = dict[lang]?.card1_meta2 || c1m[1].textContent;
        c1m[2].textContent = dict[lang]?.card1_meta3 || c1m[2].textContent;
      }

      // Card 2
      mapText(".catalogGrid .catalogCard:nth-child(2) .h3", dict[lang]?.card2_title);
      mapText(".catalogGrid .catalogCard:nth-child(2) .p.muted", dict[lang]?.card2_desc);
      const c2m = document.querySelectorAll(".catalogGrid .catalogCard:nth-child(2) .metaRow .meta");
      if (c2m.length >= 3) {
        c2m[0].textContent = dict[lang]?.card2_meta1 || c2m[0].textContent;
        c2m[1].textContent = dict[lang]?.card2_meta2 || c2m[1].textContent;
        c2m[2].textContent = dict[lang]?.card2_meta3 || c2m[2].textContent;
      }

      // Card 3
      mapText(".catalogGrid .catalogCard:nth-child(3) .h3", dict[lang]?.card3_title);
      mapText(".catalogGrid .catalogCard:nth-child(3) .p.muted", dict[lang]?.card3_desc);
      const c3m = document.querySelectorAll(".catalogGrid .catalogCard:nth-child(3) .metaRow .meta");
      if (c3m.length >= 3) {
        c3m[0].textContent = dict[lang]?.card3_meta1 || c3m[0].textContent;
        c3m[1].textContent = dict[lang]?.card3_meta2 || c3m[1].textContent;
        c3m[2].textContent = dict[lang]?.card3_meta3 || c3m[2].textContent;
      }

      // Actions labels (View / Enroll)
      document.querySelectorAll(".catalogGrid .catalogCard .cardActions .btn--ghost").forEach((a) => {
        if (dict[lang]?.card_view) a.textContent = dict[lang].card_view;
      });
      document.querySelectorAll(".catalogGrid .catalogCard .cardActions .btn--primary").forEach((a) => {
        if (dict[lang]?.card_enroll) a.textContent = dict[lang].card_enroll;
      });
    }

    // How section (these were hardcoded)
    mapText('#how .section__head .h2', dict[lang]?.how_title);
    mapText('#how .section__head .p.muted', dict[lang]?.how_sub);

    const howCards = document.querySelectorAll("#how .howGrid .howCard");
    if (howCards.length >= 3) {
      howCards[0].querySelector(".h3").textContent = dict[lang]?.how1_t || howCards[0].querySelector(".h3").textContent;
      howCards[0].querySelector(".p.muted").textContent = dict[lang]?.how1_p || howCards[0].querySelector(".p.muted").textContent;

      howCards[1].querySelector(".h3").textContent = dict[lang]?.how2_t || howCards[1].querySelector(".h3").textContent;
      howCards[1].querySelector(".p.muted").textContent = dict[lang]?.how2_p || howCards[1].querySelector(".p.muted").textContent;

      howCards[2].querySelector(".h3").textContent = dict[lang]?.how3_t || howCards[2].querySelector(".h3").textContent;
      howCards[2].querySelector(".p.muted").textContent = dict[lang]?.how3_p || howCards[2].querySelector(".p.muted").textContent;
    }

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
