// Search functionality for tutor listings

document.addEventListener('DOMContentLoaded', function() {
    // Sample tutor data - in a real app, this would come from your backend
    const tutors = [
        {
            id: 1,
            name: "John Doe",
            rating: 5,
            reviews: 24,
            subjects: ["Mathematics", "Physics"],
            location: "Downtown",
            distance: "2 miles away",
            rate: "$40/hour",
            image: "images/tutor1.jpg",
            level: ["Middle School", "High School", "College"],
            available: ["Weekdays after 4pm", "Weekends"]
        },
        {
            id: 2,
            name: "Sarah Smith",
            rating: 4,
            reviews: 18,
            subjects: ["English", "Literature", "History"],
            location: "Westside",
            distance: "5 miles away",
            rate: "$35/hour",
            image: "images/tutor2.jpg",
            level: ["High School", "College"],
            available: ["Weekdays", "Weekends"]
        },
        {
            id: 3,
            name: "Michael Johnson",
            rating: 4.5,
            reviews: 32,
            subjects: ["Programming", "Computer Science"],
            location: "Eastside",
            distance: "3 miles away",
            rate: "$50/hour",
            image: "images/tutor3.jpg",
            level: ["High School", "College", "Adult Learning"],
            available: ["Weekends"]
        }
    ];
    
    // Function to render tutor cards
    function renderTutors(tutorsToRender) {
        const container = document.getElementById('tutors-container');
        container.innerHTML = '';
        
        if (tutorsToRender.length === 0) {
            container.innerHTML = '<p class="no-results">No tutors found matching your criteria.</p>';
            return;
        }
        
        tutorsToRender.forEach(tutor => {
            const card = document.createElement('div');
            card.className = 'tutor-card';
            card.innerHTML = `
                <div class="tutor-img">
                    <img src="${tutor.image}" alt="Tutor ${tutor.name}">
                </div>
                <div class="tutor-info">
                    <h3>${tutor.name}</h3>
                    <div class="rating">
                        <span class="stars">${'★'.repeat(Math.floor(tutor.rating))}${'☆'.repeat(5 - Math.floor(tutor.rating))}</span>
                        <span class="review-count">(${tutor.reviews} reviews)</span>
                    </div>
                    <p class="subjects">${tutor.subjects.join(', ')}</p>
                    <p class="location"><i class="fas fa-map-marker-alt"></i> ${tutor.location}, ${tutor.distance}</p>
                    <p class="rate">${tutor.rate}</p>
                    <a href="tutor-profile.html?id=${tutor.id}" class="btn btn-small">View Profile</a>
                </div>
            `;
            container.appendChild(card);
        });
    }
    
    // Initial render
    renderTutors(tutors);
    
    // Search functionality
    const searchBtn = document.getElementById('search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const location = document.getElementById('location').value.toLowerCase();
            const subject = document.getElementById('subject').value;
            const level = document.getElementById('level').value;
            
            const filteredTutors = tutors.filter(tutor => {
                // Filter by location
                const locationMatch = !location || tutor.location.toLowerCase().includes(location);
                
                // Filter by subject
                const subjectMatch = !subject || tutor.subjects.some(sub => 
                    sub.toLowerCase().includes(subject.toLowerCase()));
                
                // Filter by level
                const levelMatch = !level || tutor.level.some(lvl => 
                    lvl.toLowerCase().includes(level.toLowerCase()));
                
                return locationMatch && subjectMatch && levelMatch;
            });
            
            renderTutors(filteredTutors);
        });
    }
    
    // Sort functionality
    const sortSelect = document.getElementById('sort-by');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            let sortedTutors = [...tutors];
            
            switch(sortValue) {
                case 'rating':
                    sortedTutors.sort((a, b) => b.rating - a.rating);
                    break;
                case 'price-low':
                    sortedTutors.sort((a, b) => parseFloat(a.rate.replace('$', '')) - parseFloat(b.rate.replace('$', '')));
                    break;
                case 'price-high':
                    sortedTutors.sort((a, b) => parseFloat(b.rate.replace('$', '')) - parseFloat(a.rate.replace('$', '')));
                    break;
                case 'distance':
                    // In a real app, you would sort by actual distance
                    sortedTutors.sort((a, b) => parseInt(a.distance) - parseInt(b.distance));
                    break;
            }
            
            renderTutors(sortedTutors);
        });
    }
    
    // Load tutor profile data if on profile page
    if (window.location.pathname.includes('tutor-profile.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const tutorId = urlParams.get('id');
        
        if (tutorId) {
            const tutor = tutors.find(t => t.id === parseInt(tutorId));
            if (tutor) {
                // Update profile page with tutor data
                document.querySelector('.profile-img img').src = tutor.image;
                document.querySelector('.profile-info h1').textContent = tutor.name;
                document.querySelector('.rating .stars').textContent = '★'.repeat(Math.floor(tutor.rating)) + '☆'.repeat(5 - Math.floor(tutor.rating));
                document.querySelector('.rating .review-count').textContent = ${tutor.reviews} reviews;
                document.querySelector('.location').innerHTML = <i class="fas fa-map-marker-alt"></i> ${tutor.location}, ${tutor.distance};
                
                // Update subjects table
                const subjectsTable = document.querySelector('.subjects table tbody');
                subjectsTable.innerHTML = tutor.subjects.map(subject => `
                    <tr>
                        <td>${subject}</td>
                        <td>${tutor.level.join(', ')}</td>
                        <td>${tutor.rate}</td>
                    </tr>
                `).join('');
                
                // Update availability
                document.querySelector('.availability-calendar').innerHTML = `
                    <p><strong>Typical Availability:</strong> ${tutor.available.join(', ')}</p>
                    <p>Please contact for specific scheduling.</p>
                `;
            }
        }
    }
});