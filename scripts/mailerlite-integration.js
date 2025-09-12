// MailerLite Integration for Reese Pace Newsletter Signup
// This handles the newsletter signup and triggers the automated welcome email

class MailerLiteIntegration {
  constructor() {
    this.apiToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMWUwZmQ4NDAwY2MyZGJjNGZjZWJlZDhmZjBjNzk4MzhkNzZmZDllYjM1ZWU4OTI5YmEyMjNhZmU2NjVjZjUzMTA3NzAyOWYxMTc0OGFhZWQiLCJpYXQiOjE3NTc2ODMyMjcuNjEyODQ4LCJuYmYiOjE3NTc2ODMyMjcuNjEyODUxLCJleHAiOjQ5MTMzNTY4MjcuNjA3Nzk3LCJzdWIiOiIxODA4MTA5Iiwic2NvcGVzIjpbXX0.bLgg_7eK1EnWaWc4dJP0kOfoUdTAN9DrjYy8uDrvG9OVMvMb_EemgrgB52Wmryu2hYhogQbc4Spwo3CYsbnkrYs8USWql9KhGXzt0iR38dBd5FAT9kGcJ718nuT1tpMZh0Ay0Mi3UqB6n4xZasoUx5hziAcdabblauef0yNxUWLNC4ujbwNoYqATC4jexdZQJiiMjL5W8t7sOPkhwwWS82j85cefpf9-Gfgm7kYVYgbqHNKLLIYf8dMUkUbkOFFYpKO5x9VGcBtHMr3LR6IpWpUsjcC1phxmaTOrvH94TODLNCBHaEI2Cix96fqAAiX7zINtIW8xgGU2vuPhz_oew6UNePJWKRbTmhRxIgjgM59T_UBAnXWt7cY1OjaEpa3QnRhmRzrARudcwdkxP9gSgvtSjCrO2e9jk4WxdKKB_Fa1fze7C9hLQkf3b19PlJWkUDe5hxO-WG_5ioHeqJRxuinJZwnjhPW13L9k5v1gLNUdcbg2VBVfsazwZ9g1S5CDUIQOMFq9yGIXtVx-Bm2LIScnLcc0py1vAqL2V_sdW3zMQWXkIFPx5cUxQXzblmXofnoPJUZSIF2qp42p9znHkg2zYfx754V-d--mV6YhpTvzcRNFOLnJD_FWaaXzqqiHBYD2kZKaS299xli8lyyHpzulRRRjfpfzfS_MYw7CAYw';
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
        console.log('✅ Subscriber group created/found:', this.groupId);
      } else if (response.status === 422) {
        // Group might already exist, try to find it
        await this.findExistingGroup();
      }
    } catch (error) {
      console.error('Error setting up group:', error);
      await this.findExistingGroup();
    }
  }

  async findExistingGroup() {
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
        const bonusGroup = groups.data.find(group => 
          group.name.includes('Best Efforts') || group.name.includes('Bonus Scene')
        );
        
        if (bonusGroup) {
          this.groupId = bonusGroup.id;
          console.log('✅ Found existing group:', this.groupId);
        } else {
          // Use the first available group or create default
          this.groupId = groups.data[0]?.id || null;
          console.log('📝 Using default group:', this.groupId);
        }
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
        const result = await this.subscribeUser(emailInput.value);
        
        if (result.success) {
          this.showMessage(messageEl, '🎉 Success! Check your inbox for the bonus scene.', 'success');
          emailInput.value = '';
          submitBtn.textContent = 'Sent!';
          
          // Track the signup event
          this.trackSignup(emailInput.value);
        } else {
          this.showMessage(messageEl, result.error || 'Something went wrong. Please try again.', 'error');
          submitBtn.textContent = 'Send me the bonus';
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
