/**
 * Projector on Rent - Modern JavaScript
 * Handles interactive elements, animations, and form submission
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Initialize AOS animations with improved settings
    AOS.init({
        duration: 400,
        easing: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
        once: false,
        mirror: false,
        anchorPlacement: 'top-bottom',
        offset: 100
    });

    // Elements
    const navbar = document.querySelector('.navbar');
    const backToTopBtn = document.getElementById('backToTop');
    const rentalForm = document.getElementById('rentalForm');
    const bookingModal = document.getElementById('bookingSuccessModal') ? 
        new bootstrap.Modal(document.getElementById('bookingSuccessModal')) : null;
    const heroSection = document.getElementById('hero');
    
    // Performance optimization - throttle scroll events
    let scrollThrottle = false;
    const throttleTime = 100; // milliseconds

    // Improved navbar scroll behavior with throttling
    window.addEventListener('scroll', function() {
        if (scrollThrottle) return;
        
        scrollThrottle = true;
        setTimeout(() => {
            scrollThrottle = false;
            
            // Updated navbar behavior
            if (window.scrollY > 10) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Back to top button visibility
            if (backToTopBtn) {
                if (window.scrollY > 300) {
                    backToTopBtn.classList.add('show');
                } else {
                    backToTopBtn.classList.remove('show');
                }
            }
            
            // Parallax effect optimization
            if (heroSection) {
                const scrollPosition = window.scrollY;
                const heroShapes = document.querySelectorAll('.hero-shapes .shape');
                
                heroShapes.forEach((shape, index) => {
                    const speed = 0.05 + (index * 0.03);
                    const yPos = scrollPosition * speed;
                    // Use transform for better performance
                    shape.style.transform = `translate3d(0, ${yPos}px, 0)`;
                });
            }
            
            // Adding fade-in effects to sections as they come into view
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (sectionTop < windowHeight * 0.85 && !section.classList.contains('appeared')) {
                    section.classList.add('appeared');
                }
            });
        }, throttleTime);
    });

    // Make sure navbar is properly styled on page load
    if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
    }

    // Improved smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.getAttribute('href') === '#') return;
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                
                // Add active state to clicked nav item
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                window.scrollTo({
                    top: targetPosition - navbarHeight - 20,
                    behavior: 'smooth'
                });

                // Close mobile menu if open with a nice transition
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    // Use Bootstrap's collapse API for smoother transition
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });

    // Enhanced hero section animations
    const animateHero = () => {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const ctaButtons = document.querySelector('.cta-buttons');
        const heroShapes = document.querySelectorAll('.hero-shapes .shape');
        
        // Staggered animation sequence - faster timing
        if (heroTitle) heroTitle.style.opacity = '1';
        if (heroSubtitle) {
            setTimeout(() => {
                heroSubtitle.style.opacity = '1';
            }, 150);
        }
        if (ctaButtons) {
            setTimeout(() => {
                ctaButtons.style.opacity = '1';
            }, 300);
        }
        
        // Animate shapes with faster timing
        heroShapes.forEach((shape, index) => {
            setTimeout(() => {
                shape.classList.add('animated');
                shape.style.opacity = '1';
            }, 200 + index * 75);
        });
    };
    
    // Run hero animation after a slight delay for better perceived performance
    setTimeout(animateHero, 100);

    // Improved back to top button
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Enhanced form interactions with visual feedback
    document.querySelectorAll('.form-control, .form-select').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('input-focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('input-focused');
            }
        });
        
        // For inputs that already have values
        if (input.value) {
            input.parentElement.classList.add('input-focused');
        }
    });

    // Improved form submission with better visual feedback
    if (rentalForm) {
        rentalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Enhanced form validation with visual feedback
            const formInputs = this.querySelectorAll('input, select, textarea');
            let isValid = true;
            let firstInvalid = null;
            
            formInputs.forEach(input => {
                // Reset state
                input.classList.remove('is-invalid');
                
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.classList.add('is-invalid');
                    
                    // Store first invalid input for focus
                    if (!firstInvalid) firstInvalid = input;
                    
                    // Add smooth shake animation
                    input.classList.add('animate__animated', 'animate__shakeX');
                    setTimeout(() => {
                        input.classList.remove('animate__animated', 'animate__shakeX');
                    }, 1000);
                } else if (input.type === 'email' && input.value.trim() && !validateEmail(input.value.trim())) {
                    isValid = false;
                    input.classList.add('is-invalid');
                    if (!firstInvalid) firstInvalid = input;
                } else if (input.type === 'tel' && input.value.trim() && !validatePhone(input.value.trim())) {
                    isValid = false;
                    input.classList.add('is-invalid');
                    if (!firstInvalid) firstInvalid = input;
                }
            });
            
            // Focus the first invalid input
            if (firstInvalid) {
                firstInvalid.focus();
                
                // Scroll to first invalid with offset for fixed navbar
                const navbarHeight = navbar.offsetHeight;
                const firstInvalidTop = firstInvalid.getBoundingClientRect().top + window.scrollY;
                
                window.scrollTo({
                    top: firstInvalidTop - navbarHeight - 40,
                    behavior: 'smooth'
                });
            }
            
            if (isValid) {
                // Improved loading state on submit button
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Processing...';
                submitBtn.disabled = true;
                submitBtn.classList.add('processing');
                
                // In a real scenario, you would send this data to the server
                const formData = new FormData(this);
                
                // Form submission simulation with improved feedback
                simulateFormSubmission(formData)
                    .then(() => {
                        // Show success modal if it exists
                        if (bookingModal) {
                            bookingModal.show();
                        }
                        
                        // Reset form and button state with a nice transition
                        this.reset();
                        submitBtn.classList.remove('processing');
                        setTimeout(() => {
                            submitBtn.innerHTML = originalText;
                            submitBtn.disabled = false;
                        }, 300);
                        
                        // Improved success message
                        const successAlert = document.createElement('div');
                        successAlert.className = 'alert alert-success alert-dismissible fade show mt-3 animate__animated animate__fadeIn';
                        successAlert.innerHTML = `
                            <strong>Success!</strong> Your booking request has been submitted. We'll contact you shortly.
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        `;
                        this.parentNode.appendChild(successAlert);
                        
                        // Auto-dismiss after 8 seconds
                        setTimeout(() => {
                            const bsAlert = new bootstrap.Alert(successAlert);
                            bsAlert.close();
                        }, 8000);
                    })
                    .catch(error => {
                        console.error('Error submitting form:', error);
                        submitBtn.classList.remove('processing');
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        
                        // Improved error message
                        const errorAlert = document.createElement('div');
                        errorAlert.className = 'alert alert-danger alert-dismissible fade show mt-3 animate__animated animate__fadeIn';
                        errorAlert.innerHTML = `
                            <strong>Error!</strong> There was a problem submitting your booking. Please try again or contact us directly.
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        `;
                        this.parentNode.appendChild(errorAlert);
                    });
            }
        });
    }

    // Email validation function
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
    // Phone validation function
    function validatePhone(phone) {
        // Simple validation - adjust based on your requirements
        const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        return re.test(phone);
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
            
            // Simulate network request with realistic timing
            setTimeout(() => {
                resolve({ success: true, message: 'Booking submitted successfully!' });
            }, 1500);
        });
    }

    // Enhanced lazy loading for images with fade-in effect
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        lazyImages.forEach(img => {
            if (img.dataset.src) {
                // Add fade-in effect
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                img.onload = function() {
                    img.style.opacity = '1';
                };
                
                img.src = img.dataset.src;
            }
        });
    } else {
        // Fallback using Intersection Observer with better performance options
        const lazyImageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target;
                    
                    if (lazyImage.dataset.src) {
                        lazyImage.style.opacity = '0';
                        lazyImage.style.transition = 'opacity 0.5s ease';
                        
                        lazyImage.onload = function() {
                            lazyImage.style.opacity = '1';
                        };
                        
                        lazyImage.src = lazyImage.dataset.src;
                        observer.unobserve(lazyImage);
                    }
                }
            });
        }, {
            rootMargin: '0px 0px 200px 0px',
            threshold: 0.01
        });
        
        lazyImages.forEach(img => {
            lazyImageObserver.observe(img);
        });
    }

    // Initialize modern testimonial slider with crossfade effect
    initTestimonialSlider();

    // Current Year for Copyright
    document.querySelectorAll('.current-year').forEach(el => {
        el.textContent = new Date().getFullYear();
    });
    
    // Initial run of scroll handlers to set proper state on page load
    window.dispatchEvent(new Event('scroll'));
});

// Improved testimonial slider with better transitions
function initTestimonialSlider() {
    const testimonialContainer = document.querySelector('.testimonial-slider');
    if (!testimonialContainer) return;
    
    const testimonials = testimonialContainer.querySelectorAll('.testimonial-card');
    if (testimonials.length <= 1) return;
    
    let currentSlide = 0;
    let isAnimating = false;
    const testimonialControls = document.createElement('div');
    testimonialControls.className = 'testimonial-controls';
    
    // Create navigation dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'testimonial-dots';
    
    testimonials.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'testimonial-dot';
        dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
        if (index === 0) dot.classList.add('active');
        
        dot.addEventListener('click', () => {
            if (isAnimating || currentSlide === index) return;
            goToSlide(index);
        });
        
        dotsContainer.appendChild(dot);
    });
    
    testimonialControls.appendChild(dotsContainer);
    testimonialContainer.appendChild(testimonialControls);
    
    // Add navigation arrows
    const prevButton = document.createElement('button');
    prevButton.className = 'testimonial-arrow testimonial-prev';
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevButton.setAttribute('aria-label', 'Previous testimonial');
    
    const nextButton = document.createElement('button');
    nextButton.className = 'testimonial-arrow testimonial-next';
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextButton.setAttribute('aria-label', 'Next testimonial');
    
    prevButton.addEventListener('click', () => {
        if (isAnimating) return;
        goToSlide(currentSlide - 1 < 0 ? testimonials.length - 1 : currentSlide - 1);
    });
    
    nextButton.addEventListener('click', () => {
        if (isAnimating) return;
        goToSlide(currentSlide + 1 >= testimonials.length ? 0 : currentSlide + 1);
    });
    
    testimonialContainer.appendChild(prevButton);
    testimonialContainer.appendChild(nextButton);
    
    // Auto-advance slides
    let slideInterval = setInterval(goToNextSlide, 7000);
    
    // Pause auto-advance on hover/focus
    testimonialContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    testimonialContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(goToNextSlide, 7000);
    });
    
    // Handle slide transition
    function goToSlide(index) {
        if (isAnimating) return;
        isAnimating = true;
        
        const current = testimonials[currentSlide];
        const next = testimonials[index];
        
        // Update dots
        dotsContainer.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        // Crossfade transition
        current.style.opacity = '1';
        next.style.opacity = '0';
        next.style.display = 'block';
        
        setTimeout(() => {
            current.style.opacity = '0';
            next.style.opacity = '1';
            
            setTimeout(() => {
                current.style.display = 'none';
                currentSlide = index;
                isAnimating = false;
            }, 500); // Match the CSS transition time
        }, 50);
    }
    
    function goToNextSlide() {
        goToSlide(currentSlide + 1 >= testimonials.length ? 0 : currentSlide + 1);
    }
    
    // Set initial display state
    testimonials.forEach((testimonial, index) => {
        testimonial.style.transition = 'opacity 0.5s ease';
        testimonial.style.opacity = index === 0 ? '1' : '0';
        testimonial.style.display = index === 0 ? 'block' : 'none';
    });
}

// Add CSS-only animation for FAQ accordions
document.addEventListener('DOMContentLoaded', function() {
    const accordionButtons = document.querySelectorAll('.accordion-button');
    
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add a slight delay for the animation to be visible
            setTimeout(() => {
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                
                if (isExpanded) {
                    this.classList.add('accordion-open-animation');
                } else {
                    this.classList.remove('accordion-open-animation');
                }
            }, 50);
        });
    });
}); 