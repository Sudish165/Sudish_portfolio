// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Dark Mode Toggle Functionality
  const themeToggleButtons = document.querySelectorAll(".theme-toggle")

  // Check for saved theme preference or use device preference
  const savedTheme = localStorage.getItem("theme")
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

  // Set initial theme
  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.body.classList.add("dark-mode")
    themeToggleButtons.forEach((button) => {
      const icon = button.querySelector("i")
      if (icon) {
        icon.classList.replace("fa-moon", "fa-sun")
      }
    })
  }

  // Toggle theme function
  function toggleTheme() {
    if (document.body.classList.contains("dark-mode")) {
      document.body.classList.remove("dark-mode")
      localStorage.setItem("theme", "light")
      themeToggleButtons.forEach((button) => {
        const icon = button.querySelector("i")
        if (icon) {
          icon.classList.replace("fa-sun", "fa-moon")
        }
      })
    } else {
      document.body.classList.add("dark-mode")
      localStorage.setItem("theme", "dark")
      themeToggleButtons.forEach((button) => {
        const icon = button.querySelector("i")
        if (icon) {
          icon.classList.replace("fa-moon", "fa-sun")
        }
      })
    }
  }

  // Add click event to all theme toggle buttons
  themeToggleButtons.forEach((button) => {
    button.addEventListener("click", toggleTheme)
  })

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

  // Photo Loop System - Large Single Image
  const heroImage = document.getElementById("heroImage")

  // Array of image sources
  const imageSources = ["./img/me.jpg", "./img/mee.jpg", "./img/mee.jpg"]

  let currentImageIndex = 0
  let photoLoopInterval

  function switchToNextImage() {
    // Move to next image
    currentImageIndex = (currentImageIndex + 1) % imageSources.length

    // Update image with smooth transition
    if (heroImage) {
      // Add fade out effect
      heroImage.style.opacity = "0"

      setTimeout(() => {
        // Change the image source
        heroImage.src = imageSources[currentImageIndex]

        // Fade back in
        heroImage.style.opacity = "1"
      }, 400) // Half of the transition time
    }
  }

  // Start the photo loop if we have multiple images
  if (imageSources.length > 1 && heroImage) {
    // Switch image every 4 seconds
    photoLoopInterval = setInterval(switchToNextImage, 3500)

    // Pause on hover
    const imageContainer = document.querySelector(".image-container")
    if (imageContainer) {
      imageContainer.addEventListener("mouseenter", () => {
        clearInterval(photoLoopInterval)
      })

      imageContainer.addEventListener("mouseleave", () => {
        photoLoopInterval = setInterval(switchToNextImage, 3500)
      })
    }
  }

  // ============================================
  // ANIMATED PARTICLE BACKGROUND
  // ============================================
  const canvas = document.getElementById("particleCanvas")
  if (canvas) {
    const ctx = canvas.getContext("2d")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = []
    const particleCount = 30

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = Math.random() * 2 - 1
        this.speedY = Math.random() * 2 - 1
        this.opacity = Math.random() * 0.5 + 0.2
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        ctx.fillStyle = `rgba(161, 140, 209, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.strokeStyle = `rgba(161, 140, 209, ${0.15 * (1 - distance / 120)})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      requestAnimationFrame(animateParticles)
    }

    animateParticles()

    // Resize handler
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    })
  }

  // ============================================
  // TYPING ANIMATION
  // ============================================
  const typingText = document.getElementById("typing-text")
  if (typingText) {
    const text = typingText.textContent
    typingText.textContent = ""
    typingText.style.borderRight = "3px solid var(--primary-color)"

    let i = 0
    function typeWriter() {
      if (i < text.length) {
        typingText.textContent += text.charAt(i)
        i++
        setTimeout(typeWriter, 100)
      } else {
        // Keep blinking cursor
        setInterval(() => {
          typingText.style.borderRight =
            typingText.style.borderRight === "none"
              ? "3px solid var(--primary-color)"
              : "none"
        }, 500)
      }
    }

    setTimeout(() => {
      typeWriter()
    }, 300)
  }

  // ============================================
  // SCROLL REVEAL ANIMATIONS
  // ============================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active")
      }
    })
  }, observerOptions)

  // Add reveal class to elements
  const revealElements = document.querySelectorAll(
    ".section-header, .about-text, .skill-card, .project-card, .education-card, .certificate-card, .contact-info"
  )

  revealElements.forEach((el) => {
    el.classList.add("reveal")
    observer.observe(el)
  })

  // ============================================
  // FLOATING ANIMATION FOR SKILL CARDS
  // ============================================
  const skillCards = document.querySelectorAll(".skill-card")
  skillCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.08}s`
  })
})
