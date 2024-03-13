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

function updateThemeColor() {
  const randomHue = getRandomNumber(0, 360);
  const randomSat = getRandomNumber(0, 100) + "%";
  const randomLight = getRandomNumber(0, 100) + "%";
  const randomColor = selectColor(getRandomNumber(0, 360));
  const randomColor2 = selectColor(getRandomNumber(0, 360));

  // Set --theme-color-1
  root.style.setProperty('--theme-color-1', `${randomColor}`);

  // Set --theme-color-1-transparent with alpha 0.5
  const hslaColor = `hsla(${randomHue}, ${randomSat}, ${randomLight}, 0.5)`;
  root.style.setProperty('--theme-color-1-transparent', hslaColor);

  // Get the computed style of --theme-color-1
  const computedStyle = getComputedStyle(root);
  const themeColor1 = computedStyle.getPropertyValue('--theme-color-1');

  // Set --theme-color-4 using complementary color of --theme-color-1
  root.style.setProperty('--theme-color-4', hslToComplementary(randomHue,randomSat,randomLight));
}



// Call the updateThemeColor function initially to set the initial color when the page loads
updateThemeColor();


// function hslToComplementary(h, s, l) {
//   // Adjust the hue by 180 degrees
//   h = (h + 180) % 360;

//   return { h, s, l };
// }

function hslToComplementary(h, s, l, cssString = false) {
  // Adjust the hue by 180 degrees
  h = (h + 180) % 360;

  // Ensure the values are within the valid range
  h = (h < 0) ? 360 + h : h;
  s = Math.max(0, Math.min(100, s));
  l = Math.max(0, Math.min(100, l));

  // Return the HSL object or CSS color string based on the parameter
  return cssString ? `hsl(${h}, ${s}%, ${l}%)` : { h, s, l };
}


document.addEventListener('DOMContentLoaded', function () {
  // Function to handle image click event
  const handleImageClick = (element) => {
    // Prevent the default click behavior
    event.preventDefault();

    // Create overlay element
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    // Create image element in overlay
    const enlargedImage = document.createElement('img');
    enlargedImage.src = element.src; // Use the src of the clicked image directly
    overlay.appendChild(enlargedImage);

    // Check if dark mode is enabled and invert overlay image if necessary
    const isDarkMode = document.documentElement.classList.contains('dark-mode');
    if (isDarkMode) {
      enlargedImage.classList.add('negative');
      enlargedImage.style="background-color:rgba(255,255,255,0.8);"
    }

    // Append overlay to the body
    document.body.appendChild(overlay);

    // Show overlay
    overlay.style.display = 'flex';

    // Close overlay when clicked anywhere
    overlay.addEventListener('click', () => {
      overlay.style.display = 'none';
      // Remove overlay element
      overlay.remove();
    });
  };

  // Attach click event listener to elements with class "expand-img"
  document.querySelectorAll(".expand-img").forEach(element => {
    element.addEventListener('click', (event) => {
      // Check if the clicked element is an image
      if (event.target.tagName === 'IMG') {
        handleImageClick(event.target);
      }
      // Check if the clicked element contains an image
      else if (event.target.querySelector('img')) {
        handleImageClick(event.target.querySelector('img'));
      }
    });
  });
});




//original expand-shrink banner logic
// document.addEventListener('DOMContentLoaded', function () {
//   document.querySelectorAll(".expand-img").forEach(element => {
//     element.addEventListener('click', (event) => {
//       // Prevent the default click behavior
//       event.preventDefault();

//       // Get the banner element of the clicked image
//       const banner = element.closest('.exhibit-img-div-banner');

//       // Toggle 'expanded' class for the clicked element within its banner
//       element.classList.toggle('expanded');
//       element.classList.remove('shrink');

//       // Remove 'expanded' class from other elements within the same banner
//       banner.querySelectorAll(".expand-img").forEach(other => {
//         if (other != element) {
//           if(element.classList.contains("expanded")){
//             other.classList.remove('expanded');
//             other.classList.add('shrink');
//           } else {
//             other.classList.remove('expanded');
//             other.classList.remove('shrink');
//           }

//         }
//       });
//     });
//   });

  // Add event listener to close expanded images when clicking anywhere else on the page
//   document.addEventListener('click', (event) => {
//     if (!event.target.closest('.expand-img')) {
//       document.querySelectorAll(".expand-img").forEach(element => {
//         element.classList.remove('expanded');
//         element.classList.remove('shrink');
//       });
//     }
//   });
// });








document.addEventListener('DOMContentLoaded', function () {
  let themeButton = document.getElementById("toggle-theme");
  themeButton.addEventListener('click', updateThemeColor);
});


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

    const dashes = createDashes(arrowSize);
    let arrow = '>';
    let counter = arrowOffset;

    // Check for the direction-right class
    if (arrowDiv.classList.contains('direction-right')) {
      arrowDirection = 'right';
      arrow = '<';
    }

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



