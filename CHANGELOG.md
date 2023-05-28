# Changelog

## Next version

- Put changes here...

## 0.6.0

- Updated Electron to v24.x.
  - Note: This drops support for Windows <10.
  - [Disable browser node integration and enable context isolation](https://www.electronjs.org/docs/latest/tutorial/context-isolation).
  - [Enable browser process sandboxing](https://www.electronjs.org/docs/latest/tutorial/sandbox).
- Updated Glyphyr-Studio to v1.13.18.
- When closing the app the save confirmation dialog now only shows up when there's unsaved changes.
- App window size and positioning is now persisted across loads.
- Added "Save Image As" item to context menu when right clicking canvas.
- Fixed bug where save buttons would sometimes save with the wrong file type. (#78)
- Updated all dependencies, including replacing obsolete ones with newer ones.
