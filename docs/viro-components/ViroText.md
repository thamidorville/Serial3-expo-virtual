# ViroText

A component that displays 2D text positioned and rendered in 3D world space. Supports text wrapping, alignment, outlines, drop shadows, and optional 3D extrusion.

## Basic Example

```jsx
<ViroText
  text="Hello World"
  textAlign="center"
  textAlignVertical="center"
  textLineBreakMode="wordwrap"
  textClipMode="clipToBounds"
  color="#FF0000"
  width={2}
  height={2}
  style={{
    fontFamily: "Arial",
    fontSize: 20,
    fontWeight: "400",
    fontStyle: "italic",
  }}
  position={[0, 0, -5]}
/>
```

## Font Configuration

### Typeface Selection

The `fontFamily` prop (in the style object) determines which typeface(s) to use. Not all platforms support all fonts — unsupported families fall back to the device's default system font.

Use comma-separated values to specify fallbacks: `"Roboto, NotoSansCJK"` will use Roboto for English glyphs and NotoSansCJK for Chinese/Japanese/Korean.

### Font Style & Weight

- **fontStyle**: Set to `"italic"` for italicized text (if available). Default: `"normal"`
- **fontWeight**: Numeric value 100–900 or named value. Common weights: `"400"` (normal), `"700"` (bold)
  - 100: Ultra Light, 200: Thin, 300: Light, 400: Normal, 500: Medium
  - 600: Semibold, 700: Bold, 800: Heavy, 900: Extra Black

### Font Sizing

Text size is determined by three factors:

1. **fontSize** (style prop): Controls texture size. Larger = sharper but more memory. Too small = blurry.
2. **scale** prop: Scales text but makes it blurrier. Avoid when possible.
3. **Distance from camera**: In 3D space, farther = smaller. Use trial and error with your device.

**Tip**: Use the smallest fontSize that achieves desired sharpness at your desired camera distance.

## 3D Text with Extrusion

Set `extrusionDepth > 0` to render text in 3D. The value specifies the depth (thickness) of the extrusion in local coordinates.

With 3D text, you can apply three materials:
- **Material 0**: Front face
- **Material 1**: Back face
- **Material 2**: Side faces

```jsx
<ViroText
  text="Bold 3D Text"
  fontSize={24}
  position={[0, 0, 0]}
  width={20}
  height={5}
  extrusionDepth={8}
  materials={["frontMaterial", "backMaterial", "sideMaterial"]}
  style={styles.boldFont}
/>

// Define materials
ViroMaterials.createMaterials({
  frontMaterial: { diffuseColor: '#FFFFFF' },
  backMaterial: { diffuseColor: '#FF0000' },
  sideMaterial: { diffuseColor: '#0000FF' },
});
```

## Outline & Drop Shadow

Use the `outerStroke` prop to add outlines or drop shadows for improved legibility over busy backgrounds.

```jsx
// Thick red outline
<ViroText
  text="Thick red outline"
  fontSize={24}
  position={[0, 4, 0]}
  width={20}
  height={5}
  outerStroke={{ type: "Outline", width: 8, color: '#FF0000' }}
/>

// Thin grey drop shadow
<ViroText
  text="Grey drop shadow"
  fontSize={24}
  position={[0, 3, 0]}
  width={20}
  height={5}
  outerStroke={{ type: "DropShadow", width: 2, color: '#444444' }}
/>
```

**Note**: Outer strokes do not apply to 3D text (extrusionDepth > 0).

## Bounding Box

Text is contained within a bounding box defined by `width` and `height`. This invisible box controls text wrapping, alignment, and clipping. Note: width/height don't affect text size—that's controlled by `fontSize`.

## Props

### Content & Text Behavior

