export namespace ColorUtils {
  export function hexToARGB(rgbaHex: string) {
    rgbaHex = rgbaHex.replace("#", "");

    if (rgbaHex.length === 3 || rgbaHex.length === 4) {
      rgbaHex = rgbaHex
        .split("")
        .map((char) => char + char)
        .join("");
    }

    const red = parseInt(rgbaHex.slice(0, 2), 16);
    const green = parseInt(rgbaHex.slice(2, 4), 16);
    const blue = parseInt(rgbaHex.slice(4, 6), 16);
    const alpha =
      rgbaHex.length === 8 ? parseInt(rgbaHex.slice(6, 8), 16) : 0xff;
    return (alpha << 24) | (red << 16) | (green << 8) | blue;
  }

  export function ARGBToHex(argb: number) {
    const [a, r, g, b] = channelARGB(argb);
    const hexR = r.toString(16);
    const hexG = g.toString(16);
    const hexB = b.toString(16);
    const hexA = a === 0xff ? "" : a.toString(16);
    return `#${hexR}${hexG}${hexB}${hexA}`;
  }

  export function channelARGB(argb: number) {
    const alpha = (argb >>> 24) & 0xff;
    const red = (argb >>> 16) & 0xff;
    const green = (argb >>> 8) & 0xff;
    const blue = argb & 0xff;
    return [alpha, red, green, blue];
  }

  export function lerp(rgbaHex1: string, rgbaHex2: string, factor: number) {
    const [a1, r1, g1, b1] = channelARGB(hexToARGB(rgbaHex1));
    const [a2, r2, g2, b2] = channelARGB(hexToARGB(rgbaHex2));

    const a = a1 + factor * (a2 - a1);
    const r = r1 + factor * (r2 - r1);
    const g = g1 + factor * (g2 - g1);
    const b = b1 + factor * (b2 - b1);

    return ARGBToHex((a << 24) | (r << 16) | (g << 8) | b);
  }
}
