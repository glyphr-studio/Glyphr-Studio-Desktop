# Glyphr Studio Desktop

Desktop application for [Glyphr Studio](http://glyphrstudio.com) built in [Electron](https://electron.atom.io/)!

## Download

- [Mac 64-bit](https://github.com/glyphr-studio/Glyphr-Studio-Desktop/releases/download/v0.2.3/Glyphr.Studio-darwin-x64.zip)
- [Windows 64-bit](https://github.com/glyphr-studio/Glyphr-Studio-Desktop/releases/download/v0.2.3/Glyphr.Studio-win32-x64.zip)
- [Windows 32-bit](https://github.com/glyphr-studio/Glyphr-Studio-Desktop/releases/download/v0.2.3/Glyphr.Studio-win32-ia32.zip)
- [Linux 64-bit](https://github.com/glyphr-studio/Glyphr-Studio-Desktop/releases/download/v0.2.3/Glyphr.Studio-linux-x64.zip)
- [Linux 32-bit](https://github.com/glyphr-studio/Glyphr-Studio-Desktop/releases/download/v0.2.3/Glyphr.Studio-linux-ia32.zip)

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

Be sure to have [Node.js](https://nodejs.org) and [git](https://git-scm.com) installed.

First, be sure to run:

```
git clone https://github.com/glyphr-studio/Glyphr-Studio-Desktop.git
cd Glyphr-Studio-Desktop
npm i
```

Then:

All Platforms: `npm run build`

64-Bit Platforms Only: `npm run build-64`

macOS: `npm run build-mac`

Windows 64-Bit: `npm run build-win`

Windows 32-Bit: `npm run build-win32`

Linux 64-Bit: `npm run build-linux`

Linux 32-Bit: `npm run build-linux32`
