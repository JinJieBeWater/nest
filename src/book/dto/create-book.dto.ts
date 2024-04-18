export class CreateBookDto {
  /**
   * The name of the book
   * @example "The Great Gatsby"
   */
  name: string;
  /**
   * The author of the book
   * @example "F. Scott Fitzgerald"
   */
  author: string;
  /**
   * The description of the book
   * @example "A classic novel set in the Jazz Age"
   */
  desc?: string;
  /**
   * The price of the book
   * @example 10.99
   */
  price: number;
  /**
   * The stock of the book
   * @example 100
   */
  stock: number;
  /**
   * The first edition of the book
   * @example "1925-04-01"
   */
  firstEdition: Date;
}
