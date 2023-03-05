import Card from "../../app/UI/Card";
import classes from "./SearchForm.module.css";

import { Autocomplete, Box, Button, Grid } from "@mui/material";
import { TextField } from "@material-ui/core";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { cityActions } from "./city-slice";

import { useNavigate } from "react-router-dom";

//import data from "../../data";

import { timeout } from "../../dataAPI";

function SearchForm() {
  const [validationOrigin, setValidationOrigin] = useState(true);
  const [validationDestination, setValidationDestination] = useState(true);
  const [optCity, setOptCity] = useState(false);
  const [data, setData] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    timeout().then((m) => {
      setData(m);
    });
  }, []);

  function cityOriginHandler(e, value) {
    dispatch(cityActions.setCityOfOrigin(value));
    if (!value) {
      setValidationOrigin(false);
    } else {
      setValidationOrigin(true);
    }
  }

  function cityDestinationHandler(e, value) {
    dispatch(cityActions.setCityOfDestination(value));
    if (!value) {
      setValidationDestination(false);
    } else {
      setValidationDestination(true);
    }
  }

  function cityOptionalHandler(e, value) {
    dispatch(cityActions.setCityOfOption(value));
  }

  function submitHandler() {
    if (validationOrigin && validationDestination) {
      navigate("/results");
    }
  }

  const optionalCity = (
    <Autocomplete
      sx={{
        margin: 3,
        borderRadius: "7px",
        border: "3px solid gray",
      }}
      options={data.map((item) => {
        return item[0];
      })}
      renderInput={(params) => <TextField {...params} label="City of Option" />}
      onChange={cityOptionalHandler}
    />
  );

  function addHandler() {
    setOptCity(!optCity);
  }

  return (
    <>
      <Card>
        <Grid container>
          <Grid item xs={2}>
            <Button
              sx={{ marginTop: 15 }}
              startIcon={<ControlPointIcon />}
              onClick={addHandler}
            ></Button>
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              sx={{
                margin: 3,
                borderRadius: "7px",
                border: validationOrigin ? "3px solid gray" : "3px solid red",
              }}
              options={data.map((item) => {
                return item[0];
              })}
              renderInput={(params) => (
                <TextField {...params} label="City of origin" />
              )}
              onChange={cityOriginHandler}
            />
            {!validationOrigin && (
              <p className={classes.alert}>You must choose city of origin</p>
            )}
            {optCity && optionalCity}
            <Autocomplete
              sx={{
                margin: 3,
                borderRadius: "7px",
                border: validationDestination
                  ? "3px solid gray"
                  : "3px solid red",
              }}
              freeSolo
              options={data.map((item) => {
                return item[0];
              })}
              renderInput={(params) => (
                <TextField {...params} label="City of Destination" />
              )}
              onChange={cityDestinationHandler}
            />
            {!validationDestination && (
              <p className={classes.alert}>
                You must choose city of Destination
              </p>
            )}
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={3}>
            <Box sx={{ margin: 3, borderRadius: 3, border: "3px solid gray" }}>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <Button sx={{ marginTop: "12%", backgroundColor: "#C7D1F4" }}>
                    -
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <h3>10</h3>
                </Grid>
                <Grid item xs={4}>
                  <Button sx={{ marginTop: "12%", backgroundColor: "#C7D1F4" }}>
                    +
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ margin: 3, borderRadius: 3, border: "3px solid gray" }}>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <Button sx={{ marginTop: "12%", backgroundColor: "#C7D1F4" }}>
                    -
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <h3>10</h3>
                </Grid>
                <Grid item xs={4}>
                  <Button sx={{ marginTop: "12%", backgroundColor: "#C7D1F4" }}>
                    +
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Button
          onClick={submitHandler}
          sx={{
            color: "white",
            backgroundColor:
              validationDestination && validationOrigin ? "black" : "#E5E7EB",
          }}
        >
          Submit
        </Button>
      </Card>
    </>
  );
}

export default SearchForm;
