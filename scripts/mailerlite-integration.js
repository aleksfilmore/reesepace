// MailerLite Integration for Reese Pace Newsletter Signup
// This handles the newsletter signup and triggers the automated welcome email

class MailerLiteIntegration {
  constructor() {
    // IMPORTANT: Do not hardcode secrets in client-side code.
    // Expect an API token to be injected via server-side templating or environment at build time.
    // For static hosting, prefer using MailerLite embedded forms instead of direct API calls.
    this.apiToken = (window.ML_API_TOKEN || '').trim();
    this.apiBase = 'https://connect.mailerlite.com/api';
    this.groupId = null; // Will be set after creating/getting the group
    this.automationId = null; // Will be set after creating the automation

    this.init();
  }

  async init() {
    await this.setupGroup();
    await this.setupAutomation();
    this.attachFormHandler();
  }

  // Create or get the subscriber group for Best Efforts readers
  async setupGroup() {
    // If no API token, skip remote calls and keep UX graceful
    if (!this.apiToken || this.apiToken === 'YOUR_MAILERLITE_API_TOKEN') {
      console.warn('🔑 MailerLite API token not configured.');
      console.log('📋 To enable automatic email delivery:');
      console.log('1. Get your API token from https://dashboard.mailerlite.com/integrations/api');
      console.log('2. Replace "YOUR_MAILERLITE_API_TOKEN" in the HTML with your actual token');
      console.log('3. Consider using MailerLite embedded forms for better security');
      return;
    }
    try {
      const response = await fetch(`${this.apiBase}/groups`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiToken}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: 'Best Efforts Bonus Scene Subscribers',
          type: 'regular'
        })
      });

      if (response.ok) {
        const group = await response.json();
        this.groupId = group.data.id;
        console.log('✅ Subscriber group created:', this.groupId);
      } else if (response.status === 422) {
        // Group likely already exists, try to find it
        console.log('📋 Group may already exist, searching for existing group...');
        await this.findExistingGroup();
      } else {
        console.error('❌ Failed to create subscriber group:', response.status);
        const errorData = await response.json().catch(() => null);
        console.error('Error details:', errorData);
        // Still try to find existing group as fallback
        await this.findExistingGroup();
      }
    } catch (error) {
      console.error('Error setting up group:', error);
      await this.findExistingGroup();
    }
  }

  async findExistingGroup() {
    if (!this.apiToken || this.apiToken === 'YOUR_MAILERLITE_API_TOKEN') return;
    
    try {
      const response = await fetch(`${this.apiBase}/groups`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiToken}`,
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        const groups = await response.json();
        console.log('📁 Available groups:', groups.data.map(g => ({ id: g.id, name: g.name })));
        
        // Look for the exact group name first
        let bonusGroup = groups.data.find(group => 
          group.name === 'Best Efforts Bonus Scene Subscribers'
        );
        
        // If not found, look for partial matches
        if (!bonusGroup) {
          bonusGroup = groups.data.find(group => 
            group.name.includes('Best Efforts') || 
            group.name.includes('Bonus Scene') ||
            group.name.includes('Newsletter')
          );
        }
        
        if (bonusGroup) {
          this.groupId = bonusGroup.id;
          console.log('✅ Found existing group:', bonusGroup.name, '(ID:', this.groupId, ')');
        } else if (groups.data.length > 0) {
          // Use the first available group as fallback
          this.groupId = groups.data[0].id;
          console.log('📝 Using fallback group:', groups.data[0].name, '(ID:', this.groupId, ')');
        } else {
          console.warn('⚠️ No groups found in MailerLite account');
        }
      } else {
        console.error('❌ Failed to fetch groups:', response.status);
      }
    } catch (error) {
      console.error('Error finding groups:', error);
    }
  }

  // Set up automation for the welcome email with bonus PDF
  async setupAutomation() {
    // Note: Automation setup via API might require manual configuration in MailerLite dashboard
    // This is a placeholder for the automation logic
    console.log('📧 Automation will be configured in MailerLite dashboard');
    console.log('Trigger: New subscriber joins "Best Efforts Bonus Scene Subscribers" group');
    console.log('Action: Send welcome email with PDF attachment');
  }

  // Subscribe a user to the newsletter
  async subscribeUser(email, firstName = '', lastName = '') {
  if (!this.groupId) {
      throw new Error('Group not initialized');
    }

    try {
      const subscriberData = {
        email: email,
        groups: [this.groupId],
        status: 'active'
      };

      if (firstName) subscriberData.fields = { name: firstName };
      if (lastName && subscriberData.fields) subscriberData.fields.last_name = lastName;

  const response = await fetch(`${this.apiBase}/subscribers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiToken}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify(subscriberData)
      });

      if (response.ok) {
        const subscriber = await response.json();
        console.log('✅ Subscriber added:', subscriber.data.email);
        return { success: true, subscriber: subscriber.data };
      } else {
        const error = await response.json();
        console.error('❌ Subscription failed:', error);
        return { success: false, error: error.message };
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      return { success: false, error: 'Network error occurred' };
    }
  }

  // Attach form submission handler
  attachFormHandler() {
  const form = document.getElementById('newsletter-signup-form');
    if (!form) {
      console.error('Newsletter form not found');
      return;
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const emailInput = form.querySelector('input[type="email"]');
      const submitBtn = form.querySelector('button[type="submit"]');
      const messageEl = form.querySelector('#form-msg');
      
      if (!emailInput || !emailInput.value) {
        this.showMessage(messageEl, 'Please enter a valid email address.', 'error');
        return;
      }

      // Disable form during submission
      this.setFormState(form, true);
      submitBtn.textContent = 'Sending...';
      
      try {
        if (!this.apiToken || this.apiToken === 'YOUR_MAILERLITE_API_TOKEN') {
          // Show helpful message when API is not configured
          this.showMessage(messageEl, '⚠️ MailerLite API not configured. Please contact support@reesepace.com for your bonus scene.', 'warning');
          console.log('💡 To enable automatic delivery, configure your MailerLite API token in the HTML file.');
          submitBtn.textContent = 'Contact Support';
        } else {
          const result = await this.subscribeUser(emailInput.value);
          if (result.success) {
            this.showMessage(messageEl, '🎉 Success! Check your inbox for the bonus scene.', 'success');
            emailInput.value = '';
            submitBtn.textContent = 'Sent!';
            this.trackSignup(emailInput.value);
          } else {
            this.showMessage(messageEl, result.error || 'Something went wrong. Please try again.', 'error');
            submitBtn.textContent = 'Send me the bonus';
          }
        }
      } catch (error) {
        this.showMessage(messageEl, 'Network error. Please check your connection and try again.', 'error');
        submitBtn.textContent = 'Send me the bonus';
      }
      
      this.setFormState(form, false);
    });
  }

  setFormState(form, disabled) {
    const inputs = form.querySelectorAll('input, button');
    inputs.forEach(input => {
      input.disabled = disabled;
    });
  }

  showMessage(element, message, type) {
    if (!element) return;
    
    element.textContent = message;
    element.className = `form-msg ${type}`;
    element.style.display = 'block';
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
      setTimeout(() => {
        element.style.display = 'none';
      }, 5000);
    }
  }

  // Optional: Track signup events for analytics
  trackSignup(email) {
    // Add your analytics tracking here
    console.log('📊 Signup tracked:', email);
    
    // Example: Google Analytics 4 event
    if (typeof gtag !== 'undefined') {
      gtag('event', 'newsletter_signup', {
        event_category: 'engagement',
        event_label: 'best_efforts_bonus_scene'
      });
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('newsletter-signup-form')) {
    window.mailerliteIntegration = new MailerLiteIntegration();
  }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MailerLiteIntegration;
}
