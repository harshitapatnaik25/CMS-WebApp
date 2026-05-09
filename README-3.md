# CSE ACES CMS Portal

This is a web-based internal portal for **Corporate Systems Engineering (CSE)**. 
It displays categorized application links for various systems under:

-  **ACES**
-  **FAS**
-  **VMOE**
---

##  Folder Structure

```
.
├── ACES/                      # ACES app JSON data
│   ├── aceshub.json
│   ├── appletravel.json
│   └── ...
├── FAS/                       # FAS app JSON data
│   ├── accelerate.json
│   └── ...
├── VMOE/                      # VMOE app JSON data
│   ├── banjo.json
│   └── ...
├── NEWSUITE/                  # NEW suite JSON data (just add your app JSONs here)
│   ├── teamalpha.json
│   ├── projectx.json
│   └── ...
├── CMS-SUITE/                 # HTML loaders for each suite
│   ├── aces-applications.html
│   ├── fas-applications.html
│   ├── vmoe-applications.html
│   └── newsuite-applications.html   # <-- NEW loader file for NEWSUITE
├── css/
│   └── style.css              # Custom styles
├── js/
│   └── custom.js              # Accordion logic + JSON loader
├── index.html                 # Main UI entry
└── README.md                  # Project documentation

```
---

##  Setup Instructions

### 1. Clone / Download the repository

You can run the app by opening index.html in a browser directly (or preferably use a local dev server like Live Server in VSCode).

No external dependencies or backend are needed.

For production deployment:

Test your changes locally first (ensure the UI renders as expected).

Fork the repository, commit your updates to a new branch.

Create a Pull Request (PR) to merge into the main branch after validation.

---

### 2. Features

- Responsive sidebar layout
- Accordion-style nested dropdowns
- Dynamically loads JSON content
- Easy to scale with new app sections
- Clean visual theming with custom CSS
---

##  Adding a New Application

###  Step 1: Add a new JSON

Place your new `.json` file inside the correct group:

- `ACES/` → for ACES apps
- `FAS/` → for FAS apps
- `VMOE/` → for VMOE apps

#### JSON Format Example:

```json
{
  "MY APP NAME": {
    "Section 1": {
      "Link Label A": "https://example.com",
      "Link Label B": "https://example.com"
    },
    "Section 2": {
      "Sub-section": {
        "Sub-link": "https://example.com"
      }
    }
  }
}
```
---

###  Step 2: Update the HTML Loader

Open the corresponding loader from `CMS-SUITE/`:

- `aces-applications.html`
- `fas-applications.html`
- `vmoe-applications.html`

#### Add a container:

```html
<div id="myappJsonContainer"></div>
```

#### Then update the loader script:

```js
{ file: 'myapp', key: 'MY APP NAME' },
```

Where:
- `file` matches your filename (without `.json`)
- `key` must match the root key inside your JSON

---

##  Example

You created `hrpay.json` inside `FAS/` with this root key:

```json
{
  "HRPAY": {
    ...
  }
}
```
Then in `CMS-SUITE/fas-applications.html`, add:

```html
<div id="hrpayJsonContainer"></div>
```
And update the JS:
```js
{ file: 'hrpay', key: 'HRPAY' },
```
Done! It will now load automatically into the accordion UI.

---
## ⚠️ Troubleshooting

| Issue | Solution |
|------|----------|
| ⚠️ Key not found | Make sure the JSON root key matches what you passed in `key:` |
| ⚠️ File not loading | Ensure the JSON file exists and has no syntax error |
| ⚠️ Not updating UI | Clear browser cache or do a hard reload (`Cmd+Shift+R`) |
---

## Tools Used

- HTML + CSS + JS (vanilla)
- Responsive accordion with nested levels
- Zero dependencies, no backend required

---

## Naming Conventions

- Use **lowercase filenames** with underscores (e.g. `appletravel_admin.json`)
- Keep JSON **root keys in uppercase or title case**
- Update `CMS-SUITE` loaders and `index.html` accordingly

## For assistance, please reach out to:

