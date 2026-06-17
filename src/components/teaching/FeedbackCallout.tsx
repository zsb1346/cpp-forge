import React from 'react'
import { CorrectIcon, IncorrectIcon, InfoIcon } from '../icons'

type Tone = 'correct' | 'incorrect' | 'info'

interface Props {
  tone: Tone;
  title: string;
  children?: React.ReactNode;
}

const toneClass: Record<Tone, string> = {
  correct: 'bg-sage-tint border-sage/30 text-sage',
  incorrect: 'bg-clay-tint border-clay/30 text-clay',
  info: 'bg-gold-tint border-gold/30 text-gold',
}

const icon: Record<Tone, React.ReactNode> = {
  correct: <CorrectIcon size={18} />,
  incorrect: <IncorrectIcon size={18} />,
  info: <InfoIcon size={18} />,
}

const FeedbackCallout: React.FC<Props> = ({ tone, title, children }) => (
  <div className={`misconception-note animate-fade-in ${toneClass[tone]}`}>
    <p className="text-sm font-semibold flex items-center gap-2">
      <span className="leading-none">{icon[tone]}</span>
      <span>{title}</span>
    </p>
    {children && <div className="mt-2 text-[13px] leading-relaxed text-ink-soft">{children}</div>}
  </div>
)

export default FeedbackCallout
