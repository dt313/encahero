// utils/device.ts
import * as Device from 'expo-device';

export default function getDeviceFingerprint() {
    return `${Device.osName}-${Device.osVersion}-${Device.modelName}`;
}
