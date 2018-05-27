import { JsonController, Get, Post, Param, Put, HttpCode, Body, BadRequestError, NotFoundError } from 'routing-controllers'
import Game  from './entity'

const coloursArray = ['red', 'blue', 'green', 'yellow', 'magenta']

const defaultBoard = [
    ['o', 'o', 'o'],
    ['o', 'o', 'o'],
    ['o', 'o', 'o']
]

const moves = (board1: string[][], board2: string[][]) =>
  board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
    .length

@JsonController()
export default class GameController {

    @Get('/games')
    async allGames() {
        const games = await Game.find()
        return { games }
    }

    @Get('/games/:id')
    async getPage(
        @Param('id') id: number
        ) {
        return Game.findOne(id)
    }

    @Post('/games')
    @HttpCode(201)
    startGame(
        @Body() game: Game
    ) {
        game.colour = coloursArray[Math.round(Math.random() * coloursArray.length)]
        game.board = defaultBoard
        return Game.save(game)
    }

    @Put('/games/:id')
    async updateGame(
        @Param('id') id: number,
        @Body() update: Partial<Game>
        ) {
                const game = await Game.findOne(id)
                const newId = update.id
                const newBoard = update.board
                const newColour = update.colour
                const newName = update.name

                if (!game) {
                    throw new NotFoundError('Game does not exist!')
                }
                if(newId && (newId !== game.id)) {
                    throw new BadRequestError("You can't update your id!")
                }
                if(newName && (newName === game.name)) {
                    throw new BadRequestError("I need a new name!")
                }
                if(newBoard && (moves(game.board, newBoard) !== 1)) {
                    throw new BadRequestError("You have to make one and only one move!")
                }
                if(newColour && !(coloursArray.includes(newColour))) {
                    throw new BadRequestError(`Invalid! You can only choose from: ${coloursArray}`)
                } 

            return Game.merge(game, update).save()
        }

}