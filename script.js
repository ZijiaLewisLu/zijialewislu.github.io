document.addEventListener('DOMContentLoaded', function() {
    // Initialize UI components
    initBackToTopButton();
    initSmoothScrolling();
    initResearchItemToggle();
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

    // Research item toggle functionality
    function initResearchItemToggle() {
        const researchItems = document.querySelectorAll('.research-item');
        
        researchItems.forEach(item => {
            const toggleButton = createToggleButton();
            const leftContent = item.querySelector('.research-item-left');
            const rightContent = item.querySelector('.research-item-right');
            const publicationLinksDiv = item.querySelector('.publication-links');
            
            // Add button to the layout
            publicationLinksDiv.appendChild(toggleButton);
            
            // Toggle button event listener
            toggleButton.addEventListener('click', function(e) {
                e.stopPropagation();
                
                const isExpanding = !item.classList.contains('expanded');
                const iconSpan = toggleButton.querySelector('.research-item-toggle-icon');
                const textSpan = toggleButton.querySelector('span:not(.research-item-toggle-icon)');
                
                handleToggleAnimation(item, leftContent, rightContent, toggleButton, isExpanding);
                
                // Update toggle button appearance
                iconSpan.innerHTML = isExpanding ? '−' : '+';
                textSpan.textContent = isExpanding ? 'Hide details' : 'Show details';
            });
            
            // Border color effects on hover
            item.addEventListener('mouseenter', function() {
                this.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
            });
            
            item.addEventListener('mouseleave', function() {
                if (!this.classList.contains('expanded')) {
                    this.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--border-color');
                }
            });
        });
        
        // Responsive layout adjustments
        window.addEventListener('resize', function() {
            researchItems.forEach(item => {
                const leftContent = item.querySelector('.research-item-left');
                leftContent.style.width = '';
                leftContent.style.transition = '';
            });
        });
    }

    // Helper function to create toggle button with icon and text
    function createToggleButton() {
        const toggleButton = document.createElement('div');
        toggleButton.className = 'research-item-toggle';
        
        const iconSpan = document.createElement('span');
        iconSpan.className = 'research-item-toggle-icon';
        iconSpan.innerHTML = '+';
        
        const textSpan = document.createElement('span');
        textSpan.textContent = 'Show details';
        
        toggleButton.appendChild(iconSpan);
        toggleButton.appendChild(textSpan);
        
        return toggleButton;
    }

    // Handle toggle animation with proper timing
    function handleToggleAnimation(item, leftContent, rightContent, toggleButton, isExpanding) {
        // Store current dimensions before animation
        const currentWidthPx = leftContent.offsetWidth;
        
        // Temporarily disable transitions
        const elements = [item, leftContent, rightContent, toggleButton];
        elements.forEach(el => el.style.transition = 'none');
        
        // Force reflow
        void item.offsetWidth;
        
        // Pre-animation setup
        if (isExpanding) {
            if (window.innerWidth > 768) {
                leftContent.style.width = currentWidthPx + 'px';
                toggleButton.style.right = '0px';
            }
            
            item.classList.add('expanded');
        } else {
            if (window.innerWidth > 768) {
                toggleButton.style.right = '0px';
            }
            
            leftContent.style.width = currentWidthPx + 'px';
            item.classList.remove('expanded');
        }
        
        // Re-enable transitions with a delay
        setTimeout(() => {
            // Restore transitions except position changes for button
            item.style.transition = '';
            rightContent.style.transition = '';
            leftContent.style.transition = '';
            toggleButton.style.transition = 'background-color 0.3s ease, transform 0.3s ease';
            
            // Clean up after animation
            setTimeout(() => {
                leftContent.style.width = '';
            }, 300);
        }, 10);
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
