export class Board {
  public tiles: string[][]
  public width: number
  public height: number

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
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
}