// Main JavaScript for the website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const subject = document.getElementById('contact-subject').value;
            const message = document.getElementById('contact-message').value;
            
            // Here you would typically send this data to your server
            console.log('Contact request:', { name, email, subject, message });
            
            // Show success message
            alert('Your request has been sent successfully! The tutor will contact you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Rating stars interaction (for when users leave reviews)
    const ratingStars = document.querySelectorAll('.rating-star');
    ratingStars.forEach(star => {
        star.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            const ratingContainer = this.closest('.rating-container');
            
            // Update active state for stars
            ratingStars.forEach(s => {
                if (s.getAttribute('data-value') <= value) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
            
            // Update hidden input value
            ratingContainer.querySelector('input[name="rating"]').value = value;
        });
    });
    
    // Tab functionality
    const tabs = document.querySelectorAll('.extra-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and content
            document.querySelectorAll('.extra-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.extra-content').forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(${tabId}-content).classList.add('active');
        });
    });
    
    // Initialize first tab as active
    if (tabs.length > 0) {
        tabs[0].click();
    }
    
    // Message sending functionality
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    
    if (sendBtn && messageInput) {
        sendBtn.addEventListener('click', function() {
            const message = messageInput.value.trim();
            
            if (message) {
                // Create new message element
                const messageContent = document.getElementById('message-content');
                const newMessage = document.createElement('div');
                newMessage.className = 'message sent';
                newMessage.innerHTML = `
                    <div class="message-bubble">
                        <p>${message}</p>
                        <span class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                `;
                
                // Append to message content
                messageContent.appendChild(newMessage);
                
                // Clear input
                messageInput.value = '';
                
                // Scroll to bottom
                messageContent.scrollTop = messageContent.scrollHeight;
                
                // Here you would typically send the message to your server
                console.log('Message sent:', message);
            }
        });
        
        // Allow sending message with Enter key
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendBtn.click();
            }
        });
    }
    
    // Tutor search functionality
    const searchBtn = document.getElementById('search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const location = document.getElementById('location').value;
            const subject = document.getElementById('subject').value;
            const level = document.getElementById('level').value;
            
            // Here you would typically make an AJAX request to your server
            // with these filter parameters and update the tutor listings
            
            console.log('Searching tutors with filters:', { location, subject, level });
            
            // For demo purposes, we'll just show an alert
            alert(Searching for ${subject} tutors in ${location} for ${level} level. This would load matching tutors in a real application.);
        });
    }
    
    // Sort functionality
    const sortSelect = document.getElementById('sort-by');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            
            // Here you would typically re-sort the tutor listings
            // based on the selected option
            
            console.log('Sorting tutors by:', sortValue);
        });
    }
    
    // Payment method selection
    const paymentMethods = document.querySelectorAll('.method-card');
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Initialize first payment method as active
    if (paymentMethods.length > 0) {
        paymentMethods[0].click();
    }
});