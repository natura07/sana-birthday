function playBirthdayMusic() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audio = new AudioContext();

  const notes = [
    261.63, 261.63, 293.66, 261.63, 349.23, 329.63,
    261.63, 261.63, 293.66, 261.63, 392.00, 349.23
  ];

  let time = audio.currentTime;

  notes.forEach((frequency) => {
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();

    oscillator.frequency.value = frequency;
    oscillator.type = "sine";

    gain.gain.setValueAtTime(0.15, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.4);

    oscillator.connect(gain);
    gain.connect(audio.destination);

    oscillator.start(time);
    oscillator.stop(time + 0.4);

    time += 0.45;
  });
}

function createConfetti() {
  for (let i = 0; i < 80; i++) {
    const confetti = document.createElement("div");

    confetti.innerHTML = ["🎉", "🎊", "💖", "✨", "💕"][
      Math.floor(Math.random() * 5)
    ];

    confetti.style.position = "fixed";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.top = "-30px";
    confetti.style.fontSize = Math.random() * 20 + 15 + "px";
    confetti.style.zIndex = "9999";

    document.body.appendChild(confetti);

    const animation = confetti.animate(
      [
        { transform: "translateY(0) rotate(0deg)", opacity: 1 },
        {
          transform: "translateY(110vh) rotate(360deg)",
          opacity: 0
        }
      ],
      {
        duration: 3000,
        easing: "ease-out"
      }
    );

    animation.onfinish = () => confetti.remove();
  }
}

function showSurprise() {
  playBirthdayMusic();
  createConfetti();

  document.getElementById("surprise").innerHTML =
    "💖 You are a very special person! 💖<br><br>" +
    "🎉 Once again, Happy Birthday Sana! 🎂<br>" +
    "May all your dreams come true! ✨❤️";
}
