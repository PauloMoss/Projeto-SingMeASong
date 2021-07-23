import connection from "../database";


export async function updateItems(updateType: string, currentScore: number, id:number) {

    let newScore: number;

    if(updateType === 'upvote') {
        newScore = currentScore + 1;
    } else if(updateType === 'downvote') {
        newScore = currentScore - 1;
    } else {
        return
    }
    
    await connection.query(`UPDATE songs SET score = $1 WHERE id = $2`, [newScore, id]);
}

export async function findRecommendationById(id:number) {
    
    const result = await connection.query(`SELECT * FROM songs WHERE id = $1`,[id]);
    
    return result.rows[0]
}