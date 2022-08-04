import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Query,
  Delete,
} from '@nestjs/common';
import { FindTagDto } from './dto/findTag.dto';
import { createTagDto } from './dto/tag.dto';
import { UpdateTagDto } from './dto/updateTag.dto';
import { TagsService } from './tags.service';

@Controller('v1/tag')
export class TagsController {
  constructor(private readonly tagService: TagsService) {}

  // Create a tag
  @Post()
  public createTag(@Body() createTagDto: createTagDto) {
    return this.tagService.create(createTagDto);
  }
  //get a tag by a tag id
  @Get(':id')
  getTagById(@Param('id') id: string) {
    return this.tagService.getById(id);
  }
  // // get all tags or tags passing filter conditions
  //
  @Get()
  getTagsByFilter(@Query() FindTagDto: FindTagDto) {
    return this.tagService.getTagsByFilter(FindTagDto);
  }
  // update a tag by a tag id
  @Put(':id')
  updateTags(@Param('id') id: string, @Body() UpdateTagDto: UpdateTagDto) {
    return this.tagService.updateById(id, UpdateTagDto);
  }
  // // delete a tag by tag id
  @Delete(':id')
  deleteTag(@Param('id') id: string) {
    return this.tagService.deletedById(id);
  }
}
