import type { Link, Meta, Resource } from '@jaspr/client-js';

export interface JsonApiResponse<T> {
    data: T | Array<T> | null;
    included?: Array<Resource>;
    jsonapi: {
        version: string;
    };
    links?: {
        first?: string | Link;
        last?: string | Link;
        next?: string | Link;
        prev?: string | Link;
        related?: string | Link;
        self?: string | Link;
    };
    meta?: Meta;
}
