import { Test, TestingModule } from '@nestjs/testing';
import { TagsRepository } from '../tags.repository';
import { TagsService } from '../tags.service';

describe('TagService', () => {
  let service: TagsService;
  const mockTagsRepository = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagsService, TagsRepository],
    })
      .overrideProvider(TagsRepository)
      .useValue(mockTagsRepository)
      .compile();

    service = module.get<TagsService>(TagsService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
