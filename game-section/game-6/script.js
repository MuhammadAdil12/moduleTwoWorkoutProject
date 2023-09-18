window.addEventListener('load', () => {
    const sounds = document.querySelectorAll(".sound");
    const pads = document.querySelectorAll(".pads div");
    const randomSoundButton = document.getElementById('randomSoundButton');


    // The sounds
   pads.forEach((pad, index) => {
    pad.addEventListener('click', function() {
        sounds[index].currentTime = 0
        sounds[index].play(); // Play the corresponding sound   

        changeBackgroundColor(); 
    })
   })

   function changeBackgroundColor() {
    // Generate a random color
    const randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
    
    // Apply the random color to the body background
    document.body.style.backgroundColor = randomColor;
}

randomSoundButton.addEventListener('click', function() {
    // Get a random index within the range of your sound array
    const randomIndex = Math.floor(Math.random() * sounds.length);
    
    // Play the random sound
    sounds[randomIndex].currentTime = 0;
    sounds[randomIndex].play();
});


document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    // Define a mapping of keys to corresponding pad indices
    const keyIndex = {
        'd': 0,
        'f': 1,
        'g': 2,
        'h': 3,
        'j': 4,
        'k': 5
    };
    // Check if the pressed key is in the mapping
    if (keyIndex.hasOwnProperty(key)) {
        const padIndex = keyIndex[key];
        sounds[padIndex].currentTime = 0;
        sounds[padIndex].play();
        changeBackgroundColor();
    }
});
});