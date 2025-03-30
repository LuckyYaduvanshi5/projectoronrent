/**
 * Projector on Rent - Modern JavaScript
 * Handles interactive elements, animations, and form submission
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Elements
    const navbar = document.querySelector('.navbar');
    const backToTopBtn = document.getElementById('backToTop');
    const rentalForm = document.getElementById('rentalForm');
    const bookingModal = new bootstrap.Modal(document.getElementById('bookingSuccessModal'));

    // Navbar scroll behavior
    window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Make sure navbar is properly styled on page load
    if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
    }

    // Smooth scrolling for anchor links with improved behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.getAttribute('href') === '#') return;
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                
                window.scrollTo({
                    top: targetPosition - navbarHeight - 20, // Added extra padding
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });

    // Animate hero section elements
    const animateHero = () => {
        const heroShapes = document.querySelectorAll('.hero-shapes .shape');
        heroShapes.forEach((shape, index) => {
            setTimeout(() => {
                shape.classList.add('animated');
            }, index * 200);
        });
    };
    
    // Run hero animation after a slight delay
    setTimeout(animateHero, 500);

    // Back to top button
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Form submission with modern validation visuals
    if (rentalForm) {
        rentalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Enhanced form validation with visual feedback
            const formInputs = this.querySelectorAll('input, select, textarea');
            let isValid = true;
            
            formInputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.classList.add('is-invalid');
                    
                    // Add shake animation for invalid fields
                    input.classList.add('animate__animated', 'animate__shakeX');
                    setTimeout(() => {
                        input.classList.remove('animate__animated', 'animate__shakeX');
                    }, 1000);
                } else {
                    input.classList.remove('is-invalid');
                }
            });
            
            if (isValid) {
                // Show loading state on submit button
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Processing...';
                submitBtn.disabled = true;
                
                // In a real scenario, you would send this data to the server
                const formData = new FormData(this);
                
                // Form submission simulation (for demo purposes)
                // Replace with actual AJAX submission in production
                simulateFormSubmission(formData)
                    .then(() => {
                        // Show success modal
                        bookingModal.show();
                        
                        // Reset form and button state
                        this.reset();
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        
                        // Add success message that can be cleared
                        const successAlert = document.createElement('div');
                        successAlert.className = 'alert alert-success alert-dismissible fade show mt-3';
                        successAlert.innerHTML = `
                            <strong>Success!</strong> Your booking request has been submitted.
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        `;
                        this.parentNode.appendChild(successAlert);
                    })
                    .catch(error => {
                        console.error('Error submitting form:', error);
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        
                        // Show error message
                        const errorAlert = document.createElement('div');
                        errorAlert.className = 'alert alert-danger alert-dismissible fade show mt-3';
                        errorAlert.innerHTML = `
                            <strong>Error!</strong> There was a problem submitting your booking. Please try again or contact us directly.
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        `;
                        this.parentNode.appendChild(errorAlert);
                    });
            }
        });
    }

    // Simulated form submission with enhanced feedback
    function simulateFormSubmission(formData) {
        return new Promise((resolve) => {
            // Convert FormData to an object for easier logging
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            console.log('Form data to be sent:', formDataObj);
            
            // Simulate network request with random timing for realism
            setTimeout(() => {
                resolve({ success: true, message: 'Booking submitted successfully!' });
            }, 1500 + Math.random() * 1000);
        });
    }

    // Enhanced lazy loading for images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback using Intersection Observer with better thresholds
        const lazyImageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target;
                    
                    // Add fade-in effect to images
                    lazyImage.style.opacity = 0;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.addEventListener('load', function() {
                        setTimeout(() => {
                            lazyImage.style.transition = 'opacity 0.5s ease';
                            lazyImage.style.opacity = 1;
                        }, 100);
                    });
                    
                    observer.unobserve(lazyImage);
                }
            });
        }, {
            rootMargin: '0px 0px 200px 0px',
            threshold: 0.01
        });
        
        lazyImages.forEach(img => {
            img.style.opacity = 0;
            lazyImageObserver.observe(img);
        });
    }

    // Current Year for Copyright
    document.querySelectorAll('.current-year').forEach(el => {
        el.textContent = new Date().getFullYear();
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const heroShapes = document.querySelectorAll('.hero-shapes .shape');
        
        heroShapes.forEach((shape, index) => {
            const speed = 0.1 + (index * 0.05);
            shape.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    });
    
    // Initialize counters for numbers
    const initCounters = () => {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            const duration = 2000; // 2 seconds
            const step = Math.ceil(target / (duration / 16)); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current >= target) {
                    counter.textContent = target;
                } else {
                    counter.textContent = current;
                    requestAnimationFrame(updateCounter);
                }
            };
            
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    updateCounter();
                    observer.unobserve(counter);
                }
            }, { threshold: 0.5 });
            
            observer.observe(counter);
        });
    };
    
    // Call counter initialization
    initCounters();

    // Implement floating label effect for input fields
    const formControls = document.querySelectorAll('.form-control');
    formControls.forEach(control => {
        control.addEventListener('focus', function() {
            this.parentElement.classList.add('input-focused');
        });
        
        control.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('input-focused');
            }
        });
        
        // Check on load if input has value
        if (control.value) {
            control.parentElement.classList.add('input-focused');
        }
    });
});

// Modernized page load handler
window.addEventListener('load', function() {
    // Remove preloader with a smooth fade-out
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
    
    // Enhanced testimonial slider with crossfade animations
    initTestimonialSlider();
    
    // Remove .page-loading class from body to trigger entry animations
    document.body.classList.remove('page-loading');
    
    // Load non-critical resources after page is ready
    setTimeout(loadNonCriticalResources, 3000);
});

// Modern testimonial slider with crossfade transitions
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const totalSlides = testimonials.length;
    
    if (totalSlides <= 3) return; // No need for slider with 3 or fewer testimonials
    
    // Initialize slider
    let currentSlide = 0;
    let isAnimating = false;
    
    // Show first slide
    testimonials.forEach((slide, index) => {
        if (index !== 0) {
            slide.style.opacity = '0';
            slide.style.visibility = 'hidden';
            slide.style.position = 'absolute';
            slide.style.top = '0';
            slide.style.left = '0';
            slide.style.width = '100%';
        }
    });
    
    // Function to go to next slide
    const goToNextSlide = () => {
        if (isAnimating) return;
        isAnimating = true;
        
        // Hide current slide
        testimonials[currentSlide].style.opacity = '0';
        testimonials[currentSlide].style.visibility = 'hidden';
        
        // Update current slide index
        currentSlide = (currentSlide + 1) % totalSlides;
        
        // Show new slide
        testimonials[currentSlide].style.position = 'absolute';
        testimonials[currentSlide].style.visibility = 'visible';
        setTimeout(() => {
            testimonials[currentSlide].style.opacity = '1';
            setTimeout(() => {
                isAnimating = false;
            }, 600);
        }, 200);
    };
    
    // Set interval for auto slide change
    setInterval(goToNextSlide, 5000);
}

// Load non-critical resources
function loadNonCriticalResources() {
    // Load additional scripts
    const scripts = [
        // Add any additional scripts here
    ];
    
    scripts.forEach(script => {
        const scriptElement = document.createElement('script');
        scriptElement.src = script;
        scriptElement.async = true;
        document.body.appendChild(scriptElement);
    });
}

// Enhanced form validation
function validateInput(input) {
    if (input.hasAttribute('required') && !input.value.trim()) {
        input.classList.add('is-invalid');
        return false;
    } else {
        input.classList.remove('is-invalid');
        if (input.value.trim()) {
            input.classList.add('is-valid');  // Add visual success indicator
        }
        return true;
    }
}

// Set up modern form validation with live feedback
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('input, select, textarea');
    
    formInputs.forEach(input => {
        // Validate on blur
        input.addEventListener('blur', function() {
            validateInput(this);
        });
        
        // Live validation feedback
        input.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                validateInput(this);
            }
        });
        
        // Add floating label effect
        if (input.type !== 'checkbox' && input.type !== 'radio') {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('input-focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('input-focused');
                }
            });
            
            // Initialize state on load
            if (input.value) {
                input.parentElement.classList.add('input-focused');
            }
        }
    });
}); 