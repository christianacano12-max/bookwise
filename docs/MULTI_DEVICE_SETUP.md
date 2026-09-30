# BookWise Multi-Device Setup Guide

BookWise is now fully responsive and supports Windows desktop, Android phones, iOS devices, and web browsers. This guide explains how to run BookWise on any device.

---

## Platform Support

| Platform | Status | Notes |
|----------|--------|-------|
| Windows Desktop | ✓ Ready | Fully tested and optimized |
| Android Phone | ✓ Ready | Requires API_BASE_URL configuration |
| iOS Phone | ✓ Ready | Requires API_BASE_URL configuration |
| Web Browser | ✓ Ready | Run with `flutter run -d chrome` |
| macOS | ✓ Ready | Runs natively |

---

## Prerequisites

All devices need:

1. **Stable internet connection** to the backend server
2. **Backend running** at a known IP address and port
3. **Flutter SDK** installed (for building from source)

---

## Backend Setup for Multi-Device Access

### Step 1: Find Your Computer's LAN IP

**Windows:**
```powershell
ipconfig
```
Look for "IPv4 Address" under your network adapter, e.g., `192.168.1.100`.

**macOS/Linux:**
```bash
ifconfig | grep "inet "
```

### Step 2: Update Backend to Listen on All Interfaces

By default, the backend only listens on `localhost`. To allow phones and other computers to connect:

**File:** `backend/src/server.js`

**Current:**
```javascript
app.listen(port, () => console.log(`API running on http://localhost:${port}`));
```

**Updated to accept all interfaces:**
```javascript
app.listen(port, '0.0.0.0', () => console.log(`API running on http://0.0.0.0:${port}`));
```

Then start the backend:
```bash
cd backend
npm start
```

The backend will now be accessible at `http://<YOUR_LAN_IP>:5000/api` from any device on your network.

---

## Running BookWise on Each Platform

### Windows Desktop

Run the prebuilt application:

```powershell
.\build\windows\x64\runner\Debug\book_recommendation_app.exe
```

Or rebuild and run:

```bash
cd frontend
flutter run -d windows
```

Backend URL: `http://localhost:5000/api` (automatic)

---

### Android Phone (via Android Studio or Physical Device)

#### Option 1: Over Local Network

**With Android Emulator:**
```bash
cd frontend
flutter run -d emulator-5554 --dart-define=API_BASE_URL=http://10.0.2.2:5000/api
```

**With Physical Android Phone:**
```bash
cd frontend
flutter run -d <DEVICE_ID> --dart-define=API_BASE_URL=http://<YOUR_LAN_IP>:5000/api
```

Replace `<DEVICE_ID>` with your device ID (run `flutter devices` to list).
Replace `<YOUR_LAN_IP>` with your computer's LAN IP (e.g., `192.168.1.100`).

**Example:**
```bash
flutter run -d emulator-5554 --dart-define=API_BASE_URL=http://10.0.2.2:5000/api
```

#### Option 2: Over Internet (Deployed API)

If you have a deployed backend:

```bash
cd frontend
flutter run -d <DEVICE_ID> --dart-define=API_BASE_URL=https://api.bookwise.example.com/api
```

---

### iOS Phone

```bash
cd frontend
flutter run -d <DEVICE_ID> --dart-define=API_BASE_URL=http://<YOUR_LAN_IP>:5000/api
```

Replace `<YOUR_LAN_IP>` with your computer's LAN IP.

---

### Web Browser

```bash
cd frontend
flutter run -d chrome
```

Backend URL: `http://localhost:5000/api` (automatic on the same machine).

For a deployed backend:

```bash
cd frontend
flutter run -d chrome --dart-define=API_BASE_URL=https://api.bookwise.example.com/api
```

---

## Network Connectivity Checklist

Before running BookWise on a phone:

1. ✓ Backend is running and listening on `0.0.0.0:5000`
2. ✓ Phone is on the same WiFi network as the computer
3. ✓ Phone can reach the backend IP (test with `ping <YOUR_LAN_IP>` from phone)
4. ✓ Firewall allows traffic on port 5000
5. ✓ Database credentials are correct in `.env`

---

## Responsive Design Features

The BookWise UI automatically adapts to:

- **Smartphones** (portrait and landscape)
- **Tablets** (landscape layouts)
- **Desktop** (wide layouts with sidebar)
- **Web browsers** (responsive columns)

### Adaptive Behaviors

- Touch gestures on phones and tablets
- Mouse/trackpad support on desktop and web
- Scroll behavior optimized per device
- Responsive navigation drawer
- Flexible card layouts
- Adaptive text sizing

---

## Troubleshooting

### "Connection Refused" on Phone

**Cause:** Backend not running or listening on all interfaces.

**Fix:**
1. Ensure backend is started: `npm start`
2. Check firewall settings
3. Verify the API_BASE_URL is correct for your network

### "API not found" Error

**Cause:** Wrong API URL configuration.

**Fix:** Double-check the `--dart-define=API_BASE_URL=` value matches your actual backend server.

### Phone Can't Find Backend on Local Network

**Cause:** Firewall or network isolation.

**Fix:**
1. Test connectivity: `ping <YOUR_LAN_IP>` from the phone
2. Disable firewall temporarily to test
3. Ensure phone and computer are on the same network

### App Crashes on Phone

**Cause:** Dart null safety or platform-specific code.

**Fix:**
1. Check Flutter analyzer: `flutter analyze`
2. Review error logs: `flutter logs`
3. Rebuild: `flutter clean && flutter run`

---

## Deployment to Production

When deploying BookWise to production:

1. Set up a cloud backend (AWS, Azure, Heroku, etc.)
2. Use `--dart-define=API_BASE_URL=https://your-api.example.com/api`
3. Build a release APK/iOS app or publish to app stores
4. Users can then install and use the app

---

## API Configuration Reference

The app automatically selects the API URL based on context:

| Platform | Default URL | Override |
|----------|-------------|----------|
| Windows/Web | `http://localhost:5000/api` | `--dart-define=API_BASE_URL=...` |
| Android Emulator | `http://10.0.2.2:5000/api` | `--dart-define=API_BASE_URL=...` |
| Android Phone | Must be specified | `--dart-define=API_BASE_URL=http://<YOUR_LAN_IP>:5000/api` |
| iOS | `http://localhost:5000/api` | `--dart-define=API_BASE_URL=...` |

---

## Building for Distribution

### Android APK

```bash
cd frontend
flutter build apk --release --dart-define=API_BASE_URL=https://your-api.com/api
```

Output: `build/app/outputs/flutter-apk/app-release.apk`

### iOS App

```bash
cd frontend
flutter build ios --release --dart-define=API_BASE_URL=https://your-api.com/api
```

### Windows EXE

```bash
cd frontend
flutter build windows --release
```

Output: `build/windows/x64/runner/Release/book_recommendation_app.exe`

---

## Summary

BookWise is now accessible on:

- **Windows Desktop** ✓
- **Android Phones** ✓
- **iOS Phones** ✓
- **Web Browsers** ✓
- **macOS** ✓

Use the `--dart-define=API_BASE_URL=` flag to point each device to your backend server, whether local or deployed.
