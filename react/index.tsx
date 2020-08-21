import React, {
  FunctionComponent,
  memo,
  useEffect,
  useState,
  useRef,
  useMemo,
} from 'react'
import { injectIntl, WrappedComponentProps } from 'react-intl'
import marked, { Renderer } from 'marked'
import escapeHtml from 'escape-html'
import insane from '@vtex/insane'
import { useCssHandles, CssHandles } from 'vtex.css-handles'
import { useResponsiveValue } from 'vtex.responsive-values'
import { formatIOMessage } from 'vtex.native-types'

import styles from './styles/index.css'
import {
  textPositionTypes,
  textAlignmentTypes,
  TextPositionValues,
  TextAlignmentValues,
} from './typings/SchemaTypes'

const CSS_HANDLES = [
  'container',
  'heading',
  'headingLevel1',
  'headingLevel2',
  'headingLevel3',
  'headingLevel4',
  'headingLevel5',
  'headingLevel6',
  'image',
  'italic',
  'link',
  'list',
  'listItem',
  'listOrdered',
  'paragraph',
  'strong',
  'table',
  'tableBody',
  'tableHead',
  'tableTd',
  'tableTh',
  'tableTr',
  'wrapper',
] as const

const justifyTokens = {
  [TextPositionValues.LEFT]: 'justify-start',
  [TextPositionValues.CENTER]: 'justify-center',
  [TextPositionValues.RIGHT]: 'justify-end',
}

const alignTokens = {
  [TextAlignmentValues.LEFT]: 'tl',
  [TextAlignmentValues.CENTER]: 'tc',
  [TextAlignmentValues.RIGHT]: 'tr',
}

const itemsTokens = {
  [TextAlignmentValues.LEFT]: 'items-start',
  [TextAlignmentValues.CENTER]: 'items-center',
  [TextAlignmentValues.RIGHT]: 'items-end',
}

type PropTokensNames = 'textPosition' | 'textAlignment'

const defaultValues = {
  textPosition: textPositionTypes.TEXT_POSITION_LEFT.value,
  textAlignment: textAlignmentTypes.TEXT_ALIGNMENT_LEFT.value,
}

const safelyGetToken = (
  tokenMap: Record<string, string>,
  valueWanted: string,
  propName: PropTokensNames
) => tokenMap[valueWanted] || defaultValues[propName]

interface Props extends WrappedComponentProps {
  font: string
  text: string
  textAlignment: TextAlignmentValues
  textColor: string
  textPosition: TextPositionValues
  htmlId?: string
}

interface VTEXIOComponent extends FunctionComponent<Props> {
  schema?: any
}

type RichTextCssHandles = CssHandles<typeof CSS_HANDLES>

const sanitizerConfig = {
  allowedTags: [
    'p',
    'span',
    'a',
    'div',
    'br',
    'img',
    'iframe',
    'table',
    'thead',
    'tbody',
    'tr',
    'td',
    'th',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'ul',
    'ol',
    'li',
  ],
  allowedAttributes: {
    '*': ['class', 'title'],
    a: ['href', 'target'],
    img: ['src', 'alt'],
    iframe: ['frameborder', 'height', 'src', 'width', 'style'],
  },
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
}

const getLevel = (level: number) => (level > 0 && level <= 6 ? level : 6)

const getTargetFromUrl = (url: string) => {
  const urlSplit = url.split('?')

  if (urlSplit.length < 2) {
    return ''
  }

  const [, qs] = urlSplit
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

  const [first] = font.split(' ')

  if (typography.indexOf(first) === -1) {
    return 't-body'
  }

  return first
}

const sanitizeColor = (color: string) => {
  if (!color) {
    return 'c-on-base'
  }

  const [first] = color.split(' ')

  if (first.indexOf('c-') === 0) {
    return first
  }

  return 'c-on-base'
}

const getHeadingLevelClass = (handles: RichTextCssHandles, level: number) => {
  switch (level) {
    case 1:
      return handles.headingLevel1

    case 2:
      return handles.headingLevel2

    case 3:
      return handles.headingLevel3

    case 4:
      return handles.headingLevel4

    case 5:
      return handles.headingLevel5

    case 6:
      return handles.headingLevel6

    default:
      return ''
  }
}

