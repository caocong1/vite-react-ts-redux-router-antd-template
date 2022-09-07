import React, {CSSProperties, lazy, LazyExoticComponent, Suspense, useState} from 'react'

const svgComponent: any = import.meta.glob('/src/component/SvgIcon/svg/*.svg' )

interface SvgIconProps {
  name: string;
  style?: CSSProperties;
}

const SvgIcon: React.FC<SvgIconProps> = ({ name, style = {} }) => {
  const [Component] = useState<LazyExoticComponent<any>>(lazy(svgComponent[`/src/component/SvgIcon/svg/${name}.svg`]))

  return (
    <div className={'anticon'} style={style}>
      <Suspense fallback={<div style={{ width: '1em', height: '1em', background: '#000' }} />}>
        <Component width="1em" height="1em" fill="currentColor" />
      </Suspense>
    </div>
  )
}

export default SvgIcon
