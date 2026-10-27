// Marks the active entry of "On this page" with a dot that glides to the next entry while you scroll.
// The theme only renders its own indicator for one theme, so the dot is created here.
(function () {
  var INDICATOR = "data-layout-item";
  var frame = 0;

  function update() {
    frame = 0;
    var nav = document.querySelector("#table-of-contents nav");
    if (!nav) return;
    var dot = nav.querySelector("[" + INDICATOR + '="toc-indicator"]');
    var active = nav.querySelector('[data-layout-item="toc-item"][data-active] > [data-layout-item="toc-item-link"]');
    if (!active) {
      if (dot) dot.style.opacity = "0";
      return;
    }
    if (!dot) {
      dot = document.createElement("span");
      dot.setAttribute(INDICATOR, "toc-indicator");
      dot.setAttribute("aria-hidden", "true");
      nav.appendChild(dot);
    }
    var navBox = nav.getBoundingClientRect();
    var linkBox = active.getBoundingClientRect();
    dot.style.top = linkBox.top - navBox.top + linkBox.height / 2 + "px";
    dot.style.opacity = "1";
  }

  function schedule() {
    if (!frame) frame = requestAnimationFrame(update);
  }

  new MutationObserver(schedule).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-active"],
    childList: true,
    subtree: true,
  });
  window.addEventListener("resize", schedule);
  schedule();
})();
