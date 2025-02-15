// script.js

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
    // Initialize with sample quotes if not found in storage.
    quotes = [
      { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
      { text: "Life is what happens when you're busy making other plans.", category: "Life" },
      { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", category: "Individuality" }
    ];
    saveQuotes();
  }
}

/**
 * Displays quotes based on the currently selected filter.
 * If no filter is selected or "all" is chosen, displays a random quote.
 */
function filterQuotes() {
  const filterSelect = document.getElementById("categoryFilter");
  const selectedCategory = filterSelect.value;

  // Save the selected category to local storage
  localStorage.setItem('selectedCategory', selectedCategory);

  // If "all" is selected, show a random quote.
  if (selectedCategory === "all") {
    showRandomQuote();
    return;
  }

  // Filter quotes by the selected category
  const filteredQuotes = quotes.filter(q => q.category === selectedCategory);
  
  // Update the display area with the filtered quotes or a message if none match.
  const quoteDisplay = document.getElementById("quoteDisplay");
  if (filteredQuotes.length > 0) {
    // Display the first filtered quote (you could extend this to show multiple quotes or a random one)
    const quote = filteredQuotes[0];
    quoteDisplay.innerHTML = `
      <blockquote>"${quote.text}"</blockquote>
      <p>— Category: ${quote.category}</p>
    `;
  } else {
    quoteDisplay.textContent = "No quotes available for the selected category.";
  }
}

/**
 * Populates the category filter dropdown with unique categories from the quotes array.
 */
function populateCategories() {
  const filterSelect = document.getElementById("categoryFilter");

  // Extract unique categories using map and Set
  const categories = [...new Set(quotes.map(q => q.category))];
  
  // Remove any options except for "All Categories"
  filterSelect.innerHTML = '<option value="all">All Categories</option>';
  
  // Create and append an option for each unique category
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    filterSelect.appendChild(option);
  });

  // Restore the last selected category if available
  const lastSelected = localStorage.getItem('selectedCategory');
  if (lastSelected) {
    filterSelect.value = lastSelected;
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
 * Also updates the category dropdown if a new category is introduced.
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

  // Clear the input fields after adding the quote
  quoteTextInput.value = "";
  quoteCategoryInput.value = "";

  // Update the category filter options
  populateCategories();

  alert("Quote added successfully!");
}

/**
 * Dynamically creates the form for adding new quotes and appends it to #addQuoteContainer.
 */
function createAddQuoteForm() {
  const formContainer = document.getElementById("addQuoteContainer");

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
}

/**
 * Exports the quotes array as a downloadable JSON file.
 * This function name now matches the expected exportToJsonFile.
 */
function exportToJsonFile() {
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
        // Update category dropdown in case new categories were added.
        populateCategories();
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
  
  // Populate the category filter dropdown
  populateCategories();

  // Create and attach the Add Quote form
  createAddQuoteForm();

  // Attach event listener to the "Show New Quote" button
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);

  // Attach event listener to the "Export Quotes" button (from index.html)
  document.getElementById("exportQuotesButton").addEventListener("click", exportToJsonFile);

  // Display last viewed quote from sessionStorage if available; otherwise, show a random quote.
  if (sessionStorage.getItem('lastQuote')) {
    displayLastViewedQuote();
  } else {
    showRandomQuote();
  }
});
