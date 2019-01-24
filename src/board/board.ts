import { ShapesFactory } from './../shape/shapes-factory'
import { Shape } from './../shape/shape'

export class Board {
  public tiles: string[][]
  public width: number
  public height: number
  public actualShape: Shape
  private shapesFactory: ShapesFactory

  constructor(width: number, height: number, shapesFactory: ShapesFactory) {
    this.width = width
    this.height = height
    this.shapesFactory = shapesFactory
  }

  public resetTiles() {
    this.tiles = []
    for (let x = 0; x < this.width; x++) {
      let newTile = []
      for (let y = 0; y < this.height; y++) {
        newTile.push(null)
      }
      this.tiles.push(newTile)
    }
  }

  // TODO: remove this later
  public randomizeShape(): void {
    this.actualShape = this.shapesFactory.getRandomShape()
  }
}