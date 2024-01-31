export default class Product {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.averageRating = data.averageRating;
    this.totalRateCount = data.likes + data.dislikes;
    this.likes = data.likes;
    this.dislikes = data.dislikes;
    this.likedByMe = data.likedMyBe;
    this.dislikedByMe = data.dislikedByMe;
    this.imageUrl = data.imageUrl;
    this.parentSubcategoryId = data.parentSubcategoryId;
    this.parentCategoryId = data.parentCategoryId;
    this.producerId = data.producerId;
    this.totalComments = data.totalComments;
  }
}
