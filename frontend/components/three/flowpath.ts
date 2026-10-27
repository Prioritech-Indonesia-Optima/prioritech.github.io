// Single source of truth for the turbofan's gas path. The wireframe geometry
// (jetEngine.ts) and the GPU particle streamlines (flowField.ts) both read
// these numbers, so the air visibly stays inside the ducts it flows through.

export const FAN_Z = 1.0
export const FAN_TIP = 3.0
export const FAN_HUB = 0.62
export const NOZZLE_Z = -6.4
export const PLUG_TIP_Z = -8.3

// [p, z, rIn, rOut]. p is the path coordinate (0..1). Spacing in p sets the
// apparent speed: wide z spans over small p (intake, jet) read fast, tight
// spans (compressor, combustor, turbines) read slow. The last row's z is
// overwritten at runtime with the live plume end.
export type FlowStation = [number, number, number, number]

export const FLOW_CORE: FlowStation[] = [
  [0.0, 10.0, 0.5, 2.6],
  [0.2, 3.0, 0.7, 1.9],
  [0.27, 1.0, 0.72, 1.5],
  [0.33, -0.1, 0.8, 1.42],
  [0.45, -1.65, 1.2, 1.46],
  [0.5, -2.2, 1.15, 2.15],
  [0.58, -3.1, 1.12, 2.15],
  [0.62, -3.4, 1.1, 1.9],
  [0.66, -3.9, 1.12, 1.95],
  [0.76, -5.4, 1.05, 2.3],
  [0.82, NOZZLE_Z, 0.7, 1.3],
  [1.0, -14.0, 0.0, 2.0],
]

export const FLOW_BYPASS: FlowStation[] = [
  [0.0, 10.0, 1.9, 4.4],
  [0.2, 3.0, 1.75, 3.0],
  [0.27, 1.0, 1.7, 2.95],
  [0.33, -0.1, 1.7, 3.0],
  [0.45, -1.65, 1.75, 3.0],
  [0.5, -2.2, 2.45, 3.0],
  [0.58, -3.1, 2.45, 2.98],
  [0.66, -3.9, 2.2, 2.95],
  [0.71, -4.6, 2.3, 2.92],
  [0.76, -5.4, 2.45, 2.9],
  [0.82, -6.2, 1.55, 2.4],
  [1.0, -14.0, 1.2, 3.4],
]
