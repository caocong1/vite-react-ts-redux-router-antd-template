import React, {lazy, Suspense, useEffect, useState} from 'react'
import {
  Navigate,
  BrowserRouter,
  useNavigate,
  useLocation,
  NavigateFunction,
  Location, Outlet,
} from 'react-router-dom'
import LoadingPage from '../LoadingPage'
import { AppDispatch } from '../../app/store'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectIsMobile, selectMenuRoute, selectUserInfo, setIsMobile, setIsWx } from './slice'
import Layout from '../Layout'
import packageConfig from '../../../package.json'
import LayoutMobile from '../LayoutMobile'
import {Route, Routes} from "react-router-loading";

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
const getFirstPath: any = (menuRoute: any, fatherPath: string) => {
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

const routerElements: any = import.meta.glob('/src/page/**/[a-z[]*.tsx')
const pagePath = '/src/page/'

const LazyLoad = (element: string) => {
  const p = pagePath + element
  const importElement = routerElements[p]
  if (importElement){
    const Component = lazy(importElement)
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
      >
        {menu.routers && getRoutes(menu.routers)}
      </Route>
    )
  })

export let myNavigate: NavigateFunction
export let myLocation: Location

const skipLogin = false

// 不需要layout的path
const noLayoutPaths: string[] = []

const RouteUtil: React.FC = () => {
  myNavigate = useNavigate()
  myLocation = useLocation()
  const [layout, setLayout] = useState(true)
  const menuRoute = useAppSelector(selectMenuRoute)
  const isMobile = useAppSelector(selectIsMobile)
  const userInfo = useAppSelector(selectUserInfo)

  useEffect(() => {
    setLayout(!noLayoutPaths.includes(myLocation.pathname))
  }, [myLocation])

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
      <Route path="/" element={layout ? isMobile ? <LayoutMobile /> : <Layout/> : <Outlet />}>
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
