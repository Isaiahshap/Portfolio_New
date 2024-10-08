const LETTER_SPACING = 100;
const MAX_ROTATION = 30;
const MAX_SCALE = 1.5;
const MAX_SHADOW = 10;
const BOUNCE_DURATION = 500;
const HOVER_DISTANCE = 100;
const CLICK_DISTANCE = 200;

function calculateDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

export function initInteractiveText() {
  const letters = document.querySelectorAll('.interactive-letter');
  let rafId;

  function handleMouseMove(e) {
    if (rafId) {
      cancelAnimationFrame(rafId);
    }

    rafId = requestAnimationFrame(() => {
      const { clientX, clientY } = e;

      letters.forEach((letter) => {
        const rect = letter.getBoundingClientRect();
        const letterCenterX = rect.left + rect.width / 2;
        const letterCenterY = rect.top + rect.height / 2;

        const distance = calculateDistance(clientX, clientY, letterCenterX, letterCenterY);

        if (distance < HOVER_DISTANCE) {
          const angle = Math.atan2(letterCenterY - clientY, letterCenterX - clientX);
          const push = 1 - distance / HOVER_DISTANCE;
          const rotationAngle = MAX_ROTATION * push;
          const scale = 1 + (MAX_SCALE - 1) * push;

          letter.style.transform = `
            translate(${Math.cos(angle) * push * 20}px, ${Math.sin(angle) * push * 20}px)
            rotate(${rotationAngle}deg)
            scale(${scale})
          `;
        } else {
          letter.style.transform = 'translate(0, 0) rotate(0deg) scale(1)';
        }
      });
    });
  }

  document.addEventListener('mousemove', handleMouseMove);
}