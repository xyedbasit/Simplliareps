import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { unsafeHTML } from 'https://unpkg.com/lit-html/directives/unsafe-html.js';


class VerticalPosts extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      sections: { type: Array },
      toggle: { type: Boolean },
      article: { type: Object }
    };
  }
  static styles = css`
  .card {
    margin: 4px;
    padding: 10px;
    display: flex;
    flex-direction: wrap;
  }
  .card .info {
      flex: 2;
      padding: 5px;
  }

  .info h2
  {
    display: block;
    font-size: 18px;
    font-weight: bold;
    margin: 0px 0px 10px 3px;
    line-height: 22px;
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
  .card .image {
    height:350px;
    flex: 1;
    padding: 5px;
  }
  .card .image img {
    height: 100%;
    width: 100%;
    object-fit: cover; /* Maintain image aspect ratio and fill the container */
  }
  .readmore {
    font-size: 14px;
    font-weight: 700;
    color: blue;
    text-decoration: none;
}
@media (max-width: 500px) {
  .card .image img {
    height: 180px;
    width: 100%;
    object-fit: cover;
  }
  .card .image {
    height:180px;
    flex: 1;
    padding: 5px;
  }
}

  `;

  constructor() {
    super()
    this.sections = []
    this.toggle = false
    this.article = {}
  }

  connectedCallback() {
    super.connectedCallback()
    this.fetchRecords()
  }

  fetchRecords = async () => {
    console.log("Callled")
    const response = await fetch('https://debianlargeserver-0050-simpliasites.laxroute53.com/JayBuild/System/ServerSide/Read?limit=3&post_type=Post', {
      method: 'GET'
    });
    const data = await response.json()
    this.sections = data.length > 0 ? data : []
  }

  render() {
    return html`${this.section()}`
  }

  openPopup = async (e, ele) => {
    e.preventDefault()
    this.article = ele
    console.log("Toggle Event", this.toggle)
    this.toggle = !this.toggle
  }

  section = () => {
    return html`
      ${this.sections.map((ele, index) => html`
        <div class="card">
          <div class="image">
            <img src=${ele.Image} alt="Image 2">
          </div>
          <div class="info">
              <h2>${ele.post_title}</h2>
              <div>${unsafeHTML(ele.post_content)}</div>
              <a class="readmore" href="#" @click=${(e) => this.openPopup(e, ele)}>Read more >></a>
          </div>
        </div>
      `)}

      <popup-article .toggle=${this.toggle} @update-toggle=${this.updateToggle} .article=${this.article}></popup-article>
    `
  }

  updateToggle = (e) => {
    this.toggle = e.detail.toggle
  }
}

customElements.define('vertical-posts', VerticalPosts)

