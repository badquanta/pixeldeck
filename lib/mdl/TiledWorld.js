// TODO: TiledWorld:

// Example1:
const Example1 = {
  maps: [
    {
      fileName: '001-1.json',
      x: 0,
      y: 0
    },
    {
      fileName: '002-1.json',
      x: 0,
      y: 3200
    },
    {
      fileName: '006-1.json',
      x: 3840,
      y: 4704
    }
  ],
  type: 'world'
}

const Example2withPatterns = {
  patterns: [
    {
      regexp: 'ow-p0*(\\d+)-n0*(\\d+)-o0000\\.tmx',
      multiplierX: 6400,
      multiplierY: 6400,
      offsetX: -6400,
      offsetY: -6400
    }
  ],
  type: 'world'
}

console.log(Example1, Example2withPatterns)
