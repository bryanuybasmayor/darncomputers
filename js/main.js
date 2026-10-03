/**
 * Darn Computers - front-end interaction logic.
 * Kept framework-free so this drops into a WordPress theme's footer.js
 * without needing a build step.
 */
document.addEventListener("DOMContentLoaded", function () {
  /* ---------------------------------------------------------
     PRELOADER - reveal the page once we're ready, plus a
     hard fallback so the overlay can never trap the user.
     A <noscript>.css ruleset already unhides content if
     JavaScript is disabled entirely.
     --------------------------------------------------------- */
  var preloader = document.getElementById("preloader");
  var hidePreloader = function () {
    if (!preloader || preloader.classList.contains("preloader-done")) return;
    preloader.classList.add("preloader-done");
    // Remove from the DOM after the fade-out completes.
    setTimeout(function () {
      if (preloader && preloader.parentNode) {
        preloader.parentNode.removeChild(preloader);
      }
    }, 600);
  };

  if (document.readyState === "complete") {
    hidePreloader();
  } else {
    window.addEventListener("load", hidePreloader);
    // Fallback: never keep the user waiting more than 3.5s, even if a
    // remote image stalls the load event.
    setTimeout(hidePreloader, 3500);
  }

  /* ---------------------------------------------------------
     MOBILE NAV MENU
     --------------------------------------------------------- */
  var menuToggle = document.getElementById("mobile-menu-toggle");
  var mobileMenu = document.getElementById("mobile-menu");
  var menuIconOpen = document.getElementById("icon-open");
  var menuIconClose = document.getElementById("icon-close");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      var isHidden = mobileMenu.classList.contains("hidden");

      mobileMenu.classList.toggle("hidden");
      menuToggle.setAttribute("aria-expanded", isHidden ? "true" : "false");

      if (menuIconOpen && menuIconClose) {
        menuIconOpen.classList.toggle("hidden");
        menuIconClose.classList.toggle("hidden");
      }
    });

    // Close the mobile menu automatically when a nav link is tapped.
    var mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        mobileMenu.classList.add("hidden");
        menuToggle.setAttribute("aria-expanded", "false");
        if (menuIconOpen && menuIconClose) {
          menuIconOpen.classList.remove("hidden");
          menuIconClose.classList.add("hidden");
        }
      });
    });
  }

  /* ---------------------------------------------------------
     SCROLL REVEAL - add "reveal-in" the first time an element
     scrolls into view, then stop observing it.
     --------------------------------------------------------- */
  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Old browsers: just show everything.
    revealEls.forEach(function (el) {
      el.classList.add("reveal-in");
    });
  }

  // Safety net: if anything above fails, make sure no content stays hidden.
  setTimeout(function () {
    revealEls.forEach(function (el) {
      el.classList.add("reveal-in");
    });
  }, 4000);

  /* ---------------------------------------------------------
     BACK TO TOP - appears after scrolling down, smooth-scrolls
     back to the top when clicked.
     --------------------------------------------------------- */
  var backToTop = document.getElementById("back-to-top");

  if (backToTop) {
    var toggleBackToTop = function () {
      if (window.scrollY > 400) {
        backToTop.classList.remove("hidden");
        backToTop.classList.add("flex");
      } else {
        backToTop.classList.add("hidden");
        backToTop.classList.remove("flex");
      }
    };

    toggleBackToTop();
    window.addEventListener("scroll", toggleBackToTop, { passive: true });

    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
