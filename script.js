// Get the root element to access CSS variables
const root = document.documentElement;

// Function to generate a random number between min and max
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function selectColor(number) {
    const hue = number * 137.508; // use golden angle approximation
    return `hsl(${hue},50%,55%)`;
}

// Update the hue value of --theme-color-1
function updateThemeColor() {
    const randomHue = getRandomNumber(0, 360); // Generating a random hue value between 0 and 360
    const randomSat = getRandomNumber(0, 100) + "%"; // Generating a random hue value between 0 and 360
    const randomLight = getRandomNumber(0, 100) + "%"; // Generating a random hue value between 0 and 360
    const randomColor = selectColor(getRandomNumber(0,360));
    const randomColor2 = selectColor(getRandomNumber(0,360));
    // const randomColor = selectColor(3);
    // root.style.setProperty('--theme-color-1', `hsl(${randomHue}, ${randomSat}, ${randomLight})`);
    root.style.setProperty('--theme-color-1', `${randomColor}`);
    // root.style.setProperty('--theme-color-2', `${randomColor2}`);
}

// Call the updateThemeColor function initially to set the initial color when the page loads
updateThemeColor();



document.addEventListener('DOMContentLoaded', function () {
    // Get all elements with the class "arrow"
    const arrowDivs = document.querySelectorAll('.arrow');
    
    // Define the default arrow size, offset, and speed
    const defaultSize = 5;
    const defaultOffset = 0;
    const defaultSpeed = 200; // Default speed in milliseconds
  
    // Function to create a string of dashes
    function createDashes(size) {
      let dashes = '';
      for (let i = 0; i < size; i++) {
        dashes += '-';
      }
      return dashes;
    }
    
    // Function to animate the arrow
    function animateArrow(arrowDiv) {
      // Get the size, offset, speed, and direction from the arrow's class
      let arrowSize = defaultSize;
      let arrowOffset = defaultOffset;
      let arrowSpeed = defaultSpeed;
      let arrowDirection = 'left'; // Default direction is left-to-right
  
      // Check for the size class
      const sizeClass = Array.from(arrowDiv.classList).find(className => className.startsWith('size-'));
      if (sizeClass) {
        arrowSize = parseInt(sizeClass.replace('size-', ''), 10);
      }
  
      // Check for the offset class
      const offsetClass = Array.from(arrowDiv.classList).find(className => className.startsWith('offset-'));
      if (offsetClass) {
        arrowOffset = parseInt(offsetClass.replace('offset-', ''), 10);
      }
  
      // Check for the speed class
      const speedClass = Array.from(arrowDiv.classList).find(className => className.startsWith('speed-'));
      if (speedClass) {
        arrowSpeed = parseInt(speedClass.replace('speed-', ''), 10);
      }
  
      // Check for the direction-right class
      if (arrowDiv.classList.contains('direction-right')) {
        arrowDirection = 'right';
      }
  
      const dashes = createDashes(arrowSize);
      let arrow = '>';
      let counter = arrowOffset;
  
      // Set an interval to update the arrow animation
      const intervalId = setInterval(() => {
        if (arrowDirection === 'left') {
          if (counter === arrowSize) {
            counter = 0; // Reset the counter to the first dash
          }
          arrowDiv.textContent = dashes.substring(0, counter) + arrow + dashes.substring(counter + 1);
          counter++;
        } else if (arrowDirection === 'right') {
          if (counter === -1) {
            counter = arrowSize - 1; // Reset the counter to the last dash
          }
          arrowDiv.textContent = dashes.substring(0, counter) + arrow + dashes.substring(counter + 1);
          counter--;
        }
      }, arrowSpeed); // Use the specified speed for the animation
    }
  
    // Call the animateArrow function for each arrow
    arrowDivs.forEach(animateArrow);
  });
  