import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda"
import { FollowModel } from "../data"

export const main: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const { username: followedUsername } = event.pathParameters
    const { followingUsername } = JSON.parse(event.body)
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            follow: await FollowModel.followUser(followedUsername, followingUsername)
        })
    }
    return response
}
