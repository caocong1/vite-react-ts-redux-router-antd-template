import React, {Suspense, useEffect} from 'react'
import {
  Navigate,
  BrowserRouter,
  useNavigate,
  useLocation,
  NavigateFunction,
  Location,
} from 'react-router-dom'
import LoadingPage from '../LoadingPage'
import { AppDispatch } from '../../app/store'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {RouterData, selectMenuRoute, selectUserInfo, setIsMobile, setIsWx } from './slice'
import Layout from '../Layout'
import packageConfig from '../../../package.json'
import {Route, Routes} from "@caocong/react-router-loading"

export let dispatch: AppDispatch

const RoutePage: React.FC = () => {
  dispatch = useAppDispatch()
  return (
    <BrowserRouter basename={packageConfig.name}>
      <RouteUtil />
    </BrowserRouter>
  )
}

// 获取首条路由
const getFirstPath: (menuRoute: RouterData[], fatherPath: string) => string = (menuRoute, fatherPath) => {
  if (!menuRoute.length) {
    return '/'
  }
  if (!menuRoute[0].routers?.length) {
    return `${fatherPath}/${menuRoute[0].path}`
  }
  return getFirstPath(
    menuRoute[0].routers,
    `${fatherPath}/${menuRoute[0].path}`,
  )
}

const routerElements = import.meta.glob('/src/page/**/[a-z[]*.tsx') as Record<string, () => Promise<{ default: React.ComponentType<any>; }>>
const pagePath = '/src/page/'

const LazyLoad = (element: string) => {
  const p = pagePath + element
  const importElement = routerElements[p]
  if (importElement){
    const Component = React.lazy(importElement)
    return (
      <>
        <Suspense fallback={<LoadingPage />}>
          <Component />
        </Suspense>
      </>
    )
  } else {
    return <></>
  }
}

// 转换JSON为路由
const getRoutes: any = (routes: any) =>
  routes.map((menu: any) => {
    return (
      <Route
        key={menu.path}
        path={menu.path}
        {...(menu.element ? { element: LazyLoad(menu.element) } : {})}
        loading
      >
        {menu.routers && getRoutes(menu.routers)}
      </Route>
    )
  })

export let myNavigate: NavigateFunction
export let myLocation: Location

const skipLogin = false

const RouteUtil: React.FC = () => {
  myNavigate = useNavigate()
  myLocation = useLocation()
  const menuRoute = useAppSelector(selectMenuRoute)
  // const isMobile = useAppSelector(selectIsMobile)
  const userInfo = useAppSelector(selectUserInfo)

  useEffect(() => {
    if (skipLogin) return
    if (localStorage.token){
      // 获取用户信息 dispatch(setUserInfo({}))
    } else {
      // 登录操作
    }
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)){
      dispatch(setIsMobile(true))
    }
    if (/MicroMessenger|WeChart|wxwork/i.test(navigator.userAgent)){
      dispatch(setIsWx(true))
    }
  }, [])

  return userInfo ? (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to={getFirstPath(menuRoute, '')} />} />
        {getRoutes(menuRoute)}
      </Route>
      <Route path="/loading" element={<LoadingPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  ) : (
    <LoadingPage fullscreen={true} />
  )
}

export default RoutePage
