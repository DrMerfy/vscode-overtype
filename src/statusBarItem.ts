import * as vscode from "vscode";

import { configuration } from "./configuration";

let statusBarItem: vscode.StatusBarItem | null;

export const createStatusBarItem = () => {
    if (statusBarItem != null) { return statusBarItem; }

    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
    statusBarItem.command = "overtype.toggle";
    statusBarItem.show();

    updateStatusBarItem(null);

    return statusBarItem;
}

export const destroyStatusBarItem = () => {
    if (statusBarItem == null) { return; }

    statusBarItem.hide();
    statusBarItem = null;
}

export const updateStatusBarItem = (overtype: boolean | null) => {
    if (statusBarItem == null) { return; }

    if (overtype === null) {
        statusBarItem.text = "";
        statusBarItem.tooltip = "";

        statusBarItem.hide();
        return;
    }

    let sbiText;

    if (overtype) {
        sbiText = configuration.labelOvertypeMode;
        statusBarItem.tooltip = "Overtype Mode, click to change to Insert Mode";
        statusBarItem.color = new vscode.ThemeColor('statusBarItem.warningForeground');
        statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground');
    } else {
        sbiText = configuration.labelInsertMode;
        statusBarItem.tooltip = "Insert Mode, click to change to Overtype Mode";
        statusBarItem.color = new vscode.ThemeColor('statusBarItem.foreground');
        statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.background');
    }
    if (sbiText === undefined || sbiText == null) sbiText = "";

    // preparation for https://github.com/DrMerfy/vscode-overtype/issues/2
    // if (configuration.showCapsLockState && capsLockOn) {
    //     statusBarItem.text = sbiText.toUpperCase();
    // } else {
    statusBarItem.text = sbiText.toString();
    // }

    statusBarItem.show();
}
