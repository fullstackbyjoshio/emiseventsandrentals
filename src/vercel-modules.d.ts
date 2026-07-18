declare module '@vercel/analytics/react' {
  import { ComponentType } from 'react'
  export const Analytics: ComponentType<any>
}

declare module '@vercel/speed-insights/react' {
  import { ComponentType } from 'react'
  export const SpeedInsights: ComponentType<{ route?: string }>
}