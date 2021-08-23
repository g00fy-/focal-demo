import axios from "axios"; // or redaxios

export const http = axios.create();

export interface DeviceListResponse {
  devices: DeviceModel[];
}

export interface DeviceImageModel {
  image_url: string;
  detected_at: string;
}

export interface DeviceConfigModel {
  imageQuality: number;
  brightness: number;
  wiFiSSID: string;
  wiFiAuth: number;
  wiFiPass: string;
}

export interface DeviceModel {
  device_name: string;
  ota_version: string;
  battery_level: number;
  battery_voltage: number;
  latest_status_at: string;
  aisle: string;
  latest_images: DeviceImageModel[];
  configs: DeviceConfigModel;
}


export async function fetchDevices(): Promise<DeviceModel[]> {
  const { data } = await http.get<DeviceListResponse>(`/api/devices`);
  return data.devices;
}
