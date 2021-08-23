import React from "react";
import { DeviceTelemetries } from "./DeviceTelemetries";
import { DeviceImageModel, DeviceModel } from "../api";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogProps,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  makeStyles
} from "@material-ui/core";
import { formatDateTime } from "../utils";

export type DeviceDetailsDialogProps = { device?: DeviceModel } & DialogProps;

export const DeviceDetailsDialog: React.FC<DeviceDetailsDialogProps> = ({
  device,
  ...props
}) => {
  return (
    <Dialog {...props}>
      {device && (
        <>
          <DialogTitle>Camera {device.device_name}</DialogTitle>
          <DialogContent className="mb-8">
            {device.latest_images?.length > 0 && (
              <ImageSlider images={device.latest_images.slice(0, 3) /* last 3 pictures */} />
            )}
            <DeviceTelemetries device={device} />
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};


const ImageSlider: React.FC<{ images: DeviceImageModel[] }> = ({ images }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ImageList rowHeight={180} cols={1} className={classes.imageList}>
        {images.map((image, index) => {
          const title = formatDateTime(image.detected_at);
          return (
            <ImageListItem
              className={classes.imageItem}
              key={
                String(
                  index
                ) /* index is not a good key - but duplicates in urls */
              }
            >
              <img alt={title} src={image.image_url} />
              <ImageListItemBar title={title} />
            </ImageListItem>
          );
        })}
      </ImageList>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  imageList: {
    width: 500,
    height: 180,
    scrollSnapType: "y mandatory",
    // flexWrap: "nowrap",
    transform: "translateZ(0)"
  },
  imageItem: {
    scrollSnapAlign: "start"
  }
}));