import type { FC } from 'react'

import styled from '@emotion/styled'

type IconType = 'solid' | 'brands' | 'regular' | 'light' | 'thin' | 'duotone'

interface IconProps {
  size?: number
  color?: string
}

interface FontAwesomeIconProps extends IconProps {
  type?: IconType
  className: string
}

const FontAwesomeIcon: FC<FontAwesomeIconProps> = ({
  type,
  className,
  color,
  size,
}) => {
  const iconType = type || 'solid'

  const iconClassName = `fa-${iconType} ${className}`

  return <Icon className={iconClassName} color={color} size={size} />
}

export default FontAwesomeIcon

const Icon = styled.i<IconProps>((props) => {
  const fontSize = props.size != null ? props.size + 'px' : '16px'
  const color = props.color || 'black'

  return {
    color,
    fontSize,
  }
})
