'use client';

const soundTexts = {
  coinFlip: 'coin-flip.mp3',
  dice: 'dice.mp3',
  flipcard: 'flipcard.mp3',
};

export type SoundName = keyof typeof soundTexts;

export const sounds: Map<SoundName, HTMLAudioElement> = new Map();

export const initSounds = () => {
  for (const [text, val] of Object.entries(soundTexts)) {
    const audio = new Audio('/audio/' + val);
    audio.volume = 1;
    sounds.set(text as SoundName, audio);
  }
};

export const playSound = (soundName: SoundName | undefined, isStop = false) => {
  if (!soundName) return;
  const currentSound = sounds.get(soundName);
  if (!currentSound) return;
  currentSound.pause();
  if (!isStop) {
    currentSound.currentTime = 0;
    currentSound.play();
  }
};
