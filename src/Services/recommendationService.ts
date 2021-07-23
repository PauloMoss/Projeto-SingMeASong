
import { recommendationSchema } from "../recommendationSchema";
import * as recommendationRepository from "../Ropositories/recommendationRepository";

export async function validateRecommendation (name: string, youtubeLink: string) {

    const err = recommendationSchema.validate({name, youtubeLink}).error;
    if(err) {
        return 400;
    }
    const existingRecommendation = await recommendationRepository.searchExistingRecommendation(youtubeLink);
    if(existingRecommendation) {
        return 409;
    }
    await recommendationRepository.insertRecommendation(name, youtubeLink, 1);
    return null;
}

export async function updateScore(id: number, updateType: string) {

    const changeRecommendationScore = await recommendationRepository.findRecommendationAndUpdateScore(id, updateType);

    if(!changeRecommendationScore) {
        return 404
    } else {
        return false
    }
}

export async function randomRecommendation() {

    let smthRandom;
    let params:string;

    if( Math.random() > 0.3) {
        smthRandom = true
    } else {
        smthRandom = false
    }
    
    if(smthRandom) {
        params = "> 10";
    } else {
        params = "<= 10";
    }

    let recommendation = await recommendationRepository.selectedRecomendation(params);

    // Logica aplicada para, caso nao tenha musicas com um determinado score, procurar pelas outras e so retornar 404 quando BD estiver vazio.

    if(!recommendation) {

        params = "> -5";

        recommendation = await recommendationRepository.selectedRecomendation(params);
    }

    return recommendation;
}

export async function topRecommendations(limit:number) {
    const topRecommendationList = await recommendationRepository.selectedTopScoreRecomendations(limit);

    return topRecommendationList;
}