import icons from '../../img/icons.svg';
export default class View {
  _data;
  /**
   * render the received Object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g recipe)
   * @param {boolean} [render =true] if render = false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} a markup string if render = false
   * @this {Object} View instance
   * @author Glynda Surot
   * @todo finish the implementation
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }
    this._data = data;
    this._clear();
    const markupHTML = this._generateMarkupHTML();
    if (!render) return markupHTML;
    this._parentElement.insertAdjacentHTML('afterbegin', markupHTML);
  }
  update(data) {
    this._data = data;
    const newMarkupHTML = this._generateMarkupHTML();
    const newDOM = document
      .createRange()
      .createContextualFragment(newMarkupHTML);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    // console.log(curElements);
    // console.log(newElements);
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      //Update changed TEXT
      if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() != '')
        curEl.textContent = newEl.textContent;
      //Update Changed Attribute
      if (!newEl.isEqualNode(curEl)) {
        // console.log(Array.from(newEl.attributes));
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    if (!this._parentElement) return;
    this._parentElement.innerHTML = '';
  }
  renderSpinner() {
    const markupHTMLSpinner = `
    <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markupHTMLSpinner);
  }
  renderError(message = this._errorMessage) {
    const markupHTMLError = `<div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markupHTMLError);
  }
  renderMessage(message = this._message) {
    const markupHTMLError = `<div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markupHTMLError);
  }
}
