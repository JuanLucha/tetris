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

  public moveShape(shape: Shape, newPosition: Point): void {
    this.eraseShape(shape)
    shape.position.x = newPosition.x
    shape.position.y = newPosition.y
    this.paintTiles(shape, shape.color)
  }

  private paintTile(position: Point, color: string) {
    this.tiles[position.y][position.x] = color
  }

  // TODO: remove this later
  public randomizeShape(): void {
    this.actualShape = this.shapesFactory.getRandomShape()
  }
}