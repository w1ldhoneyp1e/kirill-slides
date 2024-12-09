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
      firstIcon: {
        icon: ReactNode;
        onClick: () => void;
      }
      secondIcon: {
        icon: ReactNode;
        onClick: () => void;
      }
    }

const Button = (props: ButtonProps) => {
    const {type} = props

    switch (type) {
    case 'icon':
        return (
            <button
                className={styles.button}
                onClick={props.onClick}
            >
                {props.icon}
            </button>
        )

    case 'icon-text':
        return (
            <button
                className={styles.button}
                onClick={props.onClick}
            >
                {props.icon}
                <span>{props.text}</span>
            </button>
        )

    case 'text-icon':
        return (
            <button
                className={styles.button}
                onClick={props.onClick}
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
                onClick={props.onClick}
            >
                {props.text}
            </button>
        )

    case 'icon-icon':
        return (
            <div
                className={styles.buttonIconIcon}
            >
                <span
                    className={styles.icon}
                    onClick={(e) => {
                        e.stopPropagation()
                        props.firstIcon.onClick()
                    }}
                >
                    {props.firstIcon.icon}
                </span>
                <span
                    className={styles.icon}
                    onClick={(e) => {
                        e.stopPropagation()
                        props.secondIcon.onClick()
                    }}
                >
                    {props.secondIcon.icon}
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
