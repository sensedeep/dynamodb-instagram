import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda"
import { LikeModel } from "../data"

export const main: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const { photoId } = event.pathParameters
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            likes: await LikeModel.listLikesForPhoto(photoId)
        })
    }
    return response
}
