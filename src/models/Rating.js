export default class Rating {
  constructor(data) {
    this.id = data.id;
    this.rating = data.rating;
    this.liked = data.liked;
    this.disliked = data.disliked;
    this.productId = data.productId;
    this.userId = data.userId;
  }
}
