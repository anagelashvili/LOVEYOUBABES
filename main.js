document.addEventListener('DOMContentLoaded', function() {
    createConfetti();
    initStickers();
    initPartyButton();
    initAddMessage();
    initPetKitten();
    initCake();
    initHiddenPresents();
    initQuiz();
    initInteractiveMessages();
});

// ----- CONFETTI EFFECT -----
function createConfetti() {
    const container = document.getElementById('confetti-container');
    const colors = ['#ff66b3', '#66c2ff', '#ffdb4d', '#ff9966', '#c266ff', '#66ff8c'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random position, color, size, and animation duration
        const left = Math.random() * 100;
        const size = Math.random() * 10 + 5;
        const duration = Math.random() * 5 + 5;
        const delay = Math.random() * 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        confetti.style.position = 'absolute';
        confetti.style.left = left + 'vw';
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        confetti.style.backgroundColor = color;
        confetti.style.animationDuration = duration + 's';
        confetti.style.animationDelay = delay + 's';
        
        // Add the confetti to the container
        container.appendChild(confetti);
    }
}

// Function to create flower decoration
function createFlowerDecoration(container, x, y) {
    const flowerTypes = ['🌷', '🌹', '🌼', '🌻', '🌸'];
    const flowersToSpawn = 5;

    for (let i = 0; i < flowersToSpawn; i++) {
        const flower = document.createElement('div');
        flower.textContent = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
        flower.style.position = 'absolute';
        flower.style.left = `${x + (Math.random() * 100 - 50)}px`;
        flower.style.top = `${y + (Math.random() * 100 - 50)}px`;
        flower.style.fontSize = '30px';
        flower.style.opacity = '0';
        flower.style.transition = 'all 1s ease-out';
        flower.style.zIndex = '1000';

        container.appendChild(flower);

        // Animate flower
        setTimeout(() => {
            flower.style.opacity = '1';
            flower.style.transform = `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(${Math.random() * 360}deg)`;
        }, 10);

        // Remove flower after animation
        setTimeout(() => {
            flower.remove();
        }, 2000);
    }
}

// ----- STICKERS FUNCTIONALITY -----
function initStickers() {
    const stickers = document.querySelectorAll('.sticker');
    const body = document.querySelector('body');
    let stickerCounter = 0;
    const stickerCounterElement = document.querySelector('.sticker-counter');
    
    // Add drag start event to all stickers
    stickers.forEach(sticker => {
        sticker.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', sticker.dataset.sticker);
            e.dataTransfer.effectAllowed = 'copy';
        });
    });
    
    // Enable dropping on the entire page
    body.addEventListener('dragover', function(e) {
        e.preventDefault(); // Allow drop
        e.dataTransfer.dropEffect = 'copy';
    });
    
    // Handle the drop event
    body.addEventListener('drop', function(e) {
        e.preventDefault();
        
        // Get the sticker type from the transfer data
        const stickerType = e.dataTransfer.getData('text/plain');
        
        // Create a new sticker element
        const newSticker = document.createElement('div');
        newSticker.className = 'dragged-sticker';
        
        // Set the emoji based on the sticker type
        switch(stickerType) {
            case 'cake': newSticker.textContent = '🎂'; break;
            case 'gift': newSticker.textContent = '🎁'; break;
            case 'balloon': newSticker.textContent = '🎈'; break;
            case 'party': newSticker.textContent = '🎉'; break;
            case 'heart': newSticker.textContent = '❤️'; break;
            case 'star': newSticker.textContent = '⭐'; break;
            case 'sparkles': newSticker.textContent = '✨'; break;
            case 'cat': newSticker.textContent = '😺'; break;
            case 'dog': newSticker.textContent = '🐶'; break;
            case 'unicorn': newSticker.textContent = '🦄'; break;
            default: newSticker.textContent = '🎉';
        }
        
        // Position the sticker where it was dropped
        newSticker.style.left = (e.clientX - 15) + 'px';
        newSticker.style.top = (e.clientY - 15) + 'px';
        
        // Make the placed stickers draggable for repositioning
        newSticker.draggable = true;
        
        // Add dragstart event for repositioning
        newSticker.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', 'moving-sticker');
            e.dataTransfer.setData('application/x-sticker-id', newSticker.id);
            draggedSticker = newSticker;
        });
        
        // Add a unique id to identify this sticker
        newSticker.id = 'placed-sticker-' + stickerCounter;
        
        // Add the sticker to the page
        document.body.appendChild(newSticker);
        
        // Update sticker counter
        stickerCounter++;
        stickerCounterElement.textContent = stickerCounter + ' stickers placed';
    });
    
    // Handle repositioning placed stickers
    let draggedSticker = null;
    
    body.addEventListener('drop', function(e) {
        if (e.dataTransfer.getData('text/plain') === 'moving-sticker') {
            const stickerId = e.dataTransfer.getData('application/x-sticker-id');
            const stickerToMove = document.getElementById(stickerId);
            
            if (stickerToMove) {
                stickerToMove.style.left = (e.clientX - 15) + 'px';
                stickerToMove.style.top = (e.clientY - 15) + 'px';
            }
        }
    });
}

