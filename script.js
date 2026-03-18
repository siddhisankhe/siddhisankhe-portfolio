      // Theme toggle
      function setTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
      }
      function toggleTheme() {
        const current = document.documentElement.getAttribute("data-theme");
        setTheme(current === "dark" ? "light" : "dark");
      }
      // Init: localStorage > system preference > light
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          setTheme(saved);
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          setTheme("dark");
        }
      })();
      document
        .getElementById("themeToggle")
        .addEventListener("click", toggleTheme);
      document
        .getElementById("themeToggleMobile")
        .addEventListener("click", toggleTheme);

      // Accordion toggle
      function toggleCase(h) {
        h.closest(".case-card").classList.toggle("open");
      }

      // Sticky nav — IntersectionObserver on ticker
      const ticker = document.getElementById("ticker");
      const stickyNav = document.getElementById("stickyNav");
      const tickerObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              stickyNav.classList.remove("visible");
            } else {
              stickyNav.classList.add("visible");
            }
          });
        },
        { threshold: 0 },
      );
      tickerObs.observe(ticker);

      // Hamburger menu
      const hamburger = document.getElementById("hamburger");
      const mobileMenu = document.getElementById("mobileMenu");
      hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        mobileMenu.classList.toggle("open");
      });
      // Close mobile menu on link click
      mobileMenu.querySelectorAll("a").forEach((a) => {
        a.addEventListener("click", () => {
          mobileMenu.classList.remove("open");
          hamburger.classList.remove("active");
        });
      });

      // Fade-in observer
      const fadeObs = new IntersectionObserver(
        (es) => {
          es.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("visible");
              fadeObs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.1 },
      );
      document
        .querySelectorAll(".fade-in")
        .forEach((el) => fadeObs.observe(el));

      // Counter animation
      function animCounter(el) {
        const t = parseFloat(el.dataset.target);
        const pre = el.dataset.prefix || "";
        const suf = el.dataset.suffix || "";
        const dec = parseInt(el.dataset.decimals) || 0;
        const dur = 1800;
        const t0 = performance.now();
        (function tick(now) {
          const p = Math.min((now - t0) / dur, 1);
          const v = (1 - Math.pow(1 - p, 3)) * t;
          el.textContent =
            pre +
            (dec > 0
              ? v.toFixed(dec)
              : t >= 1000
                ? Math.round(v).toLocaleString()
                : Math.round(v)) +
            suf;
          if (p < 1) requestAnimationFrame(tick);
        })(t0);
      }
      const cObs = new IntersectionObserver(
        (es) => {
          es.forEach((e) => {
            if (e.isIntersecting) {
              animCounter(e.target);
              cObs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.5 },
      );
      document.querySelectorAll(".counter").forEach((el) => cObs.observe(el));

      // Hero fade-in on load
      window.addEventListener("load", () => {
        document
          .querySelectorAll("#hero .fade-in")
          .forEach((el, i) =>
            setTimeout(() => el.classList.add("visible"), 200 + i * 180),
          );
      });