| Prop | Type | Description |
|------|------|-------------|
| **text** `*required` | `string` | The text to display. |
| **textAlign** | `"left" \| "center" \| "right"` | Horizontal alignment within bounding box. Default: `"left"` |
| **textAlignVertical** | `"top" \| "center" \| "bottom"` | Vertical alignment within bounding box. Default: `"top"` |
| **textLineBreakMode** | `"wordwrap" \| "charwrap" \| "justify" \| "none"` | Line breaking strategy. `"wordwrap"` breaks at word boundaries; `"charwrap"` breaks mid-word; `"justify"` spaces words optimally. Default: `"wordwrap"` |
| **textClipMode** | `"none" \| "clipToBounds"` | If `"clipToBounds"`, text is clipped to width/height bounds. If `"none"`, text overflows. Default: `"none"` |
| **maxLines** | `number` | Max lines of text. Excess is truncated. |
| **color** | `string` | Text color. Default: `"#FFFFFF"` (white). Formats: `#rgb`, `#rgba`, `#rrggbb`, `#rrggbbaa`, `rgb()`, `rgba()`, `hsl()`, `hsla()`, named colors |

### Visual Appearance

| Prop | Type | Description |
|------|------|-------------|
| **outerStroke** | `{ type: "None" \| "Outline" \| "DropShadow", width: number, color: string }` | Optional outline or drop shadow. Width in pixels (2 = standard). Not for 3D text. |
| **extrusionDepth** | `number` | 3D extrusion depth. 0 = 2D (default). > 0 = 3D vectorized text. |
| **materials** | `string \| string[]` | Material name(s) for 3D text faces. |

### Transform & Position

| Prop | Type | Description |
|------|------|-------------|
| **position** | `[x: number, y: number, z: number]` | Cartesian position in 3D world space. |
| **rotation** | `[x: number, y: number, z: number]` | Rotation around local axes as Euler angles in degrees. |
| **rotationPivot** | `[x: number, y: number, z: number]` | Pivot point for rotation relative to component position. |
| **scale** | `[x: number, y: number, z: number]` | Scale along each axis. Note: scaling fonts makes them blurry—prefer `fontSize`. |
| **scalePivot** | `[x: number, y: number, z: number]` | Pivot point for scaling. |
| **width** | `number` | Bounding box width in 3D space. Default: `1`. Does NOT affect text size. |
| **height** | `number` | Bounding box height in 3D space. Default: `1`. Does NOT affect text size. |

### Interaction & Events

| Prop | Type | Description |
|------|------|-------------|
| **onClick** | `(position: [x, y, z], source) => void` | Fires when text is clicked. Position in world coordinates. |
| **onClickState** | `(state: 1 \| 2 \| 3, position, source) => void` | Fires for each click state: 1=Down, 2=Up, 3=Clicked. |
| **onHover** | `(isHovering: boolean, position, source) => void` | Fires when hovering on/off the text. |
| **onFuse** | `(source) => void` or `{ callback, timeToFuse: number }` | Fires after hovering for `timeToFuse` ms (default: 2000). |
| **onDrag** | `(dragToPos: [x, y, z], source) => void` | Fires while being dragged. Provides current 3D position. |
| **onPinch** | `(state: 1 \| 2 \| 3, scaleFactor: number, source) => void` | Fires on pinch gesture: 1=Start, 2=Move, 3=End. *AR only* |
| **onRotate** | `(state: 1 \| 2 \| 3, rotationFactor: number, source) => void` | Fires on rotation gesture in degrees: 1=Start, 2=Move, 3=End. *AR only* |
| **onScroll** | `(scrollPos: [x, y], source) => void` | Fires on scroll. Position ranges 0.0–1.0. |
| **onSwipe** | `(state: 1 \| 2 \| 3 \| 4, source) => void` | Fires on swipe: 1=Up, 2=Down, 3=Left, 4=Right. *Not on Cardboard* |
| **onTouch** | `(state: 1 \| 2 \| 3, touchPos: [x, y], source) => void` | Fires on touch: 1=Down, 2=Move, 3=Up. *Not on Cardboard* |
| **onCollision** | `(viroTag: string, collidedPoint: [x, y, z], collidedNormal: [x, y, z]) => void` | Fires when physics body collides with another. |
| **onTransformUpdate** | `(position: [x, y, z]) => void` | Fires when component moves. Provides world position. |

### Behavior & Rendering

