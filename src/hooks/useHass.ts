import { HassLocalWrapper } from '@/hass/HassLocalWrapper'
import { HomeAssistant } from '@ha'

export default function useHass(): HomeAssistant | undefined {
  if (process.env.NODE_ENV === 'development') {
    const hass = HassLocalWrapper.getInstance().hass
    console.log(hass)
    return hass
  }

  // TODO get real hass instance
  return undefined
}
