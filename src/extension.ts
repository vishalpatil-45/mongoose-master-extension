import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Mongoose-Master is now active!');

    let disposable = vscode.commands.registerCommand('mongoose-master.generateSchema', async () => {
        const editor = vscode.window.activeTextEditor;

        if (!editor) {
            vscode.window.showErrorMessage('Open a file first!');
            return;
        }

        const selection = editor.selection;
        const highlightedText = editor.document.getText(selection);

        if (!highlightedText) {
            vscode.window.showErrorMessage('Please highlight some JSON first!');
            return;
        }

        try {
            // 1. Get Model Name from user
            const modelNameInput = await vscode.window.showInputBox({
                prompt: "Enter the name of your Mongoose Model (e.g., UserProfile)",
                placeHolder: "ModelName",
                value: "MyModel"
            });

            if (!modelNameInput) return; // Exit if user cancels

            const modelName = modelNameInput.trim();
            const schemaVarName = `${modelName.charAt(0).toLowerCase()}${modelName.slice(1)}Schema`;

            // 2. Parse and Analyze JSON
            const jsonObject = JSON.parse(highlightedText);
            const schemaBody = generateMongooseSchema(jsonObject, 1);
            
            // 3. Create the full Template
            const fullTemplate = [
                "const mongoose = require('mongoose');",
                "",
                `const ${schemaVarName} = new mongoose.Schema({`,
                schemaBody,
                "}, { ",
                "    timestamps: true,",
                "    versionKey: false",
                "});",
                "",
                `module.exports = mongoose.model('${modelName}', ${schemaVarName});`
            ].join('\n');

            // 4. Open in a new tab
            const doc = await vscode.workspace.openTextDocument({
                content: fullTemplate,
                language: 'javascript'
            });

            await vscode.window.showTextDocument(doc, {
                preview: false,
                viewColumn: vscode.ViewColumn.Beside
            });

            // Auto-format the result
            await vscode.commands.executeCommand('editor.action.formatDocument');

        } catch (error) {
            vscode.window.showErrorMessage('Invalid JSON! Please ensure your selection is a valid JSON object.');
        }
    });

    context.subscriptions.push(disposable);
}

/**
 * RECURSIVE BRAIN: Handles Dates, Nested Objects, and Arrays
 */
function generateMongooseSchema(obj: any, indentLevel: number): string {
    let schemaLines: string[] = [];
    const spacing = "    ".repeat(indentLevel);

    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            let mongooseType = 'String';

            // Detect Dates
            const isDate = (val: any) => typeof val === 'string' && !isNaN(Date.parse(val)) && val.length > 8;

            if (isDate(value)) {
                mongooseType = 'Date';
            } else if (typeof value === 'number') {
                mongooseType = 'Number';
            } else if (typeof value === 'boolean') {
                mongooseType = 'Boolean';
            } else if (Array.isArray(value)) {
                // Check first item of array for type
                const firstItem = value[0];
                let arrayInnerType = 'String';
                if (typeof firstItem === 'number') arrayInnerType = 'Number';
                else if (typeof firstItem === 'object') arrayInnerType = 'Object';
                
                mongooseType = `[${arrayInnerType}]`;
            } else if (typeof value === 'object' && value !== null) {
                // RECURSION for nested objects
                const nested = generateMongooseSchema(value, indentLevel + 1);
                schemaLines.push(`${spacing}${key}: {\n${nested}\n${spacing}}`);
                continue;
            }

            schemaLines.push(`${spacing}${key}: { type: ${mongooseType}, required: true }`);
        }
    }

    return schemaLines.join(',\n');
}

export function deactivate() {}