// HasthiPeel house constants. Shorts canvas.
export const W = 1080;
export const H = 1920;
export const FPS = 30;

// Shorts-safe frame: keep the signature overlay clear of YouTube's right rail
// (action buttons) and the bottom title/description block.
export const SAFE = {left: 64, right: 150, top: 150, bottom: 430} as const;

export const C = {
  cream: '#FFF6E6',
  ink: '#2A1A12',
  amber: '#FFB562',
} as const;
