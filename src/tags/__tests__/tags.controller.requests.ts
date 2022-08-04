import type { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { FindTagDto } from '../dto/findTag.dto';
import { UpdateTagDto } from '../dto/updateTag.dto';

const endPoint = '/v1/tag';

export const createTag = async (tag: any, app: INestApplication) =>
  request(app.getHttpServer())
    .post(`${endPoint}`)
    .send(tag)
    .set('Accept', 'application/json');

export const getTagById = async (id: string, app: INestApplication) =>
  request(app.getHttpServer())
    .get(`${endPoint}/${id}`)
    .set('Accept', 'application/json');

export const getAllTags = async (app: INestApplication) =>
  request(app.getHttpServer())
    .get(`${endPoint}`)
    .set('Accept', 'application/json');

export const getTagsByFilter = async (
  Query: FindTagDto,
  app: INestApplication,
) =>
  request(app.getHttpServer())
    .get(
      `${endPoint}?name=${Query.name}&type=${Query.type}&resource=${Query.resource}&resourceId=${Query.resourceId}&resourceType=${Query.resourceType}`,
    )
    .set('Accept', 'application/json');

export const updateTag = async (
  id: string,
  UpdateTagDto: UpdateTagDto,
  app: INestApplication,
) =>
  request(app.getHttpServer())
    .put(`${endPoint}/${id}`)
    .send(UpdateTagDto)
    .set('Accept', 'application/json');

export const deleteTag = async (id: string, app: INestApplication) =>
  request(app.getHttpServer())
    .delete(`${endPoint}/${id}`)
    .set('Accept', 'application/json');
