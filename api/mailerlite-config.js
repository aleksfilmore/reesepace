// MailerLite Configuration
// This file contains the configuration for MailerLite automation setup

const MAILERLITE_CONFIG = {
  // Group configuration
  groupName: 'Best Efforts Bonus Scene Subscribers',
  
  // Email template configuration
  welcomeEmail: {
    subject: '🔥 Your spicy bonus scene from Best Efforts is here!',
    fromName: 'Reese Pace',
    fromEmail: 'hello@reesepace.com', // Update with your actual email
    
    // Email content template
    htmlContent: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #FFFCF8; color: #1F1B1A;">
        <div style="padding: 2rem; background: linear-gradient(135deg, #E8D5B7 0%, #C4A484 100%); text-align: center;">
          <h1 style="color: #1F1B1A; margin: 0; font-size: 1.75rem;">Welcome to Union Arc Market!</h1>
        </div>
        
        <div style="padding: 2rem;">
          <p style="font-size: 1.1rem; line-height: 1.6;">Hi there! 👋</p>
          
          <p style="line-height: 1.6;">Welcome to the Union Arc Market family! I'm Reese Pace, and I'm thrilled you've joined us.</p>
          
          <p style="line-height: 1.6;">As promised, here's your exclusive bonus scene from <strong>Best Efforts</strong> – the steamy, deleted scene that didn't make it into the final book. This is a special thank you for joining my newsletter!</p>
          
          <div style="background: #F7F5F3; padding: 1.5rem; border-radius: 0.75rem; margin: 2rem 0; text-align: center;">
            <p style="font-size: 1.1rem; margin: 0; color: #A0432A;"><strong>📎 Your bonus chapter is attached as a PDF!</strong></p>
          </div>
          
          <p style="line-height: 1.6;">This scene takes place right after Chapter 8, when Lia and Theo are finally alone after that intense day of setting up the art installation. You know... the night that changed everything. 😉</p>
          
          <h3 style="color: #A0432A; margin-top: 2rem;">What you can expect from this newsletter:</h3>
          <ul style="line-height: 1.8;">
            <li>Early access to new releases</li>
            <li>Behind-the-scenes content from Union Arc Market</li>
            <li>Exclusive bonus scenes (like this one!)</li>
            <li>Updates on the series and character insights</li>
            <li>Special subscriber-only deals</li>
          </ul>
          
          <h3 style="color: #A0432A;">Coming up in the Union Arc series:</h3>
          <p style="line-height: 1.6;">
            ✨ <strong>Force Majeure</strong> (Ava & Marco) - Coming 2025<br>
            ✨ <strong>Fire Code</strong> (Rae & Captain Ramirez) - Coming 2025<br>
            ✨ <strong>Shared Usage</strong> (Eddie & Nadia) - Coming 2025
          </p>
          
          <p style="line-height: 1.6;">Thank you for being here and supporting indie romance! Your enthusiasm for these characters and their stories means the world to me.</p>
          
          <p style="line-height: 1.6;"><strong>Happy reading! 🔥</strong></p>
          
          <p style="line-height: 1.6;">Reese</p>
          
          <p style="font-style: italic; line-height: 1.6;"><em>P.S. If you love the bonus scene, I'd love to hear from you! Just hit reply – I read every email.</em></p>
        </div>
        
        <div style="background: #E5E0DA; padding: 1.5rem; text-align: center; font-size: 0.9rem; color: #4A403C;">
          <p style="margin: 0;">Union Arc Market is fictional, but the romance is real.</p>
          <p style="margin: 0.5rem 0 0 0;"><a href="https://reesepace.com" style="color: #A0432A;">www.reesepace.com</a></p>
        </div>
      </div>
    `,
    
    // Plain text version
    textContent: `
Hi there! 👋

Welcome to the Union Arc Market family! I'm Reese Pace, and I'm thrilled you've joined us.

As promised, here's your exclusive bonus scene from Best Efforts – the steamy, deleted scene that didn't make it into the final book. This is a special thank you for joining my newsletter!

📎 Your bonus chapter is attached as a PDF!

This scene takes place right after Chapter 8, when Lia and Theo are finally alone after that intense day of setting up the art installation. You know... the night that changed everything. 😉

What you can expect from this newsletter:
• Early access to new releases
• Behind-the-scenes content from Union Arc Market
• Exclusive bonus scenes (like this one!)
• Updates on the series and character insights
• Special subscriber-only deals

Coming up in the Union Arc series:
✨ Force Majeure (Ava & Marco) - Coming 2025
✨ Fire Code (Rae & Captain Ramirez) - Coming 2025
✨ Shared Usage (Eddie & Nadia) - Coming 2025

Thank you for being here and supporting indie romance! Your enthusiasm for these characters and their stories means the world to me.

Happy reading! 🔥

Reese

P.S. If you love the bonus scene, I'd love to hear from you! Just hit reply – I read every email.

---
Union Arc Market is fictional, but the romance is real.
www.reesepace.com

Unsubscribe | Privacy Policy
    `
  },
  
  // Automation settings
  automation: {
    name: 'Best Efforts Bonus Scene Welcome',
    trigger: 'subscriber_joins_group',
    delay: 0, // Send immediately
    attachmentPath: './assets/bonus/Bonus Chapter Best Efforts.pdf'
  }
};

// Export for Node.js environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MAILERLITE_CONFIG;
}

// Make available globally for browser environments
if (typeof window !== 'undefined') {
  window.MAILERLITE_CONFIG = MAILERLITE_CONFIG;
}