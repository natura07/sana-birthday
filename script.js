const SECRET_PASSWORD = "sana123"; 

const birthdayNotes = [
    `<div style="font-family: 'Noto Nastaliq Urdu', serif; direction: rtl; font-size: 20px; line-height: 2.2; margin-bottom: 10px;">خدا کرے آپ کی زندگی का हर لمحہ خوشیوں سے بھرا ہو، ! 🎉</div>
     <div style="font-size: 15px; color: #555;">May God bless every moment of your life with endless happiness. Happy Birthday Sana! 💖</div>`,
    
    `<div style="font-family: 'Noto Nastaliq Urdu', serif; direction: rtl; font-size: 20px; line-height: 2.2; margin-bottom: 10px;">خدا آپ کی تمام نیک دعائیں قبول فرمائے اور آپ کو ہمیشہ سلامت رکھے۔ 🤲✨</div>
     <div style="font-size: 15px; color: #555;">May God accept all your pure wishes and protect you always. Beautiful day ahead! ⭐</div>`,
    
    `<div style="font-family: 'Noto Nastaliq Urdu', serif; direction: rtl; font-size: 20px; line-height: 2.2; margin-bottom: 10px;">مسکراتی رہو آپ ہمیشہ، یہی دعا ہے ہماری। سالگرہ بہت بہت مبارک ہو! 🌹❤️</div>
     <div style="font-size: 15px; color: #555;">Keep smiling always, that's my only prayer to God for you. Have a wonderful birthday!</div>`,
    
    `<div style="font-family: 'Noto Nastaliq Urdu', serif; direction: rtl; font-size: 20px; line-height: 2.2; margin-bottom: 10px;">خدا کرے یہ سال آپ کی زندگی میں کامیابی، اچھی صحت اور ڈھیروں برکتیں لائے। 🎈</div>
     <div style="font-size: 15px; color: #555;">May God fill this new year of your life with success, great health, and barakah!</div>`
];

const birthdayPhotos = ["Sana.jpg", "Sana.jpg", "Sana.jpg", "Sana.jpg"];
let currentIdx = 0;
let musicStarted = false;

function checkPassword() {
    const input = document.getElementById("passInput").value;
    const errorMsg = document.getElementById("errorMsg");
    const loginWrapper = document.querySelector(".login-box");
    const passwordScreen = document.getElementById("passwordScreen");
    const heartArrowScreen = document.getElementById("heartArrowScreen");
    const mainContainer = document.getElementById("mainContainer");
    const passInput = document.getElementById("passInput");

    if (input === SECRET_PASSWORD) {
        errorMsg.style.display = "none";
        
        // 1. लॉगिन बॉक्स छिपाओ और जादुई तीर-दिल स्क्रीन खोलो
        passwordScreen.style.display = "none";
        heartArrowScreen.style.display = "flex";
        
        // 2. एनीमेशन पूरा होने के लिए 1.5 सेकंड का समय दें, फिर मुख्य पेज खोलो
        setTimeout(() => {
            heartArrowScreen.style.opacity = "0";
            heartArrowScreen.style.transition = "all 0.5s ease";
            
            mainContainer.style.filter = "none";
            mainContainer.style.opacity = "1";
            
            setTimeout(() => {
                heartArrowScreen.style.display = "none";
            }, 500);
        }, 1500); // 1.5 सेकंड तक तीर दिल पर जाता हुआ दिखेगा
        
    } else {
        loginWrapper.classList.remove("shake-animation");
        void loginWrapper.offsetWidth;
        loginWrapper.classList.add("shake-animation");
        
        passInput.style.borderColor = "#ff4757";
        errorMsg.style.display = "block";
        passInput.value = "";
    }
}

function showSurprise() {
    document.getElementById("surprise").style.display = "block";
    playRealMusic(); 
    burstFlowers();
    updateContent();
}

function playRealMusic() {
    const music = document.getElementById("birthdayMusic");
    if (music) {
        music.muted = false;
        let playPromise = music.play();
        if (playPromise !== undefined) {
            playPromise.then(() => { musicStarted = true; }).catch(err => {
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
    playRealMusic();
}

function prevNote() {
    currentIdx = (currentIdx - 1 + birthdayNotes.length) % birthdayNotes.length;
    updateContent();
    playRealMusic();
}

document.addEventListener('DOMContentLoaded', () => {
    setInterval(() => createFlowerElement(false), 250);
    
    const passInput = document.getElementById("passInput");
    if(passInput) {
        passInput.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                checkPassword();
            }
        });
    }
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
