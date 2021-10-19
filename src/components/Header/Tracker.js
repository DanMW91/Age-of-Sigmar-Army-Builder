import React from 'react'
import { useState } from "react";
import classes from "./Tracker.module.css";
import upArrow from "../../assets/up-arrow.png";
import downArrow from "../../assets/down-arrow.png";

const Tracker = (props) => {
  const [currentPoints, setCurrentPoints] = useState(0);

  const onIncrementHandler = () => {
    setCurrentPoints((prevState) => {
      return prevState + 1;
    });
  };

  const onDecrementHandler = () => {
    if (currentPoints > 0)
      setCurrentPoints((prevState) => {
        return prevState - 1;
      });
  };

  return (
    <div className={classes.tracker}>
      <div className={classes.tracking}>
        <h2>{props.trackType}</h2>
      </div>
      <div className={classes.counter}>
        <img src={upArrow} alt="" onClick={onIncrementHandler} />

        <div className={classes.number}>{currentPoints}</div>
        <img src={downArrow} alt="" onClick={onDecrementHandler} />
      </div>
    </div>
  );
};

export default Tracker;
