import { ShapeData } from './shape-data.interface'

export class Shape {
  private pattern: boolean[][] = []
  private color: string
  private code: string

  constructor(shapeData: ShapeData) {
    this.pattern = shapeData.pattern
    this.color = shapeData.color
    this.code = shapeData.code
  }

  public rotateShape(): void {
  }

  public getPattern(): boolean[][] {
    return this.pattern
  }

  public getColor(): string {
    return this.color
  }

  public getCode(): string {
    return this.code
  }
}