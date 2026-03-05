// lang.js — Polaris Global Institute (Global i18n)
// Works on ALL pages: index, dashboard, weeks, lectures
// Usage: add data-i18n="key.path" on any element that has text

(function () {
  const STORAGE_KEY = "polaris_lang"; // "en" | "ar"

  // --- 1) Dictionary (start small, we will expand as you send pages) ---
  const DICT = {
    en: {
      common: {
        introduction: "Introduction",
        arabicSummary: "Arabic Summary",
        keyConcepts: "Key Concepts",
        detailedNotes: "Detailed Notes",
        glossary: "Glossary",
        quickQuiz: "Quick Quiz",
        tapToOpen: "Tap to open",
        backToWeek: "← Back to Week 1",
        nextLecture: "Next Lecture →",
        duration: "Duration:",
        level: "Level:",
        beginner: "Beginner",
        topic: "Topic:"
      },
      dl: {
        topic: { foundations: "Deep Learning Foundations" },
        w1: {
          l1: {
            title: "Lecture 1 — Introduction to Deep Learning",
            subtitle: "Deep Learning Course — Polaris Global Institute",
            intro: {
              p1:
                "In this lecture we explore the foundations of Deep Learning. You will understand how neural networks evolved and why deep learning became powerful in modern artificial intelligence systems."
            },
            ar: {
              // (For EN mode we can still show English here if you want; we keep key name)
              summary:
                "This section provides an Arabic summary for Arabic learners."
            },
            concepts: {
              nn: "Artificial Neural Networks",
              layers: "Deep Learning Layers",
              data: "Training Data",
              params: "Model Parameters",
              fwd: "Forward Propagation",
              bwd: "Backpropagation"
            },
            notes: {
              p1:
                "Deep learning is a modern approach to machine learning that uses multiple layers of computation (neural networks) to learn patterns directly from data. Instead of manually crafting features, deep learning systems can learn representations automatically.",
              p2:
                "A neural network is made of layers. Each layer applies a mathematical transformation to the input, producing an output that becomes the input to the next layer. When we stack many layers, the model can represent complex patterns (images, speech, language).",
              p3:
                "Training is the process where the model adjusts its internal parameters (weights) to reduce error. This usually happens through backpropagation + gradient descent. The main reason deep learning became powerful recently is the combination of big data, faster GPUs, and better algorithms."
            },
            quiz: {
              q1: "What is the main idea behind deep learning?",
              q2: "What is a neural network inspired by?",
              q3: "What is the role of training data?",
              q4: "Why did deep learning become powerful in recent years?"
            }
          }
        },
        glossary: {
          nn: {
            term: "Neural Network",
            def: "A computing model inspired by the human brain."
          },
          training: {
            term: "Training",
            def: "The process of teaching a model using data."
          },
          params: {
            term: "Parameters",
            def: "Values inside the model that are adjusted during training."
          }
        }
      }
    },

    ar: {
      common: {
        introduction: "المقدمة",
        arabicSummary: "الملخص العربي",
        keyConcepts: "المفاهيم الأساسية",
        detailedNotes: "شرح مفصل",
        glossary: "المصطلحات",
        quickQuiz: "اختبار سريع",
        tapToOpen: "اضغط للفتح",
        backToWeek: "← الرجوع إلى الأسبوع 1",
        nextLecture: "المحاضرة التالية →",
        duration: "المدة:",
        level: "المستوى:",
        beginner: "مبتدئ",
        topic: "الموضوع:"
      },
      dl: {
        topic: { foundations: "أساسيات التعلم العميق" },
        w1: {
          l1: {
            title: "المحاضرة 1 — مقدمة في التعلم العميق",
            subtitle: "دورة التعلم العميق — Polaris Global Institute",
            intro: {
              p1:
                "في هذه المحاضرة نستكشف أساسيات التعلم العميق. ستفهم كيف تطورت الشبكات العصبية ولماذا أصبح التعلم العميق قوياً في أنظمة الذكاء الاصطناعي الحديثة."
            },
            ar: {
              summary:
                "في هذا الدرس نتعرف على أساسيات التعلم العميق. سوف نفهم كيف تعمل الشبكات العصبية ولماذا أصبح التعلم العميق من أهم تقنيات الذكاء الاصطناعي في العصر الحديث."
            },
            concepts: {
              nn: "الشبكات العصبية الاصطناعية",
              layers: "طبقات التعلم العميق",
              data: "بيانات التدريب",
              params: "معلمات النموذج",
              fwd: "الانتشار الأمامي",
              bwd: "الانتشار العكسي (Backpropagation)"
            },
            notes: {
              p1:
                "التعلم العميق هو أسلوب حديث في تعلم الآلة يستخدم عدة طبقات حسابية (شبكات عصبية) لتعلم الأنماط مباشرة من البيانات. بدل بناء الخصائص يدوياً، يستطيع النموذج تعلم تمثيلات تلقائياً.",
              p2:
                "تتكون الشبكة العصبية من طبقات. كل طبقة تطبق تحويلات رياضية على المدخلات لتنتج مخرجات تصبح مدخلات للطبقة التالية. وعند تكديس طبقات كثيرة يمكن للنموذج تمثيل أنماط معقدة (صور، صوت، لغة).",
              p3:
                "التدريب هو عملية تعديل الأوزان الداخلية لتقليل الخطأ. عادة يتم ذلك عبر Backpropagation مع Gradient Descent. سبب قوة التعلم العميق حديثاً هو توفر بيانات ضخمة، وتسارع المعالجات الرسومية GPU، وتحسن الخوارزميات."
            },
            quiz: {
              q1: "ما الفكرة الأساسية خلف التعلم العميق؟",
              q2: "بماذا استُلهمت فكرة الشبكات العصبية؟",
              q3: "ما دور بيانات التدريب؟",
              q4: "لماذا أصبح التعلم العميق قوياً في السنوات الأخيرة؟"
            }
          }
        },
        glossary: {
          nn: {
            term: "الشبكة العصبية",
            def: "نموذج حوسبي مستوحى من طريقة عمل الدماغ البشري."
          },
          training: {
            term: "التدريب",
            def: "عملية تعليم النموذج باستخدام البيانات."
          },
          params: {
            term: "المعلمات",
            def: "قيم داخل النموذج يتم تعديلها أثناء التدريب."
          }
        }
      }
    }
  };

  // --- helpers ---
  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || "en";
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
  }

  function deepGet(obj, path) {
    return path.split(".").reduce((acc, k) => (acc && acc[k] != null ? acc[k] : null), obj);
  }

  function applyLang(lang) {
    const dict = DICT[lang] || DICT.en;

    // Set html lang + dir
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    // Update all data-i18n elements
    const nodes = document.querySelectorAll("[data-i18n]");
    nodes.forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = deepGet(dict, key);
      if (value == null) return;

      // Only set textContent for safety
      el.textContent = value;
    });

    // Update language button label if exists
    const label = document.getElementById("langLabel");
    if (label) label.textContent = lang === "ar" ? "EN" : "AR";
  }

  function bindLangButton() {
    // Support multiple possible IDs
    const btn =
      document.getElementById("langBtn") ||
      document.getElementById("langToggle") ||
      document.querySelector("[data-lang-toggle]");

    if (!btn) return;

    btn.addEventListener("click", () => {
      const current = getLang();
      const next = current === "en" ? "ar" : "en";
      setLang(next);
      applyLang(next);
    });
  }

  // --- init ---
  document.addEventListener("DOMContentLoaded", () => {
    const lang = getLang();
    applyLang(lang);
    bindLangButton();
  });
})();
