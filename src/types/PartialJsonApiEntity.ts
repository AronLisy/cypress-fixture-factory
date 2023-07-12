import type { PartialResource } from './PartialResource';
import type { Resource } from '@jaspr/client-js';

export type PartialEntity<ENTITY extends Resource> = Partial<PartialResource<ENTITY>>;
