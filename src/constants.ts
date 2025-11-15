import type { Stack } from './types'

export const NEXT: unique symbol = Symbol('Next')
export const PLUGINS: unique symbol = Symbol('Plugins')

export const stacks: Stack[] = []
