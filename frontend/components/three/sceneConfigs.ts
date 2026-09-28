export type Chapter = {
  start: number
  end: number
  cameraPos: [number, number, number]
  cameraTarget: [number, number, number]
  terrainMode: number
}

export type SceneConfig = {
  chapters: Chapter[]
  gridSize: number
  gridRes: number
  particles: number
}

function chaptersFromPath(
  path: [number, number, number][],
  targets: [number, number, number][],
  modes: number[]
): Chapter[] {
  const n = path.length
  return path.map((pos, i) => ({
    start: i / n,
    end: (i + 1) / n,
    cameraPos: pos,
    cameraTarget: targets[i],
    terrainMode: modes[i % modes.length],
  }))
}

export const SCENE_CONFIGS: Record<string, SceneConfig> = {
  home: {
    gridSize: 64,
    gridRes: 110,
    particles: 600,
    chapters: [
      { start: 0.0, end: 0.2, cameraPos: [0, 8, 22], cameraTarget: [0, 0, 0], terrainMode: 0 },
      { start: 0.2, end: 0.4, cameraPos: [-4, 5, 16], cameraTarget: [0, 1, 0], terrainMode: 1 },
      { start: 0.4, end: 0.6, cameraPos: [5, 3, 12], cameraTarget: [2, 0, -2], terrainMode: 2 },
      { start: 0.6, end: 0.8, cameraPos: [-3, 6, 14], cameraTarget: [-1, 0, -4], terrainMode: 3 },
      { start: 0.8, end: 1.0, cameraPos: [0, 12, 26], cameraTarget: [0, 0, 0], terrainMode: 4 },
    ],
  },
  about: {
    gridSize: 40,
    gridRes: 70,
    particles: 250,
    chapters: chaptersFromPath(
      [
        [0, 6, 22],
        [-3, 4, 18],
        [2, 5, 20],
      ],
      [
        [0, 0, 0],
        [0, 1, -2],
        [-1, 0, -3],
      ],
      [0, 3, 1]
    ),
  },
  divisions: {
    gridSize: 40,
    gridRes: 70,
    particles: 250,
    chapters: chaptersFromPath(
      [
        [0, 7, 20],
        [4, 5, 16],
        [-4, 6, 18],
        [0, 8, 22],
      ],
      [
        [0, 0, 0],
        [2, 1, -2],
        [-2, 0, -3],
        [0, 0, -4],
      ],
      [1, 2, 3, 0]
    ),
  },
  projects: {
    gridSize: 40,
    gridRes: 70,
    particles: 250,
    chapters: chaptersFromPath(
      [
        [0, 5, 20],
        [-5, 4, 16],
        [5, 6, 18],
      ],
      [
        [0, 0, 0],
        [0, 0, -3],
        [0, 1, -2],
      ],
      [2, 4, 1]
    ),
  },
  tech: {
    gridSize: 40,
    gridRes: 70,
    particles: 250,
    chapters: chaptersFromPath(
      [
        [0, 10, 24],
        [0, 6, 18],
        [0, 8, 22],
      ],
      [
        [0, 0, 0],
        [0, 0, -4],
        [0, 0, -2],
      ],
      [0, 2, 4]
    ),
  },
  contact: {
    gridSize: 40,
    gridRes: 70,
    particles: 250,
    chapters: chaptersFromPath(
      [
        [0, 7, 22],
        [0, 5, 18],
        [0, 9, 24],
      ],
      [
        [0, 0, 0],
        [0, 0, -2],
        [0, 0, -3],
      ],
      [4, 0, 3]
    ),
  },
}
