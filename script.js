document.addEventListener('DOMContentLoaded', function() {
    // Create and append back to top button
    const backToTopButton = document.createElement('div');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '↑';
    document.body.appendChild(backToTopButton);
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Smooth scroll to top when button is clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add smooth scrolling to all anchor links
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
    
    // Add toggle functionality to research items
    const researchItems = document.querySelectorAll('.research-item');
    researchItems.forEach(item => {
        // Create toggle button for each research item
        const toggleButton = document.createElement('div');
        toggleButton.className = 'research-item-toggle';
        
        // Create span for icon
        const iconSpan = document.createElement('span');
        iconSpan.className = 'research-item-toggle-icon';
        iconSpan.innerHTML = '+';
        
        // Create text span
        const textSpan = document.createElement('span');
        textSpan.textContent = 'Show details';
        
        // Append elements to button
        toggleButton.appendChild(iconSpan);
        toggleButton.appendChild(textSpan);
        
        item.appendChild(toggleButton);
        
        // Add click event to toggle button
        toggleButton.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent bubbling up to potential parent handlers
            
            // Toggle expanded class on the research item
            item.classList.toggle('expanded');
            
            // Update the toggle button text based on expanded state
            if (item.classList.contains('expanded')) {
                iconSpan.innerHTML = '−'; // Em dash for minus
                textSpan.textContent = 'Hide details';
            } else {
                iconSpan.innerHTML = '+';
                textSpan.textContent = 'Show details';
            }
        });
        
        // Border color change on hover (not on expand/collapse)
        item.addEventListener('mouseenter', function() {
            this.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
        });
        
        item.addEventListener('mouseleave', function() {
            if (!this.classList.contains('expanded')) {
                this.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--border-color');
            }
        });
    });
    
    // Highlight active section in navigation based on scroll position
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.sidebar-nav a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
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
    
    // Add subtle entrance animations - MODIFIED to use classes instead of inline styles
    const animateElements = document.querySelectorAll('.research-item, .experience-item, .update-item');
    
    // Add the pre-animation class to all elements
    animateElements.forEach(element => {
        element.classList.add('pre-animate');
    });
    
    // Create an intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove the pre-animation class when element is visible
                entry.target.classList.remove('pre-animate');
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe each element
    animateElements.forEach(element => {
        observer.observe(element);
    });
});
