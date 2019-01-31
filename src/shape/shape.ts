import { ShapeData } from './shape-data.interface'
import { Point } from '../shared/point.interface'

export const shapeHeight = 4
export const shapeWidth = 4

export class Shape {
  public color: string
  public code: string
  public newPosition: Point
  public pattern: boolean[][] = []
  public position: Point

  constructor(shapeData: ShapeData) {
    this.pattern = shapeData.pattern
    this.color = shapeData.color
    this.code = shapeData.code
    this.position = this.initPosition()
    this.newPosition = this.initPosition()
  }

  public confirmMovement(): void {
    this.position.x = this.newPosition.x
    this.position.y = this.newPosition.y
  }

  public moveDown(): void {
    this.newPosition.y++
  }

  public moveLeft(): void {
    this.newPosition.x--
  }

  public moveRight(): void {
    this.newPosition.x++
  }

  public rotateShape(): void {
  }

  private initPosition(): Point {
    return {
      x: 0,
      y: 0
    }
  }

}