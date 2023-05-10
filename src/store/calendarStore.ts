import { create } from 'zustand';

type CalendarState = {
  year: number;
  month: number;
  date: string;
};

type CalendarAction = {
  getYearStore: () => number;
  getMonthStore: () => number;
  getDateStore: () => string;
  setYearStore: (year: number) => void;
  setMonthStore: (month: number) => void;
  setDateStore: (date: string) => void;
};

type CalendarStore = CalendarState & CalendarAction;

const today = new Date();
const calendarState = create<CalendarStore>((set, get) => ({
  year: today.getFullYear(),
  month: today.getMonth() + 1,
  date: '',
  getYearStore: () => get().year,
  getMonthStore: () => get().month,
  getDateStore: () => get().date,
  setYearStore: (year: number) => set({ year }),
  setMonthStore: (month: number) => set({ month }),
  setDateStore: (date: string) => set({ date }),
}));

export const useCalendarState = () => calendarState((state) => state);