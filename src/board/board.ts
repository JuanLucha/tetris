import { ShapesFactory } from './../shape/shapes-factory'
import { Shape, shapeWidth, shapeHeight } from './../shape/shape'
import { Point } from '../shared/point.interface'

export class Board {
  public actualShape: Shape
  public height: number
  public tiles: string[][]
  public width: number

  private backgroundColor: string
  private shapesFactory: ShapesFactory

  constructor(width: number, height: number, shapesFactory: ShapesFactory, backgroundColor: string) {
    this.width = width
    this.height = height
    this.shapesFactory = shapesFactory
    this.backgroundColor = backgroundColor

    this.initTiles()
  }

  public eraseShape(shape: Shape): void {
    this.paintTiles(shape, this.backgroundColor)
  }

  public initTiles() {
    this.tiles = []
    for (let y = 0; y < this.height; y++) {
      let newTile = []
      for (let x = 0; x < this.width; x++) {
        newTile.push(this.backgroundColor)
      }
      this.tiles.push(newTile)
    }
  }

  public moveShape(shape: Shape): boolean {
    if (shape.newPosition.x === 0 && shape.newPosition.y === 0) return true

    this.eraseShape(shape)
    this.moveHorizontal(shape)
    return this.moveVertical(shape)
  }

  public randomizeShape(): void {
    this.actualShape = this.shapesFactory.getRandomShape()
  }

  private isMovementPossible(shape: Shape): boolean {
    let posY: number = shape.newPosition.y
    let posX: number = shape.newPosition.x

    for (let y = 0; y < shapeHeight; y++) {
      for (let x = 0; x < shapeWidth; x++) {
        if (shape.pattern[y][x] && !this.isValidTile({ y: posY + y, x: posX + x }, this.backgroundColor)) {
          return false
        }
      }
    }
    return true
  }

  private isValidTile(position: Point, backgroundColor: string): boolean {
    if (this.tileIsOutOfBoard(position)) {
      return false
    } else {
      return this.tiles[position.y][position.x] === backgroundColor
    }
  }

  private moveHorizontal(shape: Shape): void {

  }

  private moveVertical(shape: Shape): boolean {
    if (this.isMovementPossible(shape)) {
      shape.confirmMovement()
      this.paintTiles(shape, shape.color)
      return true
    } else {
      this.paintTiles(shape, shape.color)
      return false
    }
  }

  private paintTile(position: Point, color: string) {
    this.tiles[position.y][position.x] = color
  }

  private paintTiles(shape: Shape, color: string): void {
    let posY: number = shape.position.y
    let posX: number = shape.position.x

    for (let y = 0; y < shapeHeight; y++) {
      for (let x = 0; x < shapeWidth; x++) {
        if (shape.pattern[y][x]) this.paintTile({ y: y + posY, x: x + posX }, color)
      }
    }
  }

  private tileIsOutOfBoard(position: Point): boolean {
    if (position.x >= this.width || position.y >= this.height) {
      return true
    } else {
      return false
    }
  }
}