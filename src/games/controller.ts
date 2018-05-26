import { JsonController, Get, Put, Param, Post, HttpCode, Body, NotFoundError } from 'routing-controllers'
import Game  from './entity'

const coloursArray = ['red', 'blue', 'green', 'yellow', 'magenta']

const defaultBoard = [
    ['o', 'o', 'o'],
    ['o', 'o', 'o'],
    ['o', 'o', 'o']
]

@JsonController()
export default class GameController {

    @Get('/games')
    async allGames() {
        const games = await Game.find()
        return { games }
    }

    @Post('/games')
    @HttpCode(201)
    startGame(
        @Body() game: Game) {
        game.colour = coloursArray[Math.round(Math.random() * coloursArray.length)]
        game.board = defaultBoard
        return Game.save(game)
    }
}

