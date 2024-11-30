import { ReactNode } from 'react'
import styles from './Button.module.css'

type ButtonType = 'icon' | 'icon-text' | 'text' | 'text-icon' | 'icon-icon'

type ButtonProps =
  | {
      type: 'icon';
      onClick: () => void;
      icon: ReactNode;
    }
  | {
      type: 'icon-text';
      onClick: () => void;
      icon: ReactNode;
      text: string;
    }
  | {
      type: 'text-icon';
      onClick: () => void;
      onIconClick?: () => void;
      icon: ReactNode;
      text: string;
    }
  | {
      type: 'text';
      onClick: () => void;
      text: string;
    }
  | {
      type: 'icon-icon';
      onClick: () => void;
      onIconClick?: () => void;
      iconFirst: ReactNode;
      iconSecond: ReactNode;
    }

const Button = (props: ButtonProps) => {
    const {
        type, onClick,
    } = props

    switch (type) {
    case 'icon':
        return (
            <button
                className={styles.button}
                onClick={onClick}
            >
                {props.icon}
            </button>
        )

    case 'icon-text':
        return (
            <button
                className={styles.button}
                onClick={onClick}
            >
                {props.icon}
                <span>{props.text}</span>
            </button>
        )

    case 'text-icon':
        return (
            <button
                className={styles.button}
                onClick={onClick}
            >
                <span>{props.text}</span>
                <span
                    onClick={(e) => {
                        e.stopPropagation()
                        props.onIconClick?.()
                    }}
                >
                    {props.icon}
                </span>
            </button>
        )

    case 'text':
        return (
            <button
                className={styles.button}
                onClick={onClick}
            >
                {props.text}
            </button>
        )

    case 'icon-icon':
        return (
            <div
                className={styles.buttonIconIcon}
                onClick={onClick}
            >
                <span
                    className={styles.icon}
                    onClick={(e) => {
                        e.stopPropagation()
                        props.onIconClick?.()
                    }}
                >
                    {props.iconFirst}
                </span>
                <span
                    className={styles.icon}
                    onClick={(e) => {
                        e.stopPropagation()
                        props.onIconClick?.()
                    }}
                >
                    {props.iconSecond}
                </span>
            </div>
        )

    default:
        return <></>
    }
}

export { Button }
export type {
    ButtonType, ButtonProps,
}
