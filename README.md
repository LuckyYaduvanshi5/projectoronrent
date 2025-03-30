# Projector on Rent - High-Converting Landing Page

A modern, SEO-optimized, high-converting landing page for a projector rental business.

## Overview

This landing page is designed to help "Projector on Rent" (ProjectoronRent.online) increase online bookings and visibility. The page is:

- Highly optimized for conversions
- SEO-friendly
- Mobile-responsive
- Fast-loading
- Easy to customize

## Features

- **Hero Section**: Full-width design with clear value proposition
- **USP Section**: Highlights the key benefits of the service
- **Pricing Section**: Clear, attractive pricing tables
- **Testimonials**: Social proof from satisfied customers
- **FAQ Section**: Answers to common questions
- **Booking Form**: Simple, user-friendly booking form
- **Call-to-Action Sections**: Strategically placed throughout the page

## Technology Stack

- HTML5, CSS3, JavaScript (Vanilla)
- Bootstrap 5 for responsive design
- Font Awesome for icons
- Schema.org markup for SEO
- No heavy frameworks or libraries for optimal performance

## Getting Started

### Prerequisites

- A web hosting service (Shared hosting, VPS, or any web server)
- Basic knowledge of HTML/CSS (for customization)
- Domain name (preferably ProjectoronRent.online)

### Installation

1. Download all files or clone this repository
2. Customize the content (see Customization section below)
3. Upload the files to your web hosting server
4. Point your domain to the server

## Customization

### 1. Update Basic Information

- **Contact Information**: Update phone numbers, email addresses, and physical address throughout the site
- **Business Name**: If needed, change "Projector on Rent" to your preferred business name
- **Pricing**: Update the pricing packages to match your actual offerings

### 2. Replace Images

All images are in the `images/` directory. You should replace:

- `logo.png`: Your business logo
- `hero-bg.jpg`: The hero background image (should be a high-quality image of a projector setup)
- `cta-bg.jpg`: The call-to-action background
- `client1.jpg`, `client2.jpg`, `client3.jpg`: Customer testimonial profile pictures

**Important**: Optimize your images for web before uploading (use tools like TinyPNG or ImageOptim)

### 3. Customize Colors

The main colors can be easily changed in the `css/styles.css` file by modifying the CSS variables at the top:

```css
:root {
    --primary-color: #3498db;   /* Main brand color */
    --primary-dark: #2980b9;    /* Darker shade of primary color */
    --secondary-color: #f39c12; /* Accent color */
    --dark-color: #2c3e50;      /* Text and footer background */
    --light-color: #ecf0f1;     /* Light backgrounds */
    --gray-color: #95a5a6;      /* Subtle text */
    --success-color: #2ecc71;   /* Success indicators */
    --danger-color: #e74c3c;    /* Error indicators */
}
```

### 4. Update Content

Edit the HTML file to update:

- All heading text and paragraphs
- Testimonial quotes and names
- FAQ questions and answers
- Form fields (if you need different information)

### 5. Set Up Form Submission

The current form uses a simulated submission. To make it functional:

1. Open `js/main.js`
2. Find the `simulateFormSubmission()` function
3. Replace it with actual form submission code (AJAX to your backend or a service like Formspree)

Example using a backend API:

```javascript
function submitFormData(formData) {
    return fetch('https://your-api-endpoint.com/submit-booking', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json());
}
```

## SEO Optimization

The page is already optimized for search engines with:

1. **Schema.org markup**: Helps search engines understand your business
2. **Meta tags**: Proper description and keywords
3. **Semantic HTML**: Properly structured content
4. **Mobile-friendly design**: Important for Google rankings

For additional optimization:

1. Register your business on Google My Business
2. Add your actual business address in the Schema.org markup
3. Consider adding more location-specific keywords if you serve particular areas

## Performance Optimization

This landing page is designed to load quickly with:

- Minimal JavaScript
- Optimized CSS
- Lazy loading of images
- No unnecessary animations
- Bootstrap loaded from CDN

## Browser Compatibility

The landing page is compatible with:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## Deployment Tips

For the best performance and security:

1. Enable HTTPS on your domain
2. Set up proper caching headers
3. Consider using a CDN like Cloudflare
4. Compress HTML, CSS, and JavaScript files
5. Set up regular backups

## Additional Customization Ideas

- Add a live chat widget
- Implement a booking calendar for real-time availability
- Add more testimonials and create a carousel
- Create a gallery section showing projectors in use at various events
- Add a blog section with content about projector usage tips

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Support

For any questions or customization help, contact [your email address]

---

Created with ❤️ for Projector on Rent 