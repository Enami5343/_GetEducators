// Payment processing functionality

document.addEventListener('DOMContentLoaded', function() {
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
    
    // Form validation
    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            const cardNumber = document.getElementById('card-number').value;
            const cardName = document.getElementById('card-name').value;
            const expiry = document.getElementById('expiry').value;
            const cvv = document.getElementById('cvv').value;
            
            if (!cardNumber || !cardName || !expiry || !cvv) {
                alert('Please fill in all payment details.');
                return;
            }
            
            // Simple card number validation
            if (cardNumber.replace(/\s/g, '').length !== 16) {
                alert('Please enter a valid 16-digit card number.');
                return;
            }
            
            // Simple CVV validation
            if (cvv.length !== 3) {
                alert('Please enter a valid 3-digit CVV.');
                return;
            }
            
            // If everything is valid, process payment
            processPayment();
        });
    }
    
    // Process payment (simulated)
    function processPayment() {
        // Show loading state
        const submitBtn = document.querySelector('#payment-form button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Show success message
            alert('Payment successful! Your tutor will be notified.');
            
            // Reset form
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            paymentForm.reset();
            
            // In a real app, you would redirect to a success page or dashboard
            window.location.href = 'student-dashboard.html';
        }, 2000);
    }
    
    // Format card number
    const cardNumberInput = document.getElementById('card-number');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function() {
            // Remove all non-digit characters
            let value = this.value.replace(/\D/g, '');
            
            // Add space after every 4 digits
            value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
            
            // Update input value
            this.value = value;
        });
    }
    
    // Format expiry date
    const expiryInput = document.getElementById('expiry');
    if (expiryInput) {
        expiryInput.addEventListener('input', function() {
            // Remove all non-digit characters
            let value = this.value.replace(/\D/g, '');
            
            // Add slash after 2 digits
            if (value.length > 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            
            // Update input value
            this.value = value;
        });
    }
});