// ----- PARTY BUTTON -----
function initPartyButton() {
    const partyButton = document.querySelector('.party-button');
    const body = document.body;
    
    // Create audio elements
    const partyMusicTracks = [
        'https://www.soundjay.com/misc/sounds/party-crowd-01.mp3',
        'https://www.soundjay.com/misc/sounds/party-crowd-02.mp3',
        'https://www.soundjay.com/misc/sounds/party-crowd-03.mp3'
    ];
    let currentTrackIndex = 0;
    const audioPlayer = new Audio();
    
    function playNextTrack() {
        audioPlayer.src = partyMusicTracks[currentTrackIndex];
        audioPlayer.play().catch(e => console.log('Music play failed:', e));
        currentTrackIndex = (currentTrackIndex + 1) % partyMusicTracks.length;
    }
    
    audioPlayer.addEventListener('ended', playNextTrack);
    
    partyButton.addEventListener('click', function() {
        // Toggle party mode class on body
        body.classList.toggle('party-mode');
        
        // Create extra confetti
        createConfetti();
        
        // Create flower decorations around the button
        createFlowerDecoration(body, 
            partyButton.getBoundingClientRect().left, 
            partyButton.getBoundingClientRect().top
        );
        
        // Play party music
        if (body.classList.contains('party-mode')) {
            partyButton.textContent = '🎵 PARTY ON! 🎵';
            playNextTrack();
        } else {
            partyButton.textContent = '🎉 PARTY TIME! 🎉';
            audioPlayer.pause();
            audioPlayer.currentTime = 0;
        }
    });
}

// ----- ADD CUSTOM MESSAGE -----
function initAddMessage() {
    const addButton = document.querySelector('.add-message-btn');
    const messageInput = document.getElementById('custom-message');
    const messagesContainer = document.querySelector('.messages');
    
    addButton.addEventListener('click', function() {
        const messageText = messageInput.value.trim();
        
        if (messageText) {
            // Create a new message element
            const newMessage = document.createElement('div');
            newMessage.className = 'message pop-message';
            
            // Add the message text
            const paragraph = document.createElement('p');
            paragraph.textContent = messageText;
            newMessage.appendChild(paragraph);
            
            // Add the message to the container
            messagesContainer.appendChild(newMessage);
            
            // Clear the input
            messageInput.value = '';
            
            // Scroll to the new message
            newMessage.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // Also allow adding message with Enter key
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            addButton.click();
        }
    });
}

// ----- PET THE KITTEN -----
function initPetKitten() {
    const petKitten = document.querySelector('.pet-me');
    const petCounter = document.querySelector('.pet-counter');
    let petCount = 0;
    
    petKitten.addEventListener('click', function() {
        petCount++;
        
        // Update counter and show it
        petCounter.textContent = petCount + ' pets given';
        petCounter.style.display = 'block';
        
        // Add a quick animation
        petKitten.classList.add('shake');
        setTimeout(() => {
            petKitten.classList.remove('shake');
        }, 500);
        
        // Play a meow sound occasionally
        if (petCount % 3 === 0) {
            const meow = new Audio('https://www.soundjay.com/animal/sounds/cat-meow-1.mp3');
            meow.play().catch(e => console.log('Audio play failed:', e));
        }
    });
}

// ----- BIRTHDAY CAKE -----
function initCake() {
    const cake = document.querySelector('.birthday-cake');
    const flame = document.querySelector('.flame');
    const cakeMessage = document.querySelector('.cake-message');
    let isBlown = false;
    
    cake.addEventListener('click', function() {
        if (!isBlown) {
            // Blow out the candle
            flame.style.display = 'none';
            cakeMessage.textContent = 'Wish granted! 🌟';
            isBlown = true;
            
            // Play a blowing sound
            const blowSound = new Audio('https://www.soundjay.com/human/sounds/breathing-1.mp3');
            blowSound.play().catch(e => console.log('Audio play failed:', e));
            
            // Create sparkles around the cake
            for (let i = 0; i < 20; i++) {
                const sparkle = document.createElement('div');
                sparkle.textContent = '✨';
                sparkle.style.position = 'absolute';
                sparkle.style.fontSize = '20px';
                sparkle.style.left = (cake.offsetLeft + Math.random() * cake.offsetWidth) + 'px';
                sparkle.style.top = (cake.offsetTop + Math.random() * cake.offsetHeight) + 'px';
                sparkle.style.transition = 'all 1s ease-out';
                sparkle.style.opacity = '1';
                
                document.querySelector('.wishes-section').appendChild(sparkle);
                
                // Animate sparkles
                setTimeout(() => {
                    sparkle.style.transform = `translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px)`;
                    sparkle.style.opacity = '0';
                }, 10);
                
                // Remove sparkles after animation
                setTimeout(() => {
                    sparkle.remove();
                }, 1000);
            }
        } else {
            // Relight the candle
            flame.style.display = 'block';
            cakeMessage.textContent = 'Make a wish and click the cake!';
            isBlown = false;
        }
    });
}

