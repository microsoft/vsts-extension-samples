import { ODataClient } from "./ODataClient";
import { ICacheableQuery } from "./ICacheableQuery";

/**
 * Expresses mapping relationship between underlying Field Names and Analytics Queryable name, where such a relation exists.
 * Does not currently cover any custom mappings on NavigationProperty and Key fields
 */
export interface FieldMapping {
    referenceName: string;
    queryableName: string;
}

export interface MetadataInformation {
    fieldMappings: FieldMapping[];
}

/**
 * Returns a queryable name for the supplied reference name.
 * If no such match is found, the reference name is returned.
 * @param referenceName 
 * @param mapping 
 */
export function mapReferenceNameForQuery(referenceName: string, mapping: MetadataInformation) {
    let match = mapping.fieldMappings.find(o => o.referenceName === referenceName);
    return match != null ? match.queryableName : referenceName;
}

/**
 * Indicates if the specified name has a mapping available.
 */
export function hasMetadataMapping(referenceName: string, mapping: MetadataInformation) {
    return mapping.fieldMappings.find(o => o.referenceName === referenceName)!=null;    
}

/** Encapsulates minimal metadata-Load/parsing logic. 
 *  For more advanced/general OData scenarios - OLingo V4 library is intended to provide similar, broader metadata facilities.  
 * */
export class MetadataQuery implements ICacheableQuery<MetadataInformation> {
    public static WorkItemSnapshot = "WorkItemSnapshot";
    private entity: string;
    private projectId: string;


    public constructor(project: string, entity: string) {
        this.entity = entity;
        this.projectId = project;
    }
    public getKey(): string {
        return `MetadataQuery(${this.entity})`;
    }

    public runQuery(): IPromise<MetadataInformation> {
        return ODataClient.getInstance().then((client) => {
            return client.runMetadataQuery(this.projectId, `$metadata#${this.entity}`).then((results: HTMLElement) => {
                let entities = results.getElementsByTagName("EntityType");
                var mappings = []

                //Loop through the nodelist (Not an array)
                for (let i = 0; i < entities.length; i++) {
                    let entity = entities.item(i)
                    let entityName = entities.item(i).getAttribute("Name");
                    if (entityName === this.entity) {
                        mappings = this.extractMappingsFromEntity(entity);
                    }
                }

                return { fieldMappings: mappings };
            });
        });
    }

    private extractMappingsFromEntity(entity: Element): FieldMapping[] {
        let entityProperties = entity.getElementsByTagName("Property");
        let fieldMappings: FieldMapping[] = [];

        //Loop through the nodelist (Not an array)
        for (let i = 0; i < entityProperties.length; i++) {
            let property = entityProperties.item(i);
            let fieldQueryingName = property.getAttribute("Name");

            //By default, the reference name is the same as the name
            let fieldreferenceName = fieldQueryingName;

            let annotations = property.getElementsByTagName("Annotation");
            let fieldReferenceName = this.extractRefName(annotations);
            fieldMappings.push({
                queryableName: fieldQueryingName,
                referenceName: fieldReferenceName ? fieldReferenceName : fieldQueryingName
            });
        }
        return fieldMappings;
    }

    private extractRefName(annotations: NodeListOf<Element>) {
        let refName = "Ref.ReferenceName";
        for (let i = 0; i < annotations.length; i++) {
            let annotation = annotations.item(i);
            let term = annotation.getAttribute("Term");
            let value = annotation.getAttribute("String");
            if (term == "Ref.ReferenceName" && value) {
                return value;
            }
        }
        return null;
    }
}