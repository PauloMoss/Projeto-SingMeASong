import supertest from "supertest";

import '../../src/setup';
import app from "../../src/app";
import connection from "../../src/database";
import { insertRecommendation } from "../../src/Ropositories/recommendationRepository";
import { generateRecommendation } from '../utills/Factory';
import { findRecommendationById } from "../utills/genericFunctions";

afterAll(async () => {
  await connection.query(`TRUNCATE songs RESTART IDENTITY`);
  connection.end();
})

describe("POST /recommendations", () => {

  beforeEach(async () => {
    await connection.query(`TRUNCATE songs RESTART IDENTITY`);
  });

  it("should answer with status 201 for valid recommendation", async () => {

    const body = await generateRecommendation(1);

    const response = await supertest(app).post("/recommendations").send(body[0]);

    expect(response.status).toBe(201);
  });

  it("should answer with status 422 for invalid youtube link", async () => {

    const body = await generateRecommendation(1);
    body[0].youtubeLink = "isNotYoutubeLink";

    const response = await supertest(app).post("/recommendations").send(body[0]);

    expect(response.status).toBe(422);
  });

  it("should answer with status 400 for empty params", async () => {

    const body = await generateRecommendation(1);
    body[0].name = "";

    const response = await supertest(app).post("/recommendations").send(body[0]);

    expect(response.status).toBe(400);
  });

  it("should answer with status 409 for already created recommendation", async () => {

    const body = await generateRecommendation(1);
    await insertRecommendation(body[0].name, body[0].youtubeLink, 1);

    const response = await supertest(app).post("/recommendations").send(body[0]);

    expect(response.status).toBe(409);
  });

});

describe("POST /recommendations/:id/upvote", () =>{
  beforeEach(async () => {

    await connection.query(`TRUNCATE songs RESTART IDENTITY`);
    const body = await generateRecommendation(1);
    await insertRecommendation(body[0].name, body[0].youtubeLink, 1);

  });

  it("should answer with status 200 for valid upvote recommendation", async () => {

    const response = await supertest(app).post("/recommendations/1/upvote");

    expect(response.status).toBe(200);
  });

  it("should answer with status 404 for unexistent recommendation id", async () => {

    const response = await supertest(app).post("/recommendations/2/upvote");

    expect(response.status).toBe(404);
  });
})

describe("POST /recommendations/:id/downvote", () =>{
  beforeEach(async () => {
    await connection.query(`TRUNCATE songs RESTART IDENTITY`);
  });

  it("should answer with status 200 for valid downvote recommendation", async () => {

    const body = await generateRecommendation(1);
    await insertRecommendation(body[0].name, body[0].youtubeLink, 1);

    const response = await supertest(app).post("/recommendations/1/downvote");

    expect(response.status).toBe(200);
  });

  it("should answer with status 200 for valid downvote recommendation and delete recommendation", async () => {

    const body = await generateRecommendation(1);
    await insertRecommendation(body[0].name, body[0].youtubeLink, -5);

    const response = await supertest(app).post("/recommendations/1/downvote");
    const recommendation = await findRecommendationById(1);

    expect(response.status).toBe(200);
    expect(recommendation).toBe(undefined);
  });

  it("should answer with status 404 for unexistent recommendation id", async () => {

    const response = await supertest(app).post("/recommendations/2/downvote");

    expect(response.status).toBe(404);
  });
})

describe("GET /recommendations/random", () => {
  beforeEach(async () => {
    await connection.query(`TRUNCATE songs RESTART IDENTITY`);
    
  });

  it("should answer an recommendation with score <= 10", async () => {

    const body = await generateRecommendation(1);
    await insertRecommendation(body[0].name, body[0].youtubeLink, 1);

    const response = await supertest(app).get("/recommendations/random");

    expect(response.status).toBe(200);
    expect(response.body.score).toBe(1);
  });

  it("should answer an recommendation with score > 10", async () => {

    const body = await generateRecommendation(1);
    await insertRecommendation(body[0].name, body[0].youtubeLink, 15);

    const response = await supertest(app).get("/recommendations/random");

    expect(response.status).toBe(200);
    expect(response.body.score).toBe(15);
  });

  it("should answer with status 404 for unexistent recommendations", async () => {

    const response = await supertest(app).get("/recommendations/random");

    expect(response.status).toBe(404);
  });
  
})


describe("GET /recommendations/top/:amount", () => {
  beforeEach(async () => {
    await connection.query(`TRUNCATE songs RESTART IDENTITY`);
  });

  it("should answer with top recommendations list ordered by score and status 200 ", async () => {

    const body = await generateRecommendation(3);

    for( let i = 0; i < body.length; i++){
      await insertRecommendation(body[i].name, body[i].youtubeLink, i + 10);
    }

    const response = await supertest(app).get("/recommendations/top/2");

    expect(response.status).toBe(200);
    expect(response.body[0].score).toBe(12);
    expect(response.body[1].score).toBe(11);
  });
})