// ----- HIDDEN PRESENTS -----
function initHiddenPresents() {
    const presents = document.querySelectorAll('.hidden-present');
    const presentsFoundCounter = document.querySelector('.presents-found');
    const body = document.body;
    let presentsFound = 0;
    
    presents.forEach(present => {
        present.addEventListener('click', function() {
            // Only count if not already found
            if (!present.classList.contains('found')) {
                present.classList.add('found');
                present.style.opacity = '1';
                present.style.transform = 'scale(1.5)';
                
                // Create flower decorations when present is found
                createFlowerDecoration(body, 
                    present.getBoundingClientRect().left, 
                    present.getBoundingClientRect().top
                );
                
                // Update counter
                presentsFound++;
                presentsFoundCounter.textContent = presentsFound + '/3 presents found';
                
                // Shake the counter
                presentsFoundCounter.classList.add('shake');
                setTimeout(() => {
                    presentsFoundCounter.classList.remove('shake');
                }, 500);
                
                // Play a sound
                const presentSound = new Audio('https://www.soundjay.com/button/sounds/button-30.mp3');
                presentSound.play().catch(e => console.log('Audio play failed:', e));
                
                // Show congratulations message if all presents found
                if (presentsFound === 3) {
                    const secretMessage = document.querySelector('.secret-message');
                    const congrats = document.createElement('p');
                    congrats.textContent = 'Congratulations! You found all the presents! 🎊';
                    congrats.style.fontWeight = 'bold';
                    congrats.style.color = '#ff66b3';
                    secretMessage.appendChild(congrats);
                }
            }
        });
    });
}

// ----- BIRTHDAY QUIZ -----
function initQuiz() {
    const quizOptions = document.querySelectorAll('.quiz-option');
    const quizScore = document.getElementById('quiz-score');
    const quizMessage = document.getElementById('quiz-message');
    let score = 0;
    let questionsAnswered = 0;
    
    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Get all options in this question
            const questionContainer = option.closest('.quiz-item');
            const options = questionContainer.querySelectorAll('.quiz-option');
            
            // Check if this question has already been answered
            if (questionContainer.dataset.answered) {
                return;
            }
            
            // Mark question as answered
            questionContainer.dataset.answered = 'true';
            questionsAnswered++;
            
            // Check if correct
            if (option.dataset.correct === 'true') {
                option.classList.add('correct');
                score++;
            } else {
                option.classList.add('incorrect');
                
                // Highlight the correct answer
                options.forEach(opt => {
                    if (opt.dataset.correct === 'true') {
                        opt.classList.add('correct');
                    }
                });
            }
            
            // Update score
            quizScore.textContent = score;
            
            // Check if quiz is complete
            if (questionsAnswered === 3) {
                if (score === 3) {
                    quizMessage.textContent = 'Perfect score! You really know your friend well! 🏆';
                } else if (score >= 2) {
                    quizMessage.textContent = 'Great job! You know your friend quite well! 🥈';
                } else if (score >= 1) {
                    quizMessage.textContent = 'Not bad! Maybe learn a bit more about your friend? 🥉';
                } else {
                    quizMessage.textContent = 'Oops! Time to get to know your friend better! 📚';
                }
            }
        });
    });
}

// ----- INTERACTIVE MESSAGES -----
function initInteractiveMessages() {
    const messages = document.querySelectorAll('.message');
    
    messages.forEach(message => {
        message.addEventListener('click', function() {
            // Add a heart when clicked
            const heart = document.createElement('span');
            heart.textContent = '❤️';
            heart.style.position = 'absolute';
            heart.style.right = '10px';
            heart.style.top = '10px';
            heart.style.fontSize = '20px';
            heart.style.opacity = '0';
            heart.style.transition = 'opacity 0.5s';
            
            message.style.position = 'relative';
            message.appendChild(heart);
            
            // Show the heart
            setTimeout(() => {
                heart.style.opacity = '1';
            }, 10);
            
            // Remove the heart after a few seconds
            setTimeout(() => {
                heart.style.opacity = '0';
                setTimeout(() => {
                    heart.remove();
                }, 500);
            }, 3000);
        });
    });
}