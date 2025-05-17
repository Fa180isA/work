// Mobile Navigation
const hamburger = document.querySelector('.hamburger-menu');
const mobileNav = document.querySelector('.mobile-nav');
const closeMenuBtn = document.querySelector('.close-menu');
const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');

function closeMobileNav() {
    mobileNav.classList.remove('active');
    hamburger.classList.remove('active');
}

hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    hamburger.classList.toggle('active');
});

if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', closeMobileNav);
}
if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener('click', closeMobileNav);
}

// Close mobile nav when clicking a link
const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
});

// Close mobile nav on scroll
window.addEventListener('scroll', () => {
    if (mobileNav.classList.contains('active')) {
        closeMobileNav();
    }
});

// Project filtering
const filterButtons = document.querySelectorAll('.filter-button');
const galleryItems = document.querySelectorAll('.gallery-item');

// Add click event to filter buttons
if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Get filter value
            const filterValue = button.getAttribute('data-filter');
            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filterValue === 'all' || filterValue === category) {
                    item.classList.add('show');
                } else {
                    item.classList.remove('show');
                }
            });
            // Update URL hash for consistency
            if (filterValue !== 'all') {
                history.replaceState(null, '', '#' + filterValue);
            } else {
                history.replaceState(null, '', window.location.pathname);
            }
        });
    });
}

// On page load, check for hash and trigger filter
window.addEventListener('DOMContentLoaded', function() {
    const hash = window.location.hash.replace('#', '');
    if (hash && hash !== 'all') {
        // Find the filter button for this hash
        const button = document.querySelector('.filter-button[data-filter="' + hash + '"]');
        if (button) {
            // Only trigger if not already active
            if (!button.classList.contains('active')) {
                button.click();
            } else {
                // If already active, still scroll to anchor
                const anchor = document.getElementById(hash);
                if (anchor) {
                    setTimeout(() => {
                        anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 200);
                }
            }
        } else {
            // If no filter button, just scroll to anchor
            const anchor = document.getElementById(hash);
            if (anchor) {
                setTimeout(() => {
                    anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 200);
            }
        }
    }
    // Always scroll to anchor if hash exists
    if (hash) {
        const anchor = document.getElementById(hash);
        if (anchor) {
            setTimeout(() => {
                anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 200);
        }
    }
});

// Form validation
const forms = document.querySelectorAll('form');

if (forms.length > 0) {
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            const requiredFields = form.querySelectorAll('[required]');
            let valid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    valid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (!valid) {
                event.preventDefault();
                alert('Please fill in all required fields');
            }
        });
    });
}

// Create success pages for form submissions
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on a success page
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    
    if (success === 'true') {
        // Get the main content area
        const main = document.querySelector('main') || document.body;
        
        // Create success message
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <h2>Thank You!</h2>
            <p>Your message has been sent successfully.</p>
            <p>We'll get back to you as soon as possible.</p>
            <a href="index.html" class="button">Back to Home</a>
        `;
        
        // Add to page
        main.innerHTML = '';
        main.appendChild(successDiv);
    }
});