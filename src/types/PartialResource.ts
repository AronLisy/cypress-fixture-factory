/**
 * @file Types for patching json api resource.
 */
import type { Resource } from '@jaspr/client-js';

type RecursivePartial<T> = { [P in keyof T]?: RecursivePartial<T[P]> | P };

export type PartialResource<T extends Resource> = RecursivePartial<T>;
