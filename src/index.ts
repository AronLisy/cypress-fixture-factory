import type { JsonApiResponse } from './types/JsonApiResponse';
import type { PartialEntity } from './types/PartialJsonApiEntity';
import type { Resource } from '@jaspr/client-js';
import { cloneDeep } from 'lodash';


export default class JsonApiEntityGenerator<ENTITY extends Resource> {
    /**
    * Default entity used as a base for methods setEntities() and getEntity()
    */
    protected entity: ENTITY;

    /**
    * Default entities used as a base for method getEntities()
    */
    protected entities: Array<ENTITY> = [];

    /**
    * Sets the default entity
    */
    public constructor(entity: ENTITY) {
        this.entity = entity;
    }

    /**
     * Returns JsonApiResponse with default entity or mutated entity, if parameter  entityChanges provided
     *
     * @param {PartialEntity<ENTITY>} entityChanges
     * @returns {JsonApiResponse<ENTITY>}
     */
    public getEntity(entityChanges?: PartialEntity<ENTITY>): JsonApiResponse<ENTITY> {
        return this.getJsonApiResponse(this.createEntity(entityChanges));
    }

    /**
     * Sets the default entities
     * If parameter entitiesChanges not provided, they will be cloned from default entity
     *
     * @param {number} numOfEntities
     * @param {Array<PartialEntity<ENTITY> | null>} entitiesChanges
     */
    public setEntities(numOfEntities: number, entitiesChanges?: Array<PartialEntity<ENTITY> | null>): void {
        const newEntities: Array<ENTITY> = [];
        for (let i = 0; i < numOfEntities; i += 1) {
            const entity = cloneDeep(entitiesChanges?.[i]);
            if (entity !== null) {
                const newEntity = this.createEntity(entitiesChanges?.[i], null, String(i + 1));
                newEntities.push(newEntity);
            }
        }
        this.entities = newEntities;
    }

    /**
     * Returns JsonApiResponse with array of default entities or mutated entities, if parameter entityChanges provided
     * If numOfEntities not specified, it returns all default entities
     *
     * @param {number} numOfEntities
     * @param {Array<PartialEntity<ENTITY> | null>} entitiesChanges
     * @returns {JsonApiResponse<ENTITY>}
     */
    public getEntities(
        numOfEntities?: number,
        entitiesChanges?: Array<PartialEntity<ENTITY> | null>,
        total?: number
    ): JsonApiResponse<ENTITY> {
        const newEntities: Array<ENTITY> = [];
        for (let i = 0; i < (numOfEntities ?? this.entities.length); i += 1) {
            const entity = cloneDeep(entitiesChanges?.[i]);
            if (entity !== null) {
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                const id = (entitiesChanges?.[i]?.id ?? this.entities[i]?.id ?? String(i + 1));
                newEntities.push(this.createEntity(entitiesChanges?.[i], this.entities[i], id));
            }
        }
        return this.getJsonApiResponse(newEntities, total);
    }

    /**
     * Returns entity created from default entity
     * Changed by parameters primaryEntityChanges, secondaryEntityChanges changes and id, if provided
     *
     * @param {PartialEntity<ENTITY> | null} primaryEntityChanges
     * @param {PartialEntity<ENTITY> | null} secondaryEntityChanges
     * @param {string} id
     * @returns {ENTITY}
     */
    protected createEntity(
        primaryEntityChanges?: PartialEntity<ENTITY> | null,
        secondaryEntityChanges?: PartialEntity<ENTITY> | null,
        id?: string
    ): ENTITY {
        const newEntity: ENTITY = cloneDeep(this.entity);
        if (id) {
            newEntity.id = id;
        } else if (primaryEntityChanges?.id) {
            newEntity.id = primaryEntityChanges.id;
        } else if (secondaryEntityChanges?.id) {
            newEntity.id = secondaryEntityChanges.id;
        }
        if (secondaryEntityChanges?.attributes) {
            for (const [key, value] of Object.entries(secondaryEntityChanges.attributes)) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
                (newEntity.attributes as any)[key] = value;
            }
        }
        if (primaryEntityChanges?.attributes) {
            for (const [key, value] of Object.entries(primaryEntityChanges.attributes)) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
                (newEntity.attributes as any)[key] = value;
            }
        }
        return newEntity;
    }

    /**
     * Gets data as parameter and returns it wrapped as JsonApiResponse
     *
     * @param {ENTITY | Array<ENTITY>} data
     * @returns {JsonApiResponse<ENTITY>}
     */
    protected getJsonApiResponse(data: ENTITY | Array<ENTITY>, total?: number): JsonApiResponse<ENTITY> {
        const length = Array.isArray(data) ? data.length : 1;
        return {
            jsonapi: {
                version: '1.0'
            },
            data,
            included: [],
            links: {},
            meta: {
                total: total ?? length,
                offset: 0,
                limit: 50
            }
        };
    }
}
