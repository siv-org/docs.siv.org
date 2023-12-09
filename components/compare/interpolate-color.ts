export const interpolateColor = (score: number): string => {
  // Clamp the score between 0 and 10
  score = Math.max(0, Math.min(score, 10))

  // Define the start, middle, and end colors
  const startColor = { r: 255, g: 0, b: 0 } // Red
  const middleColor = { r: 255, g: 255, b: 255 } // White
  const endColor = { r: 20, g: 215, b: 50 } // Green

  let r: number, g: number, b: number

  if (score <= 5) {
    // Interpolate between startColor and middleColor
    const ratio = score / 5
    r = Math.round(startColor.r * (1 - ratio) + middleColor.r * ratio)
    g = Math.round(startColor.g * (1 - ratio) + middleColor.g * ratio)
    b = Math.round(startColor.b * (1 - ratio) + middleColor.b * ratio)
  } else {
    // Interpolate between middleColor and endColor
    const ratio = (score - 5) / 5
    r = Math.round(middleColor.r * (1 - ratio) + endColor.r * ratio)
    g = Math.round(middleColor.g * (1 - ratio) + endColor.g * ratio)
    b = Math.round(middleColor.b * (1 - ratio) + endColor.b * ratio)
  }

  return `rgb(${r}, ${g}, ${b})`
}

// // Usage in your component
// style={{ backgroundColor: interpolateColor(getScore(s)) }}
