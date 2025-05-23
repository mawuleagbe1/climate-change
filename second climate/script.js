// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('show');
    });
    
    // Tab functionality for Causes & Effects and Solutions pages
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                this.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('show')) {
                    nav.classList.remove('show');
                }
            }
        });
    });
    
    // Form submission handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (this.id === 'pledge-form') {
                alert('Thank you for taking the climate pledge! We appreciate your commitment to a sustainable Ghana.');
                this.reset();
            } else if (this.classList.contains('newsletter')) {
                alert('Thank you for subscribing to our newsletter!');
                this.reset();
            }
        });
    });
});

// Interactive hotspots functionality
document.addEventListener('DOMContentLoaded', function() {
    const hotspots = document.querySelectorAll('.hotspot');
    
    hotspots.forEach(hotspot => {
        const info = hotspot.getAttribute('data-info');
        const marker = hotspot.querySelector('.hotspot-marker');
        marker.setAttribute('data-info', info);
        
        // For touch devices
        hotspot.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                marker.classList.toggle('active');
            }
        });
    });
    
    // Close hotspots when clicking elsewhere
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.hotspot')) {
            document.querySelectorAll('.hotspot-marker').forEach(marker => {
                marker.classList.remove('active');
            });
        }
    });
});

// FAQ Accordion Functionality
        document.addEventListener('DOMContentLoaded', function() {
            const faqItems = document.querySelectorAll('.faq-item');
            const categoryButtons = document.querySelectorAll('.faq-category-btn');
            const searchInput = document.querySelector('.faq-search input');
            
            // Accordion toggle
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                
                question.addEventListener('click', () => {
                    // Close all other items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    // Toggle current item
                    item.classList.toggle('active');
                });
            });
            
            // Category filtering
            categoryButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const category = button.getAttribute('data-category');
                    
                    // Update active button
                    categoryButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    
                    // Filter questions
                    faqItems.forEach(item => {
                        if (category === 'all' || item.getAttribute('data-category') === category) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                            item.classList.remove('active');
                        }
                    });
                });
            });
            
            // Search functionality
            searchInput.addEventListener('input', () => {
                const searchTerm = searchInput.value.toLowerCase();
                
                faqItems.forEach(item => {
                    const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
                    const answer = item.querySelector('.faq-answer-content').textContent.toLowerCase();
                    
                    if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                        item.classList.remove('active');
                    }
                });
            });
        });

 // Interactive Contact Form Validation
        document.addEventListener('DOMContentLoaded', function() {
            const contactForm = document.getElementById('contactForm');
            const successMessage = document.getElementById('successMessage');
            
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                let isValid = true;
                
                // Reset error states
                document.querySelectorAll('.form-group').forEach(group => {
                    group.classList.remove('error');
                });
                
                // Validate required fields
                const requiredFields = contactForm.querySelectorAll('[required]');
                requiredFields.forEach(field => {
                    const formGroup = field.closest('.form-group');
                    
                    if (field.value.trim() === '') {
                        formGroup.classList.add('error');
                        isValid = false;
                    }
                    
                    // Special validation for email
                    if (field.type === 'email' && field.value.trim() !== '' && !isValidEmail(field.value)) {
                        formGroup.classList.add('error');
                        formGroup.querySelector('.error-message').textContent = 'Please enter a valid email address';
                        isValid = false;
                    }
                });
                
                // If form is valid, show success message
                if (isValid) {
                    // In a real application, you would submit the form here
                    // For demo purposes, we'll just show the success message
                    successMessage.style.display = 'block';
                    contactForm.reset();
                    
                    // Scroll to show the success message
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 5000);
                } else {
                    // Scroll to first error
                    const firstError = contactForm.querySelector('.error');
                    if (firstError) {
                        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            });
            
            // Real-time validation for email
            const emailField = document.getElementById('email');
            emailField.addEventListener('input', function() {
                const formGroup = this.closest('.form-group');
                if (this.value.trim() === '') {
                    formGroup.classList.remove('error');
                } else if (!isValidEmail(this.value)) {
                    formGroup.classList.add('error');
                    formGroup.querySelector('.error-message').textContent = 'Please enter a valid email address';
                } else {
                    formGroup.classList.remove('error');
                }
            });
            
            // Phone number formatting
            const phoneField = document.getElementById('phone');
            phoneField.addEventListener('input', function() {
                this.value = formatPhoneNumber(this.value);
            });
            
            // Helper function to validate email
            function isValidEmail(email) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            }
            
            // Helper function to format phone number
            function formatPhoneNumber(phone) {
                // Remove all non-digit characters
                phone = phone.replace(/\D/g, '');
                
                // Format for Ghanaian numbers (e.g., 0244 123 456)
                if (phone.length > 3 && phone.length <= 6) {
                    phone = phone.replace(/(\d{3})(\d{1,3})/, '$1 $2');
                } else if (phone.length > 6) {
                    phone = phone.replace(/(\d{3})(\d{3})(\d{1,4})/, '$1 $2 $3');
                }
                
                return phone;
            }
            
            // Interactive map - could be enhanced with Google Maps API
            // In a real implementation, you might add markers or other interactive elements
        });




         const quizQuestions = [
            {
                question: "What is the main cause of current climate change in Ghana?",
                options: [
                    "Natural climate cycles",
                    "Human activities like burning fossil fuels",
                    "Changes in Earth's orbit",
                    "Volcanic eruptions"
                ],
                answer: 1,
                explanation: "While natural factors influence climate, the current rapid warming is primarily caused by human activities, especially burning fossil fuels which release greenhouse gases."
            },
            {
                question: "How much has Ghana's average temperature increased since 1960?",
                options: [
                    "0.5°C",
                    "1°C",
                    "2°C",
                    "No significant change"
                ],
                answer: 1,
                explanation: "Ghana's average temperature has increased by about 1°C since 1960, with projections of 1.5-3.5°C increase by 2050 if trends continue."
            },
            {
                question: "Which region of Ghana is most vulnerable to droughts?",
                options: [
                    "Coastal areas",
                    "Northern regions",
                    "Ashanti region",
                    "Eastern region"
                ],
                answer: 1,
                explanation: "Northern Ghana experiences more frequent and severe droughts due to climate change, affecting agriculture and water availability."
            },
            {
                question: "What percentage of Ghana's workforce is employed in climate-sensitive agriculture?",
                options: [
                    "About 20%",
                    "About 40%",
                    "About 60%",
                    "About 80%"
                ],
                answer: 1,
                explanation: "Approximately 40% of Ghana's workforce is employed in agriculture, making the economy particularly vulnerable to climate impacts."
            },
            {
                question: "Which climate solution is Ghana actively pursuing?",
                options: [
                    "Expanding coal power plants",
                    "Increasing deforestation",
                    "Developing renewable energy",
                    "Banning all industrial activities"
                ],
                answer: 2,
                explanation: "Ghana has a Renewable Energy Master Plan aiming for 10% renewable energy by 2030, including solar and wind projects."
            },
            {
                question: "How much has rainfall decreased in northern Ghana since 1950?",
                options: [
                    "5%",
                    "10%",
                    "20%",
                    "30%"
                ],
                answer: 2,
                explanation: "Northern Ghana has experienced about a 20% decrease in total rainfall since 1950, leading to longer dry seasons."
            },
            {
                question: "What is Ghana's commitment under the Paris Agreement?",
                options: [
                    "No specific commitment",
                    "15-45% emissions reduction by 2030",
                    "Double emissions by 2030",
                    "Achieve net-zero by 2025"
                ],
                answer: 1,
                explanation: "Ghana committed to reducing emissions by 15% unconditionally and up to 45% with international support by 2030."
            },
            {
                question: "Which of these is NOT a climate impact being experienced in Ghana?",
                options: [
                    "Coastal erosion",
                    "More frequent floods",
                    "Disappearance of all seasons",
                    "Changing rainfall patterns"
                ],
                answer: 2,
                answer: 2,
                explanation: "While seasons are changing, they haven't disappeared completely. Ghana is experiencing shifting rainfall patterns and more extreme weather events."
            }
        ];

        // Quiz Variables
        let currentQuestion = 0;
        let score = 0;
        let selectedOption = null;
        let quizCompleted = false;

        // DOM Elements
        const questionText = document.getElementById('questionText');
        const optionsContainer = document.getElementById('optionsContainer');
        const nextBtn = document.getElementById('nextBtn');
        const questionCounter = document.getElementById('questionCounter');
        const progressBar = document.getElementById('progressBar');
        const quizContent = document.getElementById('quizContent');
        const resultsContainer = document.getElementById('resultsContainer');
        const scoreValue = document.getElementById('scoreValue');
        const feedbackMessage = document.getElementById('feedbackMessage');
        const restartBtn = document.getElementById('restartBtn');

        // Initialize Quiz
        function initQuiz() {
            currentQuestion = 0;
            score = 0;
            quizCompleted = false;
            showQuestion();
            quizContent.style.display = 'block';
            resultsContainer.style.display = 'none';
        }

        // Show Current Question
        function showQuestion() {
            const question = quizQuestions[currentQuestion];
            questionText.textContent = question.question;
            
            // Update progress
            const progress = ((currentQuestion) / quizQuestions.length) * 100;
            progressBar.style.width = `${progress}%`;
            questionCounter.textContent = `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
            
            // Clear previous options
            optionsContainer.innerHTML = '';
            
            // Add new options
            question.options.forEach((option, index) => {
                const optionElement = document.createElement('div');
                optionElement.classList.add('option');
                optionElement.innerHTML = `
                    <input type="radio" name="option" id="option${index}" value="${index}">
                    <label for="option${index}">
                        <span class="checkmark"></span>
                        ${option}
                    </label>
                `;
                
                optionElement.addEventListener('click', () => selectOption(optionElement, index));
                optionsContainer.appendChild(optionElement);
            });
            
            // Reset next button
            nextBtn.disabled = true;
            nextBtn.textContent = currentQuestion === quizQuestions.length - 1 ? 'Submit Quiz' : 'Next Question';
        }

        // Select Option
        function selectOption(optionElement, index) {
            // Remove selected class from all options
            document.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Add selected class to clicked option
            optionElement.classList.add('selected');
            selectedOption = index;
            nextBtn.disabled = false;
        }

        // Check Answer and Move to Next Question
        function nextQuestion() {
            if (selectedOption === null) return;
            
            // Check if answer is correct
            const question = quizQuestions[currentQuestion];
            const options = document.querySelectorAll('.option');
            
            // Disable all options
            options.forEach(option => {
                option.style.cursor = 'default';
                option.removeEventListener('click', selectOption);
            });
            
            // Mark correct and incorrect answers
            options[question.answer].classList.add('correct');
            if (selectedOption !== question.answer) {
                options[selectedOption].classList.add('incorrect');
            } else {
                score++;
            }
            
            // Show explanation as a tooltip or modal in a real implementation
            
            // Move to next question or show results
            if (currentQuestion < quizQuestions.length - 1) {
                currentQuestion++;
                setTimeout(showQuestion, 1500);
            } else {
                showResults();
            }
            
            selectedOption = null;
        }

        // Show Quiz Results
        function showResults() {
            quizCompleted = true;
            quizContent.style.display = 'none';
            resultsContainer.style.display = 'block';
            
            // Calculate score percentage
            const percentage = Math.round((score / quizQuestions.length) * 100);
            scoreValue.textContent = `${percentage}%`;
            
            // Provide feedback based on score
            let feedback;
            if (percentage >= 90) {
                feedback = "Excellent! You're a climate expert! Consider joining our education team.";
                feedbackMessage.className = "feedback-message excellent";
            } else if (percentage >= 70) {
                feedback = "Great job! You know a lot about climate change in Ghana.";
                feedbackMessage.className = "feedback-message good";
            } else if (percentage >= 50) {
                feedback = "Good effort! Check out our resources to learn more.";
                feedbackMessage.className = "feedback-message average";
            } else {
                feedback = "Keep learning! Visit our education section to improve your knowledge.";
                feedbackMessage.className = "feedback-message poor";
            }
            
            feedbackMessage.innerHTML = `
                <p>${feedback}</p>
                <p>${score} out of ${quizQuestions.length} correct</p>
                <p><strong>Did you know?</strong> ${quizQuestions[0].explanation}</p>
            `;
            
            // Create confetti effect
            createConfetti();
        }

        // Create Confetti Animation
        function createConfetti() {
            const colors = ['#006B3F', '#FCD116', '#CE1126', '#FFFFFF'];
            const container = document.querySelector('.score-value');
            
            for (let i = 0; i < 50; i++) {
                const confetti = document.createElement('div');
                confetti.classList.add('confetti');
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.left = `${Math.random() * 100}%`;
                confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;
                confetti.style.animationDelay = `${Math.random() * 0.5}s`;
                container.appendChild(confetti);
            }
        }

        // Event Listeners
        nextBtn.addEventListener('click', nextQuestion);
        restartBtn.addEventListener('click', initQuiz);

        // Start the quiz
        initQuiz();



