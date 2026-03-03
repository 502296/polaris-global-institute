// lang.js — Apply saved language across ALL pages (before other JS runs)
(function () {
  let lang = "en";
  try {
    const saved = localStorage.getItem("pgi_lang");
    if (saved === "ar" || saved === "en") lang = saved;
  } catch {}

  document.documentElement.setAttribute("lang", lang);
  document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
})();
