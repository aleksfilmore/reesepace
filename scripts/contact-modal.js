// Contact Modal Management
(function() {
  'use strict';

  // Open contact modal
  window.openContactModal = function() {
    const modal = document.getElementById('contactModal');
    if (modal) {
      modal.classList.remove('hidden');
      setTimeout(() => {
        modal.classList.add('show');
      }, 10);
      
      // Focus on first input
      const firstInput = modal.querySelector('input[type="text"]');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
      }
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    }
  };

  // Close contact modal
  window.closeContactModal = function() {
    const modal = document.getElementById('contactModal');
    if (modal) {
      modal.classList.remove('show');
      setTimeout(() => {
        modal.classList.add('hidden');
      }, 300);
      
      // Restore body scroll
      document.body.style.overflow = '';
      
      // Clear form
      const form = document.getElementById('contactForm');
      if (form) {
        form.reset();
        hideFormMessage();
      }
    }
  };

  // Handle form submission
  function handleContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Disable submit button
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    // Collect form data
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    };
    
    // Simple email validation
    if (!isValidEmail(data.email)) {
      showFormMessage('Please enter a valid email address.', 'error');
      resetSubmitButton(submitButton);
      return;
    }
    
    // Simulate form submission (replace with actual form handling)
    submitContactForm(data)
      .then(() => {
        showFormMessage('Thank you! Your message has been sent. I\'ll get back to you soon!', 'success');
        form.reset();
        setTimeout(() => {
          closeContactModal();
        }, 2000);
      })
      .catch((error) => {
        console.error('Contact form error:', error);
        showFormMessage('Sorry, there was an error sending your message. Please try again or email me directly at reesepace@yahoo.com', 'error');
      })
      .finally(() => {
        resetSubmitButton(submitButton);
      });
  }

  // Submit contact form (this is a placeholder - you'll need to implement actual email sending)
  function submitContactForm(data) {
    return new Promise((resolve, reject) => {
      // This is where you would integrate with your email service
      // For now, we'll simulate a successful submission
      
      // Option 1: Use a service like Formspree, Netlify Forms, or EmailJS
      // Option 2: Send to your own backend API
      // Option 3: Use mailto (basic fallback)
      
      // Simulated API call
      setTimeout(() => {
        // Create mailto link as fallback
        const subject = encodeURIComponent(`Contact Form: ${data.subject}`);
        const body = encodeURIComponent(
          `Name: ${data.name}\n` +
          `Email: ${data.email}\n` +
          `Subject: ${data.subject}\n\n` +
          `Message:\n${data.message}`
        );
        const mailtoLink = `mailto:reesepace@yahoo.com?subject=${subject}&body=${body}`;
        
        // Open mailto link
        window.location.href = mailtoLink;
        
        resolve();
      }, 1000);
    });
  }

  // Email validation
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Show form message
  function showFormMessage(message, type) {
    const messageEl = document.getElementById('contactFormMsg');
    if (messageEl) {
      messageEl.textContent = message;
      messageEl.className = `form-msg ${type}`;
      messageEl.style.display = 'block';
    }
  }

  // Hide form message
  function hideFormMessage() {
    const messageEl = document.getElementById('contactFormMsg');
    if (messageEl) {
      messageEl.style.display = 'none';
    }
  }

  // Reset submit button
  function resetSubmitButton(button) {
    button.disabled = false;
    button.textContent = 'Send Message';
  }

  // Close modal on Escape key
  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      const modal = document.getElementById('contactModal');
      if (modal && !modal.classList.contains('hidden')) {
        closeContactModal();
      }
    }
  }

  // Initialize event listeners
  function init() {
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Escape key to close modal
    document.addEventListener('keydown', handleKeyDown);
  }

  // Initialize when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();