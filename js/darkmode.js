// // Dark Mode Toggle Functionality
// document.addEventListener("DOMContentLoaded", () => {
//     const themeToggle = document.querySelector(".theme-toggle")
//     const themeIcon = document.querySelector(".theme-toggle i")
  
//     // Check for saved theme preference or use device preference
//     const savedTheme = localStorage.getItem("theme")
//     const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  
//     // Set initial theme
//     if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
//       document.body.classList.add("dark-mode")
//       themeIcon.classList.replace("fa-moon", "fa-sun")
//     }
  
//     // Toggle theme function
//     function toggleTheme() {
//       if (document.body.classList.contains("dark-mode")) {
//         document.body.classList.remove("dark-mode")
//         localStorage.setItem("theme", "light")
//         themeIcon.classList.replace("fa-sun", "fa-moon")
//       } else {
//         document.body.classList.add("dark-mode")
//         localStorage.setItem("theme", "dark")
//         themeIcon.classList.replace("fa-moon", "fa-sun")
//       }
//     }
  
//     // Add click event to theme toggle button
//     if (themeToggle) {
//       themeToggle.addEventListener("click", toggleTheme)
//     }
  
//     // Update icon on page load
//     if (document.body.classList.contains("dark-mode")) {
//       themeIcon.classList.replace("fa-moon", "fa-sun")
//     }
//   })
  