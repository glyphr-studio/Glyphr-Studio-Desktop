Glyphr Studio Desktop
===

[Glyphr Studio](http://glyphrstudio.com) was just begging to be a desktop application so here it is!

Download
===

- [Mac 64-bit](https://github.com/Autre31415/Glyphr-Studio-Desktop/releases/download/v0.1.0-beta/Glyphr.Studio-darwin-x64.zip)
- [Windows 64-bit](https://github.com/Autre31415/Glyphr-Studio-Desktop/releases/download/v0.1.0-beta/Glyphr.Studio-win32-x64.zip)
- [Windows 32-bit](https://github.com/Autre31415/Glyphr-Studio-Desktop/releases/download/v0.1.0-beta/Glyphr.Studio-win32-ia32.zip)
- [Linux 64-bit](https://github.com/Autre31415/Glyphr-Studio-Desktop/releases/download/v0.1.0-beta/Glyphr.Studio-linux-x64.zip)
- [Linux 32-bit](https://github.com/Autre31415/Glyphr-Studio-Desktop/releases/download/v0.1.0-beta/Glyphr.Studio-linux-ia32.zip)

How to run from source
===

Be sure to have [Node.js](https://nodejs.org) and [git](https://git-scm.com) installed.

Then:

```
git clone https://github.com/Autre31415/Glyphr-Studio-Desktop.git
cd Glyphr-Studio-Desktop
npm i
bower i
npm start
```

Build
===

Be sure to have [Node.js](https://nodejs.org) and [git](https://git-scm.com) installed.

Then:

```
git clone https://github.com/Autre31415/Glyphr-Studio-Desktop.git
cd Glyphr-Studio-Desktop
npm i
bower i
npm start
```

Then using [electron-packager](https://github.com/maxogden/electron-packager):

Mac 64-bit:

```
electron-packager ./ "Glyphr Studio" --app-bundle-id=glyphr-studio-desktop --icon=images/appicon.icns --out=build --overwrite=true --platform=darwin --arch=x64 --version=1.2.1 --app-version=0.1.0
```

Linux 64-bit:

```
electron-packager ./ "Glyphr Studio" --app-bundle-id=glyphr-studio-desktop --out=build --overwrite=true --platform=linux --arch=x64 --version=1.2.1 --app-version=0.1.0
```

Linux 32-bit:

```
electron-packager ./ "Glyphr Studio" --app-bundle-id=glyphr-studio-desktop --out=build --overwrite=true --platform=linux --arch=ia32 --version=1.2.1 --app-version=0.1.0
```

Windows 64-bit:

```
electron-packager ./ "Glyphr Studio" --app-bundle-id=glyphr-studio-desktop --version-string.FileDescription="Glyphr Studio Desktop" --icon=images/appicon.ico --out=build --overwrite=true --platform=win32 --arch=x64 --version=1.2.1 --app-version=0.1.0
```

Windows 32-bit:

```
electron-packager ./ "Glyphr Studio" --app-bundle-id=glyphr-studio-desktop --version-string.FileDescription="Glyphr Studio Desktop" --icon=images/appicon.ico --out=build --overwrite=true --platform=win32 --arch=ia32 --version=1.2.1 --app-version=0.1.0
```
