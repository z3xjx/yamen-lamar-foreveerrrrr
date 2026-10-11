const numberEls = document.querySelectorAll('.stat-number');

const storyStartDate = new Date('2026-05-20T00:00:00');
const today = new Date();
const exactDays = Math.max(
  0,
  Math.floor((today - storyStartDate) / (1000 * 60 * 60 * 24))
);

const daysStat = document.querySelector('[data-stat="days"]');
if (daysStat) {
  daysStat.dataset.target = String(exactDays);
}

const animateCounter = (element) => {
  const target = Number(element.dataset.target || 0);
  const duration = 1500;
  const start = performance.now();

  const update = (currentTime) => {
    const progress = Math.min((currentTime - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(target * eased);
    element.textContent = value;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target;
    }
  };

  requestAnimationFrame(update);
};

const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const introScreen = document.getElementById('introScreen');
const audioElement = document.getElementById('loveAudio');
const musicToggle = document.getElementById('musicToggle');
const musicPrompt = document.getElementById('musicPrompt');
const musicConfirm = document.getElementById('musicConfirm');
const musicCancel = document.getElementById('musicCancel');

const showMusicPrompt = () => {
  if (musicPrompt) {
    musicPrompt.classList.remove('hidden');
  }
};

const hideMusicPrompt = () => {
  if (musicPrompt) {
    musicPrompt.classList.add('hidden');
  }
};

const startMusic = async () => {
  if (!audioElement) return;

  audioElement.muted = false;
  audioElement.volume = 1;

  try {
    await audioElement.play();
    if (musicToggle) {
      musicToggle.textContent = 'إيقاف الموسيقى';
    }
    hideMusicPrompt();
  } catch (error) {
    console.log('موسيقى الموقع بدأت لاحقًا عند تفاعل المستخدم');
    if (musicToggle) {
      musicToggle.textContent = 'تشغيل الموسيقى';
    }
  }
};

const stopMusic = () => {
  if (!audioElement) return;
  audioElement.pause();
  if (musicToggle) {
    musicToggle.textContent = 'تشغيل الموسيقى';
  }
};

if (introScreen) {
  setTimeout(() => {
    introScreen.classList.add('hidden');
    showMusicPrompt();
  }, 3000);
}

window.addEventListener('pointerdown', () => {
  if (!audioElement || !audioElement.paused) return;
  startMusic();
}, { once: true });

window.addEventListener('keydown', () => {
  if (!audioElement || !audioElement.paused) return;
  startMusic();
}, { once: true });

if (musicToggle) {
  musicToggle.addEventListener('click', () => {
    if (audioElement && !audioElement.paused) {
      stopMusic();
    } else {
      startMusic();
    }
  });
}

if (musicConfirm) {
  musicConfirm.addEventListener('click', () => {
    startMusic();
  });
}

if (musicCancel) {
  musicCancel.addEventListener('click', () => {
    hideMusicPrompt();
  });
}

window.addEventListener('load', () => {
  if (audioElement) {
    audioElement.volume = 1;
    audioElement.muted = false;
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.45 }
);

numberEls.forEach((numberEl) => observer.observe(numberEl));

