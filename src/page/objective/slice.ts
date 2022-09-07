import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
export interface ObjectiveState {
  objectiveData: any;
}

const initialState: ObjectiveState = {
  objectiveData: null,
}

export const objectiveSlice = createSlice({
  name: 'objective',
  initialState,
  reducers: {
    setObjectiveData: (state, action) => {
      state.objectiveData = action.payload
    },
  },
})

export const { setObjectiveData } = objectiveSlice.actions

export const selectObjectiveData: (state: RootState) => any = (state) =>
  state.objective.objectiveData

export default objectiveSlice.reducer
