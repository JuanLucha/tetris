import { ShapeData } from './shape-data.interface'
import { Point } from '../shared/point.interface'

export const shapeWidth = 4
export const shapeHeight = 4

export class Shape {
  public pattern: boolean[][] = []
  public color: string
  public code: string
  public position: Point

  constructor(shapeData: ShapeData) {
    this.pattern = shapeData.pattern
    this.color = shapeData.color
    this.code = shapeData.code
    this.position = this.initPosition()
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