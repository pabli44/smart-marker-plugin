# 🚀 SmartMarker Plugin

**A fast, organized, and visually appealing bookmark manager for Chrome, Firefox, Edge, Opera, and Brave**

![SmartMarker Demo](https://via.placeholder.com/600x400/3498db/ffffff?text=SmartMarker+Demo)

## ✨ Features

✅ **Smart search** - Find your bookmarks instantly
✅ **Visual organization** - Shows the folder where each bookmark is stored
✅ **Modern interface** - Clean and responsive design
✅ **Cross-browser** - Works on Chrome, Firefox, Edge, Opera, and Brave
✅ **Free and open source** - No hidden costs

## 📋 Why SmartMarker?

Modern browsers save hundreds of bookmarks, but finding them is a pain:
- ❌ Chrome/Firefox don't have advanced search
- ❌ Bookmarks get lost in endless folders
- ❌ No quick way to see where each link is saved

**SmartMarker solves all this** with a clean and functional interface.

## 🎯 Features

### Fast Search
![Search](https://via.placeholder.com/400x200/f5f5f5/333333?text=Fast+Search)

- Search by title or URL
- Real-time results
- Quick filtering

### Visual Organization
![Organization](https://via.placeholder.com/400x200/f5f5f5/333333?text=Visual+Organization)

- **Shows the folder** where each bookmark is stored
- **Card design** with hover effects
- **Visual tags** for better identification

### Sidebar Panel
![Sidebar](https://via.placeholder.com/400x200/f5f5f5/333333?text=Sidebar+Panel)

- Access from any page
- Same powerful search
- Perfect integration with your workflow

## 💙 Support & Donations

SmartMarker is free and open source, but you can support its development:

[![Donate with PayPal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=SPMZP3BUPVMMA)

**Your donation helps:**
- ✅ Faster bug fixes and new features
- ✅ Cross-browser support (Safari coming soon!)
- ✅ Cloud sync and backup options
- ✅ Continuous development and updates

*Thank you for your support!* 🙏

## 📥 Installation

### From Chrome Web Store (Coming Soon)

### From Firefox Add-ons (Coming Soon)

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/pablo-velilla/smart-marker-plugin.git
   cd smart-marker-plugin
   ```

2. **Load the extension in your browser:**

   **🔹 Google Chrome / Microsoft Edge / Opera / Brave:**
   - Go to: `chrome://extensions`
   - Enable "Developer mode" (toggle in the top right)
   - Click "Load unpacked"
   - Select the `smart-marker-plugin` folder

   **🔹 Mozilla Firefox (Latest Versions):**
   - Go to: `about:debugging#/runtime/this-firefox`
   - Click "Load Temporary Add-on"
   - Select the `manifest.json` file from the project folder

3. **Done!** Use the extension from your browser's toolbar.

### 🎯 How to See the Donate Button in the Extension

The donate button appears in the top-right corner of the SmartMarker popup:

```
┌───────────────────────────────────────────────┐
│  SmartMarker         [💙 Support Development] │
│                                               │
│  [Search box]    [🔍 Search]                  │
│                                               │
│  Bookmark Title                               │
│  example.com                                  │
│  📁 Location: Bookmarks/My Folder             │
│  ──────────────────────────────────────────── │
│  Google                                       │
│  google.com                                   │
│  📁 Location: Bookmarks/Work                  │
│  ...                                          │
└───────────────────────────────────────────────┘
```

Click on "💙 Support Development" to visit the donation page and support the project!

## 🌐 Cross-Browser Installation Guide

| Browser | Installation Method | Status |
|---------|---------------------|--------|
| **Chrome** | `chrome://extensions` → Load unpacked | ✅ Works |
| **Firefox** | `about:debugging#/runtime/this-firefox` → Load Temporary Add-on | ✅ Works |
| **Edge** | `edge://extensions` → Load unpacked | ✅ Works |
| **Opera** | `opera://extensions` → Load unpacked | ✅ Works |
| **Brave** | `brave://extensions` → Load unpacked | ✅ Works |

## 🛠 Technologies Used

- **JavaScript ES6+** - Main logic
- **HTML5/CSS3** - User interface
- **WebExtensions API** - Cross-platform compatibility
- **Fuse.js** - Advanced fuzzy search
- **Chrome Storage API** - Local storage

## 📁 Project Structure

```
smart-marker-plugin/
├── manifest.json              # Main configuration
├── src/
│   ├── popup/
│   │   ├── popup.html         # Popup interface
│   │   ├── popup.css          # Popup styles
│   │   └── popup.js           # Popup logic
│   ├── sidepanel/
│   │   ├── sidepanel.html     # Sidebar interface
│   │   ├── sidepanel.css      # Sidebar styles
│   │   └── sidepanel.js       # Sidebar logic
│   └── background/
│       └── service-worker.js  # Background script
└── README.md                  # Documentation
```

## 🎨 Design

The plugin features:
- **Color palette:** Professional blue (#3498db, #2c3e50)
- **Typography:** System fonts (Segoe UI, Roboto, etc.)
- **Animations:** Smooth hover effects and transitions
- **Responsive:** Works on any screen size
- **Dark mode compatible:** Integrates with browser theme

## 📊 Statistics

- **Supported bookmarks:** Unlimited
- **Performance:** Instant search (<100ms)
- **Memory:** Optimized for low consumption
- **Compatibility:** Chrome 90+, Firefox 88+, Edge 90+, Opera 75+, Brave 1.30+

## 🔧 Customization

You can customize:
- **Colors:** Modify CSS variables in popup.css/sidepanel.css
- **Size:** Adjust the width in the CSS
- **Fonts:** Change typography in the CSS

## 🤝 Contributing

Contributions are welcome! If you want to improve SmartMarker:

1. Fork the repository
2. Create a branch for your feature (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the **MIT License** - feel free to use, modify, and distribute.

## 📞 Support

- **GitHub Issues:** [Report an issue](https://github.com/pabli44/smart-marker-plugin/issues)
- **Email:** pablivg@gmail.com

## 🌟 Future Improvements

- [ ] Cloud synchronization
- [ ] Bookmark import/export
- [ ] Dark mode
- [ ] Custom keyboard shortcuts
- [ ] Notion/Todoist integration
- [ ] Safari version

---

**💡 Tip:** Organize your bookmarks in folders in Chrome for the best SmartMarker experience

*Made with ❤️ by developers for developers*
