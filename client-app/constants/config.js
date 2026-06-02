import { Platform } from 'react-native';

// Set your development machine's local IP address here if testing on a physical iOS/Android device.
// You can find your IP address using `ipconfig getifaddr en0` (macOS) or `ipconfig` (Windows).
const DEV_MACHINE_IP = 'localhost'; 

const getBaseURL = () => {
  // If running on iOS Simulator (Xcode), use localhost
  if (Platform.OS === 'ios') {
    return `http://localhost:8080/`;
  }
  
  // If running on Android Emulator, use the emulator loopback gateway
  return `http://10.0.2.2:8080/`;
};

export const BASE_URL = getBaseURL();
export const API_URL = `${BASE_URL}api/`; // If server endpoints are prefixed, otherwise just BASE_URL
