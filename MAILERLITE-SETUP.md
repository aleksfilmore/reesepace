# MailerLite Setup Guide for Best Efforts Bonus Scene Automation

## 🎯 Overview
This guide will help you set up an automated welcome email that sends the bonus PDF scene when someone subscribes to your newsletter.

## 📧 Email Setup in MailerLite Dashboard

### Step 1: Create the Welcome Email Template

1. **Login to MailerLite** at https://dashboard.mailerlite.com
2. **Go to Campaigns** → **Email templates**
3. **Click "Create new template"**
4. **Choose "Rich text editor"** for easy customization

### Step 2: Email Template Content

**Subject Line:** 🔥 Your spicy bonus scene from Best Efforts is here!

**From Name:** Reese Pace
**From Email:** reesepace@yahoo.com (or reese@reesepace.com with proper domain authentication)

## 📮 Email Deliverability Tips

### Sender Email Options

**Option 1: reesepace@yahoo.com (Recommended for immediate use)**
- ✅ Established domain reputation
- ✅ Less likely to hit spam folders initially
- ❌ Less professional appearance
- ❌ Doesn't match your brand domain

**Option 2: reese@reesepace.com (Better long-term)**
- ✅ Professional, brand-consistent
- ✅ Builds your domain reputation
- ❌ Requires proper email authentication setup
- ❌ May have deliverability issues initially

### Improving Email Deliverability

1. **Domain Authentication (Recommended for reese@reesepace.com):**
   - Set up SPF record in your DNS
   - Configure DKIM signing in MailerLite
   - Add DMARC policy for your domain
   - MailerLite provides these settings in their dashboard

2. **Content Optimization:**
   - Avoid spam trigger words (FREE, URGENT, etc.)
   - Balance text-to-image ratio
   - Include a clear unsubscribe link
   - Use a recognizable sender name

3. **List Management:**
   - Only send to engaged subscribers
   - Remove bounced emails promptly
   - Use double opt-in for new subscribers
   - Monitor spam complaints

4. **Gradual Warm-up:**
   - Start with small batches of emails
   - Gradually increase volume over time
   - Monitor engagement rates

### Subject Line Best Practices
- Keep under 50 characters
- Avoid ALL CAPS or excessive punctuation
- Make it personal and relevant
- Test different versions

**Recommended Subject Lines:**
- "Your Best Efforts bonus scene is here! 📖"
- "Welcome! Here's your exclusive bonus chapter"
- "Thanks for joining - your bonus scene awaits"

**Email Body (HTML):**
```html
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
      ✨ <strong>Force Majeure (MM)</strong> (Micah & Rafi) - Coming 2025<br>
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
```

**Email Body (Plain Text):**
```
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
✨ Force Majeure (MM) (Micah & Rafi) - Coming 2025
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
```

### Step 3: Set Up Automation

1. **Go to Automations** in your MailerLite dashboard
2. **Click "Create automation"**
3. **Choose "Welcome new subscribers"**
4. **Configure the trigger:**
   - Trigger: "Subscriber joins group"
   - Select: "Best Efforts Bonus Scene Subscribers"
5. **Set up the action:**
   - Action: "Send email"
   - Select your welcome email template
   - **IMPORTANT:** Upload your bonus PDF in the email attachments

### Step 4: Upload Your Bonus PDF

1. **In the email editor**, look for the attachment option (usually in the email content toolbar)
2. **Upload your bonus scene PDF**: `assets/bonus/Bonus Chapter Best Efforts.pdf`
3. **The file is already prepared** and located in your website's assets folder
4. **Make sure the file size is under 10MB** (MailerLite limit) - ✅ Current file is compliant
5. **Test the attachment** by sending a test email to yourself

**File Details:**
- **File Name:** Bonus Chapter Best Efforts.pdf
- **Location:** /assets/bonus/
- **Content:** Exclusive bonus scene from Best Efforts (Lia & Theo)
- **File Size:** Under 10MB ✅

### Step 5: Test the Automation

1. **Save your automation** and make sure it's **ACTIVE**
2. **Test with your own email** first
3. **Subscribe using the form on your website**
4. **Check that you receive the email with the PDF**

## 🔧 Technical Integration

### Get Your MailerLite API Token

1. **Login to MailerLite** at https://dashboard.mailerlite.com
2. **Go to Integrations** → **API**
3. **Generate a new API token** with the following permissions:
   - Subscribers: Read, Write
   - Groups: Read, Write
   - Campaigns: Read, Write
4. **Copy the token** and keep it secure
5. **Add the token to your website** (see deployment options below)

### Deployment Options

**Option 1: Static Hosting (Recommended for now)**
- The website will work without the API token
- Form submissions will show success messages
- You'll need to manually add subscribers from form submissions
- Set up automation in MailerLite dashboard manually

**Option 2: Server Integration (Future)**
- Add API token as environment variable: `ML_API_TOKEN`
- Enable automatic subscriber addition
- Full automation integration

### Current Setup

The JavaScript integration (`mailerlite-integration.js`) will:
- ✅ Create a subscriber group automatically (when API token provided)
- ✅ Add new subscribers to that group (when API token provided)
- ✅ Trigger your automation (when properly configured in MailerLite)
- ✅ Show success/error messages on your website
- ✅ Handle form validation and loading states
- ✅ Graceful fallback when no API token is provided

## 📊 Analytics & Tracking

The script includes optional tracking for:
- Newsletter signups
- Email open rates (handled by MailerLite)
- Download/engagement metrics

## 🔒 Security Notes

- ✅ API token is included in the client-side script
- ⚠️ For production, consider moving API calls to a backend service
- ✅ Form includes proper validation and error handling
- ✅ GDPR-compliant with privacy policy link

## 🚀 Go Live Checklist

### MailerLite Dashboard Setup
- [ ] Create welcome email template with the provided HTML/text content
- [ ] Upload bonus PDF: `assets/bonus/Bonus Chapter Best Efforts.pdf`
- [ ] Create subscriber group: "Best Efforts Bonus Scene Subscribers"
- [ ] Set up automation: Welcome new subscribers → Send email with PDF
- [ ] Test the automation with your own email address
- [ ] Verify the email looks good on mobile devices
- [ ] Check that the PDF downloads and opens properly
- [ ] Make sure unsubscribe link works correctly

### Website Integration
- [ ] Verify newsletter form is working on the website
- [ ] Test form submission and success messages
- [ ] Check responsive design on mobile devices
- [ ] Confirm Google Analytics is tracking newsletter signups
- [ ] Test with different email addresses

### Optional: API Integration
- [ ] Get MailerLite API token (for automatic subscriber addition)
- [ ] Add API token to hosting environment variables
- [ ] Test automatic subscriber sync
- [ ] Verify automation triggers automatically

### Content Quality Check
- [ ] Proofread welcome email content
- [ ] Verify all links work correctly
- [ ] Check PDF content and formatting
- [ ] Ensure branding consistency
- [ ] Test email deliverability to major providers (Gmail, Outlook, etc.)

## 📞 Support

If you run into issues:
1. Check the browser console for JavaScript errors
2. Verify your API token is valid in MailerLite
3. Ensure the automation is active
4. Test with different email addresses

## 🎨 Customization Options

You can customize:
- Email template design and colors
- Welcome message content
- PDF filename and content
- Form success/error messages
- Automation timing (send immediately vs. delayed)

---

**Ready to launch!** Once this is set up, every new subscriber will automatically receive their bonus scene within minutes of signing up.
