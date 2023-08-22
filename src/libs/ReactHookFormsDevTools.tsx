import dynamic from 'next/dynamic'

export const RHFDevTool = dynamic(() => import('@hookform/devtools').then((module) => ({ default: module.DevTool })), {
  ssr: false,
})
