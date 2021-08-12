import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda"
import { CommentModel } from "../data"

export const main: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const { photoId } = event.pathParameters
    const { commentingUsername, content } = JSON.parse(event.body)

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            comment: await CommentModel.commentOnPhoto(photoId, commentingUsername, content)
        })
    }
    return response
}
