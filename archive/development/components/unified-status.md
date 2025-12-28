# Unified Status Component

The `UnifiedStatus` component provides a consistent way to display status across the application. It maps various application states to a standardized visual language.

## Usage

```tsx
import { UnifiedStatus } from '@/components/ui/unified-status';

// Basic usage
<UnifiedStatus status="success" label="Completed" />

// With different size
<UnifiedStatus status="running" label="Processing..." size="lg" />

// Icon only
<UnifiedStatus status="error" showIcon={true} />
```

## Props

| Prop        | Type                      | Default     | Description                                                                                |
| ----------- | ------------------------- | ----------- | ------------------------------------------------------------------------------------------ |
| `status`    | `StatusType`              | `idle`      | One of: `idle`, `loading`, `running`, `success`, `error`, `warning`, `partial`, `canceled` |
| `size`      | `sm` \| `default` \| `lg` | `default`   | Size of the component                                                                      |
| `label`     | `string`                  | `undefined` | Optional text label                                                                        |
| `showIcon`  | `boolean`                 | `true`      | Whether to show the status icon                                                            |
| `animate`   | `boolean`                 | `true`      | Whether to animate loading/running states                                                  |
| `className` | `string`                  | `undefined` | Additional CSS classes                                                                     |

## Status Mapping

| Status     | Color  | Icon          | Animation |
| ---------- | ------ | ------------- | --------- |
| `idle`     | Muted  | Circle        | No        |
| `loading`  | Blue   | Loader2       | Spin      |
| `running`  | Blue   | PlayCircle    | Spin      |
| `success`  | Green  | CheckCircle2  | No        |
| `error`    | Red    | XCircle       | No        |
| `warning`  | Yellow | AlertTriangle | No        |
| `partial`  | Yellow | AlertCircle   | No        |
| `canceled` | Muted  | XCircle       | No        |
