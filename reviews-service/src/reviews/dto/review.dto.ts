class ReviewsDto {
    idUser: number;
    idGood: number;
    report: {
        title: string;
        reviewInfo: string;
        rating: number;
    };
}

export default ReviewsDto;
