import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { unsafeHTML } from 'https://unpkg.com/lit-html/directives/unsafe-html.js';


class HorizontalPosts extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      sections: { type: Array }
    };
  }

  static styles = css`
  .row {
    display: flex;
    flex-wrap: wrap;
  }

  .card {
    flex: 1;
    margin: 4px;
    padding: 10px;
    display: flex;
    flex-direction: column;
  }
  .card .info {
      padding: 5px;
  }
  .card .info h2 {
    display: block;
    font-size: 18px;
    font-weight: bold;
  }
  .card .image {
    padding: 5px;
  }
  .card .image img {
    height:350px;
    width: 100%;
    object-fit: cover;
  }
  @media screen and (max-width: 1200px) and (min-width: 1025px) {
    .card {
      padding: 0 2px;
    }
    .card .image {
      padding: 0;
    }
    .card .image img {
      height: 300px;
    }
  }
  @media screen and (max-width: 1024px) and (min-width: 768px) {
    .card {
      padding: 0;
    }
    .card .image img {
      height: 300px;
    }
  }

  @media screen and (max-width: 540px) {
    .card .image img {
      height: 230px;
    }
    .card {
      margin: 0;
      padding: 0;
    }
  }

  @media screen and (max-width: 500px) {
    .card {
      flex: 100%;
    }
    .card .image img {
      height:250px;
      width: 100%;
    }
  }
  `;

  constructor() {
    super()
    this.sections = []
  }

  connectedCallback() {
    super.connectedCallback()
    this.fetchRecords()
  }

  fetchRecords = async () => {
    console.log("Callled")
    const response = await fetch('https://debianlargeserver-0050-simpliasites.laxroute53.com/JayBuild/System/ServerSide/Read?limit=4&post_type=Post', {
      method: 'GET'
    });
    const data = await response.json()
    this.sections = data.length > 0 ? data : []
  }

  render() {
    return html`
      <div class="row">
      ${this.section()}
      </div>
    `
  }

  section = () => {
    return this.sections.map((ele, index) => html`
    <div class="card">
      <div class="image">
        <img src=${ele.Image} alt="Image 2">
      
      </div>
      <div class="info">
          <h2>${ele.Title}</h2>
      </div>
    </div>
    `)
  }
}

customElements.define('horizontal-posts', HorizontalPosts)

