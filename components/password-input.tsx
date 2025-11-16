'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function PasswordInput({
  value,
  onChange,
  placeholder = 'Ingresa contraseña segura',
  disabled = false,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const getPasswordStrength = (password: string): { strength: string; color: string } => {
    if (password.length === 0) return { strength: '', color: '' };
    if (password.length < 8) return { strength: 'Débil', color: 'text-destructive' };
    if (password.length < 12) return { strength: 'Media', color: 'text-accent' };
    if (password.length < 16) return { strength: 'Fuerte', color: 'text-primary' };
    return { strength: 'Muy Fuerte', color: 'text-primary' };
  };

  const strength = getPasswordStrength(value);

  return (
    <div className="w-full">
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          disabled={disabled}
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      </div>
      {value && strength.strength && (
        <p className={`text-xs mt-2 font-medium ${strength.color}`}>
          Fortaleza: {strength.strength}
        </p>
      )}
    </div>
  );
}
