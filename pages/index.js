import React, { useState, useEffect } from 'react';

const PomodoroTimer = () => {
  const [workDuration, setWorkDuration] = useState(25); // Default work duration
  const [breakDuration, setBreakDuration] = useState(5); // Default break duration
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
      // When the timer reaches 0, switch between work and break
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
    setWorkDuration(25); // Reset to default work duration
    setBreakDuration(5); // Reset to default break duration
    setTimeLeft(25 * 60); // Reset to default work duration
  };

  const handleSet = () => {
    // Handle setting custom work and break durations
    if (!isRunning && (workDuration !== 0 || breakDuration !== 0)) {
      setTimeLeft(workDuration * 60);
    } else if(workDuration === 0 || breakDuration === 0){
        if(workDuration === 0 && breakDuration === 0){
          setWorkDuration(25);
          setBreakDuration(5);
          
        }else{
          setWorkDuration(workDuration);
          setBreakDuration(workDuration);
        }
    }
  };

  return (
    <div>
      <div>
        <label>Work Duration (minutes):</label>
        <input
          type="number"
          value={workDuration}
          onChange={(e) => setWorkDuration(parseInt(e.target.value))}
          data-testid="work-duration"
          disabled={isRunning}
        />
      </div>
      <div>
        <label>Break Duration (minutes):</label>
        <input
          type="number"
          value={breakDuration}
          onChange={(e) => setBreakDuration(parseInt(e.target.value))}
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
        <button onClick={handleSet} data-testid="set-btn" disabled={isRunning}>
          Set
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
