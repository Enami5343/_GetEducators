// Authentication functionality

document.addEventListener('DOMContentLoaded', function() {
    // Login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;
            
            // Here you would typically validate and send to your server
            console.log('Login attempt:', { email, password, remember });
            
            // Simulate successful login
            setTimeout(() => {
                // Redirect based on user type (in a real app, this would come from the server)
                const isTutor = email.includes('tutor');
                window.location.href = isTutor ? '../tutor-dashboard.html' : '../student-dashboard.html';
            }, 1000);
        });
    }
    
    // Register form submission
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const userType = document.querySelector('input[name="user-type"]:checked').value;
            const fullName = document.getElementById('full-name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const location = document.getElementById('location').value;
            const terms = document.getElementById('terms').checked;
            
            // Validate password match
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            // Validate terms
            if (!terms) {
                alert('You must agree to the terms and conditions');
                return;
            }
            
            // Here you would typically send this data to your server
            console.log('Registration:', { userType, fullName, email, password, location });
            
            // Simulate successful registration
            setTimeout(() => {
                // Redirect based on user type
                window.location.href = userType === 'tutor' ? '../tutor-dashboard.html' : '../student-dashboard.html';
            }, 1000);
        });
        
        // Password strength indicator
        const passwordInput = document.getElementById('password');
        if (passwordInput) {
            passwordInput.addEventListener('input', function() {
                const strengthBars = document.querySelectorAll('.strength-bar');
                const strengthText = document.querySelector('.strength-text');
                const password = this.value;
                
                // Reset
                strengthBars.forEach(bar => {
                    bar.style.backgroundColor = '#e9ecef';
                    bar.style.flex = '1';
                });
                strengthText.textContent = 'Password strength';
                
                if (password.length > 0) {
                    // Very simple strength check - in a real app you'd want something more sophisticated
                    let strength = 0;
                    
                    // Length check
                    if (password.length >= 8) strength++;
                    if (password.length >= 12) strength++;
                    
                    // Complexity check
                    if (/[A-Z]/.test(password)) strength++;
                    if (/\d/.test(password)) strength++;
                    if (/[^A-Za-z0-9]/.test(password)) strength++;
                    
                    // Cap at 4 for our 4 bars
                    strength = Math.min(strength, 4);
                    
                    // Update UI
                    if (strength > 0) {
                        for (let i = 0; i < strength; i++) {
                            let color;
                            if (strength === 1) color = '#dc3545'; // Red
                            else if (strength === 2) color = '#fd7e14'; // Orange
                            else if (strength === 3) color = '#ffc107'; // Yellow
                            else color = '#28a745'; // Green
                            
                            strengthBars[i].style.backgroundColor = color;
                            strengthBars[i].style.flex = '2';
                        }
                        
                        const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];
                        strengthText.textContent = strengthLabels[strength - 1];
                    }
                }
            });
        }
    }
});