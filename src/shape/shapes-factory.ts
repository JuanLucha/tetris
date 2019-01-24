import { Shape } from './shape'
import { ShapeData } from './shape-data.interface'

export class ShapesFactory {
  private shapesData: ShapeData[]

  constructor(shapesData: ShapeData[]) {
    this.shapesData = shapesData
  }

  public getRandomShape(): Shape {
    const numberOfShapes: number = this.shapesData.length
    const randomPosition: number = Math.round(Math.random() * numberOfShapes)
    return new Shape(this.shapesData[randomPosition])
  }

}