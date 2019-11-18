# VTEX Rich Text

## Description

The VTEX Rich Text converts texts written in markdown language and displays its content as HTML elements.

For example, the text:
`[Help](https://help.vtex.com/en/faq/what-is-vtex-io).\n**Be Bold!**\n*This is italic*`

Is converted to:

```
<div>
      <p>
        <a href="https://help.vtex.com/en/faq/what-is-vtex-io">
         Help
        </a>
        <br />
        <span class="b">Be Bold!</span>
        <br />
        <span class="i">This is italic</span>
      </p>


    </div>
  </div>
```

:loudspeaker: **Disclaimer:** Don't fork this project; use, contribute, or open issue with your feature request

## Table of Contents

- [Usage](#usage)
  - [Blocks API](#blocks-api)
    - [Configuration](#configuration)
  - [Styles API](#styles-api)
    - [CSS Namespaces](#css-namespaces)
- [Troubleshooting](#troubleshooting)
- [Tests](#tests)

## Usage

This app uses our store builder with the blocks architecture. To know more about Store Builder [click here.](https://help.vtex.com/en/tutorial/understanding-storebuilder-and-stylesbuilder#structuring-and-configuring-our-store-with-object-object)

To use this app or override the default CSS you need import it in your dependencies on `manifest.json` file.

```json
  "dependencies": {
    "vtex.rich-text": "0.x"
  }
```

Then, add `rich-text` block to your `blocks.json`

Now, you can change the behavior of the `rich-text` block that is in the minicart. See an example of how to configure:

```json
"rich-text": {
  "props": {
    "textAlignment": "CENTER",
    "textPosition": "CENTER",
    "text": "Visit our [help](https://help.vtex.com/en/faq/what-is-vtex-io) section.\n*Be Bold!*\n**This is italic**",
    "textColor": "c-on-emphasis",
    "font": "t-heading-5"
  }
}
```

### Blocks API

When implementing this app as a block, various inner blocks may be available. The following interface lists the available blocks within rich-text and describes if they are required or optional.

```json
{
  "rich-text": {
    "component": "index"
  }
}
```

For now this block does not have any required or optional blocks.

#### Configuration

Through the Storefront, you can change the rich-text's behavior and interface. However, you also can make in your theme app, as Store theme does.

| Prop name       | Type                | Description                                                                                                |
| --------------- | ------------------- | ---------------------------------------------------------------------------------------------------------- |
| `font`          | `String`            | Define the tachyon token to be used as font. Default: `t-body`                                             |
| `textColor`     | `String`            | Define the tachyon token to be used as text color. Default: `c-on-base`                                    |
| `text`          | `String`            | Text written in markdown language to be displayed                                                          |
| `textAlignment` | `TextAlignmentEnum` | Control the text alignment inside component. Default: `"LEFT"`                                             |
| `textPosition`  | `TextPostionEnum`   | Choose in which position of the component text will be displayed, left, center or right. Default: `"LEFT"` |
| `blockClass`    | `String`            | Unique class name to be appended to block classes. Default: `null`                                         |

Here are the possible values of `TextPostionEnum`

| Enum name | Enum value | Description                                                                         |
| --------- | ---------- | ----------------------------------------------------------------------------------- |
| Left      | 'LEFT'     | Text will be to the left. If `isFullModeStyle` is false, image will be on the right |
| Center    | 'CENTER'   | Text will be in the center. Not applicable if `isFullModeStyle` is false.           |
| Right     | 'RIGHT'    | Text will be to the right. If `isFullModeStyle` is false, image will be on the left |

Here are the possible values of `TextAlignmentEnum`

| Enum name | Enum value | Description                           |
| --------- | ---------- | ------------------------------------- |
| Left      | 'LEFT'     | Text alignment will be to the left.   |
| Center    | 'CENTER'   | Text alignment will be to the center. |
| Right     | 'RIGHT'    | Text alignment will be to the right.  |

### Styles API

This app provides some CSS classes as an API for style customization.

To use this CSS API, you must add the `styles` builder and create an app styling CSS file.

1. Add the `styles` builder to your `manifest.json`:

```json
  "builders": {
    "styles": "1.x"
  }
```

2. Create a file called `vtex.rich-text.css` inside the `styles/css` folder. Add your custom styles:

```css
.container {
  margin-top: 10px;
}
```

#### CSS Namespaces

Below, we describe the namespaces that are defined in the rich-text.

| Token name      | Component                                                                   | Description                                                                                |
| --------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `container`     | [index](https://github.com/vtex-apps/rich-text/blob/master/react/index.tsx) | The main container of `Rich Text`                                                          |
| `strong`        | [index](https://github.com/vtex-apps/rich-text/blob/master/react/index.tsx) | Token inserted in items that were marked as bold during markdown conversion.               |
| `italic`        | [index](https://github.com/vtex-apps/rich-text/blob/master/react/index.tsx) | Token inserted in items that were marked as italic during markdown conversion              |
| `link`          | [index](https://github.com/vtex-apps/rich-text/blob/master/react/index.tsx) | Token inserted in items that were marked as links during markdown conversion               |
| `heading`       | [index](https://github.com/vtex-apps/rich-text/blob/master/react/index.tsx) | Token inserted in items that were marked as headers during markdown conversion             |
| `paragraph`     | [index](https://github.com/vtex-apps/rich-text/blob/master/react/index.tsx) | Token inserted in items that were marked as paragraphs during markdown conversion          |
| `table`         | [index](https://github.com/vtex-apps/rich-text/blob/master/react/index.tsx) | Token inserted in items that were marked as table during markdown conversion               |
| `tableHead`     | [index](https://github.com/vtex-apps/rich-text/blob/master/react/index.tsx) | Token inserted in items that were marked as thead during markdown conversion               |
| `tableBody`     | [index](https://github.com/vtex-apps/rich-text/blob/master/react/index.tsx) | Token inserted in items that were marked as tbody during markdown conversion               |
| `list`          | [index](https://github.com/vtex-apps/rich-text/blob/master/react/index.tsx) | Token inserted in items that were marked as lists (`<ul>` or `<ol>`) during markdown conversion      |
| `list--ordered` | [index](https://github.com/vtex-apps/rich-text/blob/master/react/index.tsx) | Token inserted in items that were marked as ordered lists (`<ol>`) during markdown conversion      |
| `listItem`      | [index](https://github.com/vtex-apps/rich-text/blob/master/react/index.tsx) | Token inserted in items that were marked as list items (`<li>`) during markdown conversion |
| `headingLevel1` | [index](https://github.com/vtex-apps/rich-text/blob/master/react/index.tsx) | Token inserted in items that were marked `<h1>` during markdown conversion                 |
| `headingLevel2` | [index](https://github.com/vtex-apps/rich-text/blob/master/react/index.tsx) | Token inserted in items that were marked `<h2>` during markdown conversion                 |
| `headingLevel3` | [index](https://github.com/vtex-apps/rich-text/blob/master/react/index.tsx) | Token inserted in items that were marked `<h3>` during markdown conversion                 |
| `headingLevel4` | [index](https://github.com/vtex-apps/rich-text/blob/master/react/index.tsx) | Token inserted in items that were marked `<h4>` during markdown conversion                 |
| `headingLevel5` | [index](https://github.com/vtex-apps/rich-text/blob/master/react/index.tsx) | Token inserted in items that were marked `<h5>` during markdown conversion                 |
| `headingLevel6` | [index](https://github.com/vtex-apps/rich-text/blob/master/react/index.tsx) | Token inserted in items that were marked `<h6>` during markdown conversion                 |

Note: `heading-level-1` until `heading-level-6` are also added to heading HTML elements but these classes are deprecated, only the `headingLevelX` classes are officially supported, please use them.

## Troubleshooting

You can check if others are passing through similar issues [here](https://github.com/vtex-apps/rich-text/issues). Also feel free to [open issues](https://github.com/vtex-apps/rich-text/issues/new) or contribute with pull requests.

## Tests

To execute our tests go to `react/` folder and run `yarn test`

### Travis CI

[![Build Status](https://travis-ci.org/vtex-apps/rich-text.svg?branch=master)](https://travis-ci.org/vtex-apps/rich-text)
[![Coverage Status](https://coveralls.io/repos/github/vtex-apps/rich-text/badge.svg?branch=master)](https://coveralls.io/github/vtex-apps/rich-text?branch=master)
