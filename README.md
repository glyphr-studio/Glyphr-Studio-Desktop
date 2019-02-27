# Glyphr Studio Desktop

Desktop application for [Glyphr Studio](http://glyphrstudio.com) built in [Electron](https://electron.atom.io/)!

## Download

### macOS

[Download](https://github.com/glyphr-studio/Glyphr-Studio-Desktop/releases/latest) the `.dmg` file.

### Windows 7+

[Download](https://github.com/glyphr-studio/Glyphr-Studio-Desktop/releases/latest) the `.exe` file.

### Linux

[Download](https://github.com/glyphr-studio/Glyphr-Studio-Desktop/releases/latest) the `.AppImage`, `.deb`, or `.snap` file

## How to run from source

Be sure to have [Node.js](https://nodejs.org) and [git](https://git-scm.com) installed.

Then:

```
git clone https://github.com/glyphr-studio/Glyphr-Studio-Desktop.git
cd Glyphr-Studio-Desktop
npm i
npm start
```

## Build

Builds are constructed with [electron-builder](https://github.com/electron-userland/electron-builder).

Be sure to have [Node.js](https://nodejs.org) and [git](https://git-scm.com) installed. Linux/Mac users who wish to do builds for Windows will need to have [WINE](https://winehq.org) installed. Mac users who wish to do builds for Windows will need to [XQuartz](https://www.xquartz.org) installed in order to run WINE. It is recommended that Mac users install both Wine and XQuartz via [Homebrew](https://brew.sh).

First, be sure to run:

```
git clone https://github.com/glyphr-studio/Glyphr-Studio-Desktop.git
cd Glyphr-Studio-Desktop
npm i
```

Then:

To build package zips use:

```
npm run pack
```

To build full distributions use:

```
npm run dist
```

## Troubleshooting

Ubuntu users may need to `sudo apt install libgconf-2-4` in order to run the app.
