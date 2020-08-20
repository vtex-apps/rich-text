export const enum TextPositionValues {
  CENTER = 'CENTER',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export const enum TextAlignmentValues {
  CENTER = 'CENTER',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export const textPositionTypes: Record<
  string,
  { name: string; value: TextPositionValues }
> = {
  TEXT_POSITION_CENTER: {
    name: 'admin/editor.rich-text.textPosition.center',
    value: TextPositionValues.CENTER,
  },
  TEXT_POSITION_LEFT: {
    name: 'admin/editor.rich-text.textPosition.left',
    value: TextPositionValues.LEFT,
  },
  TEXT_POSITION_RIGHT: {
    name: 'admin/editor.rich-text.textPosition.right',
    value: TextPositionValues.RIGHT,
  },
}

export const textAlignmentTypes: Record<
  string,
  { name: string; value: TextAlignmentValues }
> = {
  TEXT_ALIGNMENT_CENTER: {
    name: 'admin/editor.rich-text.textAlignment.center',
    value: TextAlignmentValues.CENTER,
  },
  TEXT_ALIGNMENT_LEFT: {
    name: 'admin/editor.rich-text.textAlignment.left',
    value: TextAlignmentValues.LEFT,
  },
  TEXT_ALIGNMENT_RIGHT: {
    name: 'admin/editor.rich-text.textAlignment.right',
    value: TextAlignmentValues.RIGHT,
  },
}
