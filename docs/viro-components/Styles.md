# Viro Style Properties

Reference for styling Viro components. Style properties are passed via the `style` prop and control appearance, text rendering, and layout within ViroFlexView containers.

## Layout Styles

Layout styles are used within `ViroFlexView` components to control positioning, sizing, and spacing of child components.

For a comprehensive reference on layout props, see [React Native Layout Props](https://facebook.github.io/react-native/docs/layout-props).

**⚠️ Limitation**: Border-related layout properties are currently **not supported**.

Common layout properties include:
- `flex` — Flex grow/shrink factor
- `width`, `height` — Component dimensions
- `margin`, `padding` — Spacing around/inside components
- `justifyContent`, `alignItems` — Flex alignment
- `flexDirection` — Layout direction (row/column)
- `position` — Positioning mode (absolute/relative)

Refer to React Native documentation for detailed layout prop descriptions and examples.

## Text Styles

Text styles apply exclusively to `ViroText` components. Pass these properties in the `style` object:

```jsx
<ViroText
  text="Hello"
  style={{
    color: '#FF0000',
    fontFamily: 'Arial',
    fontSize: 24,
    fontWeight: '700',
    fontStyle: 'italic',
    textAlign: 'center',
    textAlignVertical: 'center',
  }}
/>
```

### Color

| Prop | Type | Description |
|------|------|-------------|
| **color** | `string` | Text color. Default: `"#FFFFFF"` (white). |

**Supported Color Formats:**
- Hex: `#f0f` (#rgb), `#f0fc` (#rgba), `#ff00ff` (#rrggbb), `#ff00ff00` (#rrggbbaa)
- Functional: `rgb(255, 255, 255)`, `rgba(255, 255, 255, 1.0)`, `hsl(360, 100%, 100%)`, `hsla(360, 100%, 100%, 1.0)`
- Named: `'red'`, `'transparent'`, etc.
- Packed int: `0xff00ff00` (0xrrggbbaa)

### Font Properties

| Prop | Type | Description |
|------|------|-------------|
| **fontFamily** | `string` | Comma-separated font names for fallback selection. Example: `"Roboto, NotoSansCJK"`. Falls back to system default if not found. |
| **fontSize** | `number` | Font size in points. Default: `18`. **Recommended: ≥18** for clarity in 3D space. |
| **fontStyle** | `"normal" \| "italic"` | Font style. Default: `"normal"`. Not all fonts support italics. |
| **fontWeight** | `"normal" \| "bold" \| "100" \| "200" \| ... \| "900"` | Font weight. Default: `"400"`. Common: `"400"` (normal), `"700"` (bold). Not all fonts support all weights. |

### Text Alignment

| Prop | Type | Description |
|------|------|-------------|
| **textAlign** | `"left" \| "center" \| "right"` | Horizontal alignment within bounding box. Default: `"left"` |
| **textAlignVertical** | `"top" \| "center" \| "bottom"` | Vertical alignment within bounding box. Default: `"top"` |

### Text Wrapping & Clipping

| Prop | Type | Description |
|------|------|-------------|
| **textLineBreakMode** | `"wordwrap" \| "charwrap" \| "justify" \| "none"` | Line break strategy. See details below. |
| **textClipMode** | `"none" \| "clipToBounds"` | `"clipToBounds"` clips text to width/height bounds. `"none"` allows overflow. Default: `"none"` |

#### Text Line Break Modes

- **`"wordwrap"`**: Break only at word boundaries. Next word wraps to new line if it overruns width.
- **`"charwrap"`**: Break at any character. May split words across lines.
- **`"justify"`**: Break at word boundaries with variable spacing between words to reduce raggedness of text edges.
- **`"none"`**: No automatic line breaks.

## Example

```jsx
import { StyleSheet } from 'react-native';
import { ViroText, ViroFlexView } from '@viro-community/react-viro';

const styles = StyleSheet.create({
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  body: {
    fontSize: 18,
    fontFamily: 'Arial',
    color: '#E0E0E0',
    textAlign: 'left',
    textAlignVertical: 'top',
    textLineBreakMode: 'wordwrap',
    textClipMode: 'clipToBounds',
  },
});

export const TextExample = () => (
  <ViroFlexView style={{ width: 200, height: 100 }}>
    <ViroText text="Heading" style={styles.heading} />
    <ViroText 
      text="Body text that wraps..." 
      style={styles.body} 
    />
  </ViroFlexView>
);