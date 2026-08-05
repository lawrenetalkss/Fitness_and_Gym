/* ============================================================
   main.js – IronCore Fitness Hub
   ============================================================ */

(function() {
    'use strict';

    // ============================================================
    // 1. HAMBURGER MENU
    // ============================================================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('open');
        });
    }

    // ============================================================
    // 2. SCROLL PROGRESS BAR
    // ============================================================
    const progressBar = document.querySelector('.scroll-progress');

    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    });

    // ============================================================
    // 3. HEADER SCROLL EFFECT
    // ============================================================
    const header = document.querySelector('header');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ============================================================
    // 4. PRICING TOGGLE (Monthly/Yearly)
    // ============================================================
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const priceAmounts = document.querySelectorAll('.price-amount');

    toggleBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            // Update active class
            toggleBtns.forEach(function(b) {
                b.classList.remove('active');
            });
            this.classList.add('active');

            // Get the period
            const period = this.dataset.period;

            // Update prices
            priceAmounts.forEach(function(price) {
                const monthly = parseFloat(price.dataset.monthly);
                const yearly = parseFloat(price.dataset.yearly);

                if (period === 'monthly') {
                    price.textContent = '$' + monthly;
                } else {
                    price.textContent = '$' + yearly;
                }
            });
        });
    });

    // ============================================================
    // 5. TESTIMONIALS SLIDER
    // ============================================================
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    let autoSlideInterval;

    function showTestimonial(index) {
        testimonials.forEach(function(t, i) {
            t.classList.remove('active');
            dots[i].classList.remove('active');
        });

        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }

    function nextTestimonial() {
        const nextIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(nextIndex);
    }

    function prevTestimonial() {
        const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(prevIndex);
    }

    // Event listeners for buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevTestimonial();
            resetAutoSlide();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextTestimonial();
            resetAutoSlide();
        });
    }

    // Dot click events
    dots.forEach(function(dot, index) {
        dot.addEventListener('click', function() {
            showTestimonial(index);
            resetAutoSlide();
        });
    });

    // Auto-slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextTestimonial, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Start auto-slide
    if (testimonials.length > 1) {
        startAutoSlide();
    }

    // ============================================================
    // 6. SCROLL TO TOP
    // ============================================================
    const scrollTopBtn = document.getElementById('scroll-top');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================================
    // 7. NEWSLETTER FORM
    // ============================================================
    const newsletterForm = document.getElementById('newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            if (email && validateEmail(email)) {
                // Store subscription in localStorage
                const subscriptions = JSON.parse(localStorage.getItem('newsletterSubscriptions') || '[]');
                subscriptions.push({
                    email: email,
                    date: new Date().toISOString()
                });
                localStorage.setItem('newsletterSubscriptions', JSON.stringify(subscriptions));

                // Show success message
                const originalText = this.querySelector('button').textContent;
                this.querySelector('button').textContent = '✅ Subscribed!';
                emailInput.value = '';

                setTimeout(function() {
                    newsletterForm.querySelector('button').textContent = originalText;
                }, 3000);

                console.log('📧 Newsletter subscription saved:', email);
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    // ============================================================
    // 8. EMAIL VALIDATION HELPER
    // ============================================================
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // ============================================================
    // 9. SMOOTH SCROLL FOR NAVIGATION LINKS
    // ============================================================
    document.querySelectorAll('a[href^="#"]').forEach(function(link) {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#' && targetId !== '#home') {
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ============================================================
    // 10. FOOTER - CURRENT YEAR
    // ============================================================
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // ============================================================
    // 11. FOOTER - LAST MODIFIED
    // ============================================================
    const lastModifiedElement = document.getElementById('lastModified');
    if (lastModifiedElement) {
        const lastModified = document.lastModified;
        const date = new Date(lastModified);
        const formatted = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        lastModifiedElement.textContent = 'Last Modified: ' + formatted;
    }

    // ============================================================
    // 12. BMI CALCULATOR (Optional Feature)
    // ============================================================
    function calculateBMI(weight, height) {
        // height in cm, weight in kg
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);
        return Math.round(bmi * 10) / 10;
    }

    function getBMICategory(bmi) {
        if (bmi < 18.5) return { category: 'Underweight', color: '#4cc9f0' };
        if (bmi < 25) return { category: 'Normal Weight', color: '#28a745' };
        if (bmi < 30) return { category: 'Overweight', color: '#fca311' };
        return { category: 'Obese', color: '#dc3545' };
    }

    // Expose BMI functions globally if needed
    window.calculateBMI = calculateBMI;
    window.getBMICategory = getBMICategory;

    // ============================================================
    // 13. CLASS FILTERING (For Classes Page)
    // ============================================================
    function filterClasses(filter) {
        const classItems = document.querySelectorAll('.class-item');
        classItems.forEach(function(item) {
            const level = item.dataset.level;
            if (filter === 'all' || level === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Expose filter function globally
    window.filterClasses = filterClasses;

    // ============================================================
    // 14. DARK MODE TOGGLE (Optional)
    // ============================================================
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark ? 'true' : 'false');
    }

    // Check saved preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    // Expose toggle function globally
    window.toggleDarkMode = toggleDarkMode;

    // ============================================================
    // 15. CONSOLE LOG - SUCCESS MESSAGE
    // ============================================================
    console.log('💪 IronCore Fitness Hub loaded successfully!');
    console.log('📋 Features: Hamburger Menu, Scroll Progress, Pricing Toggle, Testimonials Slider, Newsletter Form');
    console.log('📅 ' + new Date().toLocaleDateString());

    // ============================================================
    // 16. INITIALIZATION
    // ============================================================
    console.log('✅ All systems ready!');
})();