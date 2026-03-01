(() => {
  const $ = (id) => document.getElementById(id);

  // Run after DOM is ready
  function ready(fn){
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  ready(() => {
    // Year
    const yearEl = $("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    // Menu
    const menu = $("menuPanel");
    const btn = $("menuBtn");
    const close = $("menuClose");
    const backdrop = $("menuBackdrop");

    function openMenu(){
      if (!menu || !backdrop || !btn) return;
      menu.classList.add("is-open");
      backdrop.classList.add("is-open");
      btn.setAttribute("aria-expanded","true");
      menu.setAttribute("aria-hidden","false");
    }
    function closeMenu(){
      if (!menu || !backdrop || !btn) return;
      menu.classList.remove("is-open");
      backdrop.classList.remove("is-open");
      btn.setAttribute("aria-expanded","false");
      menu.setAttribute("aria-hidden","true");
    }

    btn?.addEventListener("click", openMenu);
    close?.addEventListener("click", closeMenu);
    backdrop?.addEventListener("click", closeMenu);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });

    // Close menu when clicking a menu link
    document.querySelectorAll(".menu__link").forEach(a => {
      a.addEventListener("click", () => closeMenu());
    });

    // Accordion (About)
    const aboutToggle = $("aboutToggle");
    const aboutPanel = $("aboutPanel");

    aboutToggle?.addEventListener("click", () => {
      const expanded = aboutToggle.getAttribute("aria-expanded") === "true";
      aboutToggle.setAttribute("aria-expanded", String(!expanded));
      if (aboutPanel) aboutPanel.hidden = expanded;
    });

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
        cta_secondary: "Explore Courses",
        stat_1: "Founding Fellows",
        stat_2: "Structured Program",
        stat_3: "Real Output",
        courses_title: "Courses",
        courses_sub: "A curated set of courses will appear here next week.",
        about_title: "About Polaris",
        about_p1: "Polaris Global Institute is an independent learning initiative focused on rigorous, structured education.",
        about_p2: "We start small, build real capability, and scale with quality — not noise.",
        pillars_title: "Program Pillars",
        pl_1: "Clear mental models",
        pl_2: "Applied projects",
        pl_3: "Peer review",
        pl_4: "Progress tracking",
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
        nav_courses: "Courses",
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
        cta_secondary: "استكشف الدورات",
        stat_1: "زملاء المؤسسين",
        stat_2: "برنامج منظم",
        stat_3: "نتائج حقيقية",
        courses_title: "الدورات",
        courses_sub: "سيظهر هنا مجموعة دورات مختارة الأسبوع القادم.",
        about_title: "عن بولاريس",
        about_p1: "معهد بولاريس العالمي مبادرة تعليمية مستقلة تركّز على تعليم منظم وصرامة أكاديمية.",
        about_p2: "نبدأ بمجموعة صغيرة، نبني قدرة حقيقية، ثم نتوسع بالجودة — لا بالضجيج.",
        pillars_title: "ركائز البرنامج",
        pl_1: "نماذج ذهنية واضحة",
        pl_2: "مشاريع تطبيقية",
        pl_3: "مراجعة الزملاء",
        pl_4: "متابعة التقدم",
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
        nav_courses: "الدورات",
        nav_program: "البرنامج",
        nav_principles: "المبادئ",
        nav_terms: "الشروط",
        nav_privacy: "الخصوصية",
        nav_contact: "تواصل",
        nav_dashboard: "دروسي",
        menu_note: "تعليم نظيف ومنظم — قابل للتوسع."
      }
    };

    function applyLang(lang){
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
      localStorage.setItem("polaris_lang", lang);
    }

    const saved = localStorage.getItem("polaris_lang");
    applyLang(saved === "ar" ? "ar" : "en");

    langToggle?.addEventListener("click", () => {
      const current = document.documentElement.lang === "ar" ? "ar" : "en";
      applyLang(current === "en" ? "ar" : "en");
    });
  });
})();
