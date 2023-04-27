<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
> 📢 Don't fork this project. Use, [contribute](https://github.com/vtex-apps/awesome-io#contributing), or open issues through [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Rich Text

The Rich Text block converts texts written in Markdown to HTML and displays them in your storefront.

![image](https://cdn.jsdelivr.net/gh/vtexdocs/dev-portal-content@main/images/vtex-rich-text-0.png)

For example, the text `[Help](https://developers.vtex.com/).\n**Be Bold!**\n*This is italic*` is converted to:

```html
<div>
      <p>
        <a href="https://developers.vtex.com/">
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

For more information, please refer to the [Markdown documentation](https://www.markdownguide.org/cheat-sheet/).

## Configuration

1. Import the rich text app to your theme dependencies in the `manifest.json` as in the following example:

```json
  "dependencies": {
    "vtex.rich-text": "0.x"
  }
```

2. Add the `rich-text` block to your block files in the desired template position. For example:

```json
"rich-text": {
  "props": {
    "textAlignment": "CENTER",
    "textPosition": "CENTER",
    "text": "Visit our [help](https://developers.vtex.com/) section.\n**Be Bold!**\n*This is italic*",
    "textColor": "c-on-emphasis",
    "font": "t-heading-5",
    "blockClass": "help-message"
  }
}
```

| Prop name       | Type                | Description                                                                                                  |
| --------------- | ------------------- | ------------------------------------------------------------------------------------------------------------ |
| `blockClass`    | `string`            | Unique class name to be appended to block classes. Default: ''                                               |
| `font`          | `string`            | Tachyon token to be used as a font. Default: `t-body`. |
| `htmlId`     | `String` | HTML ID of the element.                                          |
| `textColor`     | `string`            | Tachyon token to be used as text color. Default: `c-on-base`.                                                |
| `text`          | `string`            | Text written in Markdown language to be displayed.                                                           |
| `textAlignment` | `TextAlignmentEnum` | Text alignment inside the component. Default: `"LEFT"`.                                                      |
| `textPosition`  | `TextPostionEnum`   | Text position in relation to the component. Default: `"LEFT"`.                                               |

- **`TextPostionEnum` possible values**

| Enum name | Enum value | Description                                                                                  |
| --------- | ---------- | -------------------------------------------------------------------------------------------- |
| Left      | 'LEFT'     | The text will be on the left. If `isFullModeStyle` is false, the image will be on the right. |
| Center    | 'CENTER'   | The text will be in the center. Not applicable if `isFullModeStyle` is false.                |
| Right     | 'RIGHT'    | The text will be on the right. If `isFullModeStyle` is false, the image will be on the left. |

- **`TextAlignmentEnum` possible values**

| Enum name | Enum value | Description                           |
| --------- | ---------- | ------------------------------------- |
| Left      | 'LEFT'     | Text alignment will be to the left.   |
| Center    | 'CENTER'   | Text alignment will be to the center. |
| Right     | 'RIGHT'    | Text alignment will be to the right.  |

## Customization

To apply CSS customizations to this and other blocks, please follow the [Using CSS handles for store customization](https://developers.vtex.com/docs/guides/vtex-io-documentation-using-css-handles-for-store-customization) guide.

| CSS Handle      |
| --------------- |
| `container`     |
| `heading`       |
| `headingLevel1` |
| `headingLevel2` |
| `headingLevel3` |
| `headingLevel4` |
| `headingLevel5` |
| `headingLevel6` |
| `image`         |
| `italic`        |
| `link`          |
| `list`          |
| `listItem`      |
| `listOrdered`   |
| `paragraph`     |
| `strong`        |
| `table`         |
| `tableBody`     |
| `tableHead`     |
| `tableTd`       |
| `tableTh`       |
| `tableTr`       |
| `wrapper`       |

<!-- DOCS-IGNORE:start -->
## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
<!-- DOCS-IGNORE:end -->
