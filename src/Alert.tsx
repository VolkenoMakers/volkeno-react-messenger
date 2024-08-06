import React from 'react'
import { FiAlertCircle } from 'react-icons/fi'
import styles from './styles.module.css'
type PropsType = {
  message: string
  isStyleYad?: boolean
}
export function AlertInfo({ message, isStyleYad }: PropsType) {
  return (
    <div className='px-1 w-100'>
      <div
        className={
          isStyleYad
            ? `${styles.yadAlert} ${styles.yadAlertInfo}`
            : `${styles.dagAlert} ${styles.dagAlertInfo}`
        }
        role='alert'
      >
        <FiAlertCircle style={{ fontSize: 24 }} />
        <h4>{message}</h4>
      </div>
    </div>
  )
}
