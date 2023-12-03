import { globalStore } from '@/store'
import { HomeAssistant } from 'custom-card-helpers'

export default function useHass(): HomeAssistant | undefined {
  return globalStore((state) => state.hass)
}
