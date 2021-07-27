
export interface Recommendation {
    id:number,
    name:string,
    youtubeLink:string,
    score:number
}

export interface expectedRecommendationBody {
    name:string,
    youtubeLink:string
}