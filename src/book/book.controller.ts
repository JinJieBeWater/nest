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
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PaginationVo } from 'src/class/vo/pagination.vo';
import { ApiCreatedRes } from 'src/decorators/ApiCreatedRes.decorator';
import { ApiOkRes } from 'src/decorators/ApiOkRes.decorator';
import { ApiPaginatedRes } from 'src/decorators/ApiPaginatedRes.decorator';
import { UpdateBookDto } from 'src/generated/nestjs-dto/book/dto/update-book.dto';
import { Book } from 'src/generated/nestjs-dto/book/entities/book.entity';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Prisma } from '@prisma/client';

@ApiTags('Book')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @ApiOperation({ summary: '创建', description: '' })
  @ApiCreatedRes(Book)
  createbook(@Body() data: CreateBookDto) {
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
  ) {
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
  findOnebook(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.Book({ id: +id });
  }

  @Patch(':id')
  @ApiOperation({ summary: '修改', description: '' })
  @ApiOkRes(Book)
  updatebook(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateBookDto,
  ) {
    return this.bookService.updateBook({
      where: { id: +id },
      data: data,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除', description: '' })
  @ApiOkRes(Book)
  removebook(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.deleteBook({ id: +id });
  }
}
