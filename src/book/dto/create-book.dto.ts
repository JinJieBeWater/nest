import {
  IsDate,
  IsDefined,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBookDto {
  /**
   * The name of the book
   * @example "The Great Gatsby"
   */
  @IsDefined()
  @IsString()
  name: string;
  /**
   * The author of the book
   * @example "F. Scott Fitzgerald"
   */
  @IsDefined()
  @IsString()
  author: string;
  /**
   * The description of the book
   * @example "A classic novel set in the Jazz Age"
   */
  @IsOptional()
  @IsString()
  desc?: string;
  /**
   * The price of the book
   * @example 10.99
   */
  @IsDefined()
  price: number;
  /**
   * The stock of the book
   * @example 100
   */
  @IsDefined()
  @IsInt()
  stock: number;

  /**
   * The first edition of the book
   * @example 2024-04-19T08:14:33.277Z
   */
  @IsDefined()
  firstEdition: Date;
}
