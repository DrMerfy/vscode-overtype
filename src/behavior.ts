import * as vscode from "vscode";

export const overtypeBeforeType = (editor: vscode.TextEditor, text: string) => {
    // skip overtype behavior when enter is pressed
    if (text === "\r" || text === "\n" || text === "\r\n") {
        return;
    }

    editor.selections = editor.selections.map((selection) => {
        const cursorPosition = selection.start;
        const lineEndPosition = editor.document.lineAt(cursorPosition).range.end;

        if (selection.isEmpty && cursorPosition.character !== lineEndPosition.character) {
            const replaceEnd = cursorPosition.with(cursorPosition.line, cursorPosition.character + 1);
            const replaceSelection = new vscode.Selection(cursorPosition, replaceEnd);

            return replaceSelection;
        } else {
            return selection;
        }
    });
}

export const overtypeBeforePaste = (editor: vscode.TextEditor, text: string, pasteOnNewLine: boolean) => {
    editor.selections = editor.selections.map((selection) => {
        if (pasteOnNewLine) {
            // highlight and replace all the selected lines

            const startPosition = editor.document.lineAt(selection.start).rangeIncludingLineBreak.start;
            let endPosition = editor.document.lineAt(selection.end).rangeIncludingLineBreak.end;

            if (startPosition.isEqual(endPosition)) {
                endPosition = endPosition.translate(1);
            }

            return new vscode.Selection(startPosition, endPosition);
        } else {
            // highlight the paste length or the end of the line, whichever's smaller

            const selectionStartOffset = editor.document.offsetAt(selection.start);
            const selectionEndOffset = editor.document.offsetAt(selection.end);
            const selectionLength = selectionEndOffset - selectionStartOffset;

            const lineEndOffset = editor.document.offsetAt(editor.document.lineAt(selection.end).range.end);
            const lineEndLength = lineEndOffset - selectionStartOffset;

            const hasNewLine = text.indexOf("\r") !== -1 || text.indexOf("\n") !== -1;
            const newSelectionLength = Math.max(
                hasNewLine ? lineEndLength : Math.min(lineEndLength, text.length),
                selectionLength,
            );
            const newSelectionEndPosition = editor.document.positionAt(selectionStartOffset + newSelectionLength);

            return new vscode.Selection(selection.start, newSelectionEndPosition);
        }
    });
}

export const overtypeBeforeBackspace = (editor: vscode.TextEditor) => {
    let selection = editor.selection
    if (selection.isEmpty) {
        // select the character to the left of the cursor
        selection = new vscode.Selection(
            selection.start.translate(0, -1),
            selection.start
        )
    }

    // replace text selection with spaces
    const text = editor.document.getText(selection)
    editor.edit((editBuilder) => {
        editBuilder.replace(selection, " ".repeat(text.length))
    })

    // move the cursor to the left if the original selection was empty
    if (editor.selection.isEmpty) {
        const newPos = editor.selection.start.translate(0, -1)
        editor.selection = new vscode.Selection(newPos, newPos)
    }
}
