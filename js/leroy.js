const leroyImgSprite = "/images/leroy-sprite.png"
const SPRITE_CONFIG = {
    frames: 4,
    frameWidth: 34,
    frameHeight: 34,
    animationSpeed: 100/1000,
    spriteSheet: leroyImgSprite
};

// Mascot state variables
let mascotX = 0;
let mascotY = 0;
let targetX = window.innerWidth / 3;
let targetY = window.innerHeight / 2;
let currentMouseX = 0;
let currentMouseY = 0;
let currentFrame = 0;
let isFlipped = false; // Track if mascot is flipped

const MOVE_INTERVAL = 15;
const EASING = 1; // Lower value = slower movement

function setupEventListeners(mascot) {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);
}

function handleMouseMove(e) {
    currentMouseX = e.clientX;
    currentMouseY = e.clientY;
}

// Handle click event
function handleClick(e) {
    targetX = e.clientX;
    targetY = e.clientY;
}

let lastMoveDt = 0;
let lastMoveX = 0;
let lastMoveY = 0;
function moveEvery5Seconds(mascot, dt) {
    lastMoveDt += dt;
    if (lastMoveDt >= MOVE_INTERVAL) {
        lastMoveDt = 0;
        if (Math.abs(lastMoveX - mascotX) > 10 || Math.abs(lastMoveY - mascotY) > 10) {
            const directionX = Math.random() > 0.5 ? 1 : -1;
            targetX = mascotX + 70 * directionX;
            
            // Flip the mascot based on movement direction
            isFlipped = directionX < 0;
            mascot.style.transform = isFlipped ? 'translate(-50%, -50%) scaleX(-1)' : 'translate(-50%, -50%) scaleX(1)';
        }
        lastMoveX = mascotX;
        lastMoveY = mascotY;
    }
}

// Update mascot position with easing
function updateMascotPosition(mascot, dt) {
    mascotX += (targetX - mascotX) * EASING * dt;
    mascotY += (targetY - mascotY) * EASING * dt;
    if (Math.abs(mascotX - targetX) < 10 && Math.abs(mascotY - targetY) < 10) {
    }
    if (mascotX > window.innerWidth || mascotX < 0) {
        targetX = window.innerWidth / 2;
    }
    if (mascotY > window.innerHeight || mascotY < 0) {
        targetY = window.innerHeight / 2;
    }
}

function drawMascot(mascot, dt) {
    mascot.style.left = mascotX + 'px';
    mascot.style.top = mascotY + 'px';
}

let lastAnimationDt = 0;
function updateSpriteAnimation(mascot, dt) {
    // Check if it's time to update the frame
    lastAnimationDt += dt;
    if (lastAnimationDt >= SPRITE_CONFIG.animationSpeed) {
        lastAnimationDt = 0;
        currentFrame = (currentFrame + 1) % SPRITE_CONFIG.frames;
        const bgPositionX = currentFrame * SPRITE_CONFIG.frameWidth;
        mascot.style.backgroundPosition = `-${bgPositionX}px 0`;
    }
}

let prevFrameTime = Date.now();
function ticker(mascot) {
    const currentTime = Date.now();
    const dt = (currentTime - prevFrameTime) / 1000;
    prevFrameTime = currentTime;
    updateMascotPosition(mascot, dt);
    moveEvery5Seconds(mascot, dt);
    updateSpriteAnimation(mascot, dt);
    drawMascot(mascot, dt);
    requestAnimationFrame(() => ticker(mascot));
}

function createMascotElement(spriteConfig) {
    const mascot = document.createElement('div');
    mascot.id = 'cursor-mascot';
    const style = document.createElement('style');
    style.textContent = `
        #cursor-mascot {
            position: fixed;
            width: ${spriteConfig.frameWidth}px;
            height: ${spriteConfig.frameHeight}px;
            background-image: url('${spriteConfig.spriteSheet}');
            background-repeat: no-repeat;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: transform 0.1s ease;
        }
    `;
    document.head.appendChild(style);
    return mascot;
}

function initMascot() {
    const mascot = createMascotElement(SPRITE_CONFIG);
    document.body.appendChild(mascot);
    setupEventListeners(mascot);
    ticker(mascot);
}

document.addEventListener('DOMContentLoaded', initMascot);