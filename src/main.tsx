import React from 'react'
import ReactDOM from 'react-dom/client'
import RoutePage from './component/Router'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import 'antd/dist/antd.css'
import './style/index.less'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <RoutePage />
    </ConfigProvider>
  </Provider>,
)
