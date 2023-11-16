import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';


export class SimpliaIFramePopup extends LitElement {
  static properties = {
    src: { state: true },
  };
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
  `;

  constructor() {
    super();
  }
  firstUpdated() {
    this.addEventListener('closePopup', () => this.src = '')
  }
  setSource(src) {
    this.src = src
    // this.requestUpdate()
  }
  render() {
    return html`
      <iframe style="width: 100vw; height: calc(100vh - 40px); padding: 0 !important; border: none;margin-bottom: 80px;" id="popup-source" src="${this.src}" loading="lazy"></iframe>
    `;
  }
}
customElements.define('frame-wc', SimpliaIFramePopup);
