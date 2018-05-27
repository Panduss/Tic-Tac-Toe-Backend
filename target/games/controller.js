"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const entity_1 = require("./entity");
const coloursArray = ['red', 'blue', 'green', 'yellow', 'magenta'];
exports.defaultBoard = [
    ['o', 'o', 'o'],
    ['o', 'o', 'o'],
    ['o', 'o', 'o']
];
const moves = (board1, board2) => board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
    .length;
let GameController = class GameController {
    async allGames() {
        const games = await entity_1.default.find();
        return { games };
    }
    async getPage(id) {
        return entity_1.default.findOne(id);
    }
    async createGame(game) {
        game.colour = coloursArray[Math.floor(Math.random() * coloursArray.length)];
        return entity_1.default.save(game);
    }
    async updateGame(id, update) {
        const game = await entity_1.default.findOne(id);
        const newId = update.id;
        const newBoard = update.board;
        const newColour = update.colour;
        const newName = update.name;
        if (!game) {
            throw new routing_controllers_1.NotFoundError('Game does not exist!');
        }
        if (newId && (newId !== game.id)) {
            throw new routing_controllers_1.BadRequestError("You can't update your id!");
        }
        if (newName && (newName === game.name)) {
            throw new routing_controllers_1.BadRequestError("I need a new name!");
        }
        if (newColour && !(coloursArray.includes(newColour))) {
            throw new routing_controllers_1.BadRequestError(`Invalid! You can only choose from: ${coloursArray}`);
        }
        if (newBoard && (moves(game.board, newBoard) !== 1)) {
            throw new routing_controllers_1.BadRequestError("You have to make one and only one move!");
        }
        return entity_1.default.merge(game, update).save();
    }
};
__decorate([
    routing_controllers_1.Get('/games')
], GameController.prototype, "allGames", null);
__decorate([
    routing_controllers_1.Get('/games/:id'),
    __param(0, routing_controllers_1.Param('id'))
], GameController.prototype, "getPage", null);
__decorate([
    routing_controllers_1.Post('/games'),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.Body())
], GameController.prototype, "createGame", null);
__decorate([
    routing_controllers_1.Put('/games/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __param(1, routing_controllers_1.Body())
], GameController.prototype, "updateGame", null);
GameController = __decorate([
    routing_controllers_1.JsonController()
], GameController);
exports.default = GameController;
//# sourceMappingURL=controller.js.map