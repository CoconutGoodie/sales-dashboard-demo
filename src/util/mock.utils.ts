export namespace MockUtils {
  export async function delay<T>(supplier: () => T, ms: number) {
    return new Promise<T>((resolve) => {
      setTimeout(() => resolve(supplier()), ms);
    });
  }
}
