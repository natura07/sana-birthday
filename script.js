let audioContext;
let musicStarted = false;

function showSurprise() {
    // 1. स्क्रीन पर विश मैसेज दिखाने का आपका पुराना कोड
    document.getElementById("surprise").innerHTML = 
        "💖 You are a very special person! 💖<br><br>" + 
        "🎉 Once again, Happy Birthday Sana! 🎉<br>" + 
        "✨ May all your dreams come true! ✨❤️";
        
    // 2. कंफ़ेटी (कागज़ के टुकड़े उड़ाने) का लॉजिक
    createConfetti();

    // 3. हैप्पी बर्थडे म्यूजिक बजाने का लॉजिक
    playBirthdayMusic();
}

function playBirthdayMusic() {
    if (musicStarted) return;
    musicStarted = true;

    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // हैप्पी बर्थडे की धुन के नोट्स
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

function createConfetti() {
    for (let i = 0; i < 80; i++) {
        const confetti = document.createElement('div');
        confetti.innerHTML = ['🎉', '✨', '💖', '⭐', '🎈'][Math.floor(Math.random() * 5)];
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.top = "-30px";
        confetti.style.fontSize = Math.random() * 20 + 15 + "px";
        confetti.style.zIndex = "9999";
        confetti.style.pointerEvents = "none";
        
        document.body.appendChild(confetti);

        let positionY = -30;
        let speed = Math.random() * 3 + 2;
        let angle = Math.random() * 2;

        function fall() {
            positionY += speed;
            confetti.style.top = positionY + "px";
            confetti.style.transform = `rotate(${positionY + angle}deg)`;

            if (positionY < window.innerHeight) {
                requestAnimationFrame(fall);
            } else {
                confetti.remove();
            }
        }
        requestAnimationFrame(fall);
    }
}
