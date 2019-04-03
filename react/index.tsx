import React, { FunctionComponent, useEffect, useState } from 'react'
import marked from 'marked'
import { values } from 'ramda'

import {
  textPositionTypes,
  textAlignmentTypes,
  textPositionValues,
  textAlignmentValues,
} from './SchemaTypes'

const justifyTokens = {
  [textPositionValues.LEFT]: 'justify-start',
  [textPositionValues.CENTER]: 'justify-center',
  [textPositionValues.RIGHT]: 'justify-end',
}

const alignTokens = {
  [textAlignmentValues.LEFT]: 'tl',
  [textAlignmentValues.CENTER]: 'tc',
  [textAlignmentValues.RIGHT]: 'tr',
}

const itemsTokens = {
  [textAlignmentValues.LEFT]: 'items-start',
  [textAlignmentValues.CENTER]: 'items-center',
  [textAlignmentValues.RIGHT]: 'items-end',
}

type PropTokensNames = 'textPosition' | 'textAlignment'

const defaultValues = {
  textPosition: textPositionTypes.TEXT_POSITION_LEFT.value,
  textAlignment: textAlignmentTypes.TEXT_ALIGNMENT_LEFT.value,
}

const getEnumValues = (
  enumObject: Record<string, { value: string; name: string }>
) => values(enumObject).map(({ value }) => value)
const getEnumNames = (
  enumObject: Record<string, { value: string; name: string }>
) => values(enumObject).map(({ name }) => name)

const safelyGetToken = (
  tokenMap: Record<string, string>,
  valueWanted: string,
  propName: PropTokensNames
) => tokenMap[valueWanted] || defaultValues[propName]

// const text = `
// [Super Link to Google](https://www.google.com)
// **Bold textttt**
// *Italic!!! texttt*
// **this is bold** and *this is italic*
// `

interface Props {
  text: string
  textAlignment: textAlignmentValues
  textPosition: textPositionValues
}

interface VtexComponent extends FunctionComponent<Props> {
  schema: any
}

const RichText: VtexComponent = ({ text, textAlignment, textPosition }) => {
  const [isMounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  !isMounted &&
    marked.setOptions({
      gfm: true,
      breaks: true,
      sanitize: true,
      smartLists: true,
    })

  const alignToken = safelyGetToken(alignTokens, textAlignment, 'textAlignment')
  const itemsToken = safelyGetToken(itemsTokens, textPosition, 'textPosition')
  const justifyToken = safelyGetToken(
    justifyTokens,
    textPosition,
    'textPosition'
  )

  const html = marked(text)
  return (
    <div className={`flex ${alignToken} ${itemsToken} ${justifyToken} t-body`}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}

RichText.defaultProps = {
  text: `
  [Super Link to Google](https://www.google.com)
  **Bold textttt**
  *Italic!!! texttt*
  **this is bold** and *this is italic*
  `,
  textPosition: defaultValues.textPosition,
  textAlignment: defaultValues.textAlignment,
}

RichText.schema = {
  title: 'editor.rich-text.title',
  description: 'editor.rich-text.description',
  type: 'object',
  properties: {
    text: {
      title: 'editor.rich-text.text.title',
      description: 'editor.rich-text.textPosition.description',
      type: 'string',
      default: '',
    },
    textPosition: {
      title: 'editor.rich-text.textPosition.title',
      description: 'editor.rich-text.textPosition.description',
      type: 'string',
      enum: getEnumValues(textPositionTypes),
      enumNames: getEnumNames(textPositionTypes),
      default: textPositionTypes.TEXT_POSITION_LEFT.value,
    },
    textAlignment: {
      title: 'editor.rich-text.textAlignment.title',
      description: 'editor.rich-text.textAlignment.description',
      type: 'string',
      default: textAlignmentTypes.TEXT_ALIGNMENT_LEFT.value,
      enum: getEnumValues(textAlignmentTypes),
      enumNames: getEnumNames(textAlignmentTypes),
    },
  },
}

export default RichText
