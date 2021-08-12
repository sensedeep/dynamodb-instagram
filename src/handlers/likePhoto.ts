import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda"
import { LikeModel } from "../data"

export const main: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const { photoId } = event.pathParameters
    const { likingUsername } = JSON.parse(event.body)
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            like: await LikeModel.likePhoto(photoId, likingUsername)
        })
    }
    return response
}
