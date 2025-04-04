import { clsx } from 'clsx';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-xl shadow-md border border-gray-200 bg-white',
        'text-gray-900 overflow-hidden transition-all',
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

export function CardHeader({ className, children }: CardHeaderProps) {
  return (
    <div
      className={clsx(
        'px-6 py-4 border-b border-gray-200 bg-white text-gray-900',
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardTitleProps {
  className?: string;
  children: React.ReactNode;
}

export function CardTitle({ className, children }: CardTitleProps) {
  return (
    <h3 className={clsx('text-lg font-semibold', className)}>
      {children}
    </h3>
  );
}

interface CardContentProps {
  className?: string;
  children: React.ReactNode;
}

export function CardContent({ className, children }: CardContentProps) {
  return (
    <div className={clsx('px-6 py-4 text-gray-700', className)}>
      {children}
    </div>
  );
}

interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
}

export function CardFooter({ className, children }: CardFooterProps) {
  return (
    <div
      className={clsx(
        'px-6 py-4 border-t border-gray-200 bg-white text-gray-700',
        className
      )}
    >
      {children}
    </div>
  );
}
