import { HttpModule } from '@nestjs/axios';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import {
  createTag,
  deleteTag,
  getAllTags,
  getTagById,
} from './tags.controller.requests';

describe('TagsController', () => {
  const tagBody = {
    resource: 'Brands',
    resourceId: '984357396590659',
    resourceType: 'Gaming',
    name: 'Collectible',
    type: 'Category',
    conditions: [
      {
        condition: 'includes',
        keywords: ['Amazon', 'Retail'],
        field: 'narration',
      },
    ],
  };
  const invalidTagBody1 = {
    type: 'Sub-category',
    resource: 'Patrons',
    resourceId: '2398579327897wer3',
    resourceType: 'SYndicate',
    conditions: [],
  };

  const invalidTagBody2 = {
    resource: 'Brands',
    resourceId: '984357396590659',
    resourceType: 'Gaming',
    name: 'Non-collectible',
    conditions: [
      {
        condition: 'includes',
        keywords: ['Amazon', 'Retail'],
        field: 'narration',
      },
    ],
  };
  let app: INestApplication = null;
  let newTagId: string = null;
  let newTagKey: string = null;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, HttpModule],
    }).compile();
    app = module.createNestApplication();
    await app.init();
  });
  // Successfully created a tag
  it('should create a new tag', async () => {
    const newTag = await createTag(tagBody, app);
    expect(newTag.statusCode).toBe(201);
    expect(newTag.body).toHaveProperty('_id');
    newTagKey = newTag.body.key;
    newTagId = newTag.body['_id'];
  });
  //  error
  it('should sends an error for invalid tag body- name not present', async () => {
    const newTag = await createTag(invalidTagBody1, app);
    expect(newTag.statusCode).toBe(400);
    expect(newTag.body.message).toMatch(/name/);
  });
  // error
  it('should return error for invalid tag body - type not present', async () => {
    const newTag = await createTag(invalidTagBody2, app);
    expect(newTag.statusCode).toBe(400);
    expect(newTag.body.message).toMatch(/type/);
  });
  // successfully fetched the tag
  it('should get tag based on the params - tagId', async () => {
    const newTag = await getTagById(newTagId, app);
    expect(newTag.statusCode).toBe(200);
    expect(newTag.body).toHaveProperty('_id');
  });
  // error
  it('should get an error for fetching a tag from invalid id', async () => {
    const newTag = await getTagById('98e7908q7597w9', app);
    expect(newTag.statusCode).toBe(400);
    expect(newTag.body.message).toMatch(/invalid/);
    expect(newTag.body).toHaveProperty('error');
  });
  // successful
  it('should return all the tags', async () => {
    const allTags = await getAllTags(app);
    expect(allTags.statusCode).toBe(200);
    for (const tag of allTags.body) {
      expect(tag).toHaveProperty('_id');
    }
  });

  // successful
  it('should delete a tag by its tag id', async () => {
    const deletedTagDetails = await deleteTag(newTagId, app);

    expect(deletedTagDetails.statusCode).toBe(200);
    expect(deletedTagDetails.body.message).toMatch(/deleted/);
  });
  //error
  it('should get an error if we send invalid id to delete', async () => {
    const deletedTagDetails = await deleteTag('3759980w7359874u', app);
    expect(deletedTagDetails.statusCode).toBe(400);
    expect(deletedTagDetails.body.message).toMatch(/invalid/);
    expect(deletedTagDetails.body).toHaveProperty('error');
  });
});
