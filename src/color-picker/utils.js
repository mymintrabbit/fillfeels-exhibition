import { COLOR_MAPPING } from '../config'

const START_LIMIT = 135
const STOP_LIMIT = 225

const hueToRGB = (H, startLimit, stopLimit) => {
  if ((H > startLimit && H < stopLimit) || !H) {
    return undefined
  }
  if (H >= 0 && H < 10) {
    return { r: 238, g: 72, b: 151 }
  } else if (H >= 10 && H < 20) {
    return { r: 234, g: 66, b: 133 }
  } else if (H >= 20 && H < 30) {
    return { r: 232, g: 63, b: 119 }
  } else if (H >= 30 && H < 40) {
    return { r: 228, g: 57, b: 102 }
  } else if (H >= 40 && H < 50) {
    return { r: 218, g: 62, b: 103 }
  } else if (H >= 50 && H < 60) {
    return { r: 187, g: 89, b: 143 }
  } else if (H >= 60 && H < 70) {
    return { r: 163, g: 115, b: 181 }
  } else if (H >= 70 && H < 80) {
    return { r: 134, g: 141, b: 220 }
  } else if (H >= 80 && H < 90) {
    return { r: 123, g: 144, b: 225 }
  } else if (H >= 90 && H < 100) {
    return { r: 118, g: 133, b: 209 }
  } else if (H >= 100 && H < 110) {
    return { r: 115, g: 123, b: 195 }
  } else if (H >= 110 && H < 120) {
    return { r: 112, g: 113, b: 181 }
  } else if (H >= 120 && H < 130) {
    return { r: 108, g: 103, b: 166 }
  } else if (H >= 130 && H < 135) {
    return { r: 105, g: 95, b: 155 }
  } else if (H >= 135 && H < 225) {
    return { r: 255, g: 255, b: 255 }
  } else if (H >= 225 && H < 230) {
    return { r: 63, g: 233, b: 169 }
  } else if (H >= 230 && H < 240) {
    return { r: 96, g: 230, b: 148 }
  } else if (H >= 240 && H < 250) {
    return { r: 132, g: 227, b: 127 }
  } else if (H >= 250 && H < 260) {
    return { r: 168, g: 224, b: 105 }
  } else if (H >= 260 && H < 270) {
    return { r: 206, g: 221, b: 81 }
  } else if (H >= 270 && H < 280) {
    return { r: 243, g: 217, b: 57 }
  } else if (H >= 280 && H < 290) {
    return { r: 251, g: 186, b: 100 }
  } else if (H >= 290 && H < 300) {
    return { r: 252, g: 155, b: 146 }
  } else if (H >= 300 && H < 310) {
    return { r: 254, g: 121, b: 195 }
  } else if (H >= 310 && H < 320) {
    return { r: 254, g: 95, b: 230 }
  } else if (H >= 320 && H < 330) {
    return { r: 251, g: 90, b: 214 }
  } else if (H >= 330 && H < 340) {
    return { r: 248, g: 86, b: 197 }
  } else if (H >= 340 && H < 350) {
    return { r: 245, g: 82, b: 182 }
  } else if (H >= 350 && H < 360) {
    return { r: 241, g: 76, b: 166 }
  } else {
    return undefined
  }
}
const getGradDegree = (angle1, angle2) => (Math.floor((angle1 + angle2) / 2) + 270) % 360

const getBackgroundColor = (c1, c2, c3, angle1, angle2, angle3) => {
  if (c1 && c2 && c3) {
    const a1 = 0.6
    const a2 = 0.8
    const a3 = 1
    return `linear-gradient(0deg, rgba(${c1.r},${c1.g},${c1.b}, 0), rgba(${c1.r},${c1.g},${
      c1.b
    }, ${a1})),linear-gradient(120deg, rgba(${c2.r},${c2.g},${c2.b}, 0), rgba(${c2.r},${c2.g},${
      c2.b
    }, ${a2})),linear-gradient(240deg, rgba(${c3.r},${c3.g},${c3.b}, 0), rgba(${c3.r},${c3.g},${
      c3.b
    }, ${a3})) `
  } else if (c1 && c2) {
    const deg = getGradDegree(angle1, angle2)
    const t1 = angle1 > angle2 ? c1 : c2
    const t2 = angle1 > angle2 ? c2 : c1
    return `linear-gradient(${deg}deg, rgba(${t1.r},${t1.g},${t1.b},1), rgba(${t2.r},${t2.g},${
      t2.b
    },1))`
  } else if (c1 && c3) {
    const deg = getGradDegree(angle1, angle3)
    const t1 = angle1 > angle3 ? c1 : c3
    const t2 = angle1 > angle3 ? c3 : c1
    return `linear-gradient(${deg}deg, rgba(${t1.r},${t1.g},${t1.b},1), rgba(${t2.r},${t2.g},${
      t2.b
    },1))`
  } else if (c3 && c2) {
    const deg = getGradDegree(angle3, angle2)
    const t1 = angle3 > angle2 ? c3 : c2
    const t2 = angle3 > angle2 ? c2 : c3
    return `linear-gradient(${deg}deg, rgba(${t1.r},${t1.g},${t1.b},1), rgba(${t2.r},${t2.g},${
      t2.b
    },1))`
  } else if (c1 || c2 || c3) {
    const t1 = c1 || c2 || c3
    return `rgba(${t1.r},${t1.g},${t1.b},1)`
  } else {
    return 'transparent'
  }
}

const inRangeOf = (hue, min, max) => {
  return min <= hue && hue < max
}

