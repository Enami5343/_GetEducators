// Messaging functionality

document.addEventListener('DOMContentLoaded', function() {
    // Sample conversation data
    const conversations = [
        {
            id: 1,
            tutorId: 1,
            tutorName: "John Doe",
            tutorImage: "images/tutor1.jpg",
            lastMessage: "Looking forward to our session tomorrow!",
            lastMessageTime: "Today, 10:30 AM",
            messages: [
                {
                    sender: "tutor",
                    text: "Hi there! Thanks for reaching out about math tutoring. What specific topics are you needing help with?",
                    time: "10:15 AM"
                },
                {
                    sender: "student",
                    text: "Hi John! I'm struggling with calculus, especially limits and derivatives. I have a test coming up in two weeks.",
                    time: "10:18 AM"
                },
                {
                    sender: "tutor",
                    text: "I can definitely help with that. I've helped many students with those exact topics. Would you like to schedule a session this week?",
                    time: "10:20 AM"
                },
                {
                    sender: "student",
                    text: "Yes, that would be great! I'm available Wednesday or Thursday after 4pm.",
                    time: "10:22 AM"
                },
                {
                    sender: "tutor",
                    text: "Thursday at 4:30pm works for me. We can meet online via Zoom if that works for you?",
                    time: "10:25 AM"
                },
                {
                    sender: "student",
                    text: "Perfect! Zoom works fine. Looking forward to our session.",
                    time: "10:26 AM"
                },
                {
                    sender: "tutor",
                    text: "Great! I'll send you the Zoom link and some preparatory materials before our session. Looking forward to our session tomorrow!",
                    time: "10:30 AM"
                }
            ],
            files: [
                {
                    name: "Calculus_Review.pdf",
                    size: "2.4 MB",
                    sharedBy: "John"
                }
            ],
            sessions: [
                {
                    day: "Thu",
                    date: "15",
                    time: "4:30 PM - 5:30 PM",
                    title: "Calculus Tutoring",
                    location: "Zoom Meeting"
                }
            ]
        },
        {
            id: 2,
            tutorId: 2,
            tutorName: "Sarah Smith",
            tutorImage: "images/tutor2.jpg",
            lastMessage: "I've shared the reading materials",
            lastMessageTime: "Yesterday, 4:15 PM",
            messages: [
                {
                    sender: "tutor",
                    text: "Hello! I understand you're looking for help with English literature?",
                    time: "Yesterday, 3:45 PM"
                },
                {
                    sender: "student",
                    text: "Yes, I need help analyzing Shakespeare's Macbeth for my high school class.",
                    time: "Yesterday, 3:50 PM"
                },
                {
                    sender: "tutor",
                    text: "Macbeth is one of my favorites! I can definitely help with that. What specific aspects are you struggling with?",
                    time: "Yesterday, 3:55 PM"
                },
                {
                    sender: "student",
                    text: "Mainly the themes and character analysis. I have an essay due next week.",
                    time: "Yesterday, 4:05 PM"
                },
                {
                    sender: "tutor",
                    text: "I've shared the reading materials with some key points about themes and characters. Let me know if you'd like to schedule a session to go over them in detail.",
                    time: "Yesterday, 4:15 PM"
                }
            ],
            files: [
                {
                    name: "Macbeth_Themes.docx",
                    size: "1.2 MB",
                    sharedBy: "Sarah"
                },
                {
                    name: "Character_Analysis.pdf",
                    size: "3.1 MB",
                    sharedBy: "Sarah"
                }
            ],
            sessions: []
        }
    ];
    
    // Render conversation list
    function renderConversationList() {
        const container = document.querySelector('.conversation-list');
        container.innerHTML = '';
        
        conversations.forEach(convo => {
            const convoEl = document.createElement('div');
            convoEl.className = 'conversation';
            convoEl.dataset.id = convo.id;
            convoEl.innerHTML = `
                <div class="conversation-img">
                    <img src="${convo.tutorImage}" alt="${convo.tutorName}">
                </div>
                <div class="conversation-info">
                    <h4>${convo.tutorName}</h4>
                    <p class="last-message">${convo.lastMessage}</p>
                    <p class="time">${convo.lastMessageTime}</p>
                </div>
            `;
            
            convoEl.addEventListener('click', () => loadConversation(convo.id));
            container.appendChild(convoEl);
        });
        
        // Activate first conversation by default
        if (conversations.length > 0) {
            document.querySelector('.conversation').classList.add('active');
            loadConversation(conversations[0].id);
        }
    }
    
    // Load a specific conversation
    function loadConversation(convoId) {
        const convo = conversations.find(c => c.id === convoId);
        if (!convo) return;
        
        // Update active state in list
        document.querySelectorAll('.conversation').forEach(el => {
            el.classList.toggle('active', parseInt(el.dataset.id) === convoId);
        });
        
        // Update header
        const header = document.querySelector('.message-header .recipient-info');
        header.innerHTML = `
            <img src="${convo.tutorImage}" alt="${convo.tutorName}">
            <h3>${convo.tutorName}</h3>
            <span class="status">Online</span>
        `;
        
        // Render messages
        const messagesContainer = document.getElementById('message-content');
        messagesContainer.innerHTML = '';
        
        convo.messages.forEach(msg => {
            const msgEl = document.createElement('div');
            msgEl.className = message ${msg.sender === 'tutor' ? 'received' : 'sent'};
            
            if (msg.sender === 'tutor') {
                msgEl.innerHTML = `
                    <div class="message-img">
                        <img src="${convo.tutorImage}" alt="${convo.tutorName}">
                    </div>
                    <div class="message-bubble">
                        <p>${msg.text}</p>
                        <span class="message-time">${msg.time}</span>
                    </div>
                `;
            } else {
                msgEl.innerHTML = `
                    <div class="message-bubble">
                        <p>${msg.text}</p>
                        <span class="message-time">${msg.time}</span>
                    </div>
                `;
            }
            
            messagesContainer.appendChild(msgEl);
        });
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Render files
        const filesContent = document.getElementById('files-content');
        filesContent.innerHTML = `
            <h4>Shared Files</h4>
            <div class="file-list">
                ${convo.files.map(file => `
                    <div class="file-item">
                        <i class="fas fa-file-pdf"></i>
                        <div class="file-info">
                            <p class="file-name">${file.name}</p>
                            <p class="file-meta">${file.size} · Shared by ${file.sharedBy}</p>
                        </div>
                        <button class="btn-icon"><i class="fas fa-download"></i></button>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Render sessions
        const scheduleContent = document.getElementById('schedule-content');
        scheduleContent.innerHTML = `
            <h4>Upcoming Sessions</h4>
            ${convo.sessions.length > 0 ? 
                convo.sessions.map(session => `
                    <div class="session-item">
                        <div class="session-date">
                            <span class="day">${session.day}</span>
                            <span class="date">${session.date}</span>
                        </div>
                        <div class="session-info">
                            <p class="session-time">${session.time}</p>
                            <p class="session-title">${session.title}</p>
                            <p class="session-location"><i class="fas fa-video"></i> ${session.location}</p>
                        </div>
                    </div>
                `).join('') :
                '<p>No upcoming sessions scheduled.</p>'
            }
        `;
    }
    
    // Initialize messaging
    renderConversationList();
    
    // Send message functionality
    const sendBtn = document.getElementById('send-btn');
    const messageInput = document.getElementById('message-input');
    
    if (sendBtn && messageInput) {
        sendBtn.addEventListener('click', function() {
            const message = messageInput.value.trim();
            
            if (message) {
                // Get active conversation
                const activeConvo = document.querySelector('.conversation.active');
                if (!activeConvo) return;
                
                const convoId = parseInt(activeConvo.dataset.id);
                const convo = conversations.find(c => c.id === convoId);
                
                if (convo) {
                    // Add new message
                    const newMessage = {
                        sender: "student",
                        text: message,
                        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                    };
                    
                    convo.messages.push(newMessage);
                    convo.lastMessage = message;
                    convo.lastMessageTime = "Just now";
                    
                    // Update UI
                    loadConversation(convoId);
                    renderConversationList();
                    
                    // Clear input
                    messageInput.value = '';
                }
            }
        });
        
        // Allow sending with Enter key
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendBtn.click();
            }
        });
    }
    
    // Tab switching
    const tabs = document.querySelectorAll('.extra-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding content
            document.querySelectorAll('.extra-content').forEach(content => {
                content.style.display = content.id === ${tabId}-content ? 'block' : 'none';
            });
        });
    });
});