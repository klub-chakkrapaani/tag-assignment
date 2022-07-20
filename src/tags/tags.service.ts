import { BadRequestException, ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { utility } from '../utility/tags.utility';
import {Tag, TagDocument} from './tag.schema'
import { ObjectId } from 'mongodb';
import { TagsRepository } from './tags.repository';
import { createTagDto } from './dto/tag.dto';
import { FindTagDto } from './dto/findTag.dto';
import { UpdateTagDto } from './dto/updateTag.dto';



@Injectable()
export class TagsService {

    constructor( private readonly tagsRepository : TagsRepository) {}
  
    public async create(createTagDto : createTagDto) : Promise<Tag |{}>  {
        if(!createTagDto.name){
            throw new HttpException("Enter the name",HttpStatus.BAD_REQUEST)
        }
        if(!createTagDto.type){
            throw new HttpException("Enter the type",HttpStatus.BAD_REQUEST)
        }
        let key: string = utility.createKey(createTagDto.name) // can use unique id generator
        createTagDto.key = key;
        if(!createTagDto.conditions || createTagDto.conditions.length === 1){
            createTagDto.isDynamic = false
        }else{
            createTagDto.isDynamic = true;
        }
        createTagDto.isDeleted = false;
        createTagDto.deletedBy = null;
        createTagDto.deletedAt = null;

        const tag = createTagDto
        return this.tagsRepository.create(tag)
       
    }
    public async getById(id : string) : Promise<Tag | {}> {
        if(!ObjectId.isValid(id)){
            throw new BadRequestException("Id is invalid")
        }
        const  tag =  await this.tagsRepository.find({_id : id,isDeleted:false})
        if(!tag){
            throw new BadRequestException("Tag not present")
        }
        return tag[0]
    }
    public async getTagsByFilter(FindTagDto : FindTagDto) : Promise<Tag[] |{}> {
        FindTagDto.isDeleted = false;
        return this.tagsRepository.find(FindTagDto)
    }
    public async updateById(id : string, UpdateTagDto : UpdateTagDto) : Promise<Tag | {}> {
        if(!ObjectId.isValid(id)){
            return {status : false, message : "Enter the valid Object ID"}
        }
        if(UpdateTagDto?.conditions?.length === 1){
            UpdateTagDto.isDynamic = false
        }else if(UpdateTagDto?.conditions){
            UpdateTagDto.isDynamic = true
        }
        UpdateTagDto.updatedBy = "User"
        return this.tagsRepository.findByIdAndUpdate(id, UpdateTagDto )
    }
    public async deletedById(id : string) : Promise<Tag | {}>  {
        if(!ObjectId.isValid(id)){
            return {status : false, message : "Enter the valid Object ID"}
        }
        const deletedTag = await this.tagsRepository.findByIdAndUpdate(id,{isDeleted : true,deletedAt : new Date(),deletedBy : "User"})
        return {status: true, mesage : `${deletedTag.name} deleted successfully`}
    }
}