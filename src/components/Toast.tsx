import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react'
import { Check, X, Info, AlertTriangle, Zap } from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

export type ToastVariant = 'success' | 'error' | 'info' | 'warning' | 'action'

export interface ToastAction {
  label: string
  onClick: () => void
}

interface ToastData {
  id: string
  variant: ToastVariant
  title: string
  message: string
  duration: number
  action?: ToastAction
}

interface ToastContextValue {
  success: (title: string, message?: string, opts?: Partial<Omit<ToastData, 'variant' | 'title' | 'message'>>) => string
  error: (title: string, message?: string, opts?: Partial<Omit<ToastData, 'variant' | 'title' | 'message'>>) => string
  info: (title: string, message?: string, opts?: Partial<Omit<ToastData, 'variant' | 'title' | 'message'>>) => string
  warning: (title: string, message?: string, opts?: Partial<Omit<ToastData, 'variant' | 'title' | 'message'>>) => string
  action: (title: string, message?: string, opts?: Partial<Omit<ToastData, 'variant' | 'title' | 'message'>>) => string
  dismiss: (id: string) => void
  clearAll: () => void
  position: ToastPosition
  setPosition: (p: ToastPosition) => void
}

/* ------------------------------------------------------------------ */
/*  Context & Provider                                                 */
/* ------------------------------------------------------------------ */

