// Function to load all bookmark folders into the dropdown
function loadBookmarkFolders() {
  chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
    const folderDropdown = document.getElementById("folder-dropdown");
    folderDropdown.innerHTML = ""; // Clear previous entries

    // Add default option
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.text = "Select a folder";
    folderDropdown.appendChild(defaultOption);

    // Populate folder dropdown
    populateDropdown(bookmarkTreeNodes, folderDropdown);
    validateInput(); // Validate inputs when dropdown is loaded
  });
}

// Recursive function to populate the dropdown with folder hierarchy
function populateDropdown(nodes, dropdown, prefix = "") {
  nodes.forEach((node) => {
    if (node.children && node.url === undefined) {
      const option = document.createElement("option");
      option.value = node.id;
      option.text = `${prefix}${node.title}`;
      dropdown.appendChild(option);
      // Handle subfolders with indentation
      populateDropdown(node.children, dropdown, prefix + "> ");
    }
  });
}

// Display dynamic error messages
function showError(message) {
  const errorDiv = document.getElementById("error-message");
  errorDiv.innerText = message;
  errorDiv.style.display = "block"; // Show the error
}

// Hide error messages
function hideError() {
  const errorDiv = document.getElementById("error-message");
  errorDiv.style.display = "none"; // Hide the error
}

// Show notifications for success or failure
function showNotification(message, isSuccess) {
  const notification = document.createElement("div");
  notification.innerText = message;
  notification.style.position = "absolute";
  notification.style.bottom = "10px";
  notification.style.left = "10px";
  notification.style.padding = "10px";
  notification.style.color = "#fff";
  notification.style.backgroundColor = isSuccess ? "#4CAF50" : "#FF0000";
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Validate user input
function validateInput() {
  const linksInput = document.getElementById("links-input").value.trim();
  const folderId = document.getElementById("folder-dropdown").value;
  const saveButton = document.getElementById("save-btn");

  if (!linksInput) {
    showError("Please enter at least one URL.");
    saveButton.disabled = true;
    return;
  }

  if (!folderId) {
    showError("Please select a target folder.");
    saveButton.disabled = true;
    return;
  }

  hideError(); // All inputs are valid, hide error
  saveButton.disabled = false;
}

// Update save button label based on selected folder
function updateSaveButton() {
  const folderDropdown = document.getElementById("folder-dropdown");

  if (folderDropdown.selectedIndex === -1) {
    return; // If no folder is selected, do nothing
  }

  const saveButton = document.getElementById("save-btn");

  let selectedFolderText = (
    folderDropdown.options[folderDropdown.selectedIndex]?.text || "Bookmarks"
  ).replaceAll(">", "");
  if (selectedFolderText === "Select a folder") {
    selectedFolderText = "";
  }

  saveButton.innerText = `Save to ${selectedFolderText}`;
  validateInput(); // Call validation after updating the button
}

// Parse links and titles from input
function parseLinksAndTitles(input) {
  const links = input
    .split("\n")
    .map((line) => {
      const parts = line.split(",");
      return {
        url: parts[0]?.trim(),
        title: parts[1]?.trim() || parts[0]?.trim(),
      };
    })
    .filter((entry) => entry.url); // Filter out empty or invalid entries
  return links;
}

// Function to add bookmarks to the selected folder
function addBookmarks() {
  const linksInput = document.getElementById("links-input").value;
  const folderId = document.getElementById("folder-dropdown").value;
  const links = parseLinksAndTitles(linksInput);

  if (!links.length) {
    showError("Error: Please enter at least one valid URL.");
    return;
  }
  if (!folderId) {
    showError("Error: Please select a folder before saving.");
    return;
  }

  let successCount = 0;
  links.forEach((link) => {
    chrome.bookmarks.create(
      {
        parentId: folderId,
        title: link.title,
        url: link.url.startsWith("http") ? link.url : `https://${link.url}`,
      },
      function (bookmark) {
        if (bookmark) {
          successCount++;
          if (successCount === links.length) {
            showNotification("Bookmarks added successfully!", true);
            document.getElementById("links-input").value = ""; // Clear input on success
            validateInput(); // Revalidate after clearing input
          }
        } else {
          showError("Failed to add some bookmarks.");
        }
      }
    );
  });
}

// Drag and drop functionality for URL input
function setupDragAndDrop() {
  const linksInput = document.getElementById("links-input");

  linksInput.addEventListener("dragover", (event) => {
    event.preventDefault();
    linksInput.style.border = "2px dashed #4CAF50";
  });

  linksInput.addEventListener("dragleave", () => {
    linksInput.style.border = "1px solid #ccc";
  });

  linksInput.addEventListener("drop", (event) => {
    event.preventDefault();
    linksInput.style.border = "1px solid #ccc";
    const droppedText = event.dataTransfer.getData("text");
    if (droppedText) {
      linksInput.value += droppedText + "\n"; // Append dropped URL
      validateInput();
    }
  });
}

// Event listeners
document.getElementById("save-btn").addEventListener("click", addBookmarks);
document
  .getElementById("folder-dropdown")
  .addEventListener("change", updateSaveButton);
document.getElementById("links-input").addEventListener("input", validateInput);

// Load folders and initialize drag and drop functionality when popup is opened
document.addEventListener("DOMContentLoaded", () => {
  loadBookmarkFolders();
  setupDragAndDrop();
});