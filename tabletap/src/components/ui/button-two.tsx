import { forwardRef } from 'react';
import { clsx } from 'clsx';

interface ButtonTwoProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const ButtonTwo = forwardRef<HTMLButtonElement, ButtonTwoProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'inline-flex items-center justify-center rounded-lg font-semibold transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          {
            'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500': variant === 'primary',
            'bg-white text-red-600 border border-red-600 hover:bg-red-50 focus:ring-red-500': variant === 'outline',
            'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-500': variant === 'danger',
            'px-3 py-1.5 text-sm': size === 'sm',
            'px-4 py-2 text-base': size === 'md',
            'px-5 py-2.5 text-lg': size === 'lg',
            'cursor-not-allowed opacity-60': isLoading,
          },
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : null}
        {children}
      </button>
    );
  }
);

ButtonTwo.displayName = 'ButtonTwo';

export default ButtonTwo;
