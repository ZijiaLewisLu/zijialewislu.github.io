document.addEventListener('DOMContentLoaded', function() {
    // Initialize UI components
    initBackToTopButton();
    initSmoothScrolling();
    initScrollSpy();
    initEntryAnimations();

    // Back to top button functionality
    function initBackToTopButton() {
        const backToTopButton = document.createElement('div');
        backToTopButton.className = 'back-to-top';
        backToTopButton.innerHTML = '↑';
        document.body.appendChild(backToTopButton);
        
        // Show/hide based on scroll position
        window.addEventListener('scroll', function() {
            backToTopButton.classList.toggle('visible', window.pageYOffset > 300);
        });
        
        // Smooth scroll to top
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 30,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Active section highlighting in navigation
    function initScrollSpy() {
        const sections = document.querySelectorAll('.section');
        const navItems = document.querySelectorAll('.sidebar-nav a');
        
        window.addEventListener('scroll', function() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href').substring(1) === current) {
                    item.classList.add('active');
                }
            });
        });
    }

    // Entry animations using Intersection Observer API
    function initEntryAnimations() {
        const animateElements = document.querySelectorAll('.research-item, .experience-item, .update-item');
        
        // Add pre-animation class
        animateElements.forEach(element => {
            element.classList.add('pre-animate');
        });
        
        // Create observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('pre-animate');
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        // Start observing elements
        animateElements.forEach(element => {
            observer.observe(element);
        });
    }
});
