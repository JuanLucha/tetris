import { ShapeData } from './shape-data.interface'
import { Point } from '../shared/point.interface'

export const shapeHeight = 4
export const shapeWidth = 4

export class Shape {
  public color: string
  public code: string
  public hasMovedDown: boolean
  public newPosition: Point
  public pattern: boolean[][][] = []
  public position: Point

  private rotation: number = 0

  constructor(shapeData: ShapeData) {
    this.pattern = shapeData.pattern
    this.color = shapeData.color
    this.code = shapeData.code
    this.position = this.initPosition()
    this.newPosition = this.initPosition()
  }

  public confirmMovement(): void {
    this.position.x = this.newPosition.x
    if (this.position.y !== this.newPosition.y) {
      this.hasMovedDown = true
      this.position.y = this.newPosition.y
    }
  }

  public correctMovementLeft(): void {
    this.newPosition.x = this.newPosition.x - 1
  }

  public correctMovementRight(): void {
    this.newPosition.x = this.newPosition.x + 1
  }

  public getPattern(): boolean[][] {
    return this.pattern[this.rotation]
  }

  public isMovingLeft(): boolean {
    return this.position.x > this.newPosition.x
  }

  public isMovingRight(): boolean {
    return this.position.x < this.newPosition.x
  }

  public moveDown(): void {
    this.newPosition.y = this.position.y + 1
  }

  public moveLeft(): void {
    this.newPosition.x = this.position.x - 1
  }

  public moveRight(): void {
    this.newPosition.x = this.position.x + 1
  }

  public rotateShape(): void {
    this.rotation++
    if (this.rotation === 4) this.rotation = 0
  }

  private initPosition(): Point {
    return {
      x: 0,
      y: 0
    }
  }

}