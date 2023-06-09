import { useEffect, useState } from "react";


export default function App() {
  const [timer, setTimer] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const toggleTimer = () => {
    setInterval(() => {
      setTimer(prevTimer => prevTimer-1)
    }, 1000)
    setIsRunning(prevState => !prevState)
  }
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };
  return <div>
    <h1>Pomodoro</h1>
    <div>
      <p>{formatTime(timer)}</p>
      <button onClick={toggleTimer}>{isRunning ? "pause" : "start"}</button>
    </div>
    <span>0/4 ROUND</span>
    <span>0/12 GOAL</span>
  </div>;
}
