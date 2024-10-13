// OPtions JS:

// Function to load all bookmark folders into the dropdown
function loadBookmarkFolders() {
  chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
    const folderDropdown = document.getElementById("default-folder");
    folderDropdown.innerHTML = ""; // Clear previous entries

    // Add default option
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.text = "Select a folder";
    folderDropdown.appendChild(defaultOption);

    // Populate folder dropdown
    populateDropdown(bookmarkTreeNodes, folderDropdown);
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

// Load saved options
document.addEventListener("DOMContentLoaded", () => {
  // Get saved settings from chrome storage
  chrome.storage.sync.get(
    ["defaultFolder", "notificationsEnabled"],
    (result) => {
      document.getElementById("default-folder").value =
        result.defaultFolder || "";
      document.getElementById("notifications").checked =
        result.notificationsEnabled !== false; // default to true
    }
  );

  // Load bookmark folders dynamically
  loadBookmarkFolders();
});

// Save options to chrome.storage
document.getElementById("save-options-btn").addEventListener("click", () => {
  const defaultFolder = document.getElementById("default-folder").value;
  const notificationsEnabled = document.getElementById("notifications").checked;

  chrome.storage.sync.set(
    {
      defaultFolder: defaultFolder,
      notificationsEnabled: notificationsEnabled,
    },
    () => {
      // Notify user that options have been saved
      const statusDiv = document.getElementById("status");
      statusDiv.textContent = "Options saved successfully!";
      setTimeout(() => {
        statusDiv.textContent = "";
      }, 2000);
    }
  );
});
