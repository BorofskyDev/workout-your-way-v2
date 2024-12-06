// components/modals/modal/Modal.tsx

'use client'

import React, { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Modal.module.scss'
import SubSectionHeading from '@/components/typography/sub-section-heading/SubSectionHeading'
import ClosedIcon from '@/components/icons/close-icon/CloseIcon'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  className?: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, className }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.modalOverlay} onClick={onClose}>
          <motion.div
            className={`background-main br-5 bs8 px-200 py-400 ${styles.modalContent} ${className}`}
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
              e.stopPropagation()
            }
            initial={{ y: '100vh', opacity: 0 }}
            animate={{ y: '0', opacity: 1 }}
            exit={{ y: '100vh', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className={styles.modalHeader}>
              <SubSectionHeading>{title}</SubSectionHeading>
              <button onClick={onClose} aria-label='Close Modal'>
                <ClosedIcon className='background-input fill-text' />
              </button>
            </div>
            <div className={styles.modalBody}>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default Modal
