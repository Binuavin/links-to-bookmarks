# Links to Bookmarks

**Links to Bookmarks** is a Chrome extension that allows users to easily save custom bookmarks, organize them into folders, and manage URLs with ease. With drag-and-drop support and customizable settings, it's the ultimate companion for managing your bookmarks!

## Features

- **Add Custom Bookmarks**: Save multiple URLs at once by pasting them into the input box.
- **Folder Selection**: Choose the folder where you want to save your bookmarks, with support for folder hierarchy.
- **Drag-and-Drop Support**: Drag URLs directly into the input box for quick bookmarking.
- **Custom Titles**: Define custom titles for your bookmarks, or use the URL as the title.
- **Options Page**: Configure the default folder for bookmarks and enable/disable notifications.

## Installation

1. Download or clone this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer Mode** (toggle in the top right corner).
4. Click on **Load unpacked** and select the folder where this extension's files are located.
5. The extension should now appear in your browser toolbar.

## How to Use

1. Click on the **Links to Bookmarks** icon in the toolbar.
2. Enter the URLs you want to bookmark in the input box. You can also drag and drop links directly into the input.
3. Select a target folder from the dropdown. The folder list is populated with your existing bookmark folders.
4. Click **Save** to add the bookmarks to the selected folder.
5. Optionally, visit the options page to set a default folder and toggle notifications.

## Options

1. **Default Bookmark Folder**: Set a folder where bookmarks will be saved by default.
2. **Enable/Disable Notifications**: Choose whether to display success/error notifications when adding bookmarks.

## Permissions

- **Bookmarks**: Access to read, create, and organize your bookmarks.
- **Storage**: For storing user preferences and settings.
- **ActiveTab**: For future functionality to interact with the current tab (if needed).
- **Scripting**: To run scripts if needed in the future for enhanced features.

## Development

### Files:
- `popup.html`: The UI for the extension popup where users interact with bookmark inputs and folder selection.
- `popup.js`: Handles the logic for bookmark saving, folder loading, input validation, and notifications.
- `background.js`: Background service worker script for handling any long-running tasks.
- `options.html`: The settings page for configuring the default folder and notifications.
- `manifest.json`: The manifest file defining the extension's configuration.

### To Contribute:
1. Fork the repository.
2. Make your changes or improvements.
3. Submit a pull request with a detailed description of what you've changed.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to reach out with any questions or feedback about **Links to Bookmarks**!
