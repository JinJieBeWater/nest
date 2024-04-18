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
import { Book as PrismaBook } from '@prisma/client';
import { ApiCreatedRes } from 'src/decorators/ApiCreatedRes.decorator';
import { ApiOkRes } from 'src/decorators/ApiOkRes.decorator';
import { ApiPaginatedRes } from 'src/decorators/ApiPaginatedRes.decorator';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { PaginationVo } from 'src/class/vo/pagination.vo';

@ApiTags('Book')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @ApiOperation({ summary: '创建', description: '' })
  @ApiCreatedRes(Book)
  createbook(@Body() data: CreateBookDto): Promise<PrismaBook> {
    return this.bookService.createBook(data);
  }

  @Get('pagination')
  @ApiOperation({ summary: '分页查询', description: '' })
  @ApiPaginatedRes(Book)
  @ApiQuery({ name: 'currentPage', description: '当前页码', example: 1 })
  @ApiQuery({ name: 'pageSize', description: '每页条数', example: 10 })
  @ApiQuery({ name: 'name', description: '名称', example: '前端' })
  @ApiQuery({ name: 'desc', description: '描述', required: false })
  async paginationbook(
    @Query('currentPage', ParseIntPipe) currentPage: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
    @Query('name') name: string,
    @Optional() @Query('desc') desc: string,
  ): Promise<PaginationVo<Book>> {
    const data = await this.bookService.Books({
      skip: pageSize * (currentPage - 1),
      take: pageSize,
      where: {
        name: {
          contains: name,
        },
        desc: {
          contains: desc,
        },
      },
    });
    const total = await this.bookService.countBook();
    return {
      records: data,
      currentPage: currentPage,
      pageSize: pageSize,
      total: total,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: '单个查询', description: '' })
  @ApiOkRes(Book)
  findOnebook(@Param('id', ParseIntPipe) id: number): Promise<PrismaBook> {
    return this.bookService.Book({ id: +id });
  }

  @Patch(':id')
  @ApiOperation({ summary: '修改', description: '' })
  @ApiOkRes(Book)
  updatebook(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateBookDto,
  ): Promise<PrismaBook> {
    return this.bookService.updateBook({
      where: { id: +id },
      data: data,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除', description: '' })
  @ApiOkRes(Book)
  removebook(@Param('id', ParseIntPipe) id: number): Promise<PrismaBook> {
    return this.bookService.deleteBook({ id: +id });
  }
}
