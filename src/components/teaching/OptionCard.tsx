import React from 'react'

interface Props {
  children: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  state?: 'neutral' | 'correct' | 'incorrect' | 'muted';
  badge?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const stateClass = {
  neutral: 'border-paper-line bg-paper-sunk hover:border-ink-faint hover:bg-paper',
  correct: 'border-sage/50 bg-sage-tint text-sage',
  incorrect: 'border-clay/50 bg-clay-tint text-clay',
  muted: 'border-paper-line bg-paper-sunk opacity-60',
}

const OptionCard: React.FC<Props> = ({
  children,
  selected,
  disabled,
  state = 'neutral',
  badge,
  onClick,
  className = '',
}) => {
  const selectedClass = selected && state === 'neutral'
    ? 'border-ember bg-ember-tint shadow-paper'
    : stateClass[state]

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`option-card ${selectedClass} ${disabled ? 'cursor-default' : 'cursor-pointer'} ${className}`}
    >
      {badge !== undefined && (
        <span className={`option-stamp ${selected ? 'bg-ember text-paper-raised border-ember' : 'border-ink-ghost/50 text-ink-ghost'}`}>
          {badge}
        </span>
      )}
      <span className="min-w-0 flex-1">{children}</span>
    </button>
  )
}

export default OptionCard
