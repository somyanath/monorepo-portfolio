import styles from './Badge.module.css';

type BadgeVariant = 'neutral' | 'error' | 'warning' | 'success' | 'brand';
type BadgeSize = 'small' | 'medium' | 'large';

export type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
};

export function Badge({
  children,
  variant = 'neutral',
  size = 'medium',
}: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[variant]} ${styles[size]}`}>
      {children}
    </span>
  );
}
