import { shapeData } from './../shape/shape-data-list'
import { ShapesFactory } from './../shape/shapes-factory'
import { Board } from './../board/board'

const gameSelector: string = '#game'
const emptyColor: string = 'white'
const states = {
  running: 0,
  gameOver: 1
}
const gameLoopInterval: number = 1000

export class Game {
  private gameLoop: number
  private shapesFactory: ShapesFactory
  private board: Board

  constructor() {
    this.shapesFactory = new ShapesFactory(shapeData)
    this.board =  new Board(10, 20, this.shapesFactory)
  }

  public render() {
    let game: HTMLElement = document.querySelector(gameSelector)
    let screen: HTMLElement = document.createElement('div')

    for (let x = 0; x < this.board.width; x++) {
      let newRow: HTMLElement = document.createElement('div')
      newRow.classList.add('row')
      for (let y = 0; y < this.board.height; y++) {
        let newTile = document.createElement('div')
        newTile.classList.add('tile')
        newTile.style.backgroundColor = this.board.tiles[x][y] || emptyColor
        newTile.innerHTML = `${x}, ${y}`
        newRow.appendChild(newTile)
      }
      screen.appendChild(newRow)
    }

    game.innerHTML = screen.innerHTML
  }

  public start() {
    this.board.randomizeShape()
    this.gameLoop = window.setInterval(() => {
      this.moveShape()
      this.render()
    }, gameLoopInterval)
    console.log(this.shapesFactory.getRandomShape())
  }

  public moveShape() {

  }
}
