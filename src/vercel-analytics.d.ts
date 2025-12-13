declare module '@vercel/analytics/react' {
  import { ComponentType } from 'react';
  export const Analytics: ComponentType;
}

declare module '@vercel/speed-insights/react' {
  import { ComponentType } from 'react';
  export const SpeedInsights: ComponentType;
  export default SpeedInsights;
}

