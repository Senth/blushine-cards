export default class MockHaIcon extends HTMLElement {
  connectedCallback() {
    const icon = this.getAttribute('icon')
    if (icon) {
      const mdiIconName = icon.replace('mdi:', 'mdi mdi-')
      this.innerHTML = `<i class="${mdiIconName}"></i>`
    }
  }
}

window.customElements.define('ha-icon', MockHaIcon)
