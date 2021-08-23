/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from "react";
import { Grid, Box, Typography, makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { DeviceDetailsDialog } from "./DeviceDetailsDialog";
import { DeviceImageModel, DeviceModel } from "../api";
import { formatDateTime, useToggle } from "../utils";

export type DeviceListProps = {
  devices?: DeviceModel[];
  loading?: boolean;
}
export const DeviceList: React.FC<DeviceListProps> = ({ devices = [], loading = false }) => {
  // List of devices with last taken picture and status details - remember that some devices could have no picture
  const [active, setActive] = useState<DeviceModel>(null!);
  const detailsDialog = useToggle();

  const width = 400;
  const height = 210;

  return (
    <>
      <DeviceDetailsDialog
        device={active}
        open={detailsDialog.value && active ? true : false}
        onClose={detailsDialog.close}
      />
      <Grid container>
        {!loading && devices.length === 0 && (
          <Typography gutterBottom variant="body2">
            No devices
          </Typography>
        )}
        {loading && devices.length === 0
          ? Array.from({ length: 8 }).map((_, index) => (
              <Box key={index} width={width} marginRight={0.5} my={5}>
                <Skeleton variant="rect" width={width} height={height} />
                <Box pt={0.5}>
                  <Skeleton />
                  <Skeleton width="60%" />
                </Box>
              </Box>
            ))
          : devices.map((device, index) => (
              <Box
                key={index}
                width={width}
                marginRight={0.5}
                my={5}
                onClick={() => {
                  setActive(device);
                  detailsDialog.open();
                }}
              >
                <DeviceImage image={device.latest_images[0]} alt={device.device_name} />

                <Box pr={2}>
                  <Typography gutterBottom variant="body2">
                    {device.device_name}
                  </Typography>
                  <Typography
                    display="block"
                    variant="caption"
                    color="textSecondary"
                  >
                    {device.aisle}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {formatDateTime(device.latest_status_at)}
                  </Typography>
                </Box>
              </Box>
            ))}
      </Grid>
    </>
  );
};

type DeviceImageProps = {
  image?: DeviceImageModel;
  height?: number;
  width?: number;
  alt: string;
};

const useDeviceImageStyles = makeStyles((theme) => ({
  noImageContainer: {
    position: "relative",
    cursor: 'pointer'
  },
  noImageText: {
    ...theme.typography.button,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    cursor: 'pointer'
  }
}));

const DeviceImage: React.FC<DeviceImageProps> = ({
  image,
  height = 200,
  width = 400,
  alt
}) => {
  const classess = useDeviceImageStyles();
  return image ? (
    <img className={classess.image} style={{ width, height }} alt={alt} src={image.image_url} />
  ) : (
    <div className={classess.noImageContainer}>
      <Skeleton variant="rect" width={width} height={height} />
      <div className={classess.noImageText}>No image</div>
    </div>
  );
};
