import { StoreType } from "@/lib/store";
import { createSlice } from "@reduxjs/toolkit";

export type HabitItem = {
  id: String;
  name: String;
  repeatSchema: String;
  doneDays: HabitDay[];
  createdAt: Date | number;
  startAt: Date | number | null;
  endsAt: Date | number | null;
};

export type HabitDay = {
  id: String;
  date: String;
  habitId: String;
};

export const habitsSlice = createSlice({
  name: "habits",
  initialState: {
    items: [],
  },
  reducers: {
    setItems: (state, action) => {
      const parsedHabits = action.payload.map((item: any) => {
        return {
          ...item,
          createdAt: new Date(item.createdAt).getTime(),
          startAt: new Date(item.createdAt).getTime(),
          endsAt: new Date(item.createdAt).getTime(),
        };
      });
      state.items = parsedHabits;
    },
    addItem: (state: any, action) => {
      const parsedItem = {
        ...action.payload,
        createdAt: new Date(action.payload.createdAt).getTime(),
      };
      state.items = [...state.items, parsedItem];
    },
    removeItem: (state: any, action: { payload: string }) => {
      state.items = [
        ...state.items.filter((i: any) => i.id !== action.payload),
      ];
    },
    toggleHabitString: (
      state: any,
      action: { payload: { habitId: string; str: string } }
    ) => {
      state.items = state.items.map((i: any) => {
        if (i.id === action.payload.habitId) {
          return {
            ...i,
            doneDays: i.doneDays.some((x: any) => x.date === action.payload.str)
              ? i.doneDays.filter((x: any) => x.date !== action.payload.str)
              : [
                  ...i.doneDays,
                  { id: "blblbl", habitId: i.id, date: action.payload.str },
                ],
          };
        }
        return i;
      });
    },
  },
});

export const { setItems, addItem, removeItem, toggleHabitString } =
  habitsSlice.actions;

export const selectHabits = (state: StoreType) => state.habits.items;
