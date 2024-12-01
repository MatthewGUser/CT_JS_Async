
// Function to create an MD5 hash (this one doesn't rely on external libraries)
function md5(str) {
  var hash = 0, i, chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash.toString(16);
}

// Fetch characters from Marvel API
const fetchCharacters = async () => {
  const publicKey = '02246446ff7cb77dcc87a552de8700a1';
  const privateKey = 'f7a03dbd814218a637d08905e2bd16f348dd80ec';
  const timestamp = new Date().getTime();  // Generate a timestamp (current time)

  // Create the hash using timestamp, publicKey, and privateKey
  const hash = md5(timestamp + privateKey + publicKey);

  const url = `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

  console.log(`Making request to URL: ${url}`); // Debugging the final request URL

  try {
    // Make the API request
    const response = await fetch(url);

    // Check if the response is OK (status code 200)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON response
    const data = await response.json();
    console.log('Response Data:', data); // Log the response for debugging

    // Check if the response contains character data
    if (data.data && data.data.results) {
      return data.data.results; // Return the list of characters
    } else {
      throw new Error('No characters found in the response');
    }
  } catch (error) {
    console.error('Error fetching data:', error); // Log the error
    alert('Failed to fetch Marvel characters. Please check the console for errors.');
  }
};

// Handle button click event to fetch characters
document.getElementById('fetch-characters-btn').addEventListener('click', async () => {
  const characters = await fetchCharacters();

  if (characters) {
    console.log('Fetched Characters:', characters);
    // You can add logic here to display the characters on your page
  }
});

// Countdown Timer
const countdownTimer = (duration) => {
  let timeLeft = duration;

  const intervalId = setInterval(() => {
    document.getElementById('timer-display').textContent = `Time remaining: ${timeLeft}s`;
    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(intervalId);
      document.getElementById('timer-display').textContent = 'Time is up!';
    }
  }, 1000);
};

// Handle Start Timer Button Click
document.getElementById('start-timer-btn').addEventListener('click', () => {
  const duration = document.getElementById('timer-duration').value;
  if (duration) {
    countdownTimer(duration);
  }
});

// Show Delayed Notification
const showDelayedNotification = () => {
  setTimeout(() => {
    alert('This is your delayed notification!');
  }, 5000);
};

// Handle Delayed Notification Button Click
document.getElementById('delayed-notification-btn').addEventListener('click', showDelayedNotification);

// Repeat Notifications
const repeatNotification = () => {
  const intervalId = setInterval(() => {
    alert('This is a repeated notification!');
  }, 3000);

  // Stop repeat after 15 seconds
  setTimeout(() => clearInterval(intervalId), 15000);
};

// Handle Repeat Notification Button Click
document.getElementById('repeat-notification-btn').addEventListener('click', repeatNotification);
