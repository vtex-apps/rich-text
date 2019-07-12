import React, { FunctionComponent, memo, useEffect, useState } from 'react'
import { injectIntl, InjectedIntlProps } from 'react-intl'
import marked, { Renderer } from 'marked'
import { values, last, test } from 'ramda'
import escapeHtml from 'escape-html'
import insane from 'insane'
import { generateBlockClass, BlockClass } from '@vtex/css-handles'

import { formatIOMessage } from 'vtex.native-types'

//@ts-ignore
import styles from './styles/index.css'

import {
  textPositionTypes,
  textAlignmentTypes,
  textPositionValues,
  textAlignmentValues,
} from './typings/SchemaTypes'

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

interface Props extends BlockClass, InjectedIntlProps {
  font: string
  text: string
  textAlignment: textAlignmentValues
  textColor: string
  textPosition: textPositionValues
  htmlId?: string
}

interface VTEXIOComponent extends FunctionComponent<Props> {
  schema?: any
}

const sanitizerConfig = {
  allowedTags: ['p', 'span', 'a', 'div', 'br', 'img', 'iframe', 'table', 'thead', 'tbody', 'tr', 'td', 'th', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'li'],
  allowedAttributes: {
    a: ['class', 'href', 'title', 'target'],
    span: ['class'],
    p: ['class'],
    div: ['class'],
    table: ['class'],
    thead: ['class'],
    tbody: ['class'],
    img: ['class', 'src', 'title', 'alt'],
    iframe: ['frameborder', 'height', 'src', 'width', 'style'],
    h1: ['class'],
    h2: ['class'],
    h3: ['class'],
    h4: ['class'],
    h5: ['class'],
    h6: ['class'],
    ul: ['class'],
    li: ['class'],
  },
}

const getLevel = (level:number) => level > 0 && level <= 6 ? level : 6

const getTargetFromUrl = (url: string) => {
  const urlSplit = url.split('?')
  if (urlSplit.length < 2) {
    return ''
  }
  const qs = urlSplit[1]
  const hastTargetBlank = qs.includes('target=_blank')
  return hastTargetBlank ? 'target=_blank' : ''
}

const typography = [
  't-heading-1',
  't-heading-2',
  't-heading-3',
  't-heading-4',
  't-heading-5',
  't-heading-6',
  't-body',
  't-small',
  't-mini',
  't-code',
]

const sanitizeFont = (font: string) => {
  if (!font) {
    return 't-body'
  }

  const first = font.split(' ')[0]

  if (typography.indexOf(first) === -1) {
    return 'tbody'
  }

  return first
}

const sanitizeColor = (color: string) => {
  if (!color) {
    return 'c-on-base'
  }

  const first = color.split(' ')[0]

  if (first.indexOf('c-') === 0) {
    return first
  }

  return 'c-on-base'
}

export const RichText: FunctionComponent<Props> = ({
  font,
  text,
  textAlignment,
  textColor,
  textPosition,
  blockClass,
  htmlId,
  intl,
}) => {
  const [isMounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!isMounted) {
    const renderer = new Renderer()
    renderer.paragraph = text =>
      `<p class="lh-copy ${styles.paragraph}">${text}</p>`
    renderer.strong = text => `<span class="b ${styles.strong}">${text}</span>`
    renderer.em = text => `<span class="i ${styles.italic}">${text}</span>`
    renderer.heading = (text: string, level: number) => `<h${getLevel(level)} class="${styles.heading} t-heading-${getLevel(level)} ${styles[`heading-level-${getLevel(level)}`]}">${text}</h${getLevel(level)}>`
    renderer.link = (href: string, title: string, text: string) => {
      const targetAtr = getTargetFromUrl(href)
      const targetRemoved = !!targetAtr ? href.replace(/target=_blank/, '').replace(/\?\&/,'?') : href

      //clean trailing ? or &
      const cleanHref = test(/\?|\&/, last(targetRemoved)) ? targetRemoved.slice(0, -1) : targetRemoved
      const titleAtr = title ? `title="${title}"` : ''
      return `<a class="${styles.link}" href=${cleanHref} ${titleAtr} ${targetAtr}>${text}</a>`
    }
    renderer.html = html => escapeHtml(html)
    renderer.table = (header, body) => `
    <table class="${styles.table}">
      <thead class="${styles.tableHead}">
        ${header}
      </thead>
      <tbody class="${styles.tableBody}">
        ${body}
      </tbody>
    </table>`
    renderer.image = (href: string, title: string, text: string) =>
      `<img class="${
        styles.image
      }" src="${href}" alt="${text}" ${title ? `title="${title}"` : ''} />`
    renderer.list = (body: string) => `<ul class="${styles.list}">${body}</ul>`
    renderer.listitem = (text: string) => `<li class="${styles.listItem}">${text}</li>`

    marked.setOptions({
      gfm: true,
      breaks: true,
      sanitize: false, //Use insane lib for sanitizing
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

  const html = insane(
    //TODO: While markdown component isn't released, it needs to be done this way.
    marked(formatIOMessage({ id: text, intl })),
    sanitizerConfig
  )

  return (
    <div
      id={htmlId}
      className={`${generateBlockClass(
        styles.container,
        blockClass
      )} flex ${alignToken} ${itemsToken} ${justifyToken} ${sanitizeFont(font)} ${sanitizeColor(textColor)}`}
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
  title: 'admin/editor.rich-text.title',
  description: 'admin/editor.rich-text.description',
  type: 'object',
  properties: {
    textPosition: {
      title: 'admin/editor.rich-text.textPosition.title',
      description: 'admin/editor.rich-text.textPosition.description',
      type: 'string',
      enum: getEnumValues(textPositionTypes),
      enumNames: getEnumNames(textPositionTypes),
      default: defaultValues.textPosition,
      isLayout: true,
    },
    textAlignment: {
      title: 'admin/editor.rich-text.textAlignment.title',
      description: 'admin/editor.rich-text.textAlignment.description',
      type: 'string',
      default: defaultValues.textAlignment,
      enum: getEnumValues(textAlignmentTypes),
      enumNames: getEnumNames(textAlignmentTypes),
      isLayout: true,
    },
    font: {
      title: 'admin/editor.rich-text.font.title',
      description: 'admin/editor.rich-text.font.description',
      type: 'string',
      default: 't-body',
      isLayout: true,
    },
    textColor: {
      title: 'admin/editor.rich-text.textColor.title',
      description: 'admin/editor.rich-text.textColor.description',
      type: 'string',
      default: 'c-on-base',
      isLayout: true,
    },
    blockClass: {
      title: 'admin/editor.rich-text.blockClass.title',
      description: 'admin/editor.rich-text.blockClass.description',
      type: 'string',
      default: null,
      isLayout: true,
    },
  },
}

export default injectIntl(MemoizedRichText)
