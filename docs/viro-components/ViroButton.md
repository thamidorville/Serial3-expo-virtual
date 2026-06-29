# ViroButton

A 2D button component that is positioned and rendered in 3D world space. The button animates on interaction and changes its visual appearance based on user interaction state (hover, gaze, tap).

## Basic Example

```jsx
<ViroButton
    source={require("./res/button_base.jpg")}
    gazeSource={require("./res/button_on_gazing.jpg")}
    tapSource={require("./res/button_on_tap_pressed.jpg")}
    position={[1, 3, -5]}
    height={2}
    width={3}
    onTap={this._onButtonTap}
/>
```

## Props

### Visual Appearance

| Prop | Type | Description |
|------|------|-------------|
| **source** `*required` | `ImageSourcePropType` | The default button image. Load with `require('./path/to/image.png')` or `{ uri: 'https://example.com/image.png' }` |
| **gazeSource** | `ImageSourcePropType` | Image displayed when user gazes over the button. Accepts remote URL or local file (PNG/JPG). |
| **tapSource** | `ImageSourcePropType` | Image displayed when user taps the button. Accepts remote URL or local file (PNG/JPG). |
| **hoverSource** | `ImageSourcePropType` | Image displayed when user is hovering over the button. Accepts remote URL or local file (PNG/JPG). |
| **clickSource** | `ImageSourcePropType` | Image displayed when user clicks the button. Accepts remote URL or local file (PNG/JPG). |
| **opacity** | `number` | Opacity value from 0 to 1. Default: `1` (fully opaque). |
| **materials** | `string \| string[]` | Material name(s) created via `ViroMaterials.createMaterials()`. Button takes 1 material. |

### Transform & Position

| Prop | Type | Description |
|------|------|-------------|
| **position** | `[x: number, y: number, z: number]` | Cartesian position in 3D world space. |
| **rotation** | `[x: number, y: number, z: number]` | Rotation around local axes as Euler angles in degrees. |
| **rotationPivot** | `[x: number, y: number, z: number]` | Pivot point for rotation relative to component position. |
| **scale** | `[x: number, y: number, z: number]` | Scale along each axis. Default: `1` (current size). Values < 1 shrink, > 1 enlarge. |
| **scalePivot** | `[x: number, y: number, z: number]` | Pivot point for scaling relative to component position. |
| **height** | `number` | Button height in 3D space. Default: `1`. |
| **width** | `number` | Button width in 3D space. Default: `1`. |

### Interaction & Events

| Prop | Type | Description |
|------|------|-------------|
| **onClick** | `(position: [x, y, z], source) => void` | Fired when button is clicked. Position in world coordinates. |
| **onClickState** | `(state: 1 \| 2 \| 3, position, source) => void` | Fires for each click state: 1=Down, 2=Up, 3=Clicked. |
| **onHover** | `(isHovering: boolean, position, source) => void` | Fires when hovering on/off the button. |
| **onFuse** | `(source) => void` or `{ callback, timeToFuse: number }` | Fires after user hovers for `timeToFuse` ms (default: 2000). |
| **onTap** | `(source) => void` | Fires when button is tapped. |
| **onDrag** | `(dragToPos: [x, y, z], source) => void` | Fires while button is being dragged. Provides current 3D position. |
| **onPinch** | `(state: 1 \| 2 \| 3, scaleFactor: number, source) => void` | Fires on pinch gesture: 1=Start, 2=Move, 3=End. *AR only* |
| **onRotate** | `(state: 1 \| 2 \| 3, rotationFactor: number, source) => void` | Fires on rotation gesture in degrees: 1=Start, 2=Move, 3=End. *AR only* |
| **onScroll** | `(scrollPos: [x, y], source) => void` | Fires on scroll action. Position ranges 0.0–1.0. |
| **onSwipe** | `(state: 1 \| 2 \| 3 \| 4, source) => void` | Fires on swipe: 1=Up, 2=Down, 3=Left, 4=Right. *Not on Cardboard* |
| **onTouch** | `(state: 1 \| 2 \| 3, touchPos: [x, y], source) => void` | Fires on touch: 1=Down, 2=Move, 3=Up. *Not on Cardboard* |
| **onCollision** | `(viroTag: string, collidedPoint: [x, y, z], collidedNormal: [x, y, z]) => void` | Fires when physics body collides with another. |
| **onTransformUpdate** | `(position: [x, y, z]) => void` | Fires when component moves. Provides world position. |

### Behavior

| Prop | Type | Description |
|------|------|-------------|
| **dragType** | `"FixedDistance" \| "FixedDistanceOrigin" \| "FixedToWorld"` | Controls drag behavior. Default: `"FixedDistance"`. `"FixedToWorld"` requires AR. |
| **transformBehaviors** | `string \| string[]` | Transform constraints. Options: `"billboard"` (all axes), `"billboardX"`, `"billboardY"`. |
| **ignoreEventHandling** | `boolean` | If `true`, ignores events and doesn't block controls behind it. Default: `false`. |
| **visible** | `boolean` | If `false`, button is hidden. Default: `true`. |
| **renderingOrder** | `number` | Rendering order relative to other nodes. Higher values render last. Default: `0`. |

### Animation & Physics

| Prop | Type | Description |
|------|------|-------------|
| **animation** | `{ name: string, delay?: number, loop?: boolean, onStart?: () => void, onFinish?: () => void, run?: boolean }` | Animation configuration. See Animation Guide for details. |
| **physicsBody** | `PhysicsBodyProp` | Physics body configuration. See physics.api for details. |
| **style** | `StyleProp` | Style properties for position/scale within ViroFlexView. See Styles reference. |

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

Returns the button's bounding box in world coordinates.

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

Returns the button's current transform (position, scale, rotation).

### applyImpulse(force, position)

```typescript
applyImpulse(force: [x: number, y: number, z: number], position: [x: number, y: number, z: number]): void
```

Applies an instantaneous force (impulse) to the button's physics body.

- **force**: Force magnitudes in N along x, y, z axes
- **position**: Application point

### applyTorqueImpulse(torque, position)

```typescript
applyTorqueImpulse(torque: [x: number, y: number, z: number], position: [x: number, y: number, z: number]): void
```

Applies instantaneous rotational force (torque) to the button's physics body.

- **torque**: Torque magnitudes in N·m along x, y, z axes
- **position**: Application point relative to the object

### setVelocity(velocity)

```typescript
setVelocity(velocity: [x: number, y: number, z: number]): void
```

Sets the velocity of the button's physics body.

- **velocity**: Velocity vector for x, y, z directions