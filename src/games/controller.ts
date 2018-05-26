import { JsonController, Get, Param } from 'routing-controllers'
import Game  from './entity'

@JsonController()
export default class GameController {

    @Get('/games')
    async allGames() {
        const games = await Game.find()
        return { games }
    }
}