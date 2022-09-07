import React, { useEffect, useState } from 'react'
import { Selector } from 'antd-mobile'

interface SelectorPlusProps {
  selectProps?: any;
  value?: any;
  onChange?: any;
  optionData: any;
  optionPropName?: any;
}

export const SelectorPlus: React.FC<SelectorPlusProps> = ({ selectProps, value, onChange, optionData, optionPropName = { name: 'label', value: 'value' } }) => {
  const [val, setVal] = useState(value)
  useEffect(() => {
    setVal(value)
  }, [value])
  return (
    <Selector
      {...selectProps}
      value={[val?.[optionPropName.value] || undefined]}
      onChange={(v) => {
        const c = optionData.find((o: any) => o[optionPropName.value] === v[0])
        onChange(c)
      }}
      options={optionData.map((o: any) => ({ label: o[optionPropName.name], value: o[optionPropName.value] }))}
    />
  )
}

export default SelectorPlus
