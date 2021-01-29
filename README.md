# overtype for vscode
_continuation fork of the project_  
[![Extension releases](https://img.shields.io/github/release/DrMerfy/vscode-overtype/all.svg)](https://github.com/DrMerfy/vscode-overtype/releases)
[![Open VSX Registry](https://img.shields.io/open-vsx/v/drmerfy/overtype)](https://open-vsx.org/extension/DrMerfy/overtype)
[![Visual Studio Marketplace](https://vsmarketplacebadge.apphb.com/version/DrMerfy.overtype.svg)](https://marketplace.visualstudio.com/items?itemName=DrMerfy.overtype)
[![GitHub issues](https://img.shields.io/github/issues/DrMerfy/vscode-overtype.svg)](https://github.com/DrMerfy/vscode-overtype/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/DrMerfy/vscode-overtype.svg)](https://github.com/DrMerfy/vscode-overtype/pulls)
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Because some people actually press the Insert key on purpose.

## Features

Adds an overtype mode to vscode based editors, plus a couple of bells and whistles.

### Basic usage

The aptly named **overtype mode** allows one to type over and replace existing characters in one's text editor. The most common scenario for overtype mode is when it's activated by accident by an unsuspecting user who can't figure out why the computer is eating all the words they already typed.

To toggle overtype mode, press the `Insert` key. If you don't have an `Insert` key, you can press `Ctrl+Shift+I` (on Windows and Linux) or `Cmd+Shift+I` (on Mac). If you don't care for either of those keybindings, you can customize them in your Keyboard Shortcuts preferences; just set your own binding for the `overtype.toggle` command.  
As an alternative you can also click on the Insert/Overtype label to toggle overtype mode.

![Basic demo](images/demo-basic.gif)

### Global or per-editor

It's bad enough that you have to keep track of that damn overtype indicator at the bottom of the window... but you want to have a separate overtype setting for *each editor?*

Fine.

```json
"overtype.perEditor": true
```

> Sets the insert/overtype mode per editor.

### Paste behavior

If you want to enable "Hard Mode", you can turn on overtype paste mode. This setting applies overtype behavior to when you paste text into your editor. Here are the rules:

- If you paste part of a line of text into another line of text, the clipboard contents will overwrite characters until it's done pasting, unless it hits the end of the line first, in which case it'll just extend that line.
- If you already have some text selected when you paste, that text will *always* be overwritten, even if the contents of the clipboard are smaller.
- If you paste some multiline text into a line of text, everything left on that line will be overwritten with the first line of the pasted text, and the remaining pasted lines will be inserted below that line.
- If you cut or copy using vscode's feature that grabs the entire line when you don't have anything selected, pasting that line will overwrite the *entire* line that you're pasting on.

Some additional tips for using overtype paste:

- Don't forget your Undo shortcut(s).
- I know this doesn't work like [insert editor here]. Every single freaking editor handles overtype paste differently. It's not my fault.
- If you think you have a saner way to handle this, for the love of everything warm and cuddly, [MAKE A PULL REQUEST](https://github.com/DrMerfy/vscode-overtype/pulls).

Without further ado...

```json
"overtype.paste": true
```

> When in overtype mode, uses overtype behavior when pasting text.

### Adjusted indicators in status bar (abbreviated, localized or none)

Horizontal screen space at a premium? Have too many things in your status bar already?
Turned your monitor sideways because somebody told you it would increase your productivity by at least 23%?
Or simply want to match the language to the general UI?
Don't worry, we've got just the setting for you!

```json
"overtype.labelInsertMode": "",
"overtype.labelOvertypeMode": "Ovr"
```

> Shows an abbreviated overtype status (`Ovr`) in the status bar if active, and nothing for the "normal" insert mode.

```json
"overtype.labelInsertMode": "",
"overtype.labelOvertypeMode": ""
```

> Disable showing the overtype status in the status bar completely.

### Overtype cursor style

You can change the overtype cursor style from the preferences.
Set the `overtype.secondaryCursorStyle` to either one of:

- line
- line-thin
- block
- block-outline
- underline
- underline-thin

e.g.

```json
"overtype.secondaryCursorStyle": "underline"
```

> Sets the overtype cursor style.

## Contributing

How can you contribute?

- [**Open an issue**](https://github.com/DrMerfy/vscode-overtype/issues) if you found a problem.
- [**Make a pull request**](https://github.com/DrMerfy/vscode-overtype/pulls) if you fixed a problem!

## Release notes

There's a [`CHANGELOG.md`](https://github.com/DrMerfy/vscode-overtype/blob/master/CHANGELOG.md) file.

## License

There's a [`LICENSE`](https://github.com/DrMerfy/vscode-overtype/blob/master/LICENSE) file. It's the [BSD 2-Clause](https://opensource.org/licenses/BSD-2-Clause) license.

## Contributors ✨

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/AdamMaras"><img src="https://avatars.githubusercontent.com/u/7979550?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Adam Maras</b></sub></a><br /><a href="https://github.com/DrMerfy/vscode-overtype/commits?author=AdamMaras" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/DrMerfy"><img src="https://avatars3.githubusercontent.com/u/21154979?v=4?s=100" width="100px;" alt=""/><br /><sub><b>George Melissourgos</b></sub></a><br /><a href="#projectManagement-DrMerfy" title="Project Management">📆</a> <a href="https://github.com/DrMerfy/vscode-overtype/commits?author=DrMerfy" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/GitMensch"><img src="https://avatars3.githubusercontent.com/u/6699539?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Simon Sobisch</b></sub></a><br /><a href="#projectManagement-GitMensch" title="Project Management">📆</a> <a href="https://github.com/DrMerfy/vscode-overtype/commits?author=GitMensch" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

### Original author: [Adam Maras](https://github.com/AdamMaras)

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
