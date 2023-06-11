import { atom } from "recoil";

export const timerState = atom<number>({
  key: "timerState",
  default: 25 * 60,
});

export const roundState = atom<number>({
  key: "roundState",
  default: 0,
});

export const goalState = atom<number>({
  key: "goalState",
  default: 0,
});
