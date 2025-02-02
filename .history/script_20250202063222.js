

// An array to store quotes. Initially, add a few sample quotes.
let quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", category: "Individuality" }
];

/**
 * Displays a random quote from the quotes array in the #quoteDisplay element.
 */
function showRandomQuote() {
  if (quotes.length === 0) {
    document.getElementById("quoteDisplay").textContent = "No quotes available!";
    return;
  }

  // Generate a random index
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  // Display the quote and its category (if you want to show category)
  document.getElementById("quoteDisplay").innerHTML = `<blockquote>"${quote.text}"</blockquote><p>— Category: ${quote.category}</p>`;
}

/**
 * Adds a new quote to the quotes array based on user input.
 */
function addQuote() {
  // Get the values from the input fields
  const quoteTextInput = document.getElementById("newQuoteText");
  const quoteCategoryInput = document.getElementById("newQuoteCategory");

  const text = quoteTextInput.value.trim();
  const category = quoteCategoryInput.value.trim();

  // Validate input: Make sure neither field is empty
  if (!text || !category) {
    alert("Please enter both a quote and a category.");
    return;
  }

  // Create a new quote object and push it into the quotes array
  const newQuote = { text, category };
  quotes.push(newQuote);

  // Clear the input fields for a better user experience
  quoteTextInput.value = "";
  quoteCategoryInput.value = "";

  // Optionally, display a confirmation or refresh the quote display
  alert("Quote added successfully!");
}

// Add event listeners after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Attach click event to show a new random quote
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);

  // Attach click event to add a new quote
  document.getElementById("addQuoteButton").addEventListener("click", addQuote);

  // Optionally, show an initial quote on page load
  showRandomQuote();
});
