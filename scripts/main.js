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

// MailerLite Newsletter Signup Integration
const newsletterForm = document.getElementById('newsletter-signup-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email');
    const submitBtn = newsletterForm.querySelector('button[type="submit"]');
    const formMsg = document.getElementById('form-msg');
    
    // Validate email
    if (!email.value || !email.validity.valid) {
      showMessage('Please enter a valid email address.', 'error');
      return;
    }
    
    // Show loading state
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    formMsg.style.display = 'none';
    
    try {
      // MailerLite API integration
      const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_MAILERLITE_API_TOKEN', // Replace with your actual token
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: email.value,
          groups: ['Best Efforts Bonus Scene Subscribers'], // Your group name
          fields: {
            source: 'website_bonus_signup'
          }
        })
      });
      
      if (response.ok) {
        showMessage('Success! Check your email for the bonus scene. 🔥', 'success');
        newsletterForm.reset();
        
        // Optional: Track signup event
        if (typeof gtag !== 'undefined') {
          gtag('event', 'newsletter_signup', {
            event_category: 'engagement',
            event_label: 'bonus_scene'
          });
        }
      } else {
        const errorData = await response.json();
        console.error('MailerLite API Error:', errorData);
        
        // Handle specific MailerLite errors
        if (response.status === 422 && errorData.message && errorData.message.includes('already exists')) {
          showMessage('You\'re already subscribed! Check your email for the bonus scene.', 'success');
        } else {
          showMessage('Something went wrong. Please try again.', 'error');
        }
      }
    } catch (error) {
      console.error('Network error:', error);
      
      // Fallback: Show success message and manual instructions
      showMessage('Thanks for signing up! We\'ll send you the bonus scene soon. If you don\'t receive it within 24 hours, please contact us.', 'success');
      newsletterForm.reset();
    }
    
    // Reset button state
    submitBtn.textContent = originalBtnText;
    submitBtn.disabled = false;
  });
  
  function showMessage(message, type) {
    const formMsg = document.getElementById('form-msg');
    formMsg.textContent = message;
    formMsg.className = `form-msg ${type}`;
    formMsg.style.display = 'block';
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
      setTimeout(() => {
        formMsg.style.display = 'none';
      }, 5000);
    }
  }
}
