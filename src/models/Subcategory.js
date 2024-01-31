export default class Subcategory {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.productsCount = data.productsCount;
    this.parentCategoryId = data.parentCategoryId;
  }
}
