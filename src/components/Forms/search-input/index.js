'use client'
import { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Loader2, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const SearchInput = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Search...',
  className,
  name,
  type = 'text',
  debounceMs = 500,
  minLength = 0,
  isLoading = false,
  showClear = true,
  autoFocus = false,
  inputClassName,
  icon: CustomIcon,
  maxLength,
  pattern,
  validateInput,
  error,
  onError,
}) => {
  const [localValue, setLocalValue] = useState(value || '');
  const [debouncedValue, setDebouncedValue] = useState(localValue);
  const [localError, setLocalError] = useState(error);

  // Handle external value changes
  useEffect(() => {
    if (value !== undefined && value !== localValue) {
      setLocalValue(value);
      setDebouncedValue(value);
    }
  }, [value]);

  // Debounce the input value
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(localValue);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [localValue, debounceMs]);

  // Trigger search when debounced value changes
  useEffect(() => {
    if (debouncedValue === '' || (debouncedValue?.length >= minLength)) {
      handleSearch(debouncedValue);
    }
  }, [debouncedValue]);

  // Handle input change
  const handleInputChange = useCallback((e) => {
    const newValue = e.target.value;
    
    // Validate input if validation function provided
    if (validateInput) {
      const validationError = validateInput(newValue);
      setLocalError(validationError);
      if (onError) onError(validationError);
      if (validationError) return;
    }

    setLocalValue(newValue);
    if (onChange) onChange(newValue);
  }, [onChange, validateInput, onError]);

  // Handle search
  const handleSearch = useCallback((searchValue) => {
    if (onSearch) {
      onSearch(searchValue);
    }
  }, [onSearch]);

  // Handle clear
  const handleClear = useCallback(() => {
    setLocalValue('');
    setLocalError('');
    if (onChange) onChange('');
    if (onSearch) onSearch('');
  }, [onChange, onSearch]);

  return (
    <div className={cn('relative w-full', className)}>
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {CustomIcon ? (
            <CustomIcon className="h-4 w-4" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </div>

        {/* Input Field */}
        <Input
          name={name}
          type={type}
          value={localValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={cn(
            'pl-10 pr-10',
            localError && 'border-red-500 focus-visible:ring-red-500',
            type === 'number' && '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
            inputClassName
          )}
          autoFocus={autoFocus}
          maxLength={maxLength}
          pattern={pattern}
          onWheel={type === 'number' ? (e) => e.target.blur() : undefined}
        />

        {/* Loading Spinner or Clear Button */}
        {(isLoading || (showClear && localValue)) && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
            ) : (
              showClear && localValue && (
                <button
                  onClick={handleClear}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  <X className="h-4 w-4" />
                </button>
              )
            )}
          </div>
        )}
      </div>

      {/* Error Message */}
      {localError && (
        <p className="mt-1 text-sm text-red-500">{localError}</p>
      )}
    </div>
  );
};

export default SearchInput;