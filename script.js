// उर्दू (खूबसूरत नास्तलीक़ स्टाइल) और इंग्लिश में मिक्स 4 स्पेशल नोट्स
const birthdayNotes = [
    `<div style="font-family: 'Noto Nastaliq Urdu', serif; direction: rtl; font-size: 20px; line-height: 2.2; margin-bottom: 10px;">خدا کرے آپ کی زندگی کا ہر لمحہ خوشیوں سے بھرا ہو، سالگرہ مبارک ثناء! 🎉</div>
     <div style="font-size: 15px; color: #555;">May Khuda bless every moment of your life with endless happiness. Happy Birthday Sana! 💖</div>`,
    
    `<div style="font-family: 'Noto Nastaliq Urdu', serif; direction: rtl; font-size: 20px; line-height: 2.2; margin-bottom: 10px;">خدا آپ کی تمام نیک دعائیں قبول فرمائے اور آپ کو ہمیشہ سلامت رکھے۔ 🤲✨</div>
     <div style="font-size: 15px; color: #555;">May Khuda accept all your pure wishes and protect you always. Beautiful day ahead! ⭐</div>`,
    
    `<div style="font-family: 'Noto Nastaliq Urdu', serif; direction: rtl; font-size: 20px; line-height: 2.2; margin-bottom: 10px;">مسکراتی رہو آپ ہمیشہ، یہی دعا ہے ہماری۔ سالگرہ بہت بہت مبارک ہو! 🌹❤️</div>
     <div style="font-size: 15px; color: #555;">Keep smiling always, that's my only prayer to Khuda for you. Have a wonderful birthday!</div>`,
    
    `<div style="font-family: 'Noto Nastaliq Urdu', serif; direction: rtl; font-size: 20px; line-height: 2.2; margin-bottom: 10px;">خدا کرے یہ سال آپ کی زندگی میں کامیابی، اچھی صحت اور ڈھیروں برکتیں لائے۔ 🎈</div>
     <div style="font-size: 15px; color: #555;">May Khuda fill this new year of your life with success, great health, and barakah!</div>`
];

// अगर भविष्य में आपके पास और तस्वीरें हों, तो यहाँ 'Sana2.jpg', 'Sana3.jpg' लिख सकते हैं। अभी यह आपकी पहली फोटो को ही लोड रखेगा।
const birthdayPhotos = [
    "Sana.jpg", 
    "Sana.jpg", 
    "Sana.jpg",
    "Sana.jpg"
];

let currentIdx = 0;
let musicStarted = false;

function showSurprise() {
    const surpriseDiv = document.getElementById("surprise");
    surpriseDiv.style.display = "block";
    
    // बटन क्लिक होते ही संगीत 100% बजना शुरू होगा क्योंकि यूजर ने स्क्रीन टच की है
    playRealMusic();
    burstFlowers();
    updateContent();
}

function playRealMusic() {
    const music = document.getElementById("birthdayMusic");
    if (!musicStarted && music) {
        // वॉल्यूम सेट करें और प्ले करें
        music.volume = 0.7;
        music.play().then(() => {
            musicStarted = true;
        }).catch(error => {
            console.log("Autoplay failed, trying again on next interaction: ", error);
        });
    }
}

function updateContent() {
    document.getElementById("noteText").innerHTML = birthdayNotes[currentIdx];
    if(birthdayPhotos[currentIdx]) {
        document.getElementById("galleryPhoto").src = birthdayPhotos[currentIdx];
    }
}

function nextNote() {
    currentIdx = (currentIdx + 1) % birthdayNotes.length;
    updateContent();
    playRealMusic(); // सुरक्षा के लिए फिर से प्ले ट्रिगर
}

function prevNote() {
    currentIdx = (currentIdx - 1 + birthdayNotes.length) % birthdayNotes.length;
    updateContent();
    playRealMusic();
}

// स्क्रीन पर 3D स्टाइल में बड़े फूल, पत्तियां और दिल गिरने का एनीमेशन
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
