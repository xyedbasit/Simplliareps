import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';


export class SimpliaPopup extends LitElement {
  static properties = {
  };
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    :host {
      color: blue;
    }
    .page-popup {
      position: fixed;
      background: white;
      z-index: 9999;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      height: 100vh;
      width: 100%;
      /* border: 1px solid #ccc; */
      box-shadow: 1px 1px 1px 1px #333;
      overflow: hidden;
      
    }
    .float-top{
      width:50% !important;
      margin-left:50% !important;
    }
    
  `;

  constructor() {
    super();
  }

  showPopup() {
    const popup = this.shadowRoot.getElementById('popup-main');
    popup.style.display = 'block';
    window.document.body.style.overflowY = 'hidden'
    window.dispatchEvent(new Event('showPopup'))
  }

  closePopup() {
    const popup = this.shadowRoot.getElementById('popup-main');
    popup.style.display = 'none';
    window.document.body.style.overflowY = ''
    window.dispatchEvent(new Event('closePopup'))
  }

  // Render the UI as a function of component state

  render() {
    return html`
      <div class="page-popup" id="popup-main" style="display: none">
        <div style="background: white; height: 100%;">
          <div
            
            style="cursor: pointer; display: flex; z-index:999; justify-content: flex-start; color:Black; padding: 5px 20px;position: relative;left: 0; top:3px; height: 80px; width:50%;">
            
            <svg @click=${this.closePopup} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">
  <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
  <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192" fill="red"/>
</svg>


          </div>
          <div class="flex sm1:w-1/3 w-full" style="height: 100%">
            <div class="line popup-line"></div>

            <div style="display:flex;height:90vh;place-items:center;">
                <slot></slot>
            </div>
          </div>
        </div>
        <div
          style="position: fixed;width: 100vw;height: 100vh;background: rgba(0, 0, 0, 0.25);top:  0; left: 0; right: 0; bottom: 0; z-index: -1;">
        </div>
      </div>  
    `;
  }
}
customElements.define('popup-wc', SimpliaPopup);
