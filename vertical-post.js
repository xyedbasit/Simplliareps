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
    margin: 0 0 50px;
    padding: 10px;
    display: flex;
    align-items: center;
    flex-direction: wrap;
    flex-wrap: wrap;
  }
  .card .info {
      flex: 2;
      padding: 5px;
      margin-left: 20px;
  }

  .info h2
  {
    display: block;
    font-size: 22px;
    font-weight: bold;
    margin: 0px 0px 10px 3px;
    line-height: normal;
  }
  .card p
  {
    display: block;
    font-size: 16px;
    font-weight: 500;
    line-height: 27px;
    margin: 0px 0px 10px;
  }
  .card p:first-child
  {
    height: 85px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .card .image {
    height:350px;
    flex: 1;
  }
  .card .image img {
    height: 100%;
    width: 100%;
    object-fit: cover; /* Maintain image aspect ratio and fill the container */
  }
  .readmore {
    display: inline-block;
    background-color: #fff;
    color: #D60C21;
    font-size: 14px;
    font-weight: 500;
    height: 40px;
    line-height: 40px;
    padding: 0px 25px;
    border-radius: 20px;
    border: 1px solid #fff;
    font-family: 'Poppins', sans-serif;
    transition: all .3s ease;
    text-decoration: none;
  }
  .readmore:hover {
    background-color: #D60C21;
    color: #fff;
    border: 1px solid #D60C21;
    cursor: pointer;
  }
  @media screen and (max-width: 1024px) and (min-width: 768px) {
    .card .image {
      height: 300px;
    }
  }
  @media screen and (max-width: 540px) {
    .info h2 {
      font-size: 18px;
    }
    .card .image {
      height: 300px;
    }
    .readmore {
      background-color: rgb(214, 12, 33);
      color: rgb(255, 255, 255);
  }
}
@media screen and (max-width: 500px) {
  .card {
    padding: 0;
    margin: 0 0 30px;
  }
  .card .image img {
    height: 180px;
    width: 100%;
    object-fit: cover;
  }
  .card .image {
    height:180px;
    flex: 0 0 100%;
    padding: 0;
  }
  .card .info {
    margin: 10px;
  }
  .readmore {
    background-color: rgb(214, 12, 33);
    color: #fff;
  }
  .info h2 {
    font-size: 18px;
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
