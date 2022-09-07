import { Button, Drawer, Form, Space } from 'antd'
import React, { useEffect, useState } from 'react'

interface FormDrawerProps {
  // 控制窗口的弹出或者显示，数据传递
  data: any;
  // 设置窗口的标题，和退出
  drawerProps: any;
  // 设置表单的样式及属性
  formProps?: any;
  // 插入表单的组件
  children: React.ReactNode;
  // 提交表单触发的事件
  onFinish: any;
  // 按钮的文字
  confirmBtnText?: string;
  // 自定义按钮的数量
  drawerExtra?: React.ReactNode;
}

const FormDrawer: React.FC<FormDrawerProps> = ({ data, drawerProps = {}, formProps = {}, children, onFinish, confirmBtnText = '保存', drawerExtra = <></> }) => {
  const [form] = Form.useForm()
  const [drawerData, setDrawerData] = useState(data)
  const [submitLoading, setSubmitLoading] = useState(false)

  useEffect(() => {
    if (data) {
      setSubmitLoading(false)
      form.resetFields()
      form.setFieldsValue(data)
    }
    setDrawerData(data)
  }, [data])

  return (
    <Drawer
      placement="right"
      open={!!drawerData}
      width={600}
      extra={(
        <Space>
          {drawerExtra}
          {confirmBtnText && (
            <Button loading={submitLoading} onClick={() => form.submit()} type="primary">
              {confirmBtnText}
            </Button>
          )}
        </Space>
      )}
      {...drawerProps}
    >
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        onFinish={(values)=> {
          setSubmitLoading(true)
          try {
            onFinish(values).finally(() => {
              setSubmitLoading(false)
            })
          } catch (e) {
            setSubmitLoading(false)
          }
        }}
        size="large"
        {...formProps}
      >
        {React.Children.map(children, (child: any) => React.cloneElement(child, { form }))}
      </Form>
    </Drawer>
  )
}

export default FormDrawer
