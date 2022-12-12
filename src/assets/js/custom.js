import Handsontable from 'handsontable';
export class CustomEditor extends Handsontable.editors.TextEditor {
  constructor(props) {
    super(props);
  }

  //prepare(row, col, prop, td, originalValue, cellProperties) {
  //  super.prepare(row, col, prop, td, originalValue, cellProperties);
  //  if (originalValue) {
  //    alert('originalValue:' + originalValue);
  //  }
  //  //if (prop) {
  //  //  alert('prop:' + prop);
  //  //}
  //}
  setValue() {
    return 'fofo';
  }
//  createElements() {
//    super.createElements();

//    this.TEXTAREA = document.createElement('input');
//    this.TEXTAREA.setAttribute('placeholder', 'Custom placeholder');
//    this.TEXTAREA.setAttribute('data-hot-input', true);
//    this.textareaStyle = this.TEXTAREA.style;
//    Handsontable.dom.empty(this.TEXTAREA_PARENT);
//    this.TEXTAREA_PARENT.appendChild(this.TEXTAREA);
//  }
}
