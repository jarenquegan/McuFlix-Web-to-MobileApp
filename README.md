# App Setup Guide

## Configuration

1. **Update API URL**
	- Open the file: `src/app/home/home.page.ts`
	- Locate the following line:
		```typescript
		const url = 'http://192.168.125.86/mcuflix/';
		```
	- Update the URL as needed.

2. **Customize App Icons**
	- To change the app icon, replace `icon.png`.
	- To update the splash screen, replace `splash.png`.

## Installation & Running the App

Run the following commands:

```bash
ionic cordova build android
ionic cordova run --device android
```
