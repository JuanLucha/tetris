import { ShapesFactory } from './../shape/shapes-factory'
import { Shape, shapeWidth, shapeHeight } from './../shape/shape'
import { Point } from '../shared/point.interface'

export class Board {
  public tiles: string[][]
  public width: number
  public height: number
  public actualShape: Shape
  private shapesFactory: ShapesFactory
  private backgroundColor: string

  constructor(width: number, height: number, shapesFactory: ShapesFactory, backgroundColor: string) {
    this.width = width
    this.height = height
    this.shapesFactory = shapesFactory
    this.backgroundColor = backgroundColor

    this.initTiles()
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

  public eraseShape(shape: Shape): void {
    this.paintTiles(shape, this.backgroundColor)
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

  public moveShape(shape: Shape, newPosition: Point): boolean {
    if (newPosition.x === 0 && newPosition.y === 0) return true

    this.eraseShape(shape)
    if (this.movementIsPossible(shape, newPosition)) {
      shape.position.x = newPosition.x
      shape.position.y = newPosition.y
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

  public randomizeShape(): void {
    this.actualShape = this.shapesFactory.getRandomShape()
  }

  private movementIsPossible(shape: Shape, position: Point): boolean {
    let posY: number = position.y
    let posX: number = position.x

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
      return this.tiles[position.y][position.x] === this.backgroundColor
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