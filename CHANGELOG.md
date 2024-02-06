# Changelog

## 0.6.0

- Updated Glyphyr-Studio to v1.14.0.
  - Note: This is the final 1.0 version.
- Updated Electron to v28.2.1.
  - Dropped support for Windows 7.
  - Dropped support for macOS 10.14 (Mojave) and below.
  - Improved support for modern versions of operating systems.
  - [Disabled browser node integration and enable context isolation](https://www.electronjs.org/docs/latest/tutorial/context-isolation).
  - [Enabled browser process sandboxing](https://www.electronjs.org/docs/latest/tutorial/sandbox).
- Added "Save Image As" item to context menu when right clicking canvas.
- Added arm64 distributions.
- Added more native menu items.
- Added window size and positioning persistence.
- Updated save confirmation dialog to only appear when closing the app with unsaved changes.
- Removed save popups when saving a pre-existing project.
- Fixed a bug where save buttons would sometimes save with the wrong file type.
- Fixed a bug where ⌘/CTRL+O would open a browser tab.
- Updated all dependencies, including replacing obsolete ones with newer ones.
