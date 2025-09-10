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

// Demo form behavior for local preview
const form = document.getElementById('fallback-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = document.getElementById('form-msg');
    const email = /** @type {HTMLInputElement} */ (document.getElementById('email'));
    if (!email.value || !email.validity.valid) {
      msg.textContent = 'Please enter a valid email.';
      msg.style.color = '#a30f5a';
      return;
    }
    msg.textContent = 'Thanks! Check your email to confirm your subscription.';
    msg.style.color = '#2b1b24';
    form.reset();
  });
}
