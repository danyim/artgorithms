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
