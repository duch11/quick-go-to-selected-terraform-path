'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

function getSelection(){
    // current editor
    const editor = vscode.window.activeTextEditor;

    // check if there is no selection
    if (!editor || editor.selection.isEmpty) {
        // the Position object gives you the line and character where the cursor is
        return '';
    }
    return editor.document.getText(editor.selection);
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.quickGoToSelectedFilePath', () => {
        // The code you place here will be executed every time your command is executed
        let path = getSelection().trim();
        var reg = /git\/\/(.*)(?=\?)/;
        let match = path.match(reg)[1];
        // Display a message box to the user
        vscode.commands.executeCommand('workbench.action.quickOpen', match );
        // vscode.window.showInformationMessage(getSelection());
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}