const ToastContext = createContext<ToastContextValue | null>(null)

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([])
  const [position, setPosition] = useState<ToastPosition>('top-right')
  const counter = useRef(0) // has initial value, fine

  const add = useCallback(
    (variant: ToastVariant, title: string, message = '', opts?: Partial<Omit<ToastData, 'variant' | 'title' | 'message'>>) => {
      const id = `toast-${Date.now()}-${counter.current++}`
      const toast: ToastData = {
        id,
        variant,
        title,
        message,
        duration: opts?.duration ?? 5000,
        action: opts?.action,
      }
      setToasts((prev) => [...prev, toast])
      return id
    },
    []
  )

  const success = useCallback((t: string, m?: string, o?: any) => add('success', t, m, o), [add])
  const error = useCallback((t: string, m?: string, o?: any) => add('error', t, m, o), [add])
  const info = useCallback((t: string, m?: string, o?: any) => add('info', t, m, o), [add])
  const warning = useCallback((t: string, m?: string, o?: any) => add('warning', t, m, o), [add])
  const action = useCallback((t: string, m?: string, o?: any) => add('action', t, m, o), [add])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const clearAll = useCallback(() => setToasts([]), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') clearAll()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [clearAll])

  return (
    <ToastContext.Provider value={{ success, error, info, warning, action, dismiss, clearAll, position, setPosition }}>
      {children}
      <ToastContainer toasts={toasts} position={position} onDismiss={dismiss} />
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

/* ------------------------------------------------------------------ */
/*  Variant Styling                                                    */
/* ------------------------------------------------------------------ */

const variantMeta = {
  success: {
    Icon: Check,
    iconBg: 'bg-whatsapp/10',
    iconColor: 'text-whatsapp',
    borderColor: 'border-whatsapp/20',
    progressColor: 'bg-whatsapp',
  },
  error: {
    Icon: X,
    iconBg: 'bg-red-50',
    iconColor: 'text-red-600',
    borderColor: 'border-red-200/50',
    progressColor: 'bg-red-400',
  },
  info: {
    Icon: Info,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    borderColor: 'border-blue-200/50',
    progressColor: 'bg-blue-400',
  },
  warning: {
    Icon: AlertTriangle,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    borderColor: 'border-amber-200/50',
    progressColor: 'bg-amber-400',
  },
  action: {
    Icon: Zap,
    iconBg: 'bg-plum/10',
    iconColor: 'text-plum',
    borderColor: 'border-plum/20',
    progressColor: 'bg-plum',
  },
}

/* ------------------------------------------------------------------ */
/*  Position Layouts                                                   */
/* ------------------------------------------------------------------ */

const positionClasses: Record<ToastPosition, string> = {
  'top-left': 'fixed top-5 left-5 items-start',
  'top-center': 'fixed top-5 left-1/2 -translate-x-1/2 items-center',
  'top-right': 'fixed top-5 right-5 items-end',
  'bottom-left': 'fixed bottom-5 left-5 items-start flex-col-reverse',
  'bottom-center': 'fixed bottom-5 left-1/2 -translate-x-1/2 items-center flex-col-reverse',
  'bottom-right': 'fixed bottom-5 right-5 items-end flex-col-reverse',
}

function getEnterTransform(position: ToastPosition) {
  if (position.includes('right')) return 'translate-x-10'
  if (position.includes('left')) return '-translate-x-10'
  if (position.includes('bottom')) return 'translate-y-10'
  return '-translate-y-3'
}

/* ------------------------------------------------------------------ */
/*  Toast Item                                                         */
/* ------------------------------------------------------------------ */

const ToastItem: React.FC<{
  toast: ToastData
  position: ToastPosition
  onDismiss: (id: string) => void
}> = ({ toast, position, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(100)
  const progressRef = useRef(100)
  const startTimeRef = useRef(Date.now())
  const rafRef = useRef<number>(undefined)        // ← fixed: added undefined
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined) // ← fixed: added undefined

  const { Icon, iconBg, iconColor, borderColor, progressColor } = variantMeta[toast.variant]

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsVisible(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    timerRef.current = setTimeout(() => handleDismiss(), toast.duration)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [toast.duration])

  useEffect(() => {
    const animate = () => {
      if (isPaused) {
        const elapsed = (1 - progressRef.current / 100) * toast.duration
        startTimeRef.current = Date.now() - elapsed
        rafRef.current = requestAnimationFrame(animate)
        return
      }
      const elapsed = Date.now() - startTimeRef.current
      const pct = Math.max(0, 100 - (elapsed / toast.duration) * 100)
      progressRef.current = pct
      setProgress(pct)
      if (pct > 0) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [toast.duration, isPaused])

  const handleDismiss = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    setIsExiting(true)
    setTimeout(() => onDismiss(toast.id), 320)
  }

  const transformClass = getEnterTransform(position)
  const visibleClass = isVisible && !isExiting
    ? 'translate-x-0 translate-y-0 opacity-100 scale-100'
    : `${transformClass} opacity-0 scale-[0.97]`

  return (
    <div
      role="alert"
      aria-live="polite"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`w-full max-w-[380px] rounded-2xl bg-white/90 backdrop-blur-xl border ${borderColor} shadow-lg shadow-ink-950/5 overflow-hidden relative transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${visibleClass}`}
      style={{ pointerEvents: 'auto' }}
    >
      <div className="flex items-start gap-3.5 p-4">
        <div className={`flex-shrink-0 mt-0.5 w-8 h-8 rounded-lg ${iconBg} ${iconColor} flex items-center justify-center`}>
          <Icon className="w-[18px] h-[18px]" strokeWidth={2.5} />
        </div>

        <div className="flex-1 min-w-0 pt-0.5">
          <p className="text-[13px] font-semibold text-text-primary leading-snug font-body">{toast.title}</p>
          {toast.message && (
            <p className="text-[12px] text-text-muted leading-relaxed mt-0.5 font-body">{toast.message}</p>
          )}

          {toast.action && (
            <div className="mt-2.5 flex items-center gap-3">
              <button
                onClick={() => {
                  toast.action!.onClick()
                  handleDismiss()
                }}
                className="text-[11px] font-semibold text-text-primary hover:text-plum transition-colors relative group font-body"
              >
                {toast.action.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-plum transition-all duration-200 group-hover:w-full" />
              </button>
              <span className="text-border">|</span>
              <button
                onClick={handleDismiss}
                className="text-[11px] font-medium text-text-muted hover:text-text-primary transition-colors font-body"
              >
                Dismiss
              </button>
            </div>
          )}
        </div>

        <button
          onClick={handleDismiss}
          className="flex-shrink-0 -mt-1 -mr-1 w-7 h-7 rounded-lg flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-ivory transition-all duration-200"
          aria-label="Dismiss notification"
        >
          <X className="w-3.5 h-3.5" strokeWidth={2.5} />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 h-0.5 bg-border/30 w-full">
        <div className={`h-full ${progressColor} transition-none`} style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Toast Container                                                    */
/* ------------------------------------------------------------------ */

const ToastContainer: React.FC<{
  toasts: ToastData[]
  position: ToastPosition
  onDismiss: (id: string) => void
}> = ({ toasts, position, onDismiss }) => {
  if (toasts.length === 0) return null

  return (
    <div className={`z-[9999] flex flex-col gap-2.5 max-w-[420px] w-[calc(100%-2.5rem)] pointer-events-none ${positionClasses[position]}`}>
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} position={position} onDismiss={onDismiss} />
      ))}
    </div>
  )
}