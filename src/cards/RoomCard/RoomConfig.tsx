interface Temperature {
  entity: string
  showMinMax?: boolean
}

interface Light {
  entity: string
  icon: string
}

export default interface RoomConfig {
  name: string
  temperature?: Temperature
  lights?: Light[]
}
