const rgbColor = (() => {
  const from = (hex: string) => parseInt(hex, 16)
  return (hex: string) => {
    const color = /#(..)(..)(..)/.exec(hex)
    if (color === null) return
    return (
      'rgb(' + [from(color[1]), from(color[2]), from(color[3])].join(', ') + ')'
    )
  }
})()
const color = {
  system3: rgbColor('#00FFFF'),
  gray0: rgbColor('#ffffff'),
  gray1: rgbColor('#f2f2f2'),
  gray4: rgbColor('#8C8C8C'),
  gray5: rgbColor('#262626')
}

const API_DOC_URL = 'https://nnabla.readthedocs.io/en/latest/python/api/'

const Definitions = {
  NNABLA_CORE_API: {
    PF_DOC_URL: API_DOC_URL + 'parametric_function.html',
    F_DOC_URL: API_DOC_URL + 'function.html'
  },
  KEY_CODE: {
    ENTER: 13,
    SHIFT: 16,
    CTRL: 17,
    ESC: 27,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    DEL: 46,
    A: 65,
    C: 67,
    L: 76,
    R: 82,
    S: 83,
    T: 84,
    V: 86,
    X: 88,
    Y: 89,
    Z: 90,
    CMD: 91,
    F5: 116,
    BACKSPACE: 8,
    INSERT: 45
  },
  GRAPH: {
    MARGIN: {
      TOP: 25,
      RIGHT: 20,
      BOTTOM: 30,
      LEFT: 50
    },
    WINDOW_SIZE: {
      WIDTH: 928,
      HEIGHT: 522
    },
    SIZE: {
      WIDTH: 809,
      HEIGHT: 442
    }
  },
  PREVIEWABLE_DATA_NUM: 500,
  ITEMS_PER_PAGE: 10,
  COLOR: color,
  EDIT: {
    SVG_ID: 'svg#network-editor',
    GRID: {
      RADIUS: 1,
      SIZE: 20
    },
    LAYER: (() => {
      const GRID = 20 // XXX should be changed to refer this EDIT.GRID.SIZE
      const WIDTH = GRID * 10
      const HEIGHT = GRID * 2

      return {
        GRID: GRID,
        RECT_WIDTH: WIDTH,
        RECT_HEIGHT: HEIGHT,
        RECT_BORDER_WIDTH: 1,

        DROPCAP_CHAR: {
          OFFSET_X: GRID * 1,
          OFFSET_Y: 32,
          FONTCOLOR: 'white',
          FONTSIZE: '32px',
          OPACITY: 0.5,
          TEXT_ANCHOR: 'middle'
        },

        NAME_LABEL: {
          OFFSET_X: 0,
          OFFSET_Y: 12,
          FONTCOLOR: 'white',
          FONTSIZE: '14px'
        },

        PROPERTY_LABEL: {
          OFFSET_X: 0,
          OFFSET_Y: GRID + 8,
          FONTCOLOR: 'white',
          FONTSIZE: '12px',
          OPACITY: 0.6
        },

        STATISTICS: {
          BAR: {
            OFFSET_X: WIDTH + 4,
            OFFSET_Y: GRID * 2 - 4,
            WIDTH: 0,
            MAXWIDTH: GRID * 3,
            HEIGHT: 4,
            FILL_COLOR: color.gray4
          },
          LABEL: {
            OFFSET_X: WIDTH + 4,
            OFFSET_Y: GRID * 2 - 8,
            FONTCOLOR: color.gray4,
            FONTSIZE: '12px'
          }
        },

        BOUNDING_BOX: {
          WIDTH: WIDTH + GRID * 4,
          HEIGHT: HEIGHT
        },

        FRAME: {
          WIDTH: WIDTH,
          HEIGHT: HEIGHT,
          FILL_COLOR: 'none',
          STROKE_WIDTH: 1,
          DEFAULT: {
            STROKE_COLOR: null,
            FILTER_URL: null
          },
          FOCUSED: {
            STROKE_COLOR: color.system3,
            FILTER_URL: 'url(#frameshadow)'
          }
        },

        DESTINATION_FRAME: {
          WIDTH: WIDTH,
          HEIGHT: HEIGHT,
          FILL_COLOR: 'none',
          STROKE_COLOR: color.gray1,
          STROKE_WIDTH: 2
        },

        CLIP_PATH: {
          ID: 'nnc-layer-text-clipper',
          WIDTH: GRID * 8,
          HEIGHT: (GRID - 4) * 2,
          OFFSET_X: GRID * 2,
          OFFSET_Y: 4
        },

        COMMENT: {
          FILL_COLOR: color.gray0,
          FONT_SIZE: '14px'
        }
      }
    })()
  }
}

export { Definitions }
