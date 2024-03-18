const canvas = document.getElementById('canvas1'); // By default, this is set 300 x 150 px
const ctx = canvas.getContext('2d'); // All 2d Canvas drawing methods are now available in the ctx variable
const animationSelection = document.getElementById('animations');
// console.log('selection: ', selection.value);
let playerState = 'run';

animationSelection.addEventListener('change', function (e) {
    playerState = e.target.value;
})

// The drawImage method is what you'll be using for drawing images/sprites

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;
const spriteWidth = 6876 / 12; //Total Height of sprite divided by total number of sprite columns
const spriteHeight = 5230 / 10; //Total sprite-height divided by total number sprite columns

// Frame Animation Variables
let gameFrame = 0;
const staggerFrames = 5;
let maxFrames = 6;

const playerImage = new Image();
playerImage.src = './assets/shadow_dog.png';

// Advanced animation setup logic for production
const spriteAnimations = [];
const animationStates = [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'jump',
        frames: 7,
    },
    {
        name: 'fall',
        frames: 7,
    },
    {
        name: 'run',
        frames: 9,
    },
    {
        name: 'dizzy',
        frames: 11,
    },
    {
        name: 'sit',
        frames: 5,
    },
    {
        name: 'roll',
        frames: 7,
    },
    {
        name: 'bite',
        frames: 7,
    },
    {
        name: 'ko',
        frames: 12,
    },
    {
        name: 'getHit',
        frames: 4,
    },

];
animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    };
    for (let j = 0; j < state.frames; j++) {
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({ x: positionX, y: positionY });
    }
    spriteAnimations[state.name] = frames // Creates a key-value pair, where state.name refers to the key and loc: xx property refers to the value
});

// console.log(spriteAnimations['idle']);

// console.log('animationStates: ', animationStates);
// console.log('spriteAnimations: ', spriteAnimations);

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // ctx.drawImage(playerImage, sx, sy, sw, sh, dx, dy, dw, dh); // (image, sourceX, sourceY, sourceWidth, sourceHeight, displayX, displayY, ...)

    // Simple method for learning
    // ctx.drawImage(playerImage, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    // if (gameFrame % staggerFrames == 0) {
    //         if (frameX < 6) {
    //             frameX++;
    //         } else {
    //             frameX = 0;
    //         }
    // }

    let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length; // Cycles through spriteAnimations[playerState].loc.length by staggering (speed) via staggerFrames
    let frameX = spriteWidth * position
    let frameY = spriteAnimations[playerState].loc[position].y;

    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

    gameFrame++;
    requestAnimationFrame(animate);
};

animate();