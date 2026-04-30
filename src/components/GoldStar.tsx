interface GoldStarProps {
  className?: string
  size?: number
}

export default function GoldStar({ className = '', size = 18 }: GoldStarProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="#D4AF37"
      className={`animate-star-rotate ${className}`}
      aria-hidden="true"
    >
      <polygon points="12,0 15,8 24,9 17,15 19,24 12,19 5,24 7,15 0,9 9,8" />
    </svg>
  )
}
