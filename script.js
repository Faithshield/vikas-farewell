// Define questions, answers, and corresponding pages for each image
const questionsAndAnswers = {
  1: { question: "What is the ML model we discovered while doing PRP?", answer: "isolation forest", page: "CkMessage.html" },
  2: { question: "What does WJM wanna be?", answer: "ps", page: "JinMinMessage.html" },
  3: { question: "What is the name of Shelley’s cat?", answer: "lulu", page: "ShelleyMessage.html" },
  4: { question: "What's the one thing Cindy tease you about the most?", answer: "alc", page: "CindyMessage.html" },
  5: { question: "What is Joey's favourite colour?", answer: "lilac", page: "JoeyMessage.html" },
  6: { question: "What's the first nickname you gave Kimberly?", answer: "kimbers", page: "KimberlyMessage.html" }
};

// Function to start playing music on mouseover
function playMusic(id) {
  const music = document.getElementById('bg-music');
  
  // Start playing the music and unmute
  if (music.paused) {
    music.play(); // Play the audio
    music.muted = false; // Unmute the audio when it starts
  }

  // Get the question associated with this image and display it in the popup
  const questionElement = document.getElementById('popup-question');
  questionElement.textContent = questionsAndAnswers[id].question;

  // Store the answer and page associated with this image
  const popup = document.getElementById('popup');
  popup.setAttribute('data-answer', questionsAndAnswers[id].answer);
  popup.setAttribute('data-page', questionsAndAnswers[id].page);
}

// Function to stop the music on mouseleave
function stopMusic() {
  const music = document.getElementById('bg-music');
  music.pause();           // Pause the music
  music.currentTime = 0;   // Reset the audio to the start
}

// Trigger the popup when the music ends
document.getElementById('bg-music').addEventListener('ended', function() {
  const popup = document.getElementById('popup');
  popup.style.display = 'block'; // Show the popup when music ends
});

// Function to handle form submission
function submitAnswer() {
  const answer = document.getElementById('answer').value.trim().toLowerCase(); // Get answer and make it lowercase
  const popup = document.getElementById('popup');
  const correctAnswer = popup.getAttribute('data-answer'); // Get the correct answer
  const targetPage = popup.getAttribute('data-page'); // Get the corresponding page

  // Debugging output to the console
  console.log("User's answer:", answer);
  console.log("Correct answer:", correctAnswer);

  // Compare the user's answer with the correct answer
  if (answer === correctAnswer) {
    // Redirect to the corresponding farewell message page
    window.location.href = targetPage;
  } else {
    alert("Incorrect answer. Please try again."); // Alert if the answer is incorrect
  }
}