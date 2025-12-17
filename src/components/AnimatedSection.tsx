import { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-in' | 'scale-in' | 'slide-left' | 'slide-right';
  delay?: number;
}

const animationClasses = {
  'fade-up': 'translate-y-8 opacity-0',
  'fade-in': 'opacity-0',
  'scale-in': 'scale-95 opacity-0',
  'slide-left': '-translate-x-8 opacity-0',
  'slide-right': 'translate-x-8 opacity-0',
};

const visibleClasses = {
  'fade-up': 'translate-y-0 opacity-100',
  'fade-in': 'opacity-100',
  'scale-in': 'scale-100 opacity-100',
  'slide-left': 'translate-x-0 opacity-100',
  'slide-right': 'translate-x-0 opacity-100',
};

export const AnimatedSection = ({
  children,
  className,
  animation = 'fade-up',
  delay = 0,
}: AnimatedSectionProps) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        isVisible ? visibleClasses[animation] : animationClasses[animation],
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

interface AnimatedItemProps {
  children: ReactNode;
  className?: string;
  index?: number;
  baseDelay?: number;
}

export const AnimatedItem = ({
  children,
  className,
  index = 0,
  baseDelay = 100,
}: AnimatedItemProps) => {
  return (
    <div
      className={cn(
        'transition-all duration-500 ease-out',
        className
      )}
      style={{ transitionDelay: `${index * baseDelay}ms` }}
    >
      {children}
    </div>
  );
};
