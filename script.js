// 1. मल्टीपल विश नोट्स (आप यहाँ अपनी मर्जी से और लाइनें जोड़ सकते हैं)
const birthdayNotes = [
    "💖 You are a very special person! Once again, Happy Birthday Sana! 🎉",
    "✨ भगवान करे आपकी ज़िंदगी में हमेशा खुशियाँ, हंसी और कामयाबी बनी रहे! ⭐",
    "🌹 मुस्कुराती रहो आप हमेशा, यही दुआ है हमारी। आपके सारे सपने सच हों! ❤️",
    "🎈 May this year bring you endless love, good health, and wonderful surprises!"
];

// 2. मल्टीपल फोटोज की लिस्ट (अगर आपके पास और फोटोज हैं, तो उनके नाम यहाँ जोड़ें, जैसे 'Sana2.jpg')
const birthdayPhotos = [
    "Sana.jpg", 
    "Sana.jpg", // यहाँ आप अपनी दूसरी अपलोडेड फोटो का नाम लिख सकते हैं
    "Sana.jpg"  // यहाँ आप तीसरी फोटो का नाम लिख सकते हैं
];

let currentIdx = 0;
let musicStarted = false;

// बटन दबाने पर सरप्राइज चालू करने का फंक्शन
function showSurprise() {
    const surpriseDiv = document.getElementById("surprise");
    surpriseDiv.style.display = "block"; // सरप्राइज बॉक्स को दिखाओ
    
    // फूलों का धमाका और असली गाना चालू करना
    burstFlowers();
    playRealMusic();
    updateContent(); // पहला नोट और फोटो लोड करें
}

function playRealMusic() {
    const music = document.getElementById("birthdayMusic");
    if (!musicStarted && music) {
        music.play().catch(error => console.log("Autoplay blocked: ", error));
        musicStarted = true;
    }
}

// नोट और फोटो को बदलने का फंक्शन
function updateContent() {
    document.getElementById("noteText").innerHTML = birthdayNotes[currentIdx];
    // अगर आपने अलग-अलग फोटो अपलोड की हैं तो फोटो भी बदलेगी
    if(birthdayPhotos[currentIdx]) {
        document.getElementById("galleryPhoto").src = birthdayPhotos[currentIdx];
    }
}

function nextNote() {
    currentIdx = (currentIdx + 1) % birthdayNotes.length;
    updateContent();
}

function prevNote() {
    currentIdx = (currentIdx - 1 + birthdayNotes.length) % birthdayNotes.length;
    updateContent();
}

// 3. रियलिस्टिक 3D फ्लावर और लीफ शावर (लगातार गिरने के लिए)
document.addEventListener('DOMContentLoaded', () => {
    setInterval(() => createFlowerElement(false), 250);
});

function burstFlowers() {
    for (let i = 0; i < 30; i++) {
        createFlowerElement(true);
    }
}

function createFlowerElement(isBurst) {
    const item = document.createElement('div');
    const pool = ['🌹', '🌷', '🌸', '🌺', '🍃', '✨', '💖'];
    item.innerHTML = pool[Math.floor(Math.random() * pool.length)];
    item.style.position = 'fixed';
    item.style.pointerEvents = 'none';
    
    const size = Math.random() * 25 + 20;
    item.style.fontSize = size + 'px';
    
    if (!isBurst) {
        item.style.top = '-50px';
        item.style.left = Math.random() * 100 + 'vw';
        item.style.zIndex = Math.floor(Math.random() * 2) === 0 ? '1' : '20';
    } else {
        item.style.top = '60%';
        item.style.left = '50%';
        item.style.zIndex = '30';
    }
    
    document.body.appendChild(item);

    let posY = !isBurst ? -50 : window.innerHeight * 0.6;
    let posX = !isBurst ? parseFloat(item.style.left) : 50;
    
    let speedY = !isBurst ? Math.random() * 2 + 2 : Math.random() * -10 - 5;
    let speedX = !isBurst ? Math.sin(posY) * 0.5 : (Math.random() * 12 - 6);
    
    let rot = Math.random() * 360;
    let rotSpeed = Math.random() * 4 - 2;

    function animate() {
        if (!isBurst) {
            posY += speedY;
            posX += Math.sin(posY / 30) * 0.8; 
            item.style.left = posX + 'vw';
        } else {
            posY += speedY;
            speedY += 0.3;
            posX += speedX;
            item.style.left = `calc(50% + ${posX * 4}px)`;
        }
        
        rot += rotSpeed;
        item.style.top = posY + 'px';
        item.style.transform = `rotateX(${rot}deg) rotateY(${rot / 2}deg) rotateZ(${rot}deg)`;

        if (posY < window.innerHeight && posY > -100 && posX > -10 && posX < 110) {
            requestAnimationFrame(animate);
        } else {
            item.remove();
        }
    }
    requestAnimationFrame(animate);
}
