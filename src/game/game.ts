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
const gameLoopInterval: number = 50
const gameOverSelector: string = '#end-game-message'
const gameOverBackgroundSelector: string = '#end-game-background'
const gameSelector: string = '#game'
const loopsToTriggerGravity: number = 6
const pointsPerLine: number = 100
const scoreBoardSelector: string = '#score-board'
const spaceKeyCode: number = 32
const states = {
  running: 0,
  gameOver: 1
}

export class Game {
  private actualShape: Shape
  private board: Board
  private gameLoop: number
  private gameState: number
  private gravityLoopCount: number = 0
  private keyPressed: number
  private numberOfRemovedLines: number = 0
  private shapesFactory: ShapesFactory
  private score: number = 0

  constructor() {
    this.shapesFactory = new ShapesFactory(shapeData)
    this.setupEvents()
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
      if (this.actualShape.hasMovedDown) {
        this.numberOfRemovedLines = this.board.removeCompletedLines()
        this.score += this.numberOfRemovedLines * pointsPerLine
        this.actualShape = this.shapesFactory.getRandomShape()
      } else {
        this.endGame()
      }
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

    let scoreBoard: HTMLElement = document.querySelector(scoreBoardSelector)
    scoreBoard.innerHTML = `<b>Score:</b> ${this.score}`

    game.innerHTML = screen.innerHTML
  }

  public start() {
    this.score = 0
    this.gameState = states.running
    this.actualShape = this.shapesFactory.getRandomShape()
    this.board = new Board(boardWidth, boardHeight, this.shapesFactory, emptyColor)
    this.hideGameOver()
    this.gameLoop = window.setInterval(() => {
      this.moveShape()
      this.render()
    }, gameLoopInterval)
  }

  private endGame() {
    this.gameState = states.gameOver
    window.clearInterval(this.gameLoop)
    this.showGameOver()
  }

  private hideGameOver() {
    let gameOverMessage: HTMLElement = document.querySelector(gameOverSelector)
    let gameOverBackground: HTMLElement = document.querySelector(gameOverBackgroundSelector)
    gameOverMessage.classList.add('hidden')
    gameOverMessage.classList.remove('visible')
    gameOverBackground.classList.add('hidden')
    gameOverBackground.classList.remove('visible')
  }

  private isGameRunning() {
    return this.gameState === states.running
  }

  private setupEvents() {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.which === spaceKeyCode) {
        this.board.rotateShape(this.actualShape)
      }
    })
    document.body.onkeydown = (e: KeyboardEvent) => {
      console.log(e.keyCode)
      if (e.keyCode === 13 && !this.isGameRunning()) {
        this.start()
      }
      this.keyPressed = e.keyCode
    }
    document.body.onkeyup = () => { this.keyPressed = null }
  }

  private showGameOver() {
    let gameOverMessage: HTMLElement = document.querySelector(gameOverSelector)
    let gameOverBackground: HTMLElement = document.querySelector(gameOverBackgroundSelector)
    gameOverMessage.innerHTML = `Your final score: <b>${this.score}</b><br>Press 'enter' to start again`
    gameOverMessage.classList.remove('hidden')
    gameOverMessage.classList.add('visible')
    gameOverBackground.classList.remove('hidden')
    gameOverBackground.classList.add('visible')
  }
}
