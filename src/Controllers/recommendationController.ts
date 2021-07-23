import { Request, Response } from 'express';
import getYouTubeID from 'get-youtube-id';

import * as recommendationService from '../Services/recommendationService';

export async function postRecommendation (req: Request, res: Response ) {
    try{
        const { name, youtubeLink } = req.body;

        const youtubeId = getYouTubeID(youtubeLink);

        if(!youtubeId) {
            return res.sendStatus(422);
        }
        
        const statusError = await recommendationService.validateRecommendation( name, youtubeLink );

        if(statusError) {
            return res.sendStatus(statusError)
        }

        return res.sendStatus(201);

    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
    
}

export async function upVoteRecommendation (req: Request, res: Response ) {
    try{
        const id = Number(req.params.id);
        const updateType = 'upvote';

        const statusError = await recommendationService.updateScore(id,updateType);

        if(statusError) {
            return res.sendStatus(statusError)
        }
        return res.sendStatus(200);
        
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
    
}

export async function downVoteRecommendation (req: Request, res: Response ) {
    try{
        const id = Number(req.params.id);
        const updateType = 'downvote';

        const statusError = await recommendationService.updateScore(id,updateType);

        if(statusError) {
            return res.sendStatus(statusError)
        }
        return res.sendStatus(200);
        
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
    
}

export async function getRandomRecommendation (req: Request, res: Response ) {
    try{
        const recommendatedSong = await recommendationService.randomRecommendation();
        
        if(recommendatedSong) {
            return res.send(recommendatedSong);
        } else {
            return res.sendStatus(404)
        }
    }catch(e) {
        console.log(e);
        res.sendStatus(500)
    }
}

export async function getMostWantedRecommendations (req: Request, res: Response ) {
    try{
        const limitAmount = Number(req.params.amount);

        const topSongs = await recommendationService.topRecommendations(limitAmount);
        return res.send(topSongs);

    } catch(e) {
        console.log(e);
        res.sendStatus(500)
    }
}