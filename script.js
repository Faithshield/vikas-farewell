// Define questions, answers, and corresponding pages for each image
const questionsAndAnswers = {
  1: { question: "How many meows did you hear before this pop-up?", answer: "52", page: "QAZMessage.html" },
  2: { question: "What does WJM wanna be?", answer: "ps", page: "MessageWSX.html" },
  3: { question: "What is the name of Shelley’s cat?", answer: "lulu", page: "RFVMessage.html" },
  4: { question: "What's the one thing Cindy tease you about the most?", answer: "alc", page: "MessageNHY.html" },
  5: { question: "What is Joey's favourite colour?", answer: "lilac", page: "MessageIJN.html" },
  6: { question: "What's the first nickname you gave Kimberly?", answer: "kimbers", page: "MessageBVC.html" }
};

let popupVisible = false; // Track if the popup is open
let musicPlaying = false; // Track if the music is currently playing

// Allow music to play after first user interaction (bypass autoplay restrictions)
document.body.addEventListener("click", () => {
  const music = document.getElementById('bg-music');
  music.muted = false;
  music.play().catch(err => console.log("Autoplay blocked:", err));
}, { once: true }); // Runs only once

// Function to start playing music and display popup on mouseover
function playMusic(id) {
  if (popupVisible) return; // Prevent changing the question if the popup is already open

  const music = document.getElementById('bg-music');

  // Reset and play music
  music.currentTime = 0;
  music.muted = false;
  music.play().then(() => {
    musicPlaying = true; // Track that music is playing
  }).catch(error => console.log("Autoplay prevented:", error));

  // Display the popup with the correct question
  const questionElement = document.getElementById('popup-question');
  questionElement.textContent = questionsAndAnswers[id].question;

  // Store the correct answer and the corresponding redirect page
  const popup = document.getElementById('popup');
  popup.setAttribute('data-answer', questionsAndAnswers[id].answer);
  popup.setAttribute('data-page', questionsAndAnswers[id].page);
}

// Function to stop the music on mouseleave
function stopMusic() {
  const music = document.getElementById('bg-music');

  if (!popupVisible && musicPlaying) { // Only stop if no popup is visible and music is actually playing
    music.pause();
    music.currentTime = 0; // Reset audio
    musicPlaying = false; // Track that music is stopped
  }
}

// Trigger the popup when the music ends
document.getElementById('bg-music').addEventListener('ended', function() {
  const popup = document.getElementById('popup');
  popup.style.display = 'block'; // Show the popup when music ends
  popupVisible = true; // Set popup flag
});

// Function to handle form submission
function submitAnswer() {
  const answer = document.getElementById('answer').value.trim().toLowerCase();
  const correctAnswer = document.getElementById('popup').getAttribute('data-answer');
  const redirectPage = document.getElementById('popup').getAttribute('data-page');

  console.log("User's answer:", answer);
  console.log("Correct answer:", correctAnswer);

  // Close popup regardless of correctness
  document.getElementById('popup').style.display = 'none';
  popupVisible = false; // Reset popup visibility flag

  if (answer === correctAnswer) {
    window.location.href = redirectPage; // Redirect to the correct farewell message page
  } else {
    alert("Incorrect answer. Please try again.");
  }
}
