import { create } from 'zustand';

type CalendarState = {
  year: number;
  month: number;
};

type CalendarAction = {
  setYearStore: (year: number) => void;
  setMonthStore: (month: number) => void;
};

type CalendarStore = CalendarState & CalendarAction;

const calendarState = create<CalendarStore>((set) => ({
  year: 0,
  month: 0,
  setYearStore: (year: number) => set({ year }),
  setMonthStore: (month: number) => set({ month }),
}));

export const useCalendarState = () => calendarState((state) => state);