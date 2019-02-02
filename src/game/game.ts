import { shapeData } from './../shape/shape-data-list'
import { ShapesFactory } from './../shape/shapes-factory'
import { Board } from './../board/board'
import { Shape } from '../shape/shape'

const arrows = {
  left: 37,
  up: 38,
  right: 39,
  down: 40
}
const boardHeight: number = 20
const boardWidth: number = 10
const emptyColor: string = 'white'
const gameSelector: string = '#game'
const gameLoopInterval: number = 50
const loopsToTriggerGravity: number = 6
const spaceKeyCode: number = 32
const states = {
  running: 0,
  gameOver: 1
}

export class Game {
  private actualShape: Shape
  private board: Board
  private gameLoop: number
  private gravityLoopCount: number = 0
  private keyPressed: number
  private shapesFactory: ShapesFactory

  constructor() {
    this.shapesFactory = new ShapesFactory(shapeData)
    this.board = new Board(boardWidth, boardHeight, this.shapesFactory, emptyColor)
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.which === spaceKeyCode) {
        this.board.rotateShape(this.actualShape)
      }
    })
  }

  public moveShape() {
    switch (this.keyPressed) {
      case arrows.left:
        this.actualShape.moveLeft()
        break
      case arrows.right:
        this.actualShape.moveRight()
        break
      case arrows.down:
        this.actualShape.moveDown()
        break
    }
    if (this.gravityLoopCount === loopsToTriggerGravity) {
      this.gravityLoopCount = 0
      this.actualShape.moveDown()
    }
    this.gravityLoopCount++
    if (!this.board.moveShape(this.actualShape)) {
      this.board.removeCompletedLines()
      this.actualShape = this.shapesFactory.getRandomShape()
    }
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
}
