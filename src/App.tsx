import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { timerState, roundState, goalState } from "./atoms";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { PlayCircleIcon, PauseIcon } from "@heroicons/react/20/solid";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgb(151, 197, 233);
`;

const Title = styled.h1`
  color: rgb(0, 24, 56);
`;

const Box = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PlayBtn = styled(motion.div)`
  margin: 50px 0px;
  width: 50px;
  height: 50px;
  font-size: 50px;
  color: rgb(0, 24, 56);
`;

const Content = styled.span`
  margin: 10px;
  color: rgb(0, 24, 56);
`;

const TimerBox = styled.div`
  margin-top: 30px;
  width: 300px;
  height: 250px;
  border-radius: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(0, 24, 56);
`;

const Timer = styled(motion.div)`
  color: white;
  font-size: 80px;
`;

const PlayBtnVar = {
  hover: { scale: 1.5 },
};

const TimerVar = {
  default: { scale: 0.5 },
  start: { scale: 1 },
};

export default function App() {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [timer, setTimer] = useRecoilState<number>(timerState);
  const [round, setRound] = useRecoilState<number>(roundState);
  const [goal, setGoal] = useRecoilState<number>(goalState);
  let intervalId: NodeJS.Timeout;
  useEffect(() => {
    if (isRunning) {
      intervalId = setInterval(() => {
        setTimer((current) => current - 1);
      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);
  const toggleTimer = () => {
    setIsRunning((prevState) => !prevState);
  };
  useEffect(() => {
    if (timer === 0) {
      setRound((current) => current + 1);
      setTimer(25 * 60);
      setIsRunning(false);
    }
  }, [timer, setRound, setTimer]);
  useEffect(() => {
    if (round === 4) {
      setGoal((current) => current + 1);
      setRound(0);
    }
    if (goal === 12) {
      setGoal(0);
    }
  }, [round, setRound, setGoal]);
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };
  return (
    <Wrapper>
      <Title>Pomodoro</Title>
      <TimerBox>
        <AnimatePresence mode="wait">
          <Timer
            key={timer}
            variants={TimerVar}
            initial="default"
            animate="start"
          >
            {formatTime(timer)}
          </Timer>
        </AnimatePresence>
      </TimerBox>
      <Box>
        <PlayBtn variants={PlayBtnVar} whileHover="hover" onClick={toggleTimer}>
          {isRunning ? (
            <PauseIcon className="h-6 w-6 text-gray-500" />
          ) : (
            <PlayCircleIcon className="h-6 w-6 text-gray-500" />
          )}
        </PlayBtn>
      </Box>
      <Box>
        <Content>{round}/4 ROUND</Content>
        <Content>{goal}/12 GOAL</Content>
      </Box>
    </Wrapper>
  );
}
