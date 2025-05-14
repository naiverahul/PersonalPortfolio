/**
 * Portfolio Website JavaScript
 * Handles animations and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize skill bar animations
  animateSkillBars();
  
  // Add scroll reveal effect to sections
  revealOnScroll();
});

/**
 * Animates the skill percentage bars
 */
function animateSkillBars() {
  // Get all skill bars
  const skillBars = document.querySelectorAll('.fill');
  
  // Animate each bar to its percentage width
  skillBars.forEach(el => {
    const percent = el.getAttribute('data-percent');
    // Delay animation for a staggered effect
    setTimeout(() => {
      el.style.width = percent;
    }, 300);
  });
}

/**
 * Reveals sections as user scrolls down
 */
function revealOnScroll() {
  // Get all sections
  const sections = document.querySelectorAll('section');
  
  // Create intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Add animation class when section is visible
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Stop observing after it's revealed
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1 // Trigger when 10% of the section is visible
  });
  
  // Start observing each section
  sections.forEach(section => {
    section.classList.add('reveal-section');
    observer.observe(section);
  });
  
  // Add CSS for animations to the document
  const style = document.createElement('style');
  style.textContent = `
    .reveal-section {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .revealed {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
}

/**
 * Handles mobile navigation menu
 */
function toggleMobileMenu() {
  const nav = document.querySelector('nav');
  if (nav) {
    nav.classList.toggle('mobile-active');
  }
}
