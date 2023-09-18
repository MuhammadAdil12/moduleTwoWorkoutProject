// Import functions for manipulating custom properties
import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js"

// Constant defining the speed of the ground movement
const SPEED = 0.05
const groundElems = document.querySelectorAll("[data-ground]")

// Function to set up the initial positions of ground elements
export function setupGround() {
   // Set the initial left positions of the ground elements
  setCustomProperty(groundElems[0], "--left", 0)
  setCustomProperty(groundElems[1], "--left", 300)
}

// Function to update the positions of the ground elements
export function updateGround(delta, speedScale) {
   // Update the left positions of each ground element
  groundElems.forEach(ground => {
    incrementCustomProperty(ground, "--left", delta * speedScale * SPEED * -1)

    // Reset the left position when the ground element moves out of view
    if (getCustomProperty(ground, "--left") <= -300) {
      incrementCustomProperty(ground, "--left", 600)
    }
  })
}