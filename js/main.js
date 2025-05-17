// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Toggle
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      this.classList.toggle("active")
      navLinks.classList.toggle("active")
    })
  }

  // Close mobile menu when clicking on a nav link
  const navItems = document.querySelectorAll(".nav-links a")
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (hamburger) {
        hamburger.classList.remove("active")
        navLinks.classList.remove("active")
      }
    })
  })

  // Back to top button
  const backToTopButton = document.querySelector(".back-to-top")

  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add("active")
      } else {
        backToTopButton.classList.remove("active")
      }
    })

    backToTopButton.addEventListener("click", (e) => {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Animate skill bars on scroll
  const skillSection = document.querySelector(".skills")
  const skillBars = document.querySelectorAll(".skill-progress")

  if (skillSection && skillBars.length > 0) {
    let animated = false

    // Modify the skill bars animation to be more subtle
    function animateSkillBars() {
      if (animated) return

      const sectionPos = skillSection.getBoundingClientRect().top
      const screenPos = window.innerHeight / 1.3

      if (sectionPos < screenPos) {
        skillBars.forEach((bar) => {
          const width = bar.style.width || bar.getAttribute("style")?.match(/width: (\d+)%/)?.[1] || "0"
          bar.style.width = "0%"
          setTimeout(() => {
            bar.style.width = typeof width === "string" && width.includes("%") ? width : `${width}%`
          }, 100)
        })

        animated = true
        // Remove the event listener once animation is triggered
        window.removeEventListener("scroll", animateSkillBars)
      }
    }

    window.addEventListener("scroll", animateSkillBars)
    // Initial check
    animateSkillBars()
  }

  // Mobile Header Toggle for Sidebar
  const mobileToggle = document.querySelector(".mobile-toggle")
  const sidebar = document.querySelector(".sidebar")
  const overlay = document.querySelector(".overlay")

  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener("click", () => {
      sidebar.classList.toggle("active")
      overlay.classList.toggle("active")
      document.body.classList.toggle("no-scroll")
    })
  }

  // Sidebar Open Button
  const sidebarOpen = document.querySelector(".sidebar-open")
  if (sidebarOpen && sidebar) {
    sidebarOpen.addEventListener("click", () => {
      sidebar.classList.add("active")
      overlay.classList.add("active")
      document.body.classList.add("no-scroll")
    })
  }

  // Overlay click to close sidebar
  if (overlay) {
    overlay.addEventListener("click", () => {
      sidebar.classList.remove("active")
      overlay.classList.remove("active")
      document.body.classList.remove("no-scroll")
    })
  }

  // Close sidebar when clicking menu items on mobile
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 991) {
        sidebar.classList.remove("active")
        overlay.classList.remove("active")
        document.body.classList.remove("no-scroll")
      }
    })
  })

  // Function to update active menu item
  function updateActiveMenuItem() {
    const sections = document.querySelectorAll("section[id]")
    const scrollPosition = window.scrollY + 100 // Adjusted offset for better detection

    // Find the section that is currently in view
    for (const section of sections) {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        const currentSection = section.getAttribute("id")

        // Only update DOM if necessary
        const currentActive = document.querySelector(".nav-menu a.active")
        const newActive = document.querySelector(`.nav-menu a[href="#${currentSection}"]`)

        if (currentActive !== newActive) {
          if (currentActive) currentActive.classList.remove("active")
          if (newActive) newActive.classList.add("active")
        }

        return // Exit early once we found our section
      }
    }

    // Handle top of page
    if (scrollPosition < 300) {
      const currentActive = document.querySelector(".nav-menu a.active")
      const homeLink = document.querySelector('.nav-menu a[href="#home"]')

      if (currentActive !== homeLink) {
        if (currentActive) currentActive.classList.remove("active")
        if (homeLink) homeLink.classList.add("active")
      }
    }
  }

  // Use requestAnimationFrame for smooth performance
  let ticking = false
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveMenuItem()
          ticking = false
        })
        ticking = true
      }
    },
    { passive: true },
  )

  // Update active menu item on page load
  updateActiveMenuItem()

  // Handle click events on menu items
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", (e) => {
      // Remove active class from all menu items
      document.querySelectorAll(".nav-menu a").forEach((item) => {
        item.classList.remove("active")
      })

      // Add active class to clicked item
      link.classList.add("active")

      // Get the target section
      const targetId = link.getAttribute("href")
      if (targetId.startsWith("#")) {
        e.preventDefault()
        const targetSection = document.querySelector(targetId)
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 50,
            behavior: "smooth",
          })
        }
      }
    })
  })

  // Check window size and initialize sidebar state
  function checkWindowSize() {
    if (window.innerWidth <= 991) {
      // Mobile view
      if (sidebar) {
        sidebar.classList.remove("active")
      }
      if (overlay) {
        overlay.classList.remove("active")
      }
    }
  }

  // Run on page load
  checkWindowSize()

  // Run on window resize
  window.addEventListener("resize", checkWindowSize)
})
