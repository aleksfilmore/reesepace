// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scroll for same-page anchors
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (href.length > 1) {
      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// Mobile Menu Toggle Functionality
(function() {
  'use strict';
  
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav a');
  
  if (!mobileMenuToggle || !nav) return;
  
  // Toggle mobile menu
  function toggleMobileMenu() {
    const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
    
    mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
    nav.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (!isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
  
  // Close mobile menu
  function closeMobileMenu() {
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // Event listeners
  mobileMenuToggle.addEventListener('click', toggleMobileMenu);
  
  // Close menu when clicking on nav links
  navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('active')) {
      closeMobileMenu();
    }
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('active') && 
        !nav.contains(e.target) && 
        !mobileMenuToggle.contains(e.target)) {
      closeMobileMenu();
    }
  });
  
  // Handle window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && nav.classList.contains('active')) {
      closeMobileMenu();
    }
  });
})();

// Enhanced Form Validation for Newsletter Signup
(function() {
  'use strict';
  
  const form = document.getElementById('newsletter-signup-form');
  const emailInput = document.getElementById('email');
  const errorDiv = document.getElementById('email-error');
  
  if (!form || !emailInput || !errorDiv) return;
  
  // Email validation function
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Show error message
  function showError(message) {
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    emailInput.setAttribute('aria-invalid', 'true');
    emailInput.focus();
  }
  
  // Hide error message
  function hideError() {
    errorDiv.style.display = 'none';
    emailInput.setAttribute('aria-invalid', 'false');
  }
  
  // Real-time validation on input
  emailInput.addEventListener('input', () => {
    if (emailInput.value && !isValidEmail(emailInput.value)) {
      showError('Please enter a valid email address');
    } else {
      hideError();
    }
  });
  
  // Validation on form submit (handled by MailerLite integration)
  form.addEventListener('submit', (e) => {
    if (!emailInput.value) {
      e.preventDefault();
      showError('Email address is required');
      return;
    }
    
    if (!isValidEmail(emailInput.value)) {
      e.preventDefault();
      showError('Please enter a valid email address');
      return;
    }
    
    hideError();
  });
})();
