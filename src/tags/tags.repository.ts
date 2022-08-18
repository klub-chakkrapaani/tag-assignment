import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { Tag, TagDocument } from './tag.schema';
@Injectable()
export class TagsRepository {
  constructor(@InjectModel(Tag.name) public tagModel: Model<TagDocument>) {}

  public async create(tag: Tag): Promise<Tag> {
    try {
      const newTag = new this.tagModel(tag);
      const output = newTag.save();
      return output;
    } catch (error) {
      throw new HttpException(error.mesage, HttpStatus.BAD_REQUEST);
    }
  }
  public async find(tagFilterQuery: FilterQuery<Tag>): Promise<Tag[]> {
    try {
      Object.keys(tagFilterQuery).forEach(
        (key) =>
          tagFilterQuery[key] === undefined && delete tagFilterQuery[key],
      );
      const output = await this.tagModel.find(tagFilterQuery);
      if (!output || output.length === 0) {
        throw new NotFoundException('No Tags found');
      }
      return output;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async findOneAndUpdate(
    id: string,
    tagUpdateQuery: UpdateQuery<Tag>,
  ): Promise<Tag> {
    try {
      return this.tagModel.findOneAndUpdate(
        { _id: id, isDeleted: false },
        tagUpdateQuery,
        { new: true },
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
