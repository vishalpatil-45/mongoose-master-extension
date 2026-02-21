# 🍃 Mongoose-Master

**Mongoose-Master** is a high-productivity VS Code extension designed for MERN stack developers. It automates the tedious process of manual schema creation by instantly generating Mongoose Models from JSON snippets with smart type inference.



## 🛠️ The Problem it Solves
In Full-Stack development, creating models for large or nested JSON datasets is repetitive and prone to syntax errors. This tool reduces "Day 1" backend boilerplate time by approximately 40%, allowing you to focus on complex business logic and database architecture.

## ✨ Key Features
- **Smart Type Mapping:** Automatically detects and assigns types: `String`, `Number`, `Boolean`, `Date`, and `Array`.
- **Nested Object Support:** Recursively parses nested JSON structures to create multi-level schemas.
- **Production-Ready Boilerplate:** Generates code with `timestamps: true` and `versionKey: false` by default.
- **Custom Model Naming:** Prompts the user for a Model name to ensure consistent exports and file organization.
- **Auto-Formatting:** Automatically triggers the VS Code formatter on the generated file for clean, readable code.

## 🚀 Installation

### Using the VSIX File
1. Download the latest `mongoose-master-0.0.1.vsix` from the [Releases](https://github.com/vishalpatil-45/mongoose-master-extension/releases) tab.
2. Open VS Code.
3. Go to the **Extensions** view (`Ctrl+Shift+X`).
4. Click the **More Actions** (`...`) button in the top right.
5. Select **Install from VSIX...** and choose the downloaded file.

## ⌨️ How to Use
1. Highlight any valid JSON object in your editor.
2. Press `Ctrl+Shift+P` and type **"Generate Mongoose Model"**
   OR use the shortcut `Ctrl+Alt+M`.
4. Enter the name of your model when prompted (e.g., `User` or `Product`).
5. A new tab will open on the right with your fully-functional Mongoose model.

## 💻 Technical Stack
- **Language:** TypeScript
- **Framework:** VS Code Extension API
- **Target Stack:** Node.js, Express.js, MongoDB (MERN)

## 📄 License
This project is licensed under the MIT License.

---
Developed by Vishal Patil 
