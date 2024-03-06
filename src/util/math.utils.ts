export namespace MathUtils {
  export type Vector2 = [number, number];

  export function mapRange(value: number, range1: Vector2, range2: Vector2) {
    return (
      range2[0] +
      ((range2[1] - range2[0]) * (value - range1[0])) / (range1[1] - range1[0])
    );
  }
}
