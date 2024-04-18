import { BookRelations as _BookRelations } from './book_relations';
import { Book as _Book } from './book';

export namespace PrismaModel {
  export class BookRelations extends _BookRelations {}
  export class Book extends _Book {}

  export const extraModels = [BookRelations, Book];
}
