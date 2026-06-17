(function () {
  var root = document.documentElement;
  var toggle = document.getElementById("light-toggle");
  var progress = document.getElementById("progress");
  var storedTheme = localStorage.getItem("theme");

  if (storedTheme === "dark") {
    root.setAttribute("data-theme", "dark");
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var isDark = root.getAttribute("data-theme") === "dark";
      if (isDark) {
        root.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
      } else {
        root.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
      }
    });
  }

  function updateProgress() {
    if (!progress) return;
    var scrollable = document.documentElement.scrollHeight - window.innerHeight;
    progress.max = Math.max(scrollable, 1);
    progress.value = window.scrollY;
  }

  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  updateProgress();
})();
