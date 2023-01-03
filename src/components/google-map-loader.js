import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { places } from "./places";
import { useState } from "react";

function GoogleMapLoader() {
  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [starting, setStarting] = useState();
  const [destination, setDestination] = useState();

  const MAP_KEY = "AIzaSyDKmO6nfk2-GzsEh2tgfjv8TNz_0PBcaso";

  const containerStyle = {
    width: "99vw",
    height: "90vh",
  };

  const handleStarting = (e) => {
    setStarting(e.target.value);
    console.log(starting);
  };

  const handleDestination = (e) => {
    setDestination(e.target.value);
    console.log(destination);
  };

  async function calculateRoute() {
    if (starting === "" || destination === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: starting,
      destination: destination,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
    console.log(distance);
    console.log(duration);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    setStarting("");
    setDestination("");
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 3,
          padding: 1,
          sm: 4,
        }}
      >
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

        <ButtonGroup variant="contained">
          <Button color="error" onClick={calculateRoute}>
            Route
          </Button>
          <Button onClick={clearRoute}>Clear</Button>
          <Button
            color="success"
            variant="contained"
            onClick={() => {
              map.panTo(places.entry);
              map.setZoom(20);
            }}
          >
            Center
          </Button>
        </ButtonGroup>
      </Box>

      <Grid
        position="relative"
        flexDirection="column"
        alignItems="center"
        h="100vh"
        w="100vw"
      >
        <Box position="absolute" left={0} top={0} h="100%" w="100%">
          <LoadScript googleMapsApiKey={MAP_KEY}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={places.entry}
              zoom={20}
              mapTypeId="satellite"
              onLoad={(map) => setMap(map)}
            >
              {/*           {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )} */}
              <Marker position={places.entry} />
              <Marker position={places.computing} />
              <Marker position={places.accounting} />
            </GoogleMap>
          </LoadScript>
        </Box>
      </Grid>
    </>
  );
}

export default GoogleMapLoader;
