/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useMemo } from "react";
import { makeStyles, Button, LinearProgress } from "@material-ui/core";
import { debounce } from "lodash";
import { useToggle } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import {
  devicesSlice,
  visibleDevices,
  avaibleAisles,
  RootState
} from "../reducers";
import { RegisterDeviceDialog } from "./RegisterDeviceDialog";
import { SearchCriteria } from "./SearchCriteria";
import { DeviceList } from "./DeviceList";

const { actions } = devicesSlice;

export const DeviceListContainer: React.FC = () => {

  const classes = useStyles();

  const registerDeviceDialog = useToggle();
  const dispatch = useDispatch();
  const devices = useSelector(visibleDevices);
  const loading = useSelector((state: RootState) => state.loading);
  const aisles = useSelector(avaibleAisles);

  const onSearch = useMemo(
    () =>
      debounce((args) => {
        /** debouncing when user still typing */
        dispatch(actions.filter(args));
      }, 200),
    [dispatch]
  );

  const handleRegister = (input: { name: string; aisle: string }) => {
    // this should be handled by BE - but no details provided
    dispatch(actions.registerDevice(input));
    registerDeviceDialog.close();
  };

  const searchOptions = useMemo(
    () => ({
      aisle: aisles
    }),
    [aisles]
  );

  useEffect(() => {
    dispatch(actions.load());
  }, [dispatch]);

  return (
    <>
      <div>
        <SearchCriteria
          batteryPercentLevel={20}
          options={searchOptions}
          onSearch={onSearch}
        />
        <RegisterDeviceDialog
          open={registerDeviceDialog.value}
          onClose={registerDeviceDialog.close}
          onRegister={handleRegister}
        />
        <Button
          className={classes.registerButton}
          variant="contained"
          color="primary"
          type="submit"
          onClick={registerDeviceDialog.open}
        >
          Register device
        </Button>
      </div>
      {loading && <LinearProgress />}
      <DeviceList devices={devices} loading={loading} />
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  registerButton: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));
