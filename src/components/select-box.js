import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { places } from "./places";

export default function SelectBox(props) {
  const {
    show,
    handleClose,
    calculateRoute,
    handleStarting,
    handleDestination,
  } = props;

  return (
    <div>
      <Dialog disableEscapeKeyDown open={show} onClose={handleClose}>
        <DialogTitle>Choose Places in the Tersan</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-dialog-native">Start</InputLabel>
              <Select
                id="demo-dialog-native"
                onChange={handleStarting}
                input={<OutlinedInput label="Age" />}
              >
                <MenuItem value="" disabled>
                  Select
                </MenuItem>
                <MenuItem value={places.entry}>Entry</MenuItem>
                <MenuItem value={places.computing}>Computing</MenuItem>
                <MenuItem value={places.accounting}>Accounting</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-dialog-select-label">End</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                onChange={handleDestination}
                input={<OutlinedInput label="Age" />}
              >
                <MenuItem value="" disabled>
                  Select
                </MenuItem>
                <MenuItem value={places.entry}>Entry</MenuItem>
                <MenuItem value={places.computing}>Computing</MenuItem>
                <MenuItem value={places.accounting}>Accounting</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={calculateRoute}>Route</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
