import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export interface LayoutState {
  nowPath: string;
  pageLoading: boolean;
}

const initialState: LayoutState = {
  nowPath: '',
  pageLoading: true,
}

export const LayoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setNowPath: (state, action) => {
      state.nowPath = action.payload
    },
    setPageLoading: (state, action) => {
      state.pageLoading = action.payload
    },
  },
})

export const { setNowPath, setPageLoading } = LayoutSlice.actions

export const selectNowPath: (state: RootState) => any = (state) =>
  state.layout.nowPath

export const selectPageLoading: (state: RootState) => any = (state) =>
  state.layout.pageLoading

export default LayoutSlice.reducer
