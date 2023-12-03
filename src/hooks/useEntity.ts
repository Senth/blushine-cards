import { useEffect, useState } from 'preact/hooks'
import useHass from '@hooks/useHass'

function useEntityState(entityId: string): string | undefined {
  const [entity, setEntity] = useState<any | undefined>(undefined)

  const hass = useHass()
  if (!hass || !hass.states || !hass.states[entityId]) {
    return undefined
  }

  return entity
}
