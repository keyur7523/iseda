(() => {
    document.addEventListener("DOMContentLoaded", () => {
      /* =========================================================
         LUCIDE INIT (Task 6.3)
         ========================================================= */
      if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
      }
  
      /* =========================================================
         HEADER (Task 3.4)
         ========================================================= */
      const header = document.querySelector(".header");
      const menuToggle = document.querySelector(".header__menu-toggle");
      const mobileMenu = document.querySelector(".mobile-menu");
      const mobilePanel = document.querySelector(".mobile-menu__panel");
      const mobileBackdrop = document.querySelector(".mobile-menu__backdrop");
  
      if (header && menuToggle && mobileMenu && mobilePanel && mobileBackdrop) {
        const openClass = "is-open";
        const activeClass = "is-active";
        const scrollLockClass = "menu-open";
  
        const setMenuState = (isOpen) => {
          menuToggle.setAttribute("aria-expanded", String(isOpen));
          menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  
          mobileMenu.classList.toggle(openClass, isOpen);
          menuToggle.classList.toggle(activeClass, isOpen);
  
          mobileMenu.setAttribute("aria-hidden", String(!isOpen));
          document.body.classList.toggle(scrollLockClass, isOpen);
        };
  
        const closeMenu = () => setMenuState(false);
        const toggleMenu = () => {
          const isOpen = mobileMenu.classList.contains(openClass);
          setMenuState(!isOpen);
        };
  
        menuToggle.addEventListener("click", (e) => {
          e.preventDefault();
          toggleMenu();
        });
  
        mobileBackdrop.addEventListener("click", () => {
          closeMenu();
        });
  
        mobilePanel.addEventListener("click", (e) => {
          const target = e.target;
          if (target && target.matches('a[href^="#"]')) {
            closeMenu();
          }
        });
  
        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape") {
            closeMenu();
          }
        });
  
        const solidClass = "header--solid";
        const updateHeader = () => {
          const y = window.scrollY || document.documentElement.scrollTop || 0;
          header.classList.toggle(solidClass, y > 20);
        };
  
        updateHeader();
        window.addEventListener("scroll", updateHeader, { passive: true });
  
        setMenuState(false);
      }

      const yearEl = document.getElementById("year");
      if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
      }
  
      /* =========================================================
         HERO ENTRANCE (Task 4.3)
         ========================================================= */
      const prefersReducedMotion =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  
      if (prefersReducedMotion) {
        return;
      }
  
      if (!window.gsap) {
        return;
      }
  
      const hero = document.querySelector(".hero");
      if (!hero) {
        return;
      }
  
      const bg = hero.querySelector(".hero__bg");
      const overlay = hero.querySelector(".hero__overlay");
      const logo = hero.querySelector(".hero__logo");
      const tagline = hero.querySelector(".hero__tagline");
      const title = hero.querySelector(".hero__title");
      const subtitle = hero.querySelector(".hero__subtitle");
      const ctas = hero.querySelector(".hero__cta-group");
      const scrollIndicator = hero.querySelector(".hero__scroll-indicator");
  
      window.gsap.set([logo, tagline, title, subtitle, ctas], {
        opacity: 0,
        y: 18,
      });
  
      if (scrollIndicator) {
        window.gsap.set(scrollIndicator, { opacity: 0, y: 8 });
      }
  
      if (bg) {
        window.gsap.set(bg, { scale: 1.04 });
      }
  
      if (overlay) {
        window.gsap.set(overlay, { opacity: 0.55 });
      }
  
      const tl = window.gsap.timeline({ defaults: { ease: "power3.out" } });
  
      if (bg) {
        tl.to(bg, { scale: 1.0, duration: 1.4 }, 0);
      }
  
      if (overlay) {
        tl.to(overlay, { opacity: 0.35, duration: 1.2 }, 0);
      }
  
      tl.to(
        [logo, tagline, title, subtitle, ctas],
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
        },
        0.15
      );
  
      if (scrollIndicator) {
        tl.to(scrollIndicator, { opacity: 1, y: 0, duration: 0.7 }, "-=0.25");
      }

    });
  })();
  