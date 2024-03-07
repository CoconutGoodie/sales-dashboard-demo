export namespace MathUtils {
  export type Vector2 = [number, number];

  export const DEG_TO_RAD = Math.PI / 180;

  export function mapRange(value: number, range1: Vector2, range2: Vector2) {
    return (
      range2[0] +
      ((range2[1] - range2[0]) * (value - range1[0])) / (range1[1] - range1[0])
    );
  }

  export function degToRad(degree: number) {
    return degree * DEG_TO_RAD;
  }

  export function randomBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
