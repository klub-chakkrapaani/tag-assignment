import { HttpModule, HttpService } from "@nestjs/axios";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest"
import {Test, TestingModule} from "@nestjs/testing";
import { AppModule } from "../app.module";
import { TagsController } from "./tags.controller";

describe("TagsController", () => {
    let controller : TagsController;
    const tagBody = {
        resource : "Brands",
        resourceId : "984357396590659",
        resourceType : "Gaming",
        name : "Collectible",
        type : "Category",
        conditions : [{
            condition : "includes",
            keywords : ["Amazon", "Retail"],
            field : "narration"
        }]
    }
    let app : INestApplication = null;
    let httpService : HttpService;
    let newTagId : string = null;
    let newTagKey : string = null;
    beforeEach(async () => {
        const module : TestingModule = await Test.createTestingModule({
            imports : [AppModule, HttpModule]
        })
        .compile()
        app = module.createNestApplication();
        httpService = module.get<HttpService>(HttpService);
        await app.init()
    })
    // Successfully created a tag
    it("should create a new tag",async ()=>{
        const newTag = await request(app.getHttpServer()).post("/v1/tag").send(tagBody).set("Accept","application/json")
        expect(newTag.statusCode).toBe(201);
        expect(newTag.body).toHaveProperty("_id");
        newTagKey = newTag.body.key;
        newTagId = newTag.body["_id"];
    })
    // successfully fetched the tag
    it("should get tag based on the params - tagId",async () => {
        const newTag = await request(app.getHttpServer()).get(`/v1/tag/${newTagId}`).set("Accept","application/json")
        expect(newTag.statusCode).toBe(200);
        expect(newTag.body).toHaveProperty("_id");
    })
    // error - 
    it("should get an error for fetching a tag from invalid id", async()=>{
        const newTag = await request(app.getHttpServer()).get("/v1/tag/36290563659").set("Accept","application/json")
        expect(newTag.statusCode).toBe(400);
        expect(newTag.body).toHaveProperty("error")
    })
    it("Should get all the tags based on the query - name , type, resource, resourceId, resourceType", async()=>{
        const newTags = await request(app.getHttpServer()).get("/v1/tag").set("Accept","application/json");
        expect(newTags.statusCode).toBe(200);
        expect(newTags)
    })
} )