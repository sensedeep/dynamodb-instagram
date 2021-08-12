import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda"
import { PhotoModel } from "../data"

export const main: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const { username, photoId } = event.pathParameters
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            photo: await PhotoModel.get({username, photoId})
        })
    }
    return response
}
