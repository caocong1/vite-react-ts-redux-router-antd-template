import { Outlet } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { TabBar } from 'antd-mobile'
import { useAppSelector } from '../../app/hooks'
import { selectMenuRoute } from '../Router/slice'
import SvgIcon from '../SvgIcon'
import { myLocation, myNavigate } from '../Router'

const LayoutMobile: React.FC = () => {
  const menu = useAppSelector(selectMenuRoute)
  const [activeKey, setActiveKey] = useState('')
  const [hideTabBar, setHideTabBar] = useState(false)
  useEffect(() => {

    const path = myLocation.pathname.slice(1)
    if (menu.find((m: any) => m.visible && m.path === path)){
      setActiveKey(path)
      setHideTabBar(false)
    } else {
      setHideTabBar(true)
    }
  }, [myLocation])

  return (
    <>
      <div style={{ height: hideTabBar ? '100vh' : 'calc(100vh - 49px)', overflow: 'hidden', background: '#eee' }}><Outlet /></div>
      {!hideTabBar && (
        <TabBar
          activeKey={activeKey} onChange={(key) => {
            myNavigate(key)
          }}
        >
          {menu.map((item: any) => item.visible ? (
            <TabBar.Item key={item.path} icon={<SvgIcon name={item.icon} />} title={item.name} />
          ) : null)}
        </TabBar>
      )}
    </>
  )
}

export default LayoutMobile
