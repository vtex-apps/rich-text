
📢 Don't fork this project. Use, [contribute](https://github.com/vtex-apps/awesome-io#contributing), or open issues through [Store Discussion](https://github.com/vtex-apps/store-discussion).


# Rich Text

The Rich Text is a block that brings texts to your store and everything else that Markdown language is able to. It converts texts written in Markdown language and displays its content as HTML elements.

![image](https://user-images.githubusercontent.com/12139385/70084949-119b1f80-15ee-11ea-91dd-1277427c8aee.png)


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

Check the [documentation of Markdown Language](https://www.markdownguide.org/cheat-sheet/) to understand how to use it.

## Configuration


1. Import the rich text's app to your theme's dependencies in the `manifest.json`, for example:

```json
  "dependencies": {
    "vtex.rich-text": "0.x"
  }
```

2. Add `rich-text` block to your blocks files, in the place you want it to show up. For example:

```json
"rich-text": {
  "props": {
    "textAlignment": "CENTER",
    "textPosition": "CENTER",
    "text": "Visit our [help](https://help.vtex.com/en/faq/what-is-vtex-io) section.\n*Be Bold!*\n**This is italic**",
    "textColor": "c-on-emphasis",
    "font": "t-heading-5",
    "blockClass": "help-message"
  }
}
```

| Prop name           | Type      | Description                                                                                 |
| ------------------- | --------- | ------------------------------------------------------------------------------------------- |
| `font`     | `String` | Define the tachyon token to be used as font. Default: `t-body`    |
| `textColor`     | `String` | Define the tachyon token to be used as text color. Default: `c-on-base`                                          |
| `text`        | `String` | Text written in markdown language to be displayed              |
| `textAlignment`  | `TextAlignmentEnum` | Control the text alignment inside component. Default: `"LEFT"`                                                                |
| `textPosition`       | `TextPostionEnum` | Choose in which position of the component text will be displayed, left, center or right. Default: `"LEFT"`                                                           |
| `htmlId`     | `String` | HTML ID of the element.                                          |
| `blockClass`       | `String` | Unique class name to be appended to block classes. Default: ''                                                           |

Here are the possible values of `TextPostionEnum`

| Enum name | Enum value | Description |
| --------- | ---- | ----------- |
| Left | 'LEFT' | Text will be to the left. If `isFullModeStyle` is false, image will be on the right |
| Center | 'CENTER' | Text will be in the center. Not applicable if `isFullModeStyle` is false. |
| Right | 'RIGHT' | Text will be to the right. If `isFullModeStyle` is false, image will be on the left |

Here are the possible values of `TextAlignmentEnum`

| Enum name | Enum value | Description |
| --------- | ---- | ----------- |
| Left | 'LEFT' | Text alignment will be to the left. |
| Center | 'CENTER' | Text alignment will be to the center. |
| Right | 'RIGHT' | Text alignment will be to the right. |


## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization). 


| CSS Handle                 | 
| -------------------------- | 
| `container`                |
| `strong`          |                                       
| `italic`           |
| `link`           |
| `heading`           | |
| `paragraph`           |
| `image`           |
