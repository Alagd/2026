# Love Letter Component - Integration Guide

This guide will help you integrate the animated love letter component into your existing website.

## 📦 What's Included

- **LOVE_LETTER_COMPONENT.html** - Standalone file with everything bundled (HTML, CSS, JS)
- **love letter2 code/** - Modular version with separate files for more control

## 🚀 Quick Integration (Recommended)

### Option 1: Copy the Standalone Component

1. **Open** `LOVE_LETTER_COMPONENT.html`
2. **Copy** the CSS from the `<style>` section
3. **Paste** it into your website's CSS file
4. **Copy** the HTML structure (the `<div class="love-letter-container">` section)
5. **Paste** it where you want the component to appear on your page
6. **Copy** the JavaScript at the bottom
7. **Paste** it into your website's JavaScript file (or in a `<script>` tag)

### Option 2: Use Modular Files

1. **Copy** the entire `love letter2 code/` folder to your website directory
2. **Link** the CSS in your HTML `<head>`:
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap" rel="stylesheet">
   <link rel="stylesheet" href="path/to/love letter 2.css">
   ```

3. **Add** the HTML structure to your page:
   ```html
   <div class="envlope-wrapper">
     <div id="envelope" class="close">
       <div class="front flap"></div>
       <div class="front pocket"></div>
       <div class="letter">
         <div class="words line1">To: Habibi</div>
         <div class="words line2">Dear israa, u are my everyhing</div>
         <div class="words line3">i am always Gratful that our paths crossed</div>
         <div class="words line4">Hbeeeeek Barcha Barchatttt</div>
       </div>
       <div class="hearts">
         <div class="heart a1"></div>
         <div class="heart a2"></div>
         <div class="heart a3"></div>
       </div>
     </div>
   </div>
   <div class="reset">
     <button id="open">Open</button>
     <button id="reset">Close</button>
   </div>
   ```

4. **Include** jQuery and the JavaScript before closing `</body>`:
   ```html
   <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
   <script src="path/to/love letter 2.js"></script>
   ```

## ✏️ Customization

### Change the Message

Edit the text inside the `.love-letter-text` divs (or `.words` divs in modular version):

```html
<div class="love-letter-text line1">To: Your Name</div>
<div class="love-letter-text line2">Your custom message line 1</div>
<div class="love-letter-text line3">Your custom message line 2</div>
<div class="love-letter-text line4">Your custom message line 3</div>
```

### Change Colors

In the CSS, modify these color values:

```css
/* Envelope color */
background-color: #ff6863;  /* Change to your preferred color */

/* Heart color */
background: #e60073;  /* Change to your preferred color */

/* Background gradient */
background-image: radial-gradient(circle at center, #fce4ec 0%, #f8bbd0 100%);
```

### Adjust Size

Modify the envelope dimensions in CSS:

```css
.love-letter-envelope {
  width: 420px;   /* Change width */
  height: 270px;  /* Change height */
}
```

### Change Font

Replace the Google Font link with your preferred font:

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont&display=swap" rel="stylesheet">
```

Then update the CSS:

```css
.love-letter-paper {
  font-family: "YourFont", cursive;
}
```

## 🎨 Features

- ✅ Smooth open/close animations
- ✅ Flying hearts animation when opened
- ✅ Click envelope or use buttons to control
- ✅ Fully responsive design
- ✅ Beautiful handwritten font
- ✅ Romantic color scheme
- ✅ No dependencies (vanilla JS version included)

## 🔧 Troubleshooting

### Component doesn't appear
- Make sure all CSS is loaded
- Check browser console for errors
- Verify file paths are correct

### Animations not working
- Ensure JavaScript is loaded after the HTML
- Check that element IDs match between HTML and JS
- Verify no CSS conflicts with existing styles

### Styling conflicts
- Use more specific CSS selectors
- Add `!important` to critical styles (use sparingly)
- Consider using a CSS namespace/prefix

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 💡 Tips for AI Integration

When asking an AI agent to integrate this component:

1. **Provide the file**: Give them `LOVE_LETTER_COMPONENT.html`
2. **Specify location**: Tell them exactly where on your website you want it
3. **Mention customizations**: If you want different colors, text, or sizes
4. **Example prompt**: 
   > "Please integrate the love letter component from LOVE_LETTER_COMPONENT.html into my homepage. Place it in the hero section, change the envelope color to blue (#4A90E2), and update the message to say 'Welcome to my site'."

## 📄 License

Free to use for personal projects. Enjoy! ❤️

---

**Need help?** The component is self-contained and easy to integrate. Just follow the steps above!
