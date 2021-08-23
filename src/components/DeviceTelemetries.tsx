import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";
import { DeviceModel } from "../api";
import { formatDateTime, formatValue } from "../utils";

export const DeviceTelemetries: React.FC<{ device: DeviceModel }> = ({
  device
}) => {
  const rows = [
    {
      title: "battery level",
      value: device.battery_level ? formatValue(device.battery_level * 100, 2) + "%" : null
    },
    {
      title: "last wakeup time",
      value: formatDateTime(device.latest_status_at)
    },
    { title: "image quality", value: device.configs.imageQuality },
    { title: "brightness", value: device.configs.brightness },
    { title: "wifi SSID", value: device.configs.wiFiSSID },
    { title: "wifi auth", value: device.configs.wiFiAuth },
    { title: "wifi password", value: device.configs.wiFiPass }
  ];

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>Telemetrics</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.title}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
