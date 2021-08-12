import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda"
import { CommentModel } from "../data"

export const main: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const { photoId } = event.pathParameters
    const response = {
        statusCode: 200,
        body: JSON.stringify({
          comments: await CommentModel.listCommentsForPhoto(photoId)
        })
    }
    return response
}
