# 🚀 SmartMarker Plugin

**A fast, organized bookmark manager for Chromium-based browsers.**

> **Note:** Current version targets Chrome / Edge / Opera / Brave via Manifest V3. Firefox support is planned but not yet implemented.

## ✨ Features

- ✅ **Fuzzy search** powered by [Fuse.js](https://www.fusejs.io/) — find bookmarks by title, URL or folder path
- ✅ **Visual organization** — shows the folder where each bookmark is stored
- ✅ **Two views** — compact popup and persistent side panel
- ✅ **Real-time filtering** — results update as you type
- ✅ **Fast local cache** — service worker keeps a warm cache of your bookmarks
- ✅ **Offline-friendly** — all dependencies are bundled locally

## 📋 Why SmartMarker?

Modern browsers save hundreds of bookmarks, but finding them is a pain:

- ❌ Built-in search is limited to exact matches
- ❌ Bookmarks get lost in endless folders
- ❌ No quick way to see where each link is saved

**SmartMarker solves this** with a clean interface and fuzzy search.

## 🎯 How it works

1. Click the SmartMarker icon in your toolbar (popup) or open the side panel.
2. Type a few characters of the title, URL or folder name.
3. Click any result to open it in a new tab.

## 💙 Support & Donations

SmartMarker is free, but you can support its development:

[![Donate with PayPal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=SPMZP3BUPVMMA)

*Thank you for your support!* 🙏

## 📥 Installation

### From Chrome Web Store (Coming Soon)

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/pablo-velilla/smart-marker-plugin.git
   cd smart-marker-plugin
   ```

2. **Load the extension in Chrome / Edge / Opera / Brave:**
   - Go to `chrome://extensions` (or `edge://extensions`, etc.)
   - Enable **Developer mode**
   - Click **Load unpacked**
   - Select the `smart-marker-plugin` project folder

3. **Done!** Use the extension from the toolbar or open the side panel.

## 🛠 Technologies Used

- **JavaScript ES modules** — popup, sidepanel and shared logic
- **HTML5/CSS3** — user interface
- **Chrome Extensions Manifest V3** — bookmarks, storage and sidePanel APIs
- **Fuse.js** — fuzzy search (bundled locally)
- **Font Awesome** — icons (bundled locally)

## 📁 Project Structure

```
smart-marker-plugin/
├── manifest.json                    # Extension manifest (MV3)
├── README.md                        # This file
├── donate.html                      # Donation page
├── src/
│   ├── background/
│   │   └── service-worker.js        # Background cache & bookmark change listeners
│   ├── popup/
│   │   ├── popup.html               # Toolbar popup UI
│   │   ├── popup.css                # Popup styles
│   │   └── popup.js                 # Popup logic (ES module)
│   ├── shared/
│   │   └── bookmarks.js             # Shared bookmark loading & search logic
│   ├── sidepanel/
│   │   ├── sidepanel.html           # Side panel UI
│   │   ├── sidepanel.css            # Side panel styles
│   │   └── sidepanel.js             # Side panel logic (ES module)
│   └── vendor/
│       ├── fuse.min.js              # Fuse.js (local copy)
│       └── fontawesome/             # Font Awesome CSS & webfonts (local copy)
└── src/icons/                       # Extension icons
```

## 🔒 Permissions

The extension requests the minimum permissions needed:

- `bookmarks` — read your bookmark tree
- `storage` — cache the flattened bookmark list locally
- `sidePanel` — enable the side panel view

No data is sent to external servers. The bundled Fuse.js and Font Awesome files are loaded locally, so the extension works offline and respects the strict Content Security Policy.

## 🎨 Design

- **Color palette:** Professional blue (#3498db, #2c3e50)
- **Typography:** System fonts (Segoe UI, Roboto, etc.)
- **Animations:** Smooth hover effects and transitions
- **Responsive:** Adapts to popup and side panel sizes

## 🔧 Customization

You can customize:

- **Colors:** modify CSS in `popup.css` / `sidepanel.css`
- **Popup width:** adjust `body { width: ... }` in `popup.css`
- **Search behavior:** edit the Fuse.js options in `src/shared/bookmarks.js`

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a branch for your feature (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'feat: add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute.

## 📞 Support

- **GitHub Issues:** [Report an issue](https://github.com/pablo-velilla/smart-marker-plugin/issues)
- **Email:** pablivg@gmail.com

## 🌟 Future Improvements

- [ ] Dark mode
- [ ] Bookmark import/export
- [ ] Custom keyboard shortcuts
- [ ] Firefox support
- [ ] Optional cloud sync

---

**💡 Tip:** Organize your bookmarks in folders for the best SmartMarker experience.

*Made with ❤️ by developers for developers*
