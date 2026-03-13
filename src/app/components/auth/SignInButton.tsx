import { useState } from 'react';
import { Button } from '../ui/button';
import { LogIn } from 'lucide-react';
import { SignInModal } from './SignInModal';

interface SignInButtonProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
  onSuccess?: () => void;
}

export function SignInButton({ variant = 'default', size = 'default', className = '', onSuccess }: SignInButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        variant={variant}
        size={size}
        className={className}
      >
        <LogIn className="w-4 h-4 mr-2" />
        Sign In
      </Button>

      <SignInModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false);
          onSuccess?.();
        }}
      />
    </>
  );
}
