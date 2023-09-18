// Import functions for manipulating custom properties
import {
    incrementCustomProperty,
    setCustomProperty,
    getCustomProperty,
  } from "./updateCustomProperty.js"
  
  
  const dinoElem = document.querySelector("[data-dino]")
  // Constants defining the jump physics and animation parameters
  const JUMP_SPEED = 0.45
  const GRAVITY = 0.0015
  const DINO_FRAME_COUNT = 2
  const FRAME_TIME = 100
  
  // Variables to track the dinosaur's state and animation
  let isJumping
  let dinoFrame
  let currentFrameTime
  let yVelocity

  // Function to initialize the dinosaur character
  export function setupDino() {
    isJumping = false
    dinoFrame = 0
    currentFrameTime = 0
    yVelocity = 0
    setCustomProperty(dinoElem, "--bottom", 0)
    document.removeEventListener("keydown", onJump)
    document.addEventListener("keydown", onJump)
  }
  
  // Function to update the dinosaur's state and animation
  export function updateDino(delta, speedScale) {
    handleRun(delta, speedScale)
    handleJump(delta)
  }
  
  // Function to get the bounding rectangle of the dinosaur element
  export function getDinoRect() {
    return dinoElem.getBoundingClientRect()
  }
  
  // Function to set the dinosaur's lose state (used when the game ends)
  export function setDinoLose() {
    dinoElem.src = "imgs/dino-lose.png"
  }
  
  // Function to handle the running animation of the dinosaur
  function handleRun(delta, speedScale) {
    if (isJumping) {
      dinoElem.src = `imgs/dino-stationary.png`
      return
    }
  
    if (currentFrameTime >= FRAME_TIME) {
      dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT
      dinoElem.src = `imgs/dino-run-${dinoFrame}.png`
      currentFrameTime -= FRAME_TIME
    }
    currentFrameTime += delta * speedScale
  }
  
  // Function to handle the jumping physics of the dinosaur
  function handleJump(delta) {
    if (!isJumping) return
  
    incrementCustomProperty(dinoElem, "--bottom", yVelocity * delta)
  
    if (getCustomProperty(dinoElem, "--bottom") <= 0) {
      setCustomProperty(dinoElem, "--bottom", 0)
      isJumping = false
    }
  
    yVelocity -= GRAVITY * delta
  }
  // Function to handle the dinosaur's jump when the Spacebar is pressed
  function onJump(e) {
    if (e.code !== "Space" || isJumping) return
  
    yVelocity = JUMP_SPEED
    isJumping = true
  }