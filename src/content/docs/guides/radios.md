---
title: Radio Buttons
description: A guide in my new Starlight docs site.
---

> A radio group is a set of checkable buttons, known as radio buttons, where no more than one of the buttons can be checked at a time. Some implementations may initialize the set with all buttons in the unchecked state in order to force the user to check one of the buttons before moving past a certain point in the workflow.

Radios in HTML do not have a "group" concept, but they get grouped implicitly by the "name" attribute.

This isn't the case in most UI libraries, as they are grouped by the model name they mutate. As such, a "group" concept is introduced in this library to provide a consistent API for radio groups regardless if they are bound to the same model or if they have the same name or not.

[Aria Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/)

## Features

You can build radio components using either the native HTML `input[type="radio"]` elements or custom HTML elements. We provide the behavior, state and accessibility implementation for both cases with the same API and features.

Currently, the following features are implemented:

- `v-model` support for radio groups.
- Support for either `input[type="radio"]` or custom HTML elements as a base element for the radio component.
- Accessibility for labels, descriptions, error messages, radio groups, and custom radio components.
- Supported Keyboard features:
  - Focus management with <kbd>ArrowLeft</kbd> and <kbd>ArrowRight</kbd> keys with RTL support.
  - Focus groups with Tab navigation.
  - Support for orientation with `horizontal` and `vertical` values.
- Form management and validation with Typed Schemas or native HTML5 validation.

## Anatomy

// TODO: Add anatomy image

## API

### Radio Group

| Name                | Type                               | Description                                                                |
| ------------------- | ---------------------------------- | -------------------------------------------------------------------------- |
| `descriptionProps`  | `AriaDescriptionProps`             | The group's description element props.                                     |
| `displayError`      | `() => string \| undefined`        | A getter to display the error message if touched.                          |
| `errorMessage`      | `string \| undefined`              | The group's first error message.                                           |
| `errorMessageProps` | `AriaErrorMessageProps`            | The group's error message element props.                                   |
| `errors`            | `string[]`                         | The group's error messages.                                                |
| `fieldValue`        | `any[]`                            | The group's value.                                                         |
| `groupProps`        | `AriaGroupProps`                   | The group's element props.                                                 |
| `isDirty`           | `boolean`                          | If the group is dirty, that is if the group value has changed.             |
| `isTouched`         | `boolean`                          | If the group is touched, that is if at least one checkbox item is touched. |
| `isValid`           | `boolean`                          | If the group has any error messages.                                       |
| `labelProps`        | `AriaLabelProps`                   | The group's label element props.                                           |
| `setErrors`         | `(msg: Arrayable<string>) => void` | Sets the error messages for the group and sets the `isValid` state.        |
| `setTouched`        | `(touched: boolean) => void`       | Sets the `isTouched` state.                                                |
| `setValue`          | `(value: any[]) => void`           | Sets the group value and updates the selected item checked state.          |

### Radio

| Name         | Type             | Description                      |
| ------------ | ---------------- | -------------------------------- |
| `inputProps` | Complex Binding  | The radio's base element props.  |
| `isChecked`  | `boolean`        | If the radio is checked.         |
| `isDisabled` | `boolean`        | If the radio is disabled.        |
| `labelProps` | `AriaLabelProps` | The radio's label element props. |

## Building a Radio Group Component

The `useRadioGroup` provides the behavior, state and accessibility implementation for group components.

Unlike checkboxes, radio components must be grouped by a radio group component. Which is why we will start by building a radio group component.

```vue
<script setup lang="ts">
import { RadioGroupProps, useRadioGroup } from '@formwerk/core';

const props = defineProps<RadioGroupProps>();

const {
  radioGroupProps,
  labelProps,
  descriptionProps,
  errorMessageProps,
  errorMessage,
} = useRadioGroup(props);
</script>

<template>
  <div v-bind="radioGroupProps" class="radio-group">
    <span v-bind="labelProps">{{ label }}</span>

    <slot />

    <div v-if="errorMessageProps" v-bind="errorMessageProps">
      {{ errorMessage }}
    </div>
    <div v-else-if="description" v-bind="descriptionProps">
      {{ description }}
    </div>
  </div>
</template>

<style scoped>
.radio-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
```

Provides the behavior, state and accessibility implementation for radio items. Radio items can be built with or without `input` elements depending on your styling and behavior needs.

## Building a Radio Component

### With input element as a base

You can use the `useRadio` composable to build a radio component with the `input` element as a base.

```vue
<script setup lang="ts">
import { RadioItemProps, useRadio } from '@formwerk/core';

const props = defineProps<RadioItemProps>();

const { labelProps, inputProps } = useRadio(props);
</script>

<template>
  <div>
    <input v-bind="inputProps" />
    <label v-bind="labelProps" class="ml-1">{{ label }}</label>
  </div>
</template>
```

### With custom HTML element as a base

For special styling needs, you don't have to use the `input` element. You will be using `radioProps` instead of `inputProps`.

```vue
<script setup lang="ts">
import { RadioItemProps, useRadio } from '@formwerk/core';

const props = defineProps<RadioItemProps>();

const { labelProps, radioProps, isChecked } = useRadio(props);
</script>

<template>
  <div>
    <span v-bind="radioProps">
      {{ isChecked ? '⏺' : '◯' }}
    </span>
    <span v-bind="labelProps">{{ label }}</span>
  </div>
</template>
```

## Validation

## Styling

## Usage
