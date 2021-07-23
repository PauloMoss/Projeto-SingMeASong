

async function generateRecommendation(amount:number) {

    const arrayOfRecommendations = [
        {
            name: "Led Zeppelin - stairway to heaven",
            youtubeLink: "https://www.youtube.com/watch?v=IS6n2Hx9Ykk"
        },
        {
            name: "O Rappa - Suplica cearence",
            youtubeLink: "https://www.youtube.com/watch?v=F19PnbWigSA"
        },
        {
            name: "Charlie Brown Jr - So os loucos sabem",
            youtubeLink: "https://www.youtube.com/watch?v=JRJj4z-prvM"
        }
    ];

    arrayOfRecommendations.splice(amount);

    return arrayOfRecommendations;
}

export {
    generateRecommendation
}