import {
  Body,
  Controller,
  Delete,
  Get,
  Optional,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiCreatedRes } from 'src/decorators/ApiCreatedRes.decorator';
import { ApiOkRes } from 'src/decorators/ApiOkRes.decorator';
import { ApiPaginatedRes } from 'src/decorators/ApiPaginatedRes.decorator';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';
import { BookQueryDto } from './dto/paginate-book.dto';

@ApiTags('Book')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @ApiOperation({ summary: '创建', description: '' })
  @ApiCreatedRes(Book)
  createBook(@Body() data: CreateBookDto) {
    return this.bookService.createBook(data);
  }

  @Get('paginate')
  @ApiOperation({ summary: '分页查询', description: '' })
  @ApiPaginatedRes(Book)
  async paginateBook(@Query() query: BookQueryDto) {
    const { limit, page, name, author, sortMethod } = query;
    const res = await this.bookService.paginateBook({
      limit,
      page,
      where: {
        name: {
          contains: name,
        },
        author: {
          contains: author,
        },
      },
      orderBy: {
        firstEdition: sortMethod,
      },
    });
    return {
      ...res,
    };
  }

  // @Get('pagination')
  // @ApiOperation({ summary: '分页查询', description: '' })
  // @ApiPaginatedRes(Book)
  // async paginationbook(
  //   @Query() query: BookQueryDto,
  // ): Promise<PaginationVo<Book>> {
  //   const { currentPage, pageSize, name, author, sortMethod } = query;
  //   const data = await this.bookService.Books({
  //     skip: pageSize * (currentPage - 1),
  //     take: pageSize,
  //     where: {
  //       name: {
  //         contains: name,
  //       },
  //       author: {
  //         contains: author,
  //       },
  //     },
  //     orderBy: {
  //       firstEdition: sortMethod,
  //     },
  //   });
  //   const total = await this.bookService.countBook();
  //   return {
  //     records: data,
  //     currentPage: currentPage,
  //     pageSize: pageSize,
  //     total: total,
  //   };
  // }

  @Get(':id')
  @ApiOperation({ summary: '单个查询', description: '' })
  @ApiOkRes(Book)
  findOneBook(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.Book({ id: +id });
  }

  @Patch(':id')
  @ApiOperation({ summary: '修改', description: '' })
  @ApiOkRes(Book)
  updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CreateBookDto,
  ) {
    return this.bookService.updateBook({
      where: { id: +id },
      data: data,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除', description: '' })
  @ApiOkRes(Book)
  removeBook(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.deleteBook({ id: +id });
  }
}
