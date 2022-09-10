import React, { useState, useRef } from "react";
import Clock from "./Clock";
import ProgressBar from "./ProgressBar";
import { getMinutesAndSecondsFromDurationInSeconds } from "../lib/time";

const CurrentTimebox = ({ isEditable, title, totalTimeInMinutes, onEdit }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [pausesCount, setPausesCount] = useState(0);
  const [elapsedTimeInSeconds, setElapsedTimeInSeconds] = useState(0);

  const intervalId = useRef(null);

  const handleStart = (event) => {
    setIsRunning(true);
    startTimer();
  };

  const handleStop = (event) => {
    setIsRunning(false);
    setIsPaused(false);
    setPausesCount(0);
    setElapsedTimeInSeconds(0);
    stopTimer();
  };

  const startTimer = () => {
    if (intervalId.current === null) {
      intervalId.current = setInterval(() => {
        setElapsedTimeInSeconds((prev) => prev + 0.1);
      }, 100);
    }

    return () => clearInterval(intervalId.current);
  };

  const stopTimer = () => {
    intervalId.current = null;
    clearInterval(intervalId.current);
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
    if (isPaused) {
      stopTimer();
    } else {
      setPausesCount((prev) => prev + 1);
      startTimer();
    }
  };

  const totalTimeInSeconds = totalTimeInMinutes * 60;
  const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;
  const [minutesLeft, secondsLeft] =
    getMinutesAndSecondsFromDurationInSeconds(timeLeftInSeconds);
  const progressInPercent = (elapsedTimeInSeconds / totalTimeInSeconds) * 100.0;

  return (
    <div className={`CurrentTimebox ${isEditable ? "inactive" : ""}`}>
      <h1>{title}</h1>
      <Clock
        minutes={minutesLeft}
        seconds={secondsLeft}
        className={isPaused ? "inactive" : ""}
      />
      <ProgressBar
        percent={progressInPercent}
        className={isPaused ? "inactive" : ""}
        color="red"
        big
      />
      <button onClick={onEdit} disabled={isEditable}>
        Edytuj
      </button>
      <button onClick={handleStart} disabled={isRunning}>
        Start
      </button>
      <button onClick={handleStop} disabled={!isRunning}>
        Stop
      </button>
      <button onClick={togglePause} disabled={!isRunning}>
        {isPaused ? "Wznów" : "Pauzuj"}
      </button>
      Liczba przerw: {pausesCount}
    </div>
  );
};

export default CurrentTimebox;
