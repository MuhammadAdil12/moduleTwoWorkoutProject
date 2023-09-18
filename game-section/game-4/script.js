// Import functions and variables from external modules
import { updateGround, setupGround } from "./ground.js"
import { updateDino, setupDino, getDinoRect, setDinoLose } from "./dino.js"
import { updateCactus, setupCactus, getCactusRects } from "./cactus.js"

// Constants defining the game world dimensions and speed scale increase
const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const SPEED_SCALE_INCREASE = 0.00001

// DOM elements for the game
const worldElem = document.querySelector("[data-world]")
const scoreElem = document.querySelector("[data-score]")
const startScreenElem = document.querySelector("[data-start-screen]")

// Function to set the pixel-to-world scale and handle window resizing
setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale)
document.addEventListener("keydown", handleStart, { once: true })

// Variables to track game state
let lastTime
let speedScale
let score

// The game update loop
function update(time) {
  // If it's the first frame, initialize lastTime and start the animation loop
  if (lastTime == null) {
    lastTime = time
    window.requestAnimationFrame(update)
    return
  }
  const delta = time - lastTime

  // Update game elements based on time and speed scale
  updateGround(delta, speedScale)
  updateDino(delta, speedScale)
  updateCactus(delta, speedScale)
  updateSpeedScale(delta)
  updateScore(delta)

  // Check for collisions with cactus, if any, end the game
  if (checkLose()) return handleLose()

   // Update lastTime for the next frame and request the next animation frame
  lastTime = time
  window.requestAnimationFrame(update)
}

// Function to check if the dino has collided with a cactus
function checkLose() {
  const dinoRect = getDinoRect()
  return getCactusRects().some(rect => isCollision(rect, dinoRect))
}

// Function to check if two rectangles are colliding
function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  )
}

// Function to update the speed scale of the game
function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE
}

// Function to update the player's score
function updateScore(delta) {
  score += delta * 0.01
  scoreElem.textContent = Math.floor(score)
}

// Function to handle the game start
function handleStart() {
  lastTime = null
  speedScale = 1
  score = 0
  setupGround()
  setupDino()
  setupCactus()
  startScreenElem.classList.add("hide")
  window.requestAnimationFrame(update)
}

// Function to handle the game over state
function handleLose() {
  setDinoLose()
  setTimeout(() => {
    document.addEventListener("keydown", handleStart, { once: true })
    startScreenElem.classList.remove("hide")
  }, 100)
}

// Function to set the pixel-to-world scale for the game world
function setPixelToWorldScale() {
  let worldToPixelScale
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH
  } else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT
  }

  worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
  worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
}

document.addEventListener("DOMContentLoaded", function () {
  const isAuthenticated = localStorage.getItem("isLoggedIn");
  const accountLink = document.getElementById("account-icon");

  if (isAuthenticated === 'true') {
      // User is logged in, show the account page
      accountLink.href = "/account-section/main-account-section/index.html";
  } else {
      // User is not logged in, show the make an account page
      accountLink.href = "/account-section/index.html";
  }
});