| Prop | Type | Description |
|------|------|-------------|
| **dragType** | `"FixedDistance" \| "FixedDistanceOrigin" \| "FixedToWorld" \| "FixedToPlane"` | Controls drag behavior. Default: `"FixedDistance"`. `"FixedToWorld"` requires AR. `"FixedToPlane"` uses `dragPlane`. |
| **dragPlane** | `{ planePoint: [x, y, z], planeNormal: [x, y, z], maxDistance?: number }` | Plane for `"FixedToPlane"` dragging. Optionally limit max drag distance. |
| **transformBehaviors** | `string \| string[]` | Transform constraints. Options: `"billboard"` (all axes), `"billboardX"`, `"billboardY"`. |
| **ignoreEventHandling** | `boolean` | If `true`, ignores events and doesn't block controls behind it. Default: `false` |
| **visible** | `boolean` | If `false`, text is hidden. Default: `true` |
| **renderingOrder** | `number` | Rendering order relative to other nodes. Higher = renders last. Default: `0` |

### Styling & Lighting

| Prop | Type | Description |
|------|------|-------------|
| **style** | `object` | Style object containing font properties (`fontFamily`, `fontSize`, `fontStyle`, `fontWeight`) and layout properties. See Style Props section. |
| **animation** | `{ name: string, delay?: number, loop?: boolean, onStart?: () => void, onFinish?: () => void, run?: boolean }` | Animation config. See Animation Guide. |
| **physicsBody** | `PhysicsBodyProp` | Physics body config. See physics.api. |
| **lightReceivingBitMask** | `number` | Bit mask AND-ed with light's influenceBitMask. If > 0, light illuminates this text. |
| **shadowCastingBitMask** | `number` | Bit mask AND-ed with light's influenceBitMask. If > 0, text casts shadows. |

## Style Props

Configure font properties within the `style` object:

| Prop | Type | Description |
|------|------|-------------|
| **fontFamily** | `string` | Comma-separated font names, e.g. `"Roboto, NotoSansCJK"`. Fallback to system default if not found. |
| **fontSize** | `number` | Point size of the font. Controls texture resolution. |
| **fontStyle** | `"normal" \| "italic"` | Font style. Default: `"normal"`. |
| **fontWeight** | `"normal" \| "bold" \| "100" \| "200" \| ... \| "900"` | Font weight. Default: `"400"`. |

## Methods

### getBoundingBoxAsync()

```typescript
async getBoundingBoxAsync(): Promise<{
  boundingBox: {
    minX: number
    maxX: number
    minY: number
    maxY: number
    minZ: number
    maxZ: number
  }
}>
```

Returns the text's bounding box in world coordinates.

### getTransformAsync()

```typescript
async getTransformAsync(): Promise<{
  transform: {
    position: [x: number, y: number, z: number]
    scale: [x: number, y: number, z: number]
    rotation: [x: number, y: number, z: number]
  }
}>
```

Returns the text's current transform (position, scale, rotation).

### applyImpulse(force, position)

```typescript
applyImpulse(force: [x: number, y: number, z: number], position: [x: number, y: number, z: number]): void
```

Applies an instantaneous force (impulse) to the text's physics body.

- **force**: Force magnitudes in N along x, y, z axes
- **position**: Application point

### applyTorqueImpulse(torque, position)

```typescript
applyTorqueImpulse(torque: [x: number, y: number, z: number], position: [x: number, y: number, z: number]): void
```

Applies instantaneous rotational force (torque) to the text's physics body.

- **torque**: Torque magnitudes in N·m along x, y, z axes
- **position**: Application point relative to the object

### setVelocity(velocity)

```typescript
setVelocity(velocity: [x: number, y: number, z: number]): void
```

Sets the velocity of the text's physics body.

- **velocity**: Velocity vector for x, y, z directions

### setNativeProps(nativeProps)

```typescript
setNativeProps(nativeProps: object): void
```

A wrapper around the native component's `setNativeProps` — allows setting properties without state changes or re-rendering. Useful for direct manipulation.

```jsx
textRef.setNativeProps({ position: [0, 0, -1] });
```
