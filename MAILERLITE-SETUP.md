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

**Email Body:**
```
Hi there! 👋

Welcome to the Union Arc Market family! I'm Reese Pace, and I'm thrilled you've joined us.

As promised, here's your exclusive bonus scene from Best Efforts – the steamy, deleted scene that didn't make it into the final book. This is a special thank you for joining my newsletter!

📎 **[ATTACH BONUS PDF HERE]**

This scene takes place right after Chapter 8, when Lia and Theo are finally alone after that intense day of setting up the art installation. You know... the night that changed everything. 😉

**What you can expect from this newsletter:**
• Early access to new releases
• Behind-the-scenes content from Union Arc Market
• Exclusive bonus scenes (like this one!)
• Updates on the series and character insights
• Special subscriber-only deals

**Coming up in the Union Arc series:**
✨ Night Shift (Maya & Connor) - Available early 2024
✨ Fresh Start (Zoe & Marcus) - Spring 2024

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

1. **In the email editor**, look for the attachment option
2. **Upload your bonus scene PDF**
3. **Name it something like:** "Best-Efforts-Bonus-Scene-Reese-Pace.pdf"
4. **Make sure the file size is under 10MB** (MailerLite limit)

### Step 5: Test the Automation

1. **Save your automation** and make sure it's **ACTIVE**
2. **Test with your own email** first
3. **Subscribe using the form on your website**
4. **Check that you receive the email with the PDF**

## 🔧 Technical Integration

The JavaScript integration (`mailerlite-integration.js`) will:
- ✅ Create a subscriber group automatically
- ✅ Add new subscribers to that group
- ✅ Trigger your automation
- ✅ Show success/error messages on your website
- ✅ Handle form validation and loading states

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

- [ ] Upload bonus PDF to your email template
- [ ] Test the automation with your email
- [ ] Verify the email looks good on mobile
- [ ] Check that the PDF downloads properly
- [ ] Make sure unsubscribe link works
- [ ] Test the website form submission
- [ ] Verify success messages display correctly

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