const renderHeading = (handles: RichTextCssHandles) => (
  text: string,
  level: number
) => {
  const levelNumber = getLevel(level)
  const classes = `${
    handles.heading
  } t-heading-${levelNumber} ${getHeadingLevelClass(handles, levelNumber)} ${
    styles[`heading-level-${levelNumber}`]
  }`

  return `<h${levelNumber} class="${classes}">${text}</h${levelNumber}>`
}

const RichText: FunctionComponent<Props> = ({
  font,
  text,
  textAlignment,
  textColor,
  textPosition,
  htmlId,
  intl,
}) => {
  const [isMounted, setMounted] = useState(false)
  const handles = useCssHandles(CSS_HANDLES)
  const renderer = useRef<Renderer>()
  const responsiveFont = useResponsiveValue(font)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!isMounted) {
    renderer.current = new Renderer()
    renderer.current.paragraph = (content: string) =>
      `<p class="lh-copy ${handles.paragraph}">${content}</p>`
    renderer.current.strong = (content: string) =>
      `<span class="b ${handles.strong}">${content}</span>`
    renderer.current.em = (content: string) =>
      `<span class="i ${handles.italic}">${content}</span>`
    renderer.current.heading = renderHeading(handles)
    renderer.current.link = (href: string, title: string, content: string) => {
      const targetAtr = getTargetFromUrl(href)
      const targetRemoved = targetAtr
        ? href.replace(/target=_blank/, '').replace(/\?&/, '?')
        : href

      // clean trailing ? or &
      const cleanHref = targetRemoved.replace(/(\?|&)$/, '')
      const titleAtr = title ? `title="${title}"` : ''

      let finalLink = `<a class="${handles.link}" href="${cleanHref}"`

      if (titleAtr) {
        finalLink += ` ${titleAtr}`
      }

      if (targetAtr) {
        finalLink += ` ${targetAtr}`
      }

      finalLink += `>${content}</a>`

      return finalLink
    }

    renderer.current.html = (html) => escapeHtml(html)
    renderer.current.table = (header, body) => `
    <table class="${handles.table}">
      <thead class="${handles.tableHead}">
        ${header}
      </thead>
      <tbody class="${handles.tableBody}">
        ${body}
      </tbody>
    </table>`
    renderer.current.tablerow = (content) => {
      return `<tr class=${handles.tableTr}>\n${content}</tr>\n`
    }

    renderer.current.tablecell = (content, flags) => {
      const type = flags.header ? 'th' : 'td'
      const tag = `<${type} class="${
        type === 'th' ? handles.tableTh : handles.tableTd
      }"
        ${flags.align ? ` align="${flags.align}"` : ''}>`

      return `${tag + content}</${type}>\n`
    }

    renderer.current.image = (href: string, title: string, content: string) =>
      `<img class="${handles.image}" src="${href}" alt="${content}" ${
        title ? `title="${title}"` : ''
      } />`
    renderer.current.list = (body: string, ordered: boolean) => {
      const tag = ordered ? 'ol' : 'ul'

      return `<${tag} class="${handles.list} ${
        ordered ? handles.listOrdered : ''
      }">${body}</${tag}>`
    }

    renderer.current.listitem = (content: string) =>
      `<li class="${handles.listItem}">${content}</li>`
  }

  const alignToken = safelyGetToken(alignTokens, textAlignment, 'textAlignment')
  const itemsToken = safelyGetToken(itemsTokens, textPosition, 'textPosition')
  const justifyToken = safelyGetToken(
    justifyTokens,
    textPosition,
    'textPosition'
  )

  const html = useMemo(() => {
    marked.setOptions({
      gfm: true,
      breaks: true,
      sanitize: false, // Use insane lib for sanitizing
      smartLists: true,
      renderer: renderer.current,
    })

    return insane(
      // TODO: While markdown component isn't released, it needs to be done this way.
      marked(formatIOMessage({ id: text, intl })),
      sanitizerConfig
    )
  }, [text, intl])

  return (
    <div
      id={htmlId}
      className={`${
        handles.container
      } flex ${alignToken} ${itemsToken} ${justifyToken} ${sanitizeFont(
        responsiveFont
      )} ${sanitizeColor(textColor)}`}
    >
      <div
        className={handles.wrapper}
        dangerouslySetInnerHTML={{ __html: html }}
      />
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
}

export default injectIntl(MemoizedRichText)
