import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

export type ButtonHierarchy =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'link-color'
  | 'link-gray'
  | 'destructive';
export type ButtonSize = 'md' | 'lg' | 'xl' | '2xl';

type BaseProps = {
  children?: ReactNode;
  hierarchy?: ButtonHierarchy;
  size?: ButtonSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
};

type LabelledButtonProps = BaseProps & {
  iconOnly?: false;
};

type IconOnlyButtonProps = BaseProps & {
  iconOnly: true;
  /** Required: icon-only buttons have no visible label for screen readers to announce. */
  'aria-label': string;
};

export type ButtonProps = (LabelledButtonProps | IconOnlyButtonProps) &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

export function Button({
  children,
  hierarchy = 'primary',
  size = 'md',
  leadingIcon,
  trailingIcon,
  iconOnly = false,
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  const classes = [
    styles.button,
    styles[hierarchy],
    styles[`size-${size}`],
    iconOnly ? styles.iconOnly : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classes} {...rest}>
      {leadingIcon && (
        <span className={styles.icon} aria-hidden="true">
          {leadingIcon}
        </span>
      )}
      {!iconOnly && children != null && (
        <span className={styles.label}>{children}</span>
      )}
      {!iconOnly && trailingIcon && (
        <span className={styles.icon} aria-hidden="true">
          {trailingIcon}
        </span>
      )}
    </button>
  );
}
