// वेबसाइट खुलते ही लगातार फूल और दिल गिराने का एनीमेशन
document.addEventListener('DOMContentLoaded', () => {
    setInterval(createFallingFlowers, 300);
});

function createFallingFlowers() {
    const flower = document.createElement('div');
    // अलग-अलग सुंदर फूल और दिल के इमोजी
    const flowerTypes = ['🌹', '🌸', '🌺', '💖', '🌼', '🌷'];
    flower.innerHTML = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
    
    flower.style.position = 'fixed';
    flower.style.top = '-50px';
    // स्क्रीन पर रैंडम जगह से गिरेंगे
    flower.style.left = Math.random() * 100 + 'vw';
    // फूल छोटे-बड़े साइज के होंगे
    flower.style.fontSize = Math.random() * 20 + 20 + 'px'; 
    flower.style.zIndex = '1'; // यह कार्ड के पीछे तैरेंगे ताकि टेक्स्ट छुपा न रहे
    flower.style.pointerEvents = 'none';
    
    document.body.appendChild(flower);

    let posY = -50;
    let speed = Math.random() * 2 + 1.5; // गिरने की स्पीड
    let rot = Math.random() * 360; // घूमने का एंगल
    let rotSpeed = Math.random() * 2 - 1;

    function fall() {
        posY += speed;
        rot += rotSpeed;
        flower.style.top = posY + 'px';
        flower.style.transform = `rotate(${rot}deg)`;

        // स्क्रीन से बाहर जाने पर हटा दें
        if (posY < window.innerHeight) {
            requestAnimationFrame(fall);
        } else {
            flower.remove();
        }
    }
    requestAnimationFrame(fall);
}
