import { create } from 'zustand'
import { HomeAssistant } from 'custom-card-helpers'

interface GlobalStore {
  readonly hass?: HomeAssistant
}

export const globalStore = create<GlobalStore>((set) => ({
  hass: undefined,
  setHass: (hass: HomeAssistant) => set({ hass }),
}))