document.addEventListener('DOMContentLoaded', function () {
  const messages = ["Hello!", "hello!", "Hi!", "hi!", "howdy", "Hi", "¡hola!", "¡Hola!", "përshëndetje", "ሃይ", "أهلاً", "Ողջու՜յն", "নমস্কাৰ", "Kamisaki", "salam", "aw ni baara", "hi", "прывітанне", "ওহে", "एहो", "zdravo", "здрасти", "hola", "hi", "moni", "你好", "你好", "Salute", "bok", "Ahoj", "Hej", "އައްސަލާމް ޢަލައިކުމް", "नमस्ते", "Hoi", "hi", "saluton", "Tere", "Tere", "Alekee", "hi", "Hei", "Salut", "Hoi", "ola", "გამარჯობა", "Hi", "γεια", "Mba'éichapa", "હાય", "alo", "sannu", "Hui", "היי", "नमस्ते", "nyob zoo", "Szia", "hæ", "ndewo", "Hi", "Hai", "Haigh", "CIAO", "こんにちは", "hi", "ನಮಸ್ತೆ", "сәлем", "សួស្តី", "muraho", "हाय", "안녕", "kushɛ", "Merheba", "سڵاو", "Салам", "ສະບາຍດີ", "Salve", "Sveiki", "Mbote", "labas", "Nkulamusizza", "Salut", "здраво", "नमस्कार", "salut", "hai", "ഹായ്", "hi", "hi", "हाय", "ꯍꯥꯏ", "Chibai", "сайн уу", , "ဟိုင်း", "नमस्ते", "hei", "ନମସ୍କାର", "Akkam", "سلام", "سلام", "Cześć", "oi", "ਹੈਲੋ", "Allinllachu", "Bună", "привет", "malo", "नमस्कार", "Hi", "Thobela", "Здраво", "dumela", "Mhoro", "سلام", "හායි", "Ahoj", "živjo", "hi", "Hola", "hi", "habari", "Hej", "салом", "வணக்கம்", "сәлам", "హాయ్", "สวัสดี", "ሰላም", "Xewani", "MERHABA", "salam", "Hi", "Привіт", "ہیلو", "hi", "salom", "CHÀO", "helo", "Mholo", "הי", "hi", "sawubona"]
  const additionalContent = "->";
  const arrows = document.querySelectorAll('.arrowM');

  arrows.forEach(arrow => {
    const messageClass = arrow.classList[1];
    const customMessage = messageClass.split('message-')[1]; // Extract the message from class
    const size = parseInt(arrow.classList[2].split('-')[1]); // Extract size from class
    const offset = parseInt(arrow.classList[3].split('-')[1]); // Extract offset from class
    const speed = parseInt(arrow.classList[4].split('-')[1]); // Extract speed from class


    let animationFrame = offset;
    let currentMessage;
    if (customMessage != null) {
      currentMessage = customMessage;
    } else {
      currentMessage = messages[Math.floor(Math.random() * messages.length)] + additionalContent;
    }

    function animateMessage() {
      let frame = '';
      for (let i = 0; i < size; i++) {
        if (i >= animationFrame) {
          frame += currentMessage[i - animationFrame] || '-';
        } else {
          frame += '-';
        }
      }
      arrow.textContent = frame;
      animationFrame = (animationFrame + 1) % (size + 1);

      if (animationFrame === 0) {
        if (customMessage != null) {
          currentMessage = customMessage;
        } else {
          currentMessage = messages[Math.floor(Math.random() * messages.length)] + additionalContent;
        }
      }
    }

    setInterval(animateMessage, speed);
  });
});



// Function to toggle dark mode
function toggleDarkMode() {
  document.documentElement.classList.toggle('dark-mode');
  // Store the current mode in localStorage or sessionStorage
  const isDarkMode = document.documentElement.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
  document.querySelectorAll("*").forEach((e) => {
    if (e.classList.contains('uninvertable')) {
      e.classList.toggle('dark-mode');
    }
  })
  document.querySelectorAll("img").forEach((e) => {
    if (!e.classList.contains('invertable')) {
      e.classList.toggle('dark-mode');
    }
  })
  document.querySelectorAll('iframe').forEach((e)=>{
    if (!e.classList.contains('invertable')) {
      e.classList.toggle('dark-mode');
    }
  })
}

// Event listener for the toggle link
document.addEventListener('DOMContentLoaded', function () {
  const toggleLink = document.querySelector('#toggle-dark-mode');

  if (toggleLink) {
    toggleLink.addEventListener('click', function (event) {
      event.preventDefault();
      toggleDarkMode();
    });
  }

  // Check if dark mode was enabled on previous visit
  const isDarkMode = localStorage.getItem('darkMode');
  if (isDarkMode === 'true') {
    toggleDarkMode();
  }
});

