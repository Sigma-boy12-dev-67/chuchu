# 📄 DocuWrite

A Google Docs / Microsoft Word-style document editor and PDF viewer that runs in the browser. Built with plain HTML, CSS and JavaScript, deployed on Netlify, with optional AI writing help powered by the Groq API.

## Features

- **Sign in / sign up**, plus guest mode
- **Home page** with search and a grid of all your saved documents
- **Templates:** Blank, Resume, Letter, Meeting notes, Project proposal, Invoice
- **Menus:** File, Edit, Insert, Format, View, Tools
- **Text formatting:** bold, italic, underline, strikethrough, superscript, subscript
- **Colour pickers** for text colour and highlight colour
- **Fonts and styles:** font family, font size, headings, quotes, code blocks
- **Layout:** alignment, bullet and numbered lists, indent, line spacing, page breaks
- **Insert:** images, tables, links, checklists, horizontal lines, today's date
- **Tools:** find and replace, zoom, word and character count, undo and redo
- **Autosave** while you type (Ctrl+S saves immediately)
- **Export:** Word (.doc), HTML, plain text, or print / Save as PDF
- **PDF viewer:** open a PDF from your computer, scroll pages, zoom in and out
- **AI assistant (Groq):** improve, fix grammar, summarize, continue, or run your own instruction on selected text

## Project structure

```
docuwrite/
├── index.html                 # The entire app (UI, editor, auth, PDF viewer)
├── netlify.toml               # Netlify build settings
└── netlify/
    └── functions/
        └── ai.js              # Serverless proxy to the Groq API
```

## Deploy

1. **Create a GitHub repo** and upload all three files, keeping the folder structure above.
2. **Create a Netlify site:** Add new site → Import from Git → choose your repo. Leave the build command empty. The publish directory is `.` (already set in `netlify.toml`).
3. **Add your Groq key:** Site settings → Environment variables → add

   | Key | Value |
   |---|---|
   | `GROQ_API_KEY` | your key from [console.groq.com](https://console.groq.com) |

4. **Redeploy** the site so the function picks up the key.

> ⚠️ Never put your Groq key inside `index.html`. The site is public and anyone could copy it. The key stays safe in the Netlify function.

## Run locally

Opening `index.html` directly works for everything except the AI assistant. To test the AI feature locally:

```bash
npm install -g netlify-cli
export GROQ_API_KEY=your_key_here
netlify dev
```

Then open the URL it prints (usually http://localhost:8888).

## How it works

- **Editor:** a `contenteditable` page using the browser's built-in `document.execCommand` formatting commands.
- **Storage:** documents and accounts are saved in the browser's `localStorage`. Passwords are stored as SHA-256 hashes.
- **PDF viewer:** [pdf.js](https://mozilla.github.io/pdf.js/) (loaded from cdnjs) renders each page to a canvas.
- **AI:** the browser calls `/.netlify/functions/ai`, which forwards the request to Groq (`llama-3.3-70b-versatile`) using your secret key.

## Known limitations

- Accounts and documents live only in the browser they were created in. They don't sync across devices, and clearing browser data deletes them. Sign-in here is a convenience, not real security.
- No real-time collaboration, comments, version history, headers/footers or table of contents yet.
- `.doc` export is HTML that Word can open, not a native `.docx` file.

## Roadmap ideas

- Supabase or Netlify Identity for real accounts and cloud storage
- Real-time collaboration
- Comments and version history
- Headers, footers and a table of contents
- Native `.docx` export

## Tech

HTML · CSS · JavaScript · pdf.js · Netlify Functions · Groq API
