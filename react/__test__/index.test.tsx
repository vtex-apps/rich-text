/* eslint-env jest */
import React from 'react'
import { render } from '@vtex/test-tools/react'
import RichText from '../index'

import { textPositionValues, textAlignmentValues } from '../SchemaTypes'

describe('Rich text component', () => {
  const defaultProps = {
    font: 't-body',
    text: '',
    textPosition: textPositionValues.LEFT,
    textAlignment: textAlignmentValues.LEFT,
    textColor: 'c-on-base',
  }
  it('should render with bold', () => {
    const component = render(
      <RichText {...defaultProps} text={'**be bold**'} />
    )
    expect(component).toBeDefined()
    expect(component.asFragment()).toMatchSnapshot()
  })
  it('should render with paragraph', () => {
    const component = render(
      <RichText {...defaultProps} text={'IAM BOLD'} />
    )
    expect(component).toBeDefined()
    expect(component.asFragment()).toMatchSnapshot()
  })
  it('should render link with title', () => {
    const component = render(
      <RichText
        {...defaultProps}
        text={
          '[I\'m an inline-style link with title](https://www.google.com "Google\'s Homepage")\n**Bollllddd**\n*this is talic*'
        }
      />
    )
    expect(component).toBeDefined()
    expect(component.asFragment()).toMatchSnapshot()
  })
  it('should render and sanitize malicious text', () => {
    const component = render(
      <RichText
        {...defaultProps}
        text={
          "Hi everyone! This is **how** you do XSS <script>alert('XSS')</script>"
        }
      />
    )
    expect(component).toBeDefined()
    expect(component.asFragment()).toMatchSnapshot()
  })
  it('should render and sanitize malicious text', () => {
    const component = render(
      <RichText {...defaultProps} text={'[some text](javascript:exec())'} />
    )
    expect(component).toBeDefined()
    expect(component.asFragment()).toMatchSnapshot()
  })
  it('should render and sanitize malicious javascript', () => {
    const component = render(
      <RichText
        {...defaultProps}
        text={'<a href="javascript:exec()">HEHEHE</a>'}
      />
    )
    expect(component).toBeDefined()
    expect(component.asFragment()).toMatchSnapshot()
  })
  it('should render and sanitize malicious javascript', () => {
    const component = render(
      <RichText
        {...defaultProps}
        text={
          '<DIV STYLE="background-image: url(&#1;javascript:alert(\'XSS\'))">'
        }
      />
    )
    expect(component).toBeDefined()
    expect(component.asFragment()).toMatchSnapshot()
  })
  it('should render with image', () => {
    const component = render(
      <RichText
        {...defaultProps}
        text={
          `Inline-style: 
          ![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")`
        }
      />
    )
    expect(component).toBeDefined()
    expect(component.asFragment()).toMatchSnapshot()
  })
  it('should render with image block class props', () => {
    const component = render(
      <RichText
        {...defaultProps}
        text={
          `[I\'m an inline-style link with title](https://www.google.com "Google\'s Homepage")\n**Bollllddd**\n*this is talic*`
        }
        blockClass="home"
      />
    )
    expect(component).toBeDefined()
    expect(component.asFragment()).toMatchSnapshot()
  })
})

