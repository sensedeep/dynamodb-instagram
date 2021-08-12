import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda"
import { PhotoModel } from "../data"

export const main: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const { username } = event.pathParameters
    const { url } = JSON.parse(event.body)
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            photo: await PhotoModel.create(username, url)
        })
    }
    return response
}
