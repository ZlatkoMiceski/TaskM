import Card from "../../app/UI/Card";
import classes from "./ResultForm.module.css";

import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import data from "../../data";
import { Button } from "@mui/material";

function ResultForm() {
  const cityOfOrigin = useSelector((state) => state.city.cityOrigin);
  const cityOfDestination = useSelector((state) => state.city.cityDestination);
  const cityOfOption = useSelector((state) => state.city.cityOption);

  const navigate = useNavigate();

  let cityOriginLat = 0;
  let cityOriginLong = 0;
  let cityDestinationLat = 0;
  let cityDestinationLong = 0;
  let cityOptionLat = 0;
  let cityOptionLong = 0;

  for (let i = 0; i < data.length; i++) {
    if (cityOfOrigin === data[i][0]) {
      cityOriginLat = data[i][1];
      cityOriginLong = data[i][2];
    }
    if (cityOfDestination === data[i][0]) {
      cityDestinationLat = data[i][1];
      cityDestinationLong = data[i][2];
    }
    if (cityOfOption === data[i][0]) {
      cityOptionLat = data[i][1];
      cityOptionLong = data[i][2];
    }
  }

  function calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    return d;
  }

  function toRad(Value) {
    return (Value * Math.PI) / 180;
  }

  let distFirst = 0;
  let distSec = 0;

  if (cityOfOption) {
    distFirst = calcCrow(
      cityOriginLat,
      cityOriginLong,
      cityOptionLat,
      cityOptionLong
    );
    distSec = calcCrow(
      cityOptionLat,
      cityOptionLong,
      cityDestinationLat,
      cityDestinationLong
    );
  }

  const distance = calcCrow(
    cityOriginLat,
    cityOriginLong,
    cityDestinationLat,
    cityDestinationLong
  );

  const resultOne = (
    <>
      <h3 className={classes.right}>{cityOfOrigin}</h3>
      <h3 className={classes.left}>{distance.toFixed(2)} km</h3>
      <h3 className={classes.right}>{cityOfDestination}</h3>
      <h3>{distance.toFixed(2)} km is the Total distance</h3>
    </>
  );

  const resultTwo = (
    <>
      <h3 className={classes.right}>{cityOfOrigin}</h3>
      <h3 className={classes.left}>{distFirst.toFixed(2)} km</h3>
      <h3 className={classes.right}>{cityOfOption}</h3>
      <h3 className={classes.left}>{distSec.toFixed(2)} km</h3>
      <h3 className={classes.right}>{cityOfDestination}</h3>
      <h3>{(distFirst + distSec).toFixed(2)} km is Total Distance</h3>
    </>
  );

  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  const formattedToday = dd + '/' + mm + '/' + yyyy;

  return (
    <Card>
      {cityOfOption ? resultTwo : resultOne}
      <h3>{formattedToday}</h3>
      <Button
      sx={{ color: "white", backgroundColor: "black" }}
        onClick={() => {
          navigate("/");
        }}
      >
        Back
      </Button>
    </Card>
  );
}

export default ResultForm;
