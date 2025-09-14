// Cookie Consent Management
(function() {
  'use strict';

  // Check if user has already made a consent choice
  function checkCookieConsent() {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      showCookieBanner();
    } else if (consent === 'all') {
      enableAnalytics();
    }
  }

  // Show cookie consent banner
  function showCookieBanner() {
    const banner = document.getElementById('cookieConsent');
    if (banner) {
      banner.classList.remove('hidden');
      setTimeout(() => {
        banner.classList.add('show');
      }, 100);
    }
  }

  // Hide cookie consent banner
  function hideCookieBanner() {
    const banner = document.getElementById('cookieConsent');
    if (banner) {
      banner.classList.remove('show');
      setTimeout(() => {
        banner.classList.add('hidden');
      }, 300);
    }
  }

  // Accept all cookies
  window.acceptAllCookies = function() {
    localStorage.setItem('cookieConsent', 'all');
    hideCookieBanner();
    enableAnalytics();
    
    // Track consent acceptance
    if (typeof gtag !== 'undefined') {
      gtag('event', 'cookie_consent', {
        'consent_type': 'all'
      });
    }
  };

  // Accept only essential cookies
  window.acceptEssentialCookies = function() {
    localStorage.setItem('cookieConsent', 'essential');
    hideCookieBanner();
    
    // Track consent acceptance
    if (typeof gtag !== 'undefined') {
      gtag('event', 'cookie_consent', {
        'consent_type': 'essential'
      });
    }
  };

  // Enable Google Analytics
  function enableAnalytics() {
    if (typeof enableAnalytics !== 'undefined') {
      window.enableAnalytics();
    }
  }

  // Initialize when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkCookieConsent);
  } else {
    checkCookieConsent();
  }

  // Function to reset consent (used in cookie policy page)
  window.resetCookieConsent = function() {
    localStorage.removeItem('cookieConsent');
    location.reload();
  };

})();