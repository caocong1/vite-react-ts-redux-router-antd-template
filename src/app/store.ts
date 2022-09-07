import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import routerReduce from '../component/Router/slice'
import layoutReduce from '../component/Layout/slice'
import objectiveReduce from '../page/objective/slice'

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  reducer: {
    router: routerReduce,
    layout: layoutReduce,
    objective: objectiveReduce,
  },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
