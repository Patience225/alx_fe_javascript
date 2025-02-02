// Global array to store quotes
let quotes = [];

/**
 * Saves the current quotes array to localStorage.
 */
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

/**
 * Loads quotes from localStorage. If none exist, load sample quotes.
 */
function loadQuotes() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  } else {
    // If no quotes in storage, initialize with some sample quotes.
    quotes = [
      { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
      { text: "Life is what happens when you're busy making other plans.", category: "Life" },
      { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", category: "Individuality" }
    ];
    saveQuotes();
  }
}

/**
 * Displays a random quote from the quotes array in the #quoteDisplay element.
 * Also saves the displayed quote in sessionStorage.
 */
function showRandomQuote() {
  if (quotes.length === 0) {
    document.getElementById("quoteDisplay").textContent = "No quotes available!";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  // Display the quote and its category
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = `
    <blockquote>"${quote.text}"</blockquote>
    <p>— Category: ${quote.category}</p>
  `;

  // Save the last displayed quote in sessionStorage
  sessionStorage.setItem('lastQuote', JSON.stringify(quote));
}

/**
 * Adds a new quote to the quotes array based on user input.
 */
function addQuote() {
  const quoteTextInput = document.getElementById("newQuoteText");
  const quoteCategoryInput = document.getElementById("newQuoteCategory");

  const text = quoteTextInput.value.trim();
  const category = quoteCategoryInput.value.trim();

  if (!text || !category) {
    alert("Please enter both a quote and a category.");
    return;
  }

  const newQuote = { text, category };
  quotes.push(newQuote);
  saveQuotes();

  quoteTextInput.value = "";
  quoteCategoryInput.value = "";

  alert("Quote added successfully!");
}

/**
 * Dynamically creates the form for adding new quotes and appends it to the DOM.
 */
function createAddQuoteForm() {
  const formContainer = document.createElement("div");
  formContainer.id = "addQuoteForm";

  const formHeading = document.createElement("h2");
  formHeading.textContent = "Add a New Quote";
  formContainer.appendChild(formHeading);

  const quoteTextInput = document.createElement("input");
  quoteTextInput.id = "newQuoteText";
  quoteTextInput.type = "text";
  quoteTextInput.placeholder = "Enter a new quote";
  formContainer.appendChild(quoteTextInput);

  const quoteCategoryInput = document.createElement("input");
  quoteCategoryInput.id = "newQuoteCategory";
  quoteCategoryInput.type = "text";
  quoteCategoryInput.placeholder = "Enter quote category";
  formContainer.appendChild(quoteCategoryInput);

  const addQuoteButton = document.createElement("button");
  addQuoteButton.id = "addQuoteButton";
  addQuoteButton.textContent = "Add Quote";
  addQuoteButton.addEventListener("click", addQuote);
  formContainer.appendChild(addQuoteButton);

  document.body.appendChild(formContainer);
}

/**
 * Creates and adds buttons for exporting and importing JSON data.
 */
function createImportExportButtons() {
  const container = document.createElement("div");
  container.id = "jsonActions";

  // Export Button
  const exportButton = document.createElement("button");
  exportButton.id = "exportButton";
  exportButton.textContent = "Export Quotes as JSON";
  exportButton.addEventListener("click", exportQuotesAsJson);
  container.appendChild(exportButton);

  // Import File Input
  const importInput = document.createElement("input");
  importInput.type = "file";
  importInput.id = "importFile";
  importInput.accept = ".json";
  importInput.addEventListener("change", importFromJsonFile);
  container.appendChild(importInput);

  document.body.appendChild(container);
}

/**
 * Exports the quotes array as a downloadable JSON file.
 */
function exportQuotesAsJson() {
  const jsonString = JSON.stringify(quotes, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Imports quotes from a selected JSON file.
 * Updates the quotes array and saves to localStorage.
 */
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid JSON format: Expected an array of quotes.");
      }
    } catch (error) {
      alert("Error parsing JSON file: " + error.message);
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

/**
 * Checks sessionStorage for a last viewed quote and displays it if found.
 */
function displayLastViewedQuote() {
  const lastQuoteString = sessionStorage.getItem('lastQuote');
  if (lastQuoteString) {
    const lastQuote = JSON.parse(lastQuoteString);
    document.getElementById("quoteDisplay").innerHTML = `
      <blockquote>"${lastQuote.text}"</blockquote>
      <p>— Category: ${lastQuote.category} (Last Viewed)</p>
    `;
  }
}

// Initialize the app once the DOM is fully loaded.
document.addEventListener("DOMContentLoaded", () => {
  // Load quotes from local storage (or initialize with sample quotes)
  loadQuotes();

  // Create and attach the Add Quote form
  createAddQuoteForm();

  // Create and attach JSON import/export buttons
  createImportExportButtons();

  // Attach event listener to the "Show New Quote" button
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);

  // Display last viewed quote from session storage if available,
  // otherwise show a random quote.
  if (sessionStorage.getItem('lastQuote')) {
    displayLastViewedQuote();
  } else {
    showRandomQuote();
  }
});
