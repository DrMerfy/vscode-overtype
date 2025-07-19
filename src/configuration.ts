import * as vscode from "vscode";

const stringToCursorStyle = (config: vscode.WorkspaceConfiguration, style: string, def: vscode.TextEditorCursorStyle) => {
    switch (config.get<string>(style)) {
    case "line": return vscode.TextEditorCursorStyle.Line;
    case "line-thin": return vscode.TextEditorCursorStyle.LineThin;
    case "block": return vscode.TextEditorCursorStyle.Block;
    case "block-outline": return vscode.TextEditorCursorStyle.BlockOutline;
    case "underline": return vscode.TextEditorCursorStyle.Underline;
    case "underline-thin": return vscode.TextEditorCursorStyle.UnderlineThin;
    default: return def;
    }
}

const getActiveConfiguration = (section: string): vscode.WorkspaceConfiguration => {
    const activeLanguageId = vscode.window.activeTextEditor?.document.languageId;
    if (activeLanguageId)
    {
        const languageScope = {languageId: activeLanguageId};
        const languageSpecificConfiguration = vscode.workspace.getConfiguration(section, languageScope);
        return languageSpecificConfiguration;
    }
    return vscode.workspace.getConfiguration(section);
}

const loadConfiguration = () => {
    const overtypeConfiguration = vscode.workspace.getConfiguration("overtype");

    return {
        paste: overtypeConfiguration.get<boolean>("paste"),
        hardBackspace: overtypeConfiguration.get<boolean>("hardBackspace"),
        perEditor: overtypeConfiguration.get<boolean>("perEditor") ? true : false,

        labelInsertMode: overtypeConfiguration.get<string>("labelInsertMode"),
        labelOvertypeMode: overtypeConfiguration.get<string>("labelOvertypeMode"),

        // tslint:disable-next-line:object-literal-sort-keys
        get defaultCursorStyle(): vscode.TextEditorCursorStyle {
            const editorConfiguration = getActiveConfiguration("editor");
            return stringToCursorStyle(editorConfiguration, "cursorStyle",
                vscode.TextEditorCursorStyle.Block);
        },

        // Get the user defined cursor style for overtype mode
        secondaryCursorStyle: (() => {
            return stringToCursorStyle(overtypeConfiguration, "secondaryCursorStyle",
                vscode.TextEditorCursorStyle.Line);
        })(),
    };
}

export const configuration = loadConfiguration();

export const reloadConfiguration = () => {
    const newConfiguration = loadConfiguration();

    // bail out if nothing changed
    if (configuration.labelInsertMode === newConfiguration.labelInsertMode &&
        configuration.labelOvertypeMode === newConfiguration.labelOvertypeMode &&
        configuration.paste === newConfiguration.paste &&
        configuration.hardBackspace === newConfiguration.hardBackspace &&
        configuration.perEditor === newConfiguration.perEditor &&
        configuration.defaultCursorStyle === newConfiguration.defaultCursorStyle &&
        configuration.secondaryCursorStyle === newConfiguration.secondaryCursorStyle) {
        return false;
    }

    configuration.labelInsertMode = newConfiguration.labelInsertMode;
    configuration.labelOvertypeMode = newConfiguration.labelOvertypeMode;
    configuration.paste = newConfiguration.paste;
    configuration.hardBackspace = newConfiguration.hardBackspace;
    configuration.perEditor = newConfiguration.perEditor;
    configuration.secondaryCursorStyle = newConfiguration.secondaryCursorStyle;

    return true;
}
