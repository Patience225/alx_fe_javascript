// script.js

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

  // Display the quote and its category
  document.getElementById("quoteDisplay").innerHTML = `
    <blockquote>"${quote.text}"</blockquote>
    <p>— Category: ${quote.category}</p>
  `;
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

/**
 * Dynamically creates the form for adding new quotes and appends it to the DOM.
 */
function createAddQuoteForm() {
  // Create a container for the form
  const formContainer = document.createElement("div");
  formContainer.id = "addQuoteForm";
  
  // Create a heading for the form
  const formHeading = document.createElement("h2");
  formHeading.textContent = "Add a New Quote";
  formContainer.appendChild(formHeading);

  // Create input for quote text
  const quoteTextInput = document.createElement("input");
  quoteTextInput.id = "newQuoteText";
  quoteTextInput.type = "text";
  quoteTextInput.placeholder = "Enter a new quote";
  formContainer.appendChild(quoteTextInput);

  // Create input for quote category
  const quoteCategoryInput = document.createElement("input");
  quoteCategoryInput.id = "newQuoteCategory";
  quoteCategoryInput.type = "text";
  quoteCategoryInput.placeholder = "Enter quote category";
  formContainer.appendChild(quoteCategoryInput);

  // Create button for adding quote
  const addQuoteButton = document.createElement("button");
  addQuoteButton.id = "addQuoteButton";
  addQuoteButton.textContent = "Add Quote";
  // Attach the addQuote event listener to this button
  addQuoteButton.addEventListener("click", addQuote);
  formContainer.appendChild(addQuoteButton);

  // Append the entire form container to the body or a specific container element
  document.body.appendChild(formContainer);
}

// Wait for the DOM to be fully loaded before attaching event listeners and creating dynamic content.
document.addEventListener("DOMContentLoaded", () => {
  // Create the add-quote form dynamically
  createAddQuoteForm();

  // Attach event listener to the "Show New Quote" button
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);

  // Optionally, show an initial random quote on page load
  showRandomQuote();
});
