import React, { useEffect, useState } from 'react'
import { Selector } from 'antd-mobile'

interface SingleSelectorProps {
  selectProps?: any;
  value?: any;
  onChange?: any;
  options: any;
}

export const SingleSelector: React.FC<SingleSelectorProps> = ({ selectProps, value, onChange, options }) => {
  const [val, setVal] = useState(value)
  useEffect(() => {
    setVal(value)
  }, [value])
  return (
    <Selector
      {...selectProps}
      value={[val]}
      onChange={(v) => {
        onChange(v[0])
      }}
      options={options}
    />
  )
}

export default SingleSelector
