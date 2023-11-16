import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class JoinUsForm extends LitElement {
  static styles = css`
  .oxygen-home .container {
    max-width: 1170px;
    margin: auto;
}
.oxygen-home .form-horizontal .form-group {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
}
.oxygen-home .row {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-left: -0.4rem;
    margin-right: -0.4rem;
}
.oxygen-home .col-3 {
    width: 25%;
    flex: 0 0 auto;
    padding: 0 0.4rem;
}
.oxygen-home .col-9 {
    width: 75%;
    flex: 0 0 auto;
    padding: 0 0.4rem;
}
.oxygen-home .col-12 {
    width: 100%;
    padding: 0 0.4rem;
    flex: 0 0 auto;
    font-size: 14px;
    font-weight: 700;
}
.oxygen-home .col-6 {
    width: 47%;
    flex: 0 0 auto;
    padding: 0 0.4rem;
}
.oxygen-home .col-6:not(:last-child) {
    margin-right: 20px;
}
.oxygen-home .form-parent .form-wrapper {
    width: 820px;
    margin: 10% 30% 0;
    /* background: #f5f5f5;
    border: 1px solid #dfe4ea;
    border-radius: 5px;
    padding: 50px; */
}
.oxygen-home .form-parent .form-wrapper h1 {
    font-size: 1.6rem;
    text-align: center;
    margin-bottom: 20px;
}
.oxygen-home .form-label {
    display: block;
    line-height: 1.2rem;
    padding: 0.3rem 0;
    font-size: 16px;
    font-weight: normal;
}
.oxygen-home .form-group:not(:last-child) {
    margin-bottom: 1rem;
}
.oxygen-home .back-arrow {
  padding: 0 10px;
}
.oxygen-home .back-arrow a {
  cursor: pointer;
}
.oxygen-home .form-horizontal .form-input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    display: block;
    width: 96%;
    padding: 0.375rem 0.75rem;
    font-size: 1.1rem!important;
    font-family: Roboto,sans-serif;
    font-weight: 400;
    line-height: 2!important;
    color: #797979;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #dddddd;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0.375rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
.oxygen-home .send-btn-wrapper {
    margin: 0 auto;
}
.oxygen-home .send-btn {
    background: #f80002;
    color: #fff;
    border: 1px solid #f80002;
    padding: 10px 30px;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s ease all;
}
.oxygen-home .send-btn:hover {
    background: #fff;
    color: #f80002;
    transition: 0.3s ease all;
}
.oxygen-home fieldset {
    border: 1px solid #c3c3c3;
    background: #fff;
    border-radius: 4px;
}
.oxygen-home fieldset legend {
    color: #777;
    margin-bottom: 10px;
    padding: 0 10px;
    background-color: #fff;
    text-align: center;
    font-size: 36px;
    font-weight: 600;
    font-family: Poppins, sans-serif;
}

.oxygen-home .container2 {
    max-width: 1170px;
    width: 100%;
    margin: auto;
}
.oxygen-home .bg-gray {
    background: #f1f1f1;
}
.oxygen-home .py-100 {
    padding: 100px 0;
}

  `;

  render() {
    return html`
      <div class="oxygen-home">
        <div class="form-parent">
          <div class="container">
            <div class="row">
              <div class="form-wrapper col-12">
                <form class="form-horizontal">
                  <fieldset>
                    <legend>Join Us Form</legend>
                    <div class="form-group">
                      <div class="col-12 col-sm-12">
                        <input class="form-input" id="input-example-4" type="text" placeholder="Name" autocomplete="off" fdprocessedid="dr4ab">
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-6 col-sm-12">
                        <input class="form-input" id="input-example-6" type="email" placeholder="Email" fdprocessedid="s8wy9r">
                      </div>
                      <div class="col-6 col-sm-12">
                        <input class="form-input" id="input-example-7" type="password" placeholder="Password" fdprocessedid="s8wy9r">
                    </div>
                    </div>
                    
                    <div class="form-group">
                      <div class="col-12 col-sm-12">
                        <input class="form-input" id="input-example-5" type="text" placeholder="Address" fdprocessedid="1ocgz">
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-12 col-sm-12">
                        <input class="form-input" id="input-example-7" type="password" placeholder="Password" fdprocessedid="s8wy9r">
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-12 col-sm-12">
                        <input class="form-input" id="input-example-8" type="phone" placeholder="Phone Number" fdprocessedid="otk3l">
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-12 col-sm-12" style="font-size: 12px;">
                        <input class="form-input-checkbox" id="input-checkbox" type="checkbox" /> Terms & Conditions
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="send-btn-wrapper">
                        <input class="send-btn" type="submit" value="Send" />
                      </div>
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('join-us-form', JoinUsForm);
