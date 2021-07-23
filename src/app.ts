import express from "express";
import cors from "cors";

import * as recommendationController from "./Controllers/recommendationController";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/recommendations", recommendationController.postRecommendation);

app.post("/recommendations/:id/upvote", recommendationController.upVoteRecommendation);

app.post("/recommendations/:id/downvote", recommendationController.downVoteRecommendation);

app.get("/recommendations/random", recommendationController.getRandomRecommendation);

app.get("/recommendations/top/:amount", recommendationController.getMostWantedRecommendations);

export default app;
