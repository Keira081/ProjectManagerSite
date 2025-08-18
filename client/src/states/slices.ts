import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface initialStateTypes {
  isSidebarCollapsed: boolean;
  isShowGroups: boolean;
  isDarkMode: boolean;
  isShowProjects: boolean;
  isShowTeams: boolean;
}

const initialState: initialStateTypes = {
  isSidebarCollapsed: true,
  isShowGroups: true,
  isDarkMode: true,
  isShowProjects: false,
  isShowTeams: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },

    setIsShowGroups: (state, action: PayloadAction<boolean>) => {
      state.isShowGroups = action.payload;
    },

    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },

    setIsShowProjects: (state, action: PayloadAction<boolean>) => {
      state.isShowProjects = action.payload;
    },

    setIsShowTeams: (state, action: PayloadAction<boolean>) => {
      state.isShowTeams = action.payload;
    },
  },
});

export const {
  setIsDarkMode,
  setIsShowGroups,
  setIsSidebarCollapsed,
  setIsShowProjects,
  setIsShowTeams,
} = globalSlice.actions;
export default globalSlice.reducer;
