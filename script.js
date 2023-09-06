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
    let logo = document.getElementById("logo");
    logo.addEventListener('click', updateThemeColor);
  });
  