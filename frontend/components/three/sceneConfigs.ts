export type Chapter = {
  start: number
  end: number
  cameraPos: [number, number, number]
  cameraTarget: [number, number, number]
  explode: number
  run: number
  focus?: [number, number, number]
}

export type LatticeSpec = {
  center: [number, number, number]
  box: [number, number, number]
  nodes: number
  linkDist: number
  pulses: number
}

export type SceneConfig = {
  lattice: LatticeSpec
  chapters: Chapter[]
}

function chapters(
  path: [number, number, number][],
  targets: [number, number, number][],
  explode: number[],
  run: number[]
): Chapter[] {
  const n = path.length
  return path.map((pos, i) => ({
    start: i / n,
    end: (i + 1) / n,
    cameraPos: pos,
    cameraTarget: targets[i],
    explode: explode[i % explode.length],
    run: run[i % run.length],
  }))
}

// The turbofan sits at the origin of the world: intake at z=+2.75,
// core nozzle at z=-7.5. Home chapter boundaries are tuned to the actual
// section heights of the landing page (140vh content, 110vh stage sections,
// ~60vh footer). explode ramps the staggered disassembly sequence; run is
// throttle: spool speed, combustor glow, exhaust plume, intake flow.
const LATTICE: LatticeSpec = {
  center: [0, 0, -2],
  box: [36, 16, 32],
  nodes: 380,
  linkDist: 3.2,
  pulses: 36,
}

export const SCENE_CONFIGS: Record<string, SceneConfig> = {
  home: {
    lattice: LATTICE,
    chapters: [
      // 01 hero — assembled, specs on
      { start: 0.0, end: 0.063, cameraPos: [14, 4, 8], cameraTarget: [-1, 0.5, -2], explode: 0, run: 0 },
      // 02 stage — disassembly begins (parts pop out one by one)
      { start: 0.063, end: 0.126, cameraPos: [18, 5, 5], cameraTarget: [0, 0.5, -2], explode: 0.5, run: 0 },
      // 03 stage — fully exploded, slow orbit
      { start: 0.126, end: 0.206, cameraPos: [20, 7, 3], cameraTarget: [0, 0, -2.5], explode: 1, run: 0 },
      // 04 divisions — reassembly begins
      { start: 0.206, end: 0.269, cameraPos: [-19, 6, 7], cameraTarget: [0, 0.5, -2], explode: 0.55, run: 0 },
      // 05 stage — reassembly completes
      { start: 0.269, end: 0.349, cameraPos: [-17, 4, 5], cameraTarget: [0, 0.3, -2], explode: 0.1, run: 0 },
      // 06 principles — assembled hold
      { start: 0.349, end: 0.429, cameraPos: [15, 3, 3], cameraTarget: [0, 0, -2], explode: 0, run: 0 },
      // 07 stage — INTAKE
      { start: 0.429, end: 0.491, cameraPos: [14, 2, 6], cameraTarget: [0.5, 0.3, 0.5], explode: 0, run: 0.35, focus: [0, 0, 1.0] },
      // 08 stage — COMPRESSION
      { start: 0.491, end: 0.554, cameraPos: [14, 1.5, 1], cameraTarget: [0.5, 0, -0.8], explode: 0, run: 0.5, focus: [0, 0, -0.7] },
      // 09 quote — compression hold
      { start: 0.554, end: 0.617, cameraPos: [15, 2.5, 0], cameraTarget: [0, 0, -1.5], explode: 0, run: 0.55, focus: [0, 0, -0.7] },
      // 10 stage — COMBUSTION
      { start: 0.617, end: 0.68, cameraPos: [14, 2, -2], cameraTarget: [0.5, 0, -2.3], explode: 0, run: 0.7, focus: [0, 0, -2.3] },
      // 11 process — combustion to exhaust
      { start: 0.68, end: 0.76, cameraPos: [14, 2, -5], cameraTarget: [0.3, 0, -3.5], explode: 0, run: 0.8, focus: [0, 0, -3.4] },
      // 12 stage — EXHAUST
      { start: 0.76, end: 0.823, cameraPos: [15, 2.5, -8], cameraTarget: [0.5, 0, -5.2], explode: 0, run: 0.9, focus: [0, 0, -5.2] },
      // 13 stage — FULL THROTTLE
      { start: 0.823, end: 0.886, cameraPos: [16, 3, -3], cameraTarget: [0, 0.3, -2.5], explode: 0, run: 1, focus: [0, 0, -2] },
      // 14 contact — wide, running
      { start: 0.886, end: 0.966, cameraPos: [10, 3, 12], cameraTarget: [0, 0.5, -2], explode: 0, run: 1 },
      // 15 footer — settle
      { start: 0.966, end: 1.0, cameraPos: [8, 2.5, 14], cameraTarget: [0, 0.5, -2], explode: 0, run: 1 },
    ],
  },
  about: {
    lattice: LATTICE,
    chapters: chapters(
      [
        [-9, 2, 10],
        [8, 5, 6],
        [-4, 2, 12],
      ],
      [
        [0, 0, -2],
        [0, 0, -3],
        [0, 0.5, -2],
      ],
      [0.15, 0.4, 0.1],
      [0, 0, 0.3]
    ),
  },
  divisions: {
    lattice: LATTICE,
    chapters: chapters(
      [
        [0, 1, 16],
        [9, 3, 4],
        [-9, 5, -2],
        [3, 1.5, 8],
      ],
      [
        [0, 0.5, 0],
        [0, 0, -1],
        [0, 0, -3],
        [0, 0.3, -3],
      ],
      [0, 0.35, 0.8, 0.2],
      [0, 0, 0, 0.6]
    ),
  },
  projects: {
    lattice: LATTICE,
    chapters: chapters(
      [
        [10, 2, 6],
        [0, 2, 11],
        [-5, 4, -1],
      ],
      [
        [2, 0, -1],
        [0, 0, -2],
        [0, 0, -3],
      ],
      [0.2, 0.55, 0.15],
      [0.1, 0, 0.5]
    ),
  },
  tech: {
    lattice: LATTICE,
    chapters: chapters(
      [
        [0, 7, 15],
        [12, 3, 2],
        [0, 10, 10],
      ],
      [
        [0, 0, -2],
        [0, 0, -3],
        [0, 0, -2],
      ],
      [0.9, 0.4, 1],
      [0, 0, 0]
    ),
  },
  contact: {
    lattice: LATTICE,
    chapters: chapters(
      [
        [-5, 2, 9],
        [5, 3, 7],
        [0, 2, 12],
      ],
      [
        [0, 0.5, -2],
        [0, 0.5, -2],
        [0, 0.3, -2],
      ],
      [0, 0, 0],
      [0.3, 0.7, 1]
    ),
  },
}
