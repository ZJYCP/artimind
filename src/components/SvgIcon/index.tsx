import { useMemo } from 'react'
import styles from './svg-icon.module.scss'
interface SvgIconProps {
  path: string
  className?: string
}
export default function SvgIcon(props: SvgIconProps) {
  const { path, className } = props

  /**
   * 样式类名
   */
  const svgClass = useMemo(() => {
    if (className) {
      return `${styles.svgIcon} ${className}`
    } else {
      return styles.svgIcon
    }
  }, [className])

  /**
   * 图标引用id
   */
  const iconReferenceId = useMemo(() => {
    return `#svgo:${path}`
  }, [path])

  return (
    <svg className={svgClass} aria-hidden="true" focusable="false">
      <use xlinkHref={iconReferenceId}></use>
    </svg>
  )
}
