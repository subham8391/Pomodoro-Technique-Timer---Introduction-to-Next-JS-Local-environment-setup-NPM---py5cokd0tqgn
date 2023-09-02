import React, { useState, useEffect } from 'react';

const PomodoroTimer = () => {
  const [workDuration, setWorkDuration] = useState(25); 
  const [breakDuration, setBreakDuration] = useState(5); 
  const [isWorking, setIsWorking] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(workDuration * 60);

  useEffect(() => {
    let timer;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
     
      setIsWorking(!isWorking);
      const newDuration = isWorking ? breakDuration : workDuration;
      setTimeLeft(newDuration * 60);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, isWorking, workDuration, breakDuration]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsWorking(true);
    setTimeLeft(workDuration * 60);
  };

  const handleWorkDurationChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setWorkDuration(value);
      setTimeLeft(value * 60);
    }
  };

  const handleBreakDurationChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setBreakDuration(value);
    }
  };

  return (
    <div>
      <div>
        <label>Work Duration (minutes):</label>
        <input
          type="number"
          value={workDuration}
          onChange={handleWorkDurationChange}
          data-testid="work-duration"
          disabled={isRunning}
        />
      </div>
      <div>
        <label>Break Duration (minutes):</label>
        <input
          type="number"
          value={breakDuration}
          onChange={handleBreakDurationChange}
          data-testid="break-duration"
          disabled={isRunning}
        />
      </div>
      <div>
        <p>{isWorking ? 'Work Time' : 'Break Time'}</p>
        <p>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</p>
      </div>
      <div>
        <button onClick={handleStart} data-testid="start-btn" disabled={isRunning}>
          Start
        </button>
        <button onClick={handleStop} data-testid="stop-btn" disabled={!isRunning}>
          Stop
        </button>
        <button onClick={handleReset} data-testid="reset-btn" disabled={isRunning}>
          Reset
        </button>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div id='main'>
      <PomodoroTimer />
    </div>
  );
};

export default App;

