import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda"
import { UserModel } from "../data"

export const main: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const { username } = event.pathParameters
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            user: await UserModel.get({username})
        })
    }
    return response
}
