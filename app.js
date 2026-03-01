(() => {
  const $ = (id) => document.getElementById(id);

  // Year
  const yearEl = $("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Menu
  const menu = $("menuPanel");
  const btn = $("menuBtn");
  const close = $("menuClose");
  const backdrop = $("menuBackdrop");

  function openMenu(){
    menu?.classList.add("is-open");
    backdrop?.classList.add("is-open");
    btn?.setAttribute("aria-expanded","true");
    menu?.setAttribute("aria-hidden","false");
  }
  function closeMenu(){
    menu?.classList.remove("is-open");
    backdrop?.classList.remove("is-open");
    btn?.setAttribute("aria-expanded","false");
    menu?.setAttribute("aria-hidden","true");
  }

  btn?.addEventListener("click", openMenu);
  close?.addEventListener("click", closeMenu);
  backdrop?.addEventListener("click", closeMenu);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });

  // i18n
  const langToggle = $("langToggle");

  const I18N = {
    en: {
      brand_sub: "Global Institute",
      menu: "Menu",
      signin: "Sign in",
      badge: "A Global Academic Learning Platform",
      hero_title: "Polaris Global Institute",
      hero_subtitle: "Structured learning for AI, cybersecurity, and future skills — built with academic rigor.",
      cta_primary: "Apply to Founding Fellowship",
      cta_secondary: "Explore",
      stat_1: "Founding Fellows",
      stat_2: "Structured Program",
      stat_3: "Real Output",
      about_title: "About Polaris",
      about_p1: "Polaris Global Institute is an independent learning initiative focused on rigorous, structured education.",
      about_p2: "We start small, build real capability, and scale with quality — not noise.",
      pillars_title: "Program Pillars",
      pl_1: "Clear mental models",
      pl_2: "Applied projects",
      pl_3: "Peer review",
      pl_4: "Progress tracking",
      focus_title: "Focus Areas",
      focus_1_t: "AI Foundations",
      focus_1_p: "Strong fundamentals, real use-cases, and systems thinking.",
      focus_2_t: "Cybersecurity",
      focus_2_p: "Defensive mindset, safe practice, and technical literacy.",
      focus_3_t: "Builders Track",
      focus_3_p: "Build small tools and prototypes with clean structure.",
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
      apply_p: "Start with a small circle of committed learners. Apply to the founding cohort.",
      apply_btn: "Open Application",
      apply_note: "Applications open soon.",
      footer_tag: "Structured learning. Built to scale.",
      footer_email_label: "Email:",
      nav_about: "About",
      nav_focus: "Focus",
      nav_program: "Program",
      nav_principles: "Principles",
      nav_terms: "Terms",
      nav_privacy: "Privacy",
      nav_contact: "Contact",
      nav_dashboard: "My Learning",
      menu_note: "Clean, structured learning — built to scale."
    },
    ar: {
      brand_sub: "المعهد العالمي",
      menu: "القائمة",
      signin: "تسجيل الدخول",
      badge: "منصة تعليم أكاديمي عالمية",
      hero_title: "معهد بولاريس العالمي",
      hero_subtitle: "تعليم منظم في الذكاء الاصطناعي والأمن السيبراني ومهارات المستقبل — بجودة أكاديمية.",
      cta_primary: "التقديم للدفعة التأسيسية",
      cta_secondary: "استكشف",
      stat_1: "زملاء المؤسسين",
      stat_2: "برنامج منظم",
      stat_3: "نتائج حقيقية",
      about_title: "عن بولاريس",
      about_p1: "معهد بولاريس العالمي مبادرة تعليمية مستقلة تركّز على تعليم منظم وصرامة أكاديمية.",
      about_p2: "نبدأ بمجموعة صغيرة، نبني قدرة حقيقية، ثم نتوسع بالجودة — لا بالضجيج.",
      pillars_title: "ركائز البرنامج",
      pl_1: "نماذج ذهنية واضحة",
      pl_2: "مشاريع تطبيقية",
      pl_3: "مراجعة الزملاء",
      pl_4: "متابعة التقدم",
      focus_title: "مجالات التركيز",
      focus_1_t: "أساسيات الذكاء الاصطناعي",
      focus_1_p: "أساس قوي وتطبيقات واقعية وتفكير نظمي.",
      focus_2_t: "الأمن السيبراني",
      focus_2_p: "عقلية دفاعية وممارسة آمنة وثقافة تقنية.",
      focus_3_t: "مسار البنّائين",
      focus_3_p: "بناء أدوات ونماذج أولية بهيكل نظيف.",
      program_title: "زمالة بولاريس — الدفعة الأولى",
      program_sub: "مجموعة مختارة. تعلم عميق. نتائج حقيقية.",
      wk_1_t: "الأسس",
      wk_1_p: "نماذج ذهنية ومفاهيم أساسية ووضوح عملي.",
      wk_2_t: "المسار التطبيقي",
      wk_2_p: "مشاريع صغيرة وتحسين متكرر.",
      wk_3_t: "مسار الأمن",
      wk_3_p: "تفكير دفاعي وتنفيذ مسؤول.",
      wk_4_t: "المشروع الختامي",
      wk_4_p: "إطلاق مشروع حقيقي وعرضه مع مراجعة الزملاء.",
      apply_title: "قدّم للانضمام إلى بولاريس",
      apply_p: "نبدأ بدائرة صغيرة من المتعلمين الجادين. قدّم للدفعة التأسيسية.",
      apply_btn: "فتح نموذج التقديم",
      apply_note: "سيفتح التقديم قريباً.",
      footer_tag: "تعليم منظم. قابل للتوسع.",
      footer_email_label: "البريد:",
      nav_about: "من نحن",
      nav_focus: "المجالات",
      nav_program: "البرنامج",
      nav_principles: "المبادئ",
      nav_terms: "الشروط",
      nav_privacy: "الخصوصية",
      nav_contact: "تواصل",
      nav_dashboard: "دروسي",
      menu_note: "تعليم نظيف ومنظم — قابل للتوسع."
    }
  };

  function applyLang(lang) {
    const html = document.documentElement;
    const isAr = lang === "ar";
    html.lang = isAr ? "ar" : "en";
    html.dir = isAr ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = I18N[lang]?.[key];
      if (typeof value === "string") el.textContent = value;
    });

    if (langToggle) langToggle.textContent = isAr ? "English" : "العربية";

    // Save preference
    localStorage.setItem("polaris_lang", lang);
  }

  // Load saved language (default EN)
  const saved = localStorage.getItem("polaris_lang");
  applyLang(saved === "ar" ? "ar" : "en");

  langToggle?.addEventListener("click", () => {
    const current = document.documentElement.lang === "ar" ? "ar" : "en";
    applyLang(current === "en" ? "ar" : "en");
  });
})();
