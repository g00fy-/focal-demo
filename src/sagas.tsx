import { call, put, takeLatest } from "redux-saga/effects";
import * as api from "./api";
import { devicesSlice } from "./reducers";

function* fetchDevices() {
  try {
    const devices: api.DeviceModel[] = yield call(api.fetchDevices);
    yield put(devicesSlice.actions.loadSucceded(devices));
  } catch (e) {
    yield put(devicesSlice.actions.loadFailed(e.message));
  }
}

export function* devicesSaga() {
  yield takeLatest(devicesSlice.actions.load().type, fetchDevices);
}
