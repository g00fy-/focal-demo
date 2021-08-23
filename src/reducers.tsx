import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DeviceModel } from "./api";

const initialState = {
  loading: true,
  error: null as string | null,
  devices: [] as DeviceModel[],
  filters: {
    name: null,
    aisle: null,
    batteryLevel: null
  } as Filters
};

/* @reduxjs/toolkit via immer supports mutating style */
export const devicesSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {
    load: (state) => {
      state.loading = true;
    },
    loadSucceded: (state, action: PayloadAction<DeviceModel[]>) => {
      state.loading = false;
      state.devices = action.payload;
    },
    loadFailed: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    filter: (state, action: PayloadAction<Filters>) => {
      state.filters = action.payload;
    },
    registerDevice: (
      state,
      action: PayloadAction<{ name: string; aisle: string }>
    ) => {
      /* normally this should be handled by BE & saga */
      const { name, aisle } = action.payload;
      const device: DeepNullable<DeviceModel> = {
        device_name: name,
        ota_version: null,
        battery_level: null,
        battery_voltage: null,
        latest_status_at: null,
        aisle,
        latest_images: [],
        configs: {
          imageQuality: null,
          brightness: null,
          wiFiSSID: null,
          wiFiAuth: null,
          wiFiPass: null
        }
      };
      state.devices.unshift(device as DeviceModel);
    }
  }
});

const strSearch = (value: string, pattern: string) =>
  value.toLowerCase().includes(pattern.toLowerCase());

export const visibleDevices = (state: RootState) => {
  const { filters } = state;
  return state.devices.filter((device) => {
    if (filters.name) {
      if (!strSearch(device.device_name, filters.name)) return false;
    }
    if (filters.aisle) {
      if (device.aisle !== filters.aisle) return false;
    }
    if (filters.batteryLevel) {
      if (device.battery_level > filters.batteryLevel) return false;
    }
    return true;
  });
};

export const avaibleAisles = (state: RootState) => {
  return Array.from(new Set(state.devices.map((d) => d.aisle)));
};

interface Filters {
  name: string | null;
  aisle: string | null;
  batteryLevel: number | null;
}

export type RootState = typeof initialState;

type DeepNullable<T> = {
  [K in keyof T]: DeepNullable<T[K]> | null;
};
