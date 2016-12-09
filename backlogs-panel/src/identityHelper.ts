import { IIdentity } from "./model";
import * as Identities from "VSS/Identities/Picker/RestClient";
import * as VssService from "VSS/Service";
import * as Q from "q";
 
 /**
 * IdentityHelper
 */
export class IdentityHelper {   
    public static parseIdentityName(displayName:string, uniqueName: string): IIdentity {
        var context = VSS.getWebContext();
        return {
          displayName: displayName,
          uniqueName: uniqueName,
          imageUrl: `${context.host.uri}/_api/_common/IdentityImage?id=&identifier=${encodeURIComponent(uniqueName)}&resolveAmbiguous=false&identifierType=0&size=0&__v=5`
        };
    }
    
    public static parseUniquefiedIdentityName(uniquefiedName: string): IIdentity {
        var context = VSS.getWebContext();
        var nameParts: string[] = uniquefiedName.split(/<|>/);
        return {
          displayName: nameParts[0].trim(),
          uniqueName: nameParts[1].trim(),
          imageUrl: `${context.host.uri}/_api/_common/IdentityImage?id=&identifier=${encodeURIComponent(nameParts[1])}&resolveAmbiguous=false&identifierType=0&size=0&__v=5`
        };
    }
    
    public static parseUniquefiedIdentityNames(uniquefiedNames: string[]): IIdentity[] {
        var identities: IIdentity[] = [];
        for(var name of uniquefiedNames){
            identities.push(IdentityHelper.parseUniquefiedIdentityName(name));
        }
        return identities;
    }
}