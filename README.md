# Glyphr Studio Desktop

Desktop application for [Glyphr Studio](http://glyphrstudio.com) built in [Electron](https://electron.atom.io/)!

## Download

- [Linux 32-bit](https://github.com/glyphr-studio/Glyphr-Studio-Desktop/releases/download/v0.4.3/Glyphr.Studio-linux-ia32.zip)
- [Linux 64-bit](https://github.com/glyphr-studio/Glyphr-Studio-Desktop/releases/download/v0.4.3/Glyphr.Studio-linux-x64.zip)
- [macOS](https://github.com/glyphr-studio/Glyphr-Studio-Desktop/releases/download/v0.4.3/Glyphr.Studio-darwin-x64.zip)
- [Windows 32-bit](https://github.com/glyphr-studio/Glyphr-Studio-Desktop/releases/download/v0.4.3/Glyphr.Studio-win32-ia32.zip)
- [Windows 64-bit](https://github.com/glyphr-studio/Glyphr-Studio-Desktop/releases/download/v0.4.3/Glyphr.Studio-win32-x64.zip)

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

Builds are constructed with [electron-packager](https://github.com/maxogden/electron-packager).

Be sure to have [Node.js](https://nodejs.org) and [git](https://git-scm.com) installed. Linux/Mac users who wish to do builds for Windows will need to have [WINE](https://winehq.org) installed. Mac users who wish to do builds for Windows will need to [XQuartz](https://www.xquartz.org) installed in order to run WINE. It is recommended that Mac users install both Wine and XQuartz via [Homebrew](https://brew.sh).

First, be sure to run:

```
git clone https://github.com/glyphr-studio/Glyphr-Studio-Desktop.git
cd Glyphr-Studio-Desktop
npm i
```

Then:

All Platforms: `npm run package`

64-Bit Platforms Only: `npm run package -- --64`

Linux 32-Bit: `npm run package -- --linux32`

Linux 64-Bit: `npm run package -- --linux`

macOS: `npm run package -- --mac`

Windows 32-Bit: `npm run package -- --win32`

Windows 64-Bit: `npm run package -- --win`

## Troubleshooting

Ubuntu users may need to `sudo apt install libgconf-2-4` in order to run the app.
