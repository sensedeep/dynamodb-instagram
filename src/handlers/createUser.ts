import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda"
import { UserModel } from "../data"

export const main: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const { username, name } = JSON.parse(event.body)
    return {
        body: JSON.stringify({
            user: await UserModel.create({username, name})
        }),
        statusCode: 200
    }
}
