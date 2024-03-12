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

  export function randomFloat(min: number, max: number) {
    return Math.random() * (max - min + 1) + min;
  }

  export function randomInt(min: number, max: number) {
    return Math.floor(randomFloat(min, max));
  }

  export function uniqueSample<T>(arr: T[], n: number = 1): T[] {
    if (arr.length < n)
      return [...arr]
        .concat(uniqueSample(arr, n - arr.length))
        .sort(Math.random);

    const pool = [...arr];
    const samples = [];

    for (let i = 0; i < n; i++) {
      const index = randomInt(0, pool.length - 1);
      samples.push(pool[index]);
      pool.splice(index, 1);
    }

    return samples;
  }

  export function guassianRandom(mean: number, stdev: number) {
    const u = 1 - Math.random();
    const v = Math.random();
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return z * stdev + mean;
  }

  export function max(arr: number[]) {
    return arr.reduce((max, n) => Math.max(max, n), -Infinity);
  }
}
