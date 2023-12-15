import {
  AreaRegistryEntry,
  CurrentUser,
  DateFormat,
  DeviceRegistryEntry,
  EntityRegistryDisplayEntry,
  FirstWeekday,
  FrontendLocaleData,
  HomeAssistant,
  LocalizeFunc,
  NumberFormat,
  Panels,
  Resources,
  Themes,
  TimeFormat,
  TimeZone,
  TranslationCategory,
  TranslationMetadata,
} from '@ha'
import {
  Auth,
  Connection,
  ConnectionOptions,
  HaWebSocket,
  HassConfig,
  HassEntities,
  HassEntity,
  HassServices,
  MessageBase,
} from 'home-assistant-js-websocket'

class HassEmpty implements HomeAssistant {
  auth: Auth = {
    data: {
      hassUrl: '',
      clientId: null,
      expires: 0,
      refresh_token: '',
      access_token: '',
      expires_in: 0,
    },
    wsUrl: '',
    accessToken: '',
    expired: false,
    refreshAccessToken: function (): Promise<void> {
      throw new Error('Function not implemented.')
    },
    revoke: function (): Promise<void> {
      throw new Error('Function not implemented.')
    },
  }
  connected = false
  states: HassEntities = {}
  config: HassConfig = {
    latitude: 0,
    longitude: 0,
    elevation: 0,
    unit_system: {
      length: '',
      mass: '',
      volume: '',
      temperature: '',
      pressure: '',
      wind_speed: '',
      accumulated_precipitation: '',
    },
    location_name: '',
    time_zone: '',
    components: [],
    config_dir: '',
    allowlist_external_dirs: [],
    allowlist_external_urls: [],
    version: '',
    currency: '',
    external_url: null,
    internal_url: null,
    safe_mode: false,
    config_source: '',
    recovery_mode: false,
    state: 'NOT_RUNNING',
    country: null,
    language: '',
  }
  themes: Themes = {
    themes: {},
    default_theme: 'default',
    default_dark_theme: null,
    theme: '',
    darkMode: false,
  }
  language: string = 'en'
  selectedTheme = null
  locale: FrontendLocaleData = {
    language: 'en',
    number_format: NumberFormat.language, // Adjust to valid value
    date_format: DateFormat.YMD, // Adjust to valid value
    time_format: TimeFormat.system, // Adjust to valid value
    first_weekday: FirstWeekday.monday, // Adjust to valid value
    time_zone: TimeZone.local,
  }
  translationMetadata: TranslationMetadata = {
    fragments: [],
    translations: {},
  }
  user: CurrentUser = {
    id: '',
    name: '',
    is_owner: false,
    is_admin: false,
    credentials: [],
    mfa_modules: [],
  }
  panelUrl: string = ''
  services: HassServices = {}
  callService: HomeAssistant['callService'] = async () => ({
    context: { id: '', user_id: null },
  })
  fetchWithAuth: HomeAssistant['fetchWithAuth'] = async () => new Response()
  sendWS: HomeAssistant['sendWS'] = () => {}
  connection: Connection = new Connection(
    new HaWebSocketStub(),
    new ConnectionOptionsStub()
  )
  // Add missing properties from the HomeAssistant interface

  constructor() {
    // Initialize with default values
  }
  entities: { [id: string]: EntityRegistryDisplayEntry } = {}
  devices: { [id: string]: DeviceRegistryEntry } = {}
  areas: { [id: string]: AreaRegistryEntry } = {}
  panels: Panels = {}
  selectedLanguage: string | null = null
  resources: Resources = {}
  localize: LocalizeFunc = (key: string, ...args: any[]) => ''
  suspendWhenHidden: boolean = false
  enableShortcuts: boolean = false
  vibrate: boolean = false
  dockedSidebar: 'docked' | 'always_hidden' | 'auto' = 'auto'
  defaultPanel: string = ''
  moreInfoEntityId: string | null = null
  hassUrl(path?: any): string {
    throw new Error('Method not implemented.')
  }
  callWS<T>(msg: MessageBase): Promise<T> {
    throw new Error('Method not implemented.')
  }
  loadBackendTranslation(
    category: TranslationCategory,
    integration?: string | string[] | undefined,
    configFlow?: boolean | undefined
  ): Promise<LocalizeFunc> {
    throw new Error('Method not implemented.')
  }
  formatEntityState(stateObj: HassEntity, state?: string | undefined): string {
    throw new Error('Method not implemented.')
  }
  formatEntityAttributeValue(
    stateObj: HassEntity,
    attribute: string,
    value?: string | undefined
  ): string {
    throw new Error('Method not implemented.')
  }
  formatEntityAttributeName(stateObj: HassEntity, attribute: string): string {
    throw new Error('Method not implemented.')
  }
  callApi<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    parameters?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<T> {
    throw new Error('Method not implemented.')
  }

  // Implement any other methods or logic as needed
}

class HaWebSocketStub implements HaWebSocket {
  haVersion: string = ''
  binaryType: BinaryType = 'blob'
  bufferedAmount: number = 0
  extensions: string = ''
  onclose(this: WebSocket, ev: CloseEvent) {
    throw new Error('Method not implemented.')
  }
  onerror(this: WebSocket, ev: Event) {
    throw new Error('Method not implemented.')
  }
  onmessage(this: WebSocket, ev: MessageEvent<any>) {
    throw new Error('Method not implemented.')
  }
  onopen(this: WebSocket, ev: Event) {
    throw new Error('Method not implemented.')
  }
  protocol: string = ''
  readyState: number = 0
  url: string = ''
  close(code?: number | undefined, reason?: string | undefined): void {
    throw new Error('Method not implemented.')
  }
  send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void {
    throw new Error('Method not implemented.')
  }
  CONNECTING: 0 = 0
  OPEN: 1 = 1
  CLOSING: 2 = 2
  CLOSED: 3 = 3
  addEventListener<K extends keyof WebSocketEventMap>(
    type: K,
    listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions | undefined
  ): void
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions | undefined
  ): void
  addEventListener(type: unknown, listener: unknown, options?: unknown): void {}
  removeEventListener<K extends keyof WebSocketEventMap>(
    type: K,
    listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any,
    options?: boolean | EventListenerOptions | undefined
  ): void
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions | undefined
  ): void
  removeEventListener(
    type: unknown,
    listener: unknown,
    options?: unknown
  ): void {
    throw new Error('Method not implemented.')
  }
  dispatchEvent(event: Event): boolean {
    throw new Error('Method not implemented.')
  }
}

class ConnectionOptionsStub implements ConnectionOptions {
  setupRetry: number = 0
  auth?: Auth | undefined
  createSocket(options: ConnectionOptions): Promise<HaWebSocket> {
    throw new Error('Method not implemented.')
  }
}

export default HassEmpty
