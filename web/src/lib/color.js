// @flow

export class RGB {
  red: number;
  green: number;
  blue: number;

  constructor(hex: string) {
    this.red = parseInt(hex.substring(0,2), 16);
    this.green = parseInt(hex.substring(2,4), 16);
    this.blue = parseInt(hex.substring(4,6), 16);
  }
};

export class HSL {
  hue: number;
  saturation: number;
  lightness: number;

  constructor(hex: string) {
    const rgb: RGB = new RGB(hex);

    const r = rgb.red / 255,
          g = rgb.green / 255,
          b = rgb.blue / 255;

    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        hue = 0,
        saturation = 0,
        lightness = 0;

    if (delta === 0)
      hue = 0;
    // Red is max
    else if (cmax === r)
      hue = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax === g)
      hue = (b - r) / delta + 2;
    // Blue is max
    else
      hue = (r - g) / delta + 4;

    hue = Math.round(hue * 60);

    if (hue < 0)
      hue += 360;

    lightness = (cmax + cmin) / 2;
    saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));

    lightness = +(lightness * 100).toFixed(1);
    saturation = +(saturation * 100).toFixed(1);

    this.hue = hue;
    this.saturation = saturation;
    this.lightness = lightness;
  }
};
