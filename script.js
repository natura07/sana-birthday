// उर्दू में खुदा और इंग्लिश में God का इस्तेमाल करते हुए 4 खूबसूरत विश नोट्स
const birthdayNotes = [
    `<div style="font-family: 'Noto Nastaliq Urdu', serif; direction: rtl; font-size: 20px; line-height: 2.2; margin-bottom: 10px;">خدا کرے آپ کی زندگی کا ہر لمحہ خوشیوں سے بھرا ہو، سالگرہ مبارک ثناء! 🎉</div>
     <div style="font-size: 15px; color: #555;">May God bless every moment of your life with endless happiness. Happy Birthday Sana! 💖</div>`,
    
    `<div style="font-family: 'Noto Nastaliq Urdu', serif; direction: rtl; font-size: 20px; line-height: 2.2; margin-bottom: 10px;">خدا آپ کی تمام نیک دعائیں قبول فرمائے اور آپ کو ہمیشہ سلامت رکھے۔ 🤲✨</div>
     <div style="font-size: 15px; color: #555;">May God accept all your pure wishes and protect you always. Beautiful day ahead! ⭐</div>`,
    
    `<div style="font-family: 'Noto Nastaliq Urdu', serif; direction: rtl; font-size: 20px; line-height: 2.2; margin-bottom: 10px;">مسکراتی رہو آپ ہمیشہ، یہی دعا ہے ہماری۔ سالگرہ بہت بہت مبارک ہو! 🌹❤️</div>
     <div style="font-size: 15px; color: #555;">Keep smiling always, that's my only prayer to God for you. Have a wonderful birthday!</div>`,
    
    `<div style="font-family: 'Noto Nastaliq Urdu', serif; direction: rtl; font-size: 20px; line-height: 2.2; margin-bottom: 10px;">خدا کرے یہ سال آپ کی زندگی में कामयाबी، अच्छी सेहत और ढेरों برکتیں لائے। 🎈</div>
     <div style="font-size: 15px; color: #555;">May God fill this new year of your life with success, great health, and barakah!</div>`
];

const birthdayPhotos = ["Sana.jpg", "Sana.jpg", "Sana.jpg", "Sana.jpg"];
let currentIdx = 0;
let musicStarted = false;

function showSurprise() {
    document.getElementById("surprise").style.display = "block";
    playRealMusic(); // बटन दबते ही गाना बजना शुरू होगा
    burstFlowers();
    updateContent();
}

function playRealMusic() {
    const music = document.getElementById("birthdayMusic");
    if (music) {
        music.muted = false; // अनम्यूट पक्का करें
        // ब्राउज़र रिस्ट्रिक्शन को बायपास करने का सबसे बेस्ट तरीका
        let playPromise = music.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                musicStarted = true;
            }).catch(error => {
                console.log("प्लेबैक में दिक्कत आई, दोबारा कोशिश जारी है...");
                // बैकअप तरीका: अगर डायरेक्ट प्ले न हो, तो वॉल्यूम फुल करके फिर से ट्रिगर करें
                music.volume = 1.0;
                music.play();
            });
        }
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
    playRealMusic(); // पक्का करने के लिए कि गाना चलता रहे
}

function prevNote() {
    currentIdx = (currentIdx - 1 + birthdayNotes.length) % birthdayNotes.length;
    updateContent();
    playRealMusic();
}

// 3D स्टाइल में बड़े फूल और दिल गिरने का एनीमेशन
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
