import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export interface RouterData {
  name: string;
  icon: string;
  path: string;
  element: string;
  routers: RouterData[];
  visible?: number;
}

export interface RouterState {
  loginStatus: boolean;
  menuRoute: any;
  userInfo: any;
  orgInfo: any;
  routerInfo: any;
  isMobile: boolean;
  isWx: boolean;
  noLayout: boolean;
}

const mobileRouter: RouterData[] = [
  {
    name: '菜单1',
    icon: 'objective',
    path: 'objective',
    element: 'objective/indexMobile.tsx',
    routers: [],
    visible: 1,
  },
]

const router: RouterData[]  = [
  {
    name: '菜单1',
    icon: 'objective',
    path: 'objective',
    element: 'objective/index.tsx',
    routers: [],
    visible: 1,
  },
]

const initialState: RouterState = {
  loginStatus: false,
  menuRoute: router,
  userInfo: null,
  orgInfo: null,
  routerInfo: null,
  isMobile: true,
  isWx: false,
  noLayout: false,
}

// export const getUserInfoReduce = createAsyncThunk(
//   'user/getUserInfo',
//   getUserInfo,
// )

// export const getMyRouterReduce = createAsyncThunk(
//   'user/getMyRouter',
//   getMyRouter,
// )

export const routerSlice = createSlice({
  name: 'router',
  initialState,
  reducers: {
    setLoginStatus: (state, action) => {
      state.loginStatus = action.payload
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
    setOrgInfo: (state, action) => {
      state.orgInfo = action.payload
    },
    setIsMobile: (state, action) => {
      state.isMobile = action.payload
      if (action.payload) {
        state.menuRoute = mobileRouter
      }
    },
    setIsWx: (state, action) => {
      state.isWx = action.payload
    },
    setNoLayout: (state, action) => {
      state.noLayout = action.payload
    },
  },
  // extraReducers: (builder) => {
  // builder
  //   .addCase(getUserInfoReduce.fulfilled, (state, action) => {
  //   state.userInfo = action.payload
  // })
  //   .addCase(getMyRouterReduce.fulfilled, (state, action) => {
  //     state.menuRoute = action.payload
  //   })
  // },
})

export const { setLoginStatus, setUserInfo, setOrgInfo, setIsMobile, setIsWx, setNoLayout } = routerSlice.actions

export const selectUserInfo: (state: RootState) => any = (state) =>
  state.router.userInfo

export const selectOrgInfo: (state: RootState) => any = (state) =>
  state.router.orgInfo

export const selectLoginStatus: (state: RootState) => boolean = (state) =>
  state.router.loginStatus

export const selectMenuRoute: (state: RootState) => any = (state) =>
  state.router.menuRoute

export const selectIsMobile: (state: RootState) => any = (state) =>
  state.router.isMobile

export const selectIsWx: (state: RootState) => any = (state) =>
  state.router.isWx

export const selectNoLayout: (state: RootState) => any = (state) =>
  state.router.noLayout

export default routerSlice.reducer
