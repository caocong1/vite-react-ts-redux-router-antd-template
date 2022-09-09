import { Outlet } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { Breadcrumb, Button, Layout, Menu, Tooltip, Typography } from 'antd'
import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import UserOutlined from '@ant-design/icons/UserOutlined'
import './index.less'
import { useAppSelector } from '../../app/hooks'
import {selectMenuRoute, selectNoLayout} from '../Router/slice'
import { myLocation, myNavigate } from '../Router'
import SvgIcon from '../SvgIcon'

const title: string = import.meta.env.VITE_TITLE

const getMenuItems = (menuRoute: any, fatherPath: string) => {
  return menuRoute?.filter((m: any) => m.visible === 1).map((m: any) => {
    const path = fatherPath + m.path
    return {
      key: path,
      icon: <SvgIcon name={m.icon} />,
      label: m.name,
      children: m.element ? undefined : getMenuItems(m.routers, path + '/'),
    }
  })
}

const getBread = (pathSnippets: string[], menuRoute: any) => {
  if (pathSnippets.length && pathSnippets[0] ){
    let routeList = [...menuRoute]
    return pathSnippets.map((p: string, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
      const route = routeList.find((r: any) => r.path === p)
      routeList = route.routers
      return (
        <Breadcrumb.Item key={url}>
          {route.name}
        </Breadcrumb.Item>
      )
    })
  } else {
    return <></>
  }
}

const LayoutContainer: React.FC = () => {
  const menuRoute = useAppSelector(selectMenuRoute)
  const [locationPathnameList, setLocationPathnameList] = useState(myLocation.pathname.split('/'))
  const [collapsed, setCollapsed] = useState(false)
  const noLayout = useAppSelector(selectNoLayout)

  const autoCollapseSideBar = () => {
    if (window.innerWidth <= 800) {
      setCollapsed(true)
    } else {
      setCollapsed(false)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', autoCollapseSideBar)
    return () => {
      window.removeEventListener('resize', autoCollapseSideBar)
    }
  }, [])

  useEffect(() => {
    setLocationPathnameList(myLocation.pathname.split('/'))
  }, [myLocation.pathname])

  return noLayout ? <Outlet /> : (
    <Layout className="main-layout" hasSider>
      <Layout.Sider
        className="main-sidebar"
        width={320}
        style={{
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
        collapsed={collapsed}
      >
        <Layout.Header style={{ padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Tooltip overlay={collapsed ? title : ''} placement="right">
            <Typography.Title level={3} style={{ color: '#ffc53d', margin: '0 auto', textAlign: 'center', fontSize: 20 }}>
              {collapsed ? <SvgIcon name="objective" /> : (
                <>
                  <SvgIcon name="objective" />
                  {title}
                </>
              )}
            </Typography.Title>
          </Tooltip>
        </Layout.Header>
        <Menu
          className="main-menu"
          theme="dark"
          mode="inline"
          selectedKeys={[locationPathnameList.join('/')]}
          openKeys={locationPathnameList.reduce((res: string[], val, index) => {
            if (index && index < locationPathnameList.length - 1){
              res.push(`${res[index - 1] || ''}/${val}`)
            }
            return res
          }, [])}
          items={getMenuItems(menuRoute, '/')}
          onClick={(item) => {
            myNavigate(item.key)
          }}
          style={{ height: collapsed ? 'calc(100vh - 224px)' : 'calc(100vh - 128px)' }}
        />
        <div style={{ height: collapsed ? 160 : 64, display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexDirection: collapsed ? 'column' : 'row' }}>
          <Tooltip overlay="用户" placement={collapsed ? 'right' : 'top'}>
            <Button shape="circle" icon={<UserOutlined />} size="large" />
          </Tooltip>
          <Tooltip overlay="退出" placement={collapsed ? 'right' : 'top'}>
            <Button
              danger
              shape="circle"
              icon={<LogoutOutlined />}
              size="large"
              style={{ margin: '0 8px' }}
              onClick={() => {
                console.log('logout')
              }}
            />
          </Tooltip>
          <Button type="text" onClick={() => {setCollapsed((c) => !c)}} style={{ color: '#fff' }} icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} />
        </div>
      </Layout.Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 320 }}>
        <div style={{ height: 64, display: 'flex', alignItems: 'center', padding: '0 32px', backgroundColor: '#fff' }}>
          <Breadcrumb style={{ fontSize: '24px' }}>
            {getBread(locationPathnameList.slice(1), menuRoute)}
          </Breadcrumb>
        </div>
        <Layout.Content style={{ height: 'calc(100vh - 64px)', overflow: 'auto' }}>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default LayoutContainer
