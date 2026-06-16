import React from 'react'
import {
  Lock as PhosphorLock,
  LockOpen,
  CheckCircle,
  Star as PhosphorStar,
  ArrowRight as PhosphorArrowRight,
  ArrowLeft as PhosphorArrowLeft,
  Play as PhosphorPlay,
  Code as PhosphorCode,
  Keyboard as PhosphorKeyboard,
  Lightbulb as PhosphorLightbulb,
  MouseLeftClick,
  Trophy as PhosphorTrophy,
  Target as PhosphorTarget,
  House,
  ArrowClockwise,
  XCircle,
} from '@phosphor-icons/react'

type IconProps = { size?: number; className?: string }

/* ===== Keep as custom SVGs (brand / unique) ===== */

export const LogoIcon: React.FC<IconProps> = ({ size = 32, className }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <rect x="2" y="2" width="28" height="28" rx="6" stroke="#569cd6" strokeWidth="1.5" />
    <path d="M10 12l5 4-5 4" stroke="#569cd6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 20h5" stroke="#4ec9b0" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
)

export const ChapterIcon: React.FC<IconProps & { number: number }> = ({ size = 40, className, number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
    <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
    <text
      x="20" y="20"
      textAnchor="middle"
      dominantBaseline="central"
      fill="currentColor"
      fontSize="16"
      fontWeight="700"
      fontFamily="JetBrains Mono, monospace"
    >
      {number}
    </text>
  </svg>
)

/* ===== Phosphor wraps ===== */
/* weight 可调：thin / light / regular / bold / fill / duotone */

export const LockIcon: React.FC<IconProps> = ({ size = 20, className }) => (
  <PhosphorLock size={size} className={className} weight="regular" />
)

export const UnlockIcon: React.FC<IconProps> = ({ size = 20, className }) => (
  <LockOpen size={size} className={className} weight="regular" />
)

export const CheckIcon: React.FC<IconProps> = ({ size = 20, className }) => (
  <CheckCircle size={size} className={className} weight="bold" />
)

export const StarIcon: React.FC<IconProps & { filled?: boolean }> = ({ size = 20, className, filled }) => (
  <PhosphorStar size={size} className={className} weight={filled ? 'fill' : 'regular'} />
)

export const ArrowRightIcon: React.FC<IconProps> = ({ size = 20, className }) => (
  <PhosphorArrowRight size={size} className={className} weight="bold" />
)

export const ArrowLeftIcon: React.FC<IconProps> = ({ size = 20, className }) => (
  <PhosphorArrowLeft size={size} className={className} weight="bold" />
)

export const PlayIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <PhosphorPlay size={size} className={className} weight="fill" />
)

export const CodeIcon: React.FC<IconProps> = ({ size = 20, className }) => (
  <PhosphorCode size={size} className={className} weight="bold" />
)

export const KeyboardIcon: React.FC<IconProps> = ({ size = 20, className }) => (
  <PhosphorKeyboard size={size} className={className} weight="regular" />
)

export const LightbulbIcon: React.FC<IconProps> = ({ size = 20, className }) => (
  <PhosphorLightbulb size={size} className={className} weight="fill" />
)

export const MouseIcon: React.FC<IconProps> = ({ size = 20, className }) => (
  <MouseLeftClick size={size} className={className} weight="regular" />
)

export const TrophyIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <PhosphorTrophy size={size} className={className} weight="fill" />
)

export const TargetIcon: React.FC<IconProps> = ({ size = 20, className }) => (
  <PhosphorTarget size={size} className={className} weight="regular" />
)

export const CorrectIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <CheckCircle size={size} className={className} weight="fill" />
)

export const IncorrectIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <XCircle size={size} className={className} weight="fill" />
)

export const HomeIcon: React.FC<IconProps> = ({ size = 20, className }) => (
  <House size={size} className={className} weight="regular" />
)

export const ResetIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <ArrowClockwise size={size} className={className} weight="bold" />
)
