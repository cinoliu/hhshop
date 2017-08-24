export default {
  /**
   * Find the element value using Recursive Method and return the value rendered if it's defined
   * @param obj
   * @param column
   * @param render
   * @returns {*}
   */
  fetchFromObject(obj, column, render) {
    if (typeof obj === 'undefined') return false;
    let _index = column.indexOf('.');
    if (_index > -1) {
      return this.fetchFromObject(obj[column.substring(0, _index)], column.substr(_index + 1));
    }
    if (typeof render != 'undefined') {
      return render(obj[column]);
    }
    return obj[column];
  },

  /**
   * Emit event to change page from pagination
   * @param page
   * @return {void}
   */
  changePage(page) {
    this.selected = null;
    this.indexSelected = -1;
    this.$emit('change', {perpage: this.perpage, page: page});
  },

  /**
   * Effect toggle to selected row
   * @param row
   * @param index
   * @return {void}
   */
  selectRow(row, index) {
    if (this.indexSelected == index) {
      this.indexSelected = -1;
      this.selected = null;
    } else {
      this.indexSelected = index;
      this.selected = {
        'row': row,
        'index': index
      };
    }
  },

  /**
   * Computed property: Building custom string information with translation
   * @returns {String}
   */
  tableInfo() {
    let label_show = this.translation.pagination.label_show;
    let from = (this.pagination.from == null) ? 0 : this.pagination.from;
    let label_to = this.translation.pagination.label_to;
    let to = (this.pagination.to == null) ? 0 : this.pagination.to;
    let label_of = this.translation.pagination.label_of;
    let total = this.pagination.total;
    let label_entries = this.translation.pagination.label_entries;

    return `${label_show} ${from} ${label_to} ${to} ${label_of} ${total} ${label_entries}`;
  }
}