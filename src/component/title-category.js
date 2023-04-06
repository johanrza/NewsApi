class TitleCategory extends HTMLElement {
  connectedCallback() {
    this.render("General");
  }

  set titleNews(title) {
    this._titleCat = title;
    this.render(this._titleCat);
  }

  render(title) {
    this.innerHTML = `<div class="mt-2 mx-5 p-3">
    <h2>${title}</h2>
    <hr class="border border-secondary border-2 opacity-50" />
    </div>`;
  }
}

customElements.define("title-news", TitleCategory);
