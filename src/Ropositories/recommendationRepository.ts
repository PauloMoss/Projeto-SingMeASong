import connection from "../database";
import { updateItems, findRecommendationById } from "./genericFunctions";
import { Recommendation } from '../Protocols/interface';

export async function insertRecommendation(name: string, youtubeLink: string, score: number) {

    await connection.query(`INSERT INTO songs (name, "youtubeLink", score) VALUES ($1, $2, $3)`,[name, youtubeLink, score]);

    return;
}

export async function searchExistingRecommendation(youtubeLink:string){

    const result = await connection.query(`SELECT * FROM songs WHERE "youtubeLink" = $1`,[youtubeLink]);

    if(result.rows[0]) {
        return true;
    }
    return false;
}

export async function findRecommendationAndUpdateScore(id:number, updateType:string) {
    
    const recommendation = await findRecommendationById(id);

    if(recommendation) {
        const currentScore = Number(recommendation.score);
        if(currentScore === -5 && updateType === 'downvote'){
            await connection.query(`DELETE FROM songs WHERE id = $1`,[id]);
            return true;
        }
        await updateItems(updateType, currentScore, id);
        return true;
    }

    return false;
}

export async function selectedRecomendation(params:string):Promise<Recommendation>  {

    const recommendatedSong = await connection.query(`SELECT * FROM songs WHERE score ${params} ORDER BY RANDOM() LIMIT 1`);

    return recommendatedSong.rows[0];
}

export async function selectedTopScoreRecomendations(limit:number):Promise<Recommendation[]> {

    const songsWithBestScore = await connection.query(`SELECT * FROM songs ORDER BY score DESC LIMIT $1`,[limit]);

    return songsWithBestScore.rows;
}