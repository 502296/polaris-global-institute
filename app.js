(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const langToggle = document.getElementById("langToggle");

  // Translation dictionary (extend anytime)
  const I18N = {
    en: {
      nav_about: "About",
      nav_focus: "Focus",
      nav_program: "Program",
      nav_contact: "Contact",
      cta_apply: "Apply",

      badge: "A Human-Centered Intelligence Initiative",
      hero_title_1: "Polaris Global Institute",
      hero_subtitle:
        "Independent, ethical learning for AI, cybersecurity, and future skills — built with integrity and academic rigor.",
      cta_primary: "Apply to Founding Fellowship",
      cta_secondary: "Explore the Mission",

      stat_1: "Founding Fellows",
      stat_2: "Structured Program",
      stat_3: "Balanced Approach",

      about_title: "About Polaris",
      about_p1:
        "Polaris Global Institute is built on a simple belief: education must remain independent, ethical, and human.",
      about_p2:
        "We are not a political platform. We are not a religious institution. We are not driven by ideology. We are driven by integrity.",
      principles_title: "Core Principles",
      pr_1: "Intellectual neutrality",
      pr_2: "Human-first innovation",
      pr_3: "Academic rigor",
      pr_4: "Responsible technology",

      focus_title: "Focus Areas",
      focus_1_t: "Ethical AI",
      focus_1_p: "Foundations, applied systems, and responsible deployment of AI.",
      focus_2_t: "Ethical Cybersecurity",
      focus_2_p: "Security thinking, defensive mindset, and lawful ethical practice.",
      focus_3_t: "Builders Track",
      focus_3_p: "Build small projects: tools, prototypes, and practical systems.",

      program_title: "Founding Fellowship — Cohort 01",
      program_sub: "A small, selective group. Deep learning. Real outputs.",
      wk_1_t: "Foundations",
      wk_1_p: "AI fundamentals + critical thinking + clean mental models.",
      wk_2_t: "Applied AI",
      wk_2_p: "Prompting, tool-building, and practical mini-projects.",
      wk_3_t: "Cyber + Ethics",
      wk_3_p: "Security mindset, responsibility, and safe practice.",
      wk_4_t: "Capstone",
      wk_4_p: "Build and present a real project with peer review.",

      apply_title: "Apply to Join Polaris",
      apply_p:
        "We begin with a small circle of committed learners. If you value integrity, depth, and real progress — apply.",
      apply_btn: "Open Application",
      apply_note: "Applications open soon.",

      footer_tag: "Guiding Minds with Integrity",
      footer_email_label: "Email:"
    },

    ar: {
      nav_about: "من نحن",
      nav_focus: "المجالات",
      nav_program: "البرنامج",
      nav_contact: "تواصل",
      cta_apply: "قدّم الآن",

      badge: "مبادرة إنسانية لبناء ذكاء مسؤول",
      hero_title_1: "معهد بولاريس العالمي",
      hero_subtitle:
        "تعليم مستقل وأخلاقي في الذكاء الاصطناعي والأمن السيبراني ومهارات المستقبل — بجودة أكاديمية وروح إنسانية.",
      cta_primary: "قدّم على دفعة المؤسسين",
      cta_secondary: "استكشف الرسالة",

      stat_1: "زملاء المؤسسين",
      stat_2: "برنامج منظم",
      stat_3: "توازن بين الأخلاق والتطبيق",

      about_title: "عن بولاريس",
      about_p1:
        "يقوم معهد بولاريس العالمي على قناعة بسيطة: التعليم يجب أن يبقى مستقلاً وأخلاقياً وإنسانياً.",
      about_p2:
        "نحن لسنا منصة سياسية، ولسنا مؤسسة دينية، ولسنا مشروعاً أيديولوجياً. نحن مشروع تقوده النزاهة.",
      principles_title: "المبادئ الأساسية",
      pr_1: "حياد فكري",
      pr_2: "الإنسان أولاً",
      pr_3: "صرامة أكاديمية",
      pr_4: "تقنية مسؤولة",

      focus_title: "مجالات التركيز",
      focus_1_t: "ذكاء اصطناعي أخلاقي",
      focus_1_p: "أسس قوية وتطبيقات عملية ونشر مسؤول للذكاء الاصطناعي.",
      focus_2_t: "أمن سيبراني أخلاقي",
      focus_2_p: "تفكير دفاعي وممارسة قانونية مسؤولة.",
      focus_3_t: "مسار البنّائين",
      focus_3_p: "بناء أدوات ونماذج أولية ومشاريع عملية.",

      program_title: "زمالة بولاريس — الدفعة الأولى",
      program_sub: "مجموعة صغيرة مختارة. تعلم عميق. نتائج حقيقية.",
      wk_1_t: "الأسس",
      wk_1_p: "أساسيات الذكاء الاصطناعي + تفكير نقدي + نماذج ذهنية واضحة.",
      wk_2_t: "تطبيقات الذكاء الاصطناعي",
      wk_2_p: "بناء أدوات ومشاريع صغيرة وتعلم عملي.",
      wk_3_t: "الأمن + الأخلاق",
      wk_3_p: "عقلية أمنية ومسؤولية وممارسة آمنة.",
      wk_4_t: "المشروع الختامي",
      wk_4_p: "بناء مشروع حقيقي وعرضه مع مراجعة من الزملاء.",

      apply_title: "قدّم للانضمام إلى بولاريس",
      apply_p:
        "نبدأ بدائرة صغيرة من المتعلمين الجادين. إذا كنت تبحث عن عمق ونزاهة وتقدم حقيقي — قدّم الآن.",
      apply_btn: "فتح نموذج التقديم",
      apply_note: "سيفتح التقديم قريباً.",

      footer_tag: "إرشاد العقول بنزاهة",
      footer_email_label: "البريد:"
    }
  };

  // Default language: EN (global). Toggle to AR.
  let current = "en";

  function applyLang(lang) {
    current = lang;

    const html = document.documentElement;
    const isAr = lang === "ar";

    html.lang = isAr ? "ar" : "en";
    html.dir = isAr ? "rtl" : "ltr";

    // Update all i18n text nodes
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = I18N[lang]?.[key];
      if (typeof value === "string") el.textContent = value;
    });

    // Toggle button label (show the OTHER language)
    if (langToggle) langToggle.textContent = isAr ? "English" : "العربية";
  }

  if (langToggle) {
    langToggle.addEventListener("click", () => {
      applyLang(current === "en" ? "ar" : "en");
    });
  }

  applyLang("en");
})();
