import { IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator";


export class CreateReviewDto {
    @IsNotEmpty()
    @IsInt()
    readonly userId: number;

    @IsNotEmpty()
    @IsInt()
    readonly goodId: number;

    readonly report: ReportDto;

}

export class ReportDto {

    @IsString()
    readonly title: string;

    @IsString()
    readonly reportInfo: string;

    @Min(1)
    @Max(5)
    readonly rating: number;
}