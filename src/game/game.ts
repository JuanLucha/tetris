import { shapeData } from './../shape/shape-data-list'
import { ShapesFactory } from './../shape/shapes-factory'
import { Board } from './../board/board'
import { Shape } from '../shape/shape'
import { Point } from '../shared/point.interface'

const gameSelector: string = '#game'
const emptyColor: string = 'white'
const states = {
  running: 0,
  gameOver: 1
}
const gameLoopInterval: number = 100
const arrows = {
  left: 37,
  up: 38,
  right: 39,
  down: 40
}
const loopsToTriggerGravity: number = 6

export class Game {
  private gameLoop: number
  private shapesFactory: ShapesFactory
  private board: Board
  private actualShape: Shape
  private newPosition: Point = { y: 0, x: 0 }
  private keyPressed: number
  private gravityLoopCount: number = 0

  constructor() {
    this.shapesFactory = new ShapesFactory(shapeData)
    this.board = new Board(10, 20, this.shapesFactory, emptyColor)
  }

  public render() {
    let game: HTMLElement = document.querySelector(gameSelector)
    let screen: HTMLElement = document.createElement('div')

    for (let y = 0; y < this.board.height; y++) {
      let newRow: HTMLElement = document.createElement('div')
      newRow.classList.add('row')
      for (let x = 0; x < this.board.width; x++) {
        let newTile = document.createElement('div')
        newTile.classList.add('tile')
        newTile.style.backgroundColor = this.board.tiles[y][x] || emptyColor
        newTile.innerHTML = `${x}, ${y}`
        newRow.appendChild(newTile)
      }
      screen.appendChild(newRow)
    }

    game.innerHTML = screen.innerHTML
  }

  public start() {
    this.actualShape = this.shapesFactory.getRandomShape()
    document.body.onkeydown = (e: KeyboardEvent) => { this.keyPressed = e.keyCode }
    document.body.onkeyup = (e: KeyboardEvent) => { this.keyPressed = null }
    this.gameLoop = window.setInterval(() => {
      this.moveShape()
      this.render()
    }, gameLoopInterval)
  }

  public moveShape() {
    switch (this.keyPressed) {
      case arrows.left:
        this.newPosition.x--
        break
      case arrows.right:
        this.newPosition.x++
        break
    }
    if (this.gravityLoopCount === loopsToTriggerGravity) {
      this.gravityLoopCount = 0
      this.newPosition.y = this.actualShape.position.y + 1
    }
    this.gravityLoopCount++
    this.board.moveShape(this.actualShape, this.newPosition)
  }
}
