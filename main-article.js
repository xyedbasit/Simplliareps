import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { unsafeHTML } from 'https://unpkg.com/lit-html/directives/unsafe-html.js';
import './popup-article.js'


class MainArticle extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      sections: { type: Object },
      toggle: { type: Boolean },
      article: { type: Object }
    };
  }
  static styles = css`
    /* Styles for Main Article */
    .card {
      margin: 4px;
      padding: 10px;
    }
    .card img {
      width: 100%;
    }

    .card h3
  {
    display: block;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
    line-height: 28px;
  }

  .card p
  {
    display: block;
    font-size: 16px;
    font-weight: 500;
    line-height: 27px;
    height: 85px;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0px 0px 10px;
  }

  .readmore {
    font-size: 14px;
    font-weight: 700;
    color: red;
    text-decoration: none;
}


.card .main-image {
  width: 100%;
  height: auto;
  max-width: 400px;
}
  `;

  constructor() {
    super()
    this.sections = {}
    this.toggle = false
    this.article = {}
  }

  connectedCallback() {
    super.connectedCallback()
    this.fetchRecords()
  }

  fetchRecords = async () => {
    console.log("Callled")
    const response = await fetch('https://debianlargeserver-0050-simpliasites.laxroute53.com/JayBuild/System/ServerSide/Read?limit=1&post_type=Post', {
      method: 'GET'
    });
    const data = await response.json()
    this.sections = data.length > 0 ? data[0] : {}
  }

  render() {
    return html`${this.section()}`
  }

  section = () => {
    return html`
        <div class="card">
            <img class="main-image" src=${this.sections.Image} alt="first" />
            <h3>${this.sections.post_title}</h3>
            <!--<div class="tag">${this.sections.post_type}</div>-->
            <div>${unsafeHTML(this.sections.post_content)}</div>
            <a class="readmore" href="#" @click=${(e) => { e.preventDefault(); this.article = this.sections; this.toggle = !this.toggle; }}>Read more >></a>
        </div>

        <popup-article .toggle=${this.toggle} @update-toggle=${this.updateToggle} .article=${this.article}></popup-article>
    `
  }

  updateToggle = (e) => {
    this.toggle = e.detail.toggle
  }
}

customElements.define('main-article', MainArticle)

