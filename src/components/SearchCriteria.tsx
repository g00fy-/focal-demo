/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useRef, useState } from "react";
import {
  makeStyles,
  TextField,
  Select,
  FormControl,
  InputLabel,
  FormControlLabel,
  Grid,
  Checkbox
} from "@material-ui/core";

export interface SearchCriteriaProps {
  options?: {
    aisle?: string[];
  };
  batteryPercentLevel?: number;
  onSearch?: (args: {
    name: string;
    aisle: string;
    batteryLevel: number | null;
  }) => void;
}

export const SearchCriteria: React.FC<SearchCriteriaProps> = ({
  batteryPercentLevel = 20,
  options = {
    aisle: []
  },
  ...props
}) => {
  // Create filters where we can to search cameras by name, aisle and battery level less than 20%

  // chosing not to connect SearchCriteria with state.filters
  // if needed value fo the filters can be passed as prop
  // and this component will remain "presentational"

  const classes = useStyles();
  const nameRef = useRef<HTMLInputElement>(null);
  const aisleRef = useRef<HTMLSelectElement>(null);
  const batteryRef = useRef<HTMLInputElement>(null);

  const handleChange = () => {
    const name = nameRef.current!.value;
    const aisle = aisleRef.current!.value;
    const battery = batteryRef.current!.checked;

    const args = {
      name,
      aisle,
      batteryLevel: battery ? batteryPercentLevel / 100 : null
    };
    props.onSearch?.(args);
  };

  return (
    <form>
      <Grid container spacing={3} justifyContent="space-between">
        <Grid item xs={8}>
          <TextField
            className={classes.formControl}
            inputRef={nameRef}
            onChange={handleChange}
            id="name"
            name="name"
            label="Device name"
          />
          <FormControl className={classes.formControl}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="aisle-select">Aisle</InputLabel>
              <Select
                native
                inputRef={aisleRef}
                onChange={handleChange}
                inputProps={{
                  name: "aisle",
                  id: "aisle-select"
                }}
              >
                <option aria-label="None" value="" />
                {options.aisle?.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </Select>
            </FormControl>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            className={classes.formControl}
            control={
              <NativeCheckbox
                onChange={handleChange}
                inputRef={batteryRef}
                name="betteryWarning"
              />
            }
            label={
              batteryPercentLevel
                ? `Battery under ${batteryPercentLevel}%`
                : null
            }
          />
        </Grid>
      </Grid>
    </form>
  );
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginRight: theme.spacing(1),
    minWidth: 120
  }
}));

const NativeCheckbox: typeof Checkbox = (props) => {
  const [value, setValue] = useState(props.checked ?? false);
  const onChange: React.ComponentProps<typeof Checkbox>["onChange"] = (
    e,
    checked
  ) => {
    e.target.checked = checked;
    setValue(checked);
    props.onChange?.(e, checked);
  };
  return <Checkbox checked={value} {...props} onChange={onChange} />;
};
