let audioContext;
let musicStarted = false;

// 1. जैसे ही बटन दबेगा, आपका सरप्राइज मैसेज खुलेगा
function showSurprise() {
    document.getElementById("surprise").innerHTML = 
        "💖 You are a very special person! 💖<br><br>" + 
        "🎉 Once again, Happy Birthday Sana! 🎉<br>" + 
        "✨ May all your dreams come true! ✨❤️";
        
    // बटन दबाने पर और ज्यादा फूलों की बरसात होगी
    burstFlowers();
    playBirthdayMusic();
}

// 2. म्यूजिक बजाने का लॉजिक
function playBirthdayMusic() {
    if (musicStarted) return;
    musicStarted = true;

    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [
        [261.63, 0.3], [261.63, 0.3], [293.66, 0.6], [261.63, 0.6], [349.23, 0.6], [329.63, 1.0],
        [261.63, 0.3], [261.63, 0.3], [293.66, 0.6], [261.63, 0.6], [392.00, 0.6], [349.23, 1.0]
    ];

    let time = audioContext.currentTime;
    notes.forEach(([frequency, duration]) => {
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.frequency.value = frequency;
        oscillator.type = "sine";

        gain.gain.setValueAtTime(0.15, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + duration);

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start(time);
        oscillator.stop(time + duration);
        time += duration + 0.05;
    });
}

// 3. रियलिस्टिक 3D फ्लावर और लीफ शावर (लगातार गिरने के लिए)
document.addEventListener('DOMContentLoaded', () => {
    setInterval(() => createFlowerElement(false), 250);
});

// बटन दबाने पर बहुत सारे फूल एक साथ फूटने के लिए
function burstFlowers() {
    for (let i = 0; i < 30; i++) {
        createFlowerElement(true);
    }
}

function createFlowerElement(isBurst) {
    const item = document.createElement('div');
    // यहाँ हमने बहुत ही खूबसूरत और अलग-अलग प्रकार के बड़े फूल और पत्तियां चुनी हैं
    const pool = ['🌹', '🌷', '🌸', '🌺', '🍃', '✨', '💖'];
    item.innerHTML = pool[Math.floor(Math.random() * pool.length)];
    
    item.style.position = 'fixed';
    item.style.pointerEvents = 'none';
    
    // रैंडम साइज (20px से लेकर 45px तक बड़े और रियलिस्टिक दिखेंगे)
    const size = Math.random() * 25 + 20;
    item.style.fontSize = size + 'px';
    
    // अगर नॉर्मल शावर है तो ऊपर से गिरेगा, अगर बटन बर्स्ट है तो बीच से उड़ेगा
    if (!isBurst) {
        item.style.top = '-50px';
        item.style.left = Math.random() * 100 + 'vw';
        item.style.zIndex = Math.floor(Math.random() * 2) === 0 ? '1' : '20'; // कुछ कार्ड के पीछे और कुछ आगे गिरेंगे
    } else {
        item.style.top = '60%';
        item.style.left = '50%';
        item.style.zIndex = '30';
    }
    
    document.body.appendChild(item);

    let posY = !isBurst ? -50 : window.innerHeight * 0.6;
    let posX = !isBurst ? parseFloat(item.style.left) : 50;
    
    // 3D हवा का झोंका देने के लिए स्पीड
    let speedY = !isBurst ? Math.random() * 2 + 2 : Math.random() * -10 - 5;
    let speedX = !isBurst ? Math.sin(posY) * 0.5 : (Math.random() * 12 - 6);
    
    let rot = Math.random() * 360;
    let rotSpeed = Math.random() * 4 - 2;

    function animate() {
        if (!isBurst) {
            posY += speedY;
            // हवा में झूलते हुए गिरने का इफ़ेक्ट
            posX += Math.sin(posY / 30) * 0.8; 
            item.style.left = posX + 'vw';
        } else {
            posY += speedY;
            speedY += 0.3; // ग्रेविटी इफ़ेक्ट
            posX += speedX;
            item.style.left = `calc(50% + ${posX * 4}px)`;
        }
        
        rot += rotSpeed;
        item.style.top = posY + 'px';
        item.style.transform = `rotateX(${rot}deg) rotateY(${rot / 2}deg) rotateZ(${rot}deg)`; // 3D रोटेशन

        // स्क्रीन से बाहर जाने पर डिलीट करें
        if (posY < window.innerHeight && posY > -100 && posX > -10 && posX < 110) {
            requestAnimationFrame(animate);
        } else {
            item.remove();
        }
    }
    requestAnimationFrame(animate);
}
