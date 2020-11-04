export const randomHexColor = () => {
  const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
  let result = "#";
  for (let k = 0; k < 6; k += 1) {
    result += hex[Math.floor(Math.random() * hex.length)];
  }

  return result;
};

export const randomHueColor = (
  saturation = { max: 100, min: 0 },
  luminosity = { max: 100, min: 0 }
) => {
  const hue = Math.floor(Math.random() * 360);
  const sat =
    Math.floor(Math.random() * (saturation.max - saturation.min)) +
    saturation.min;
  const lum =
    Math.floor(Math.random() * (luminosity.max - luminosity.min)) +
    luminosity.min;

  //console.log(`hsl(${hue}, ${sat}%, ${lum}%)`)
  return `hsl(${hue}, ${sat}%, ${lum}%)`;
};

export const rgbToHsl = (r: number, g: number, b: number): number[] => {
  // see https://en.wikipedia.org/wiki/HSL_and_HSV#Formal_derivation
  // convert r,g,b [0,255] range to [0,1]
  r = r / 255;
  g = g / 255;
  b = b / 255;
  // get the min and max of r,g,b
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  // lightness is the average of the largest and smallest color components
  let lum: number = (max + min) / 2;
  let hue: number;
  let sat: number;
  if (max == min) {
    // no saturation
    hue = 0;
    sat = 0;
  } else {
    var c = max - min; // chroma
    // saturation is simply the chroma scaled to fill
    // the interval [0, 1] for every combination of hue and lightness
    sat = c / (1 - Math.abs(2 * lum - 1));
    switch (max) {
      case r:
        // hue = (g - b) / c;
        // hue = ((g - b) / c) % 6;
        hue = (g - b) / c + (g < b ? 6 : 0);
        break;
      case g:
        hue = (b - r) / c + 2;
        break;
      case b:
        hue = (r - g) / c + 4;
        break;
    }
  }
  hue = Math.round(hue * 60); // °
  sat = Math.round(sat * 100); // %
  lum = Math.round(lum * 100); // %
  return [hue, sat, lum];
};
