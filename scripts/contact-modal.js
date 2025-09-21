// Contact Modal Management - Email-only version
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
      
      // Focus on email link for accessibility
      const emailLink = modal.querySelector('.email-link');
      if (emailLink) {
        setTimeout(() => emailLink.focus(), 100);
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
    }
  };

  // Copy email address to clipboard
  window.copyEmailAddress = function() {
    const email = 'reesepace@yahoo.com';
    const button = document.querySelector('.copy-email-btn');
    
    if (!button) return;
    
    // Try modern clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email).then(() => {
        showCopySuccess(button);
      }).catch(() => {
        fallbackCopyToClipboard(email, button);
      });
    } else {
      // Fallback for older browsers or non-secure contexts
      fallbackCopyToClipboard(email, button);
    }
  };

  // Fallback copy method for older browsers
  function fallbackCopyToClipboard(text, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      showCopySuccess(button);
    } catch (err) {
      console.error('Copy failed:', err);
      showCopyError(button);
    }
    
    document.body.removeChild(textArea);
  }

  // Show copy success feedback
  function showCopySuccess(button) {
    const originalText = button.innerHTML;
    button.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px; margin-right: 4px;">
        <polyline points="20,6 9,17 4,12"></polyline>
      </svg>
      Copied!
    `;
    button.classList.add('success');
    
    setTimeout(() => {
      button.innerHTML = originalText;
      button.classList.remove('success');
    }, 2000);
  }

  // Show copy error feedback
  function showCopyError(button) {
    const originalText = button.innerHTML;
    button.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px; margin-right: 4px;">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
      </svg>
      Failed
    `;
    button.classList.add('error');
    
    setTimeout(() => {
      button.innerHTML = originalText;
      button.classList.remove('error');
    }, 2000);
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

  // Handle tab trapping within modal for accessibility
  function handleTabTrap(event) {
    if (event.key !== 'Tab') return;
    
    const modal = document.getElementById('contactModal');
    if (!modal || modal.classList.contains('hidden')) return;
    
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }

  // Initialize event listeners
  function init() {
    // Escape key to close modal
    document.addEventListener('keydown', handleKeyDown);
    
    // Tab trap for accessibility
    document.addEventListener('keydown', handleTabTrap);
    
    // Click outside modal to close
    document.addEventListener('click', function(event) {
      const modal = document.getElementById('contactModal');
      if (event.target === modal) {
        closeContactModal();
      }
    });
  }

  // Initialize when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();