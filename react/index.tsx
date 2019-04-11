import React, { FunctionComponent, memo, useEffect, useState } from 'react'
import marked, { Renderer } from 'marked'
import { values } from 'ramda'
import escapeHtml from 'escape-html'
import insane from 'insane'

 //@ts-ignore
import styles from './richText.css'

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

interface Props {
  font: string
  text: string
  textAlignment: textAlignmentValues
  textColor: string
  textPosition: textPositionValues
}

interface VTEXIOComponent extends FunctionComponent<Props> {
  schema?: any
}

const sanitizerConfig = { 
  allowedTags: ['p', 'span', 'a', 'div', 'br', 'img'], 
  allowedAttributes:{
    a: ['class', 'href', 'title'],
    span: ['class'],
    p: ['class'],
    div: ['class'],
    img: ['class', 'src', 'title', 'alt'],
  }, 
}

const RichText: FunctionComponent<Props> = ({
  font,
  text,
  textAlignment,
  textColor,
  textPosition,
}) => {
  const [isMounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!isMounted) {
    const renderer = new Renderer()
    renderer.paragraph = text => `<p class="lh-copy ${styles.paragraph}">${text}</p>`
    renderer.strong = text => `<span class="b ${styles.strong}">${text}</span>`
    renderer.em = text => `<span class="i ${styles.italic}">${text}</span>`
    renderer.heading = text => `<span class="${styles.heading}">${text}</span>`
    renderer.link = (href: string, title: string, text: string) =>
      `<a class="${styles.link}" href="${href}" ${
        title ? `title="${title}"` : ''
      }>${text}</a>`
    renderer.html = html => escapeHtml(html)
    renderer.image = (href: string, title: string, text: string) =>
      `<img class="${styles.image}" src="${href}" alt="${text}" title="${title}"/>`

    marked.setOptions({
      gfm: true,
      breaks: true,
      sanitize: false, //Use DOMPurify for sanitizing
      smartLists: true,
      renderer,
    })
  }

  const alignToken = safelyGetToken(alignTokens, textAlignment, 'textAlignment')
  const itemsToken = safelyGetToken(itemsTokens, textPosition, 'textPosition')
  const justifyToken = safelyGetToken(
    justifyTokens,
    textPosition,
    'textPosition'
  )

  const html = insane(marked(text), sanitizerConfig)
  return (
    <div
      className={`${
        styles.container
      } flex ${alignToken} ${itemsToken} ${justifyToken} ${font} ${textColor}`}
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}

RichText.defaultProps = {
  font: 't-body',
  text: '',
  textPosition: defaultValues.textPosition,
  textAlignment: defaultValues.textAlignment,
  textColor: 'c-on-base',
}

const MemoizedRichText: VTEXIOComponent = memo(RichText)

MemoizedRichText.schema = {
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
      default: defaultValues.textPosition,
    },
    textAlignment: {
      title: 'editor.rich-text.textAlignment.title',
      description: 'editor.rich-text.textAlignment.description',
      type: 'string',
      default: defaultValues.textAlignment,
      enum: getEnumValues(textAlignmentTypes),
      enumNames: getEnumNames(textAlignmentTypes),
    },
    font: {
      title: 'editor.rich-text.font.title',
      description: 'editor.rich-text.font.description',
      type: 'string',
      default: 't-body',
    },
    textColor: {
      title: 'editor.rich-text.textColor.title',
      description: 'editor.rich-text.textColor.description',
      type: 'string',
      default: 'c-on-base',
    },
  },
}

export default MemoizedRichText
