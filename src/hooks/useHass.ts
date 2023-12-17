import { HassLocalStateChange, HassLocalWrapper } from '@/hass/HassLocalWrapper'
import { HomeAssistant } from '@ha'
import { useEffect, useReducer, useState } from 'preact/hooks'

export default function useHass(): HomeAssistant {
  const [, forceRender] = useReducer((s) => s + 1, 0)
  const [hass, setHass] = useState<HomeAssistant>(
    HassLocalWrapper.getInstance().hass
  )

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const hassLocalWrapper = HassLocalWrapper.getInstance()
      hassLocalWrapper.updateStates()

      const stateChangeListener = (event: HassLocalStateChange) => {
        console.log('HassLocalWrapper state change')
        setHass(event.hass)
        forceRender(1)
      }

      // Update hass state when it changes
      hassLocalWrapper.addStateChangeListener(stateChangeListener)

      return () => {
        hassLocalWrapper.removeStateChangeListener(stateChangeListener)
      }
    }
  }, [])

  return hass
}
