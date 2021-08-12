import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda"
import { FollowModel } from "../data"

export const main: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const { username } = event.pathParameters
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            following: await FollowModel.listFollowedByUser(username)
        })
    }
    return response
}
