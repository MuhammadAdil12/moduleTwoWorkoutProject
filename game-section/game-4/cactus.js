// Import functions for manipulating custom properties
import {
  setCustomProperty,
  incrementCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

// Constants for cactus speed and spawn intervals
const SPEED = 0.05
const CACTUS_INTERVAL_MIN = 500
const CACTUS_INTERVAL_MAX = 2500
const worldElem = document.querySelector("[data-world]")

// DOM element representing the game world
let nextCactusTime

// Initialize the time for the next cactus spawn
export function setupCactus() {
  nextCactusTime = CACTUS_INTERVAL_MIN
  // Remove existing cactus elements
  document.querySelectorAll("[data-cactus]").forEach(cactus => {
    cactus.remove()
  })
}

// Function to update cactus positions and spawn new cacti
export function updateCactus(delta, speedScale) {
  // Update the position of existing cactus elements
  document.querySelectorAll("[data-cactus]").forEach(cactus => {
     // Increment the left custom property to move cacti to the left
    incrementCustomProperty(cactus, "--left", delta * speedScale * SPEED * -1)
     // Remove cactus elements that are out of the game area
    if (getCustomProperty(cactus, "--left") <= -100) {
      cactus.remove()
    }
  })

   // Check if it's time to spawn a new cactus
  if (nextCactusTime <= 0) {
    createCactus()
    // Calculate the next spawn time based on speed scale
    nextCactusTime =
      randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedScale
  }
  nextCactusTime -= delta
}

// Function to get the bounding rectangles of all cactus elements
export function getCactusRects() {
  return [...document.querySelectorAll("[data-cactus]")].map(cactus => {
    return cactus.getBoundingClientRect()
  })
}

// Function to create a new cactus element and add it to the world
function createCactus() {
  const cactus = document.createElement("img")
  cactus.dataset.cactus = true
  cactus.src = "imgs/cactus.png"
  cactus.classList.add("cactus")
  setCustomProperty(cactus, "--left", 100)
  worldElem.append(cactus)
}

// Function to generate a random number between min and max (inclusive)
function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}