export const mapHueToRangeColor = hue => {
  if (inRangeOf(hue, 225, 265)) {
    return COLOR_MAPPING.GREEN
  }

  if (inRangeOf(hue, 265, 305)) {
    return COLOR_MAPPING.YELLOW
  }

  if (inRangeOf(hue, 305, 360)) {
    return COLOR_MAPPING.PINK
  }

  if (inRangeOf(hue, 0, 50)) {
    return COLOR_MAPPING.RED
  }

  if (inRangeOf(hue, 50, 95)) {
    return COLOR_MAPPING.BLUE
  }

  if (inRangeOf(hue, 95, 135)) {
    return COLOR_MAPPING.BLUE_DARK
  }

  return '#FFFFFF'
}

export const mapHueToColor = hue => getBackgroundColor(hueToRGB(hue, START_LIMIT, STOP_LIMIT), undefined, undefined, hue)

export const getGradient = (hue1, hue2) =>
  getBackgroundColor(
    hueToRGB(hue1, START_LIMIT, STOP_LIMIT),
    hueToRGB(hue2, START_LIMIT, STOP_LIMIT),
    undefined,
    hue1,
    hue2,
  )

//
// export const mapHueToColor = hue => {
//   if (inRangeOf(hue, 0, 5)) {
//     return '#d6d65c'
//   }
//
//   if (inRangeOf(hue, 5, 10)) {
//     return '#ccd55d'
//   }
//
//   if (inRangeOf(hue, 10, 15)) {
//     return '#b9d260'
//   }
//
//   if (inRangeOf(hue, 15, 20)) {
//     return '#8bcc66'
//   }
//
//   if (inRangeOf(hue, 20, 25)) {
//     return '#7acc66'
//   }
//
//   if (inRangeOf(hue, 25, 30)) {
//     return '#6bcc66'
//   }
//
//   if (inRangeOf(hue, 30, 35)) {
//     return '#66cc69'
//   }
//
//   if (inRangeOf(hue, 35, 40)) {
//     return '#66cc7a'
//   }
//
//   if (inRangeOf(hue, 40, 45)) {
//     return '#66cc90'
//   }
//
//   if (inRangeOf(hue, 45, 50)) {
//     return '#64cc9a'
//   }
//
//   if (inRangeOf(hue, 50, 55)) {
//     return '#53cba6'
//   }
//
//   if (inRangeOf(hue, 55, 60)) {
//     return '#42cbb8'
//   }
//
//   if (inRangeOf(hue, 60, 105)) {
//     return '#33cccc'
//   }
//
//   if (inRangeOf(hue, 105, 110)) {
//     return '#33bdc8'
//   }
//
//   if (inRangeOf(hue, 110, 115)) {
//     return '#339fc0'
//   }
//
//   if (inRangeOf(hue, 115, 120)) {
//     return '#3478b4'
//   }
//
//   if (inRangeOf(hue, 120, 125)) {
//     return '#3478b4'
//   }
//
//   if (inRangeOf(hue, 125, 130)) {
//     return '#345ba9'
//   }
//
//   if (inRangeOf(hue, 130, 135)) {
//     return '#33419f'
//   }
//
//   if (inRangeOf(hue, 135, 145)) {
//     return '#33379b'
//   }
//
//   if (inRangeOf(hue, 215, 220)) {
//     return '#d0363a'
//   }
//
//   if (inRangeOf(hue, 220, 225)) {
//     return '#d63c46'
//   }
//
//   if (inRangeOf(hue, 225, 230)) {
//     return '#db4251'
//   }
//
//   if (inRangeOf(hue, 230, 235)) {
//     return '#e44f68'
//   }
//
//   if (inRangeOf(hue, 235, 240)) {
//     return '#ed5e81'
//   }
//
//   if (inRangeOf(hue, 240, 245)) {
//     return '#f26992'
//   }
//
//   if (inRangeOf(hue, 245, 250)) {
//     return '#f673a0'
//   }
//
//   if (inRangeOf(hue, 250, 255)) {
//     return '#f97eae'
//   }
//
//   if (inRangeOf(hue, 255, 260)) {
//     return '#fd8dc0'
//   }
//
//   if (inRangeOf(hue, 260, 270)) {
//     return '#fd8dc0'
//   }
//
//   if (inRangeOf(hue, 270, 275)) {
//     return '#ff99cc'
//   }
//
//   if (inRangeOf(hue, 275, 280)) {
//     return '#ff99bd'
//   }
//
//   if (inRangeOf(hue, 280, 285)) {
//     return '#ff99ab'
//   }
//
//   if (inRangeOf(hue, 285, 290)) {
//     return '#ff999a'
//   }
//
//   if (inRangeOf(hue, 290, 295)) {
//     return '#fe9a96'
//   }
//
//   if (inRangeOf(hue, 295, 300)) {
//     return '#fc9d8e'
//   }
//
//   if (inRangeOf(hue, 300, 305)) {
//     return '#f8a385'
//   }
//
//   if (inRangeOf(hue, 305, 310)) {
//     return '#f5a97e'
//   }
//
//   if (inRangeOf(hue, 310, 320)) {
//     return '#f0b176'
//   }
//
//   if (inRangeOf(hue, 320, 330)) {
//     return '#ebba6f'
//   }
//
//   if (inRangeOf(hue, 330, 340)) {
//     return '#e5c369'
//   }
//
//   if (inRangeOf(hue, 340, 345)) {
//     return '#dfcc63'
//   }
//
//   if (inRangeOf(hue, 345, 350)) {
//     return '#d9d35e'
//   }
//
//   if (inRangeOf(hue, 350, 360)) {
//     return '#d7d65c'
//   }
//
//   return 'white'
// }
