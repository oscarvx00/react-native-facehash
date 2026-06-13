# react-native-facehash

Deterministic avatar faces from any string for React Native. Based on [facehash](https://github.com/cossistantcom/cossistant) by Cossistant. Powered by `react-native-svg`.

## Installation

```sh
npm install react-native-facehash react-native-svg
```

> Make sure to also follow the [react-native-svg installation instructions](https://github.com/software-mansion/react-native-svg#installation) for your platform.

## Quick Start

```tsx
import { Facehash } from 'react-native-facehash';

<Facehash name="john@example.com" size={48} />
```

Same string = same face. Always.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | Required | String to generate face from |
| `size` | `number \| string` | `40` | Size in pixels |
| `variant` | `"gradient" \| "solid"` | `"gradient"` | Background style |
| `intensity3d` | `"none" \| "subtle" \| "medium" \| "dramatic"` | `"dramatic"` | 3D rotation effect |
| `shape` | `"circle" \| "square"` | `"circle"` | Shape of the face container |
| `showInitial` | `boolean` | `true` | Show first letter below the face |
| `colors` | `string[]` | — | Array of hex colors for the background |
| `onRenderMouth` | `() => React.ReactNode` | — | Custom renderer that replaces the initial letter |
| `enableBlink` | `boolean` | `false` | ⚠️ Not yet implemented (see notes) |
| `gradientOverlayClass` | `string` | — | ⚠️ Not used in React Native (web-only concept) |
| `style` | `StyleProp<ViewStyle>` | — | Additional styles for the container |

## FacehashProvider

Wrap your component tree with `FacehashProvider` to set default props for every `Facehash` instance underneath it. Individual instances can still override any value.

```tsx
import { FacehashProvider, Facehash } from 'react-native-facehash';

const BRAND_COLORS = ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"];

<FacehashProvider colors={BRAND_COLORS} size={48} shape="circle" variant="gradient">
  <Facehash name="alice" />
  <Facehash name="bob" />
  {/* Override a single prop for one instance */}
  <Facehash name="charlie" size={64} />
</FacehashProvider>
```

### Provider props

All props are optional. Any prop set on a `<Facehash>` instance takes precedence over the provider value.

| Prop | Type | Description |
|------|------|-------------|
| `colors` | `string[]` | Background color palette shared by all instances |
| `size` | `number \| string` | Default size |
| `variant` | `"gradient" \| "solid"` | Default background style |
| `intensity3d` | `"none" \| "subtle" \| "medium" \| "dramatic"` | Default 3D effect |
| `shape` | `"circle" \| "square"` | Default container shape |
| `showInitial` | `boolean` | Default for showing the initial letter |
| `faceColor` | `string` | Default color for face elements |

## Examples

### Basic usage

```tsx
import { Facehash } from 'react-native-facehash';

<Facehash name="alice" size={64} />
```

### Custom colors

```tsx
<Facehash
  name="alice"
  colors={["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"]}
/>
```

### Flat style (no 3D)

```tsx
<Facehash name="charlie" intensity3d="none" variant="solid" />
```

### Square shape

```tsx
<Facehash name="diana" shape="square" size={80} />
```

### Without initial letter

```tsx
<Facehash name="diana" showInitial={false} />
```

### Custom mouth renderer

Replace the initial letter with any custom component:

```tsx
import { ActivityIndicator } from 'react-native';

<Facehash
  name="loading"
  onRenderMouth={() => <ActivityIndicator size="small" color="#fff" />}
/>
```

## Exports

```tsx
// Component
import { Facehash } from 'react-native-facehash';

// Provider (shared defaults)
import { FacehashProvider, useFacehashContext } from 'react-native-facehash';

// Types
import type { FacehashProps, FacehashContextValue, Variant, Intensity3D, Shape } from 'react-native-facehash';

// Utilities
import { stringHash } from 'react-native-facehash';

// Color palettes
import { DEFAULT_COLORS, DEFAULT_COLORS_LIGHT, DEFAULT_COLORS_DARK } from 'react-native-facehash';
```

## ⚠️ Notes — Missing features

This is a React Native port of [facehash](https://github.com/cossistantcom/cossistant) and does **not** yet implement the full feature set of the original. The following features are currently **missing or not functional**:

- **`enableBlink`** — The eye blinking animation prop is accepted but has no effect. CSS animations are not available in React Native; this would require a `react-native-reanimated` or `Animated` based implementation.
- **`interactive` / hover animation** — The original animates the face pose on hover (web only). React Native has no hover state; this has not been implemented.
- **`pose: "front"` override** — The component always uses `pose: "seed"` (deterministic pose). The `front` pose option from the original is not exposed.
- **`colorClasses`** — Tailwind class-based coloring is a web-only concept and is not supported.
- **`gradientOverlayClass`** — The custom gradient overlay class prop has no effect in React Native.


## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT — Based on [facehash](hhttps://github.com/cossistantcom/cossistant) by **Cossistant**

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
