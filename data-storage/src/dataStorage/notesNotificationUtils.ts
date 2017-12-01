import Locations = require("VSS/Locations");
import Service = require("VSS/Service");
import VSS_Common_Contracts = require("VSS/WebApi/Contracts");
import Notification_Rest_Client = require("Notifications/RestClient");
import Notes_Contracts = require("./notesContracts");

/**
 * Service instance type id for the Extension Management Service
 */
const ExtensionManagementServiceInstaceTypeId = "00000028-0000-8888-8000-000000000000";

export function publishEvent(note: Notes_Contracts.Note, action: string) {

    const notificationEvent = <VSS_Common_Contracts.VssNotificationEvent>{
        eventType: VSS.getExtensionContext().publisherId + "." + VSS.getExtensionContext().extensionId + "." + "note-event",
        actors: [
            {
                id: VSS.getWebContext().user.id,
                role: "initiator"
            },
            {
                id: VSS.getWebContext().team.id,
                role: "team"
            }
        ], 
        data: {
            note: note,
            action: action,
            user: VSS.getWebContext().user,
            team: VSS.getWebContext().team,
            links: {
                web: Locations.urlHelper.getMvcUrl({ 
                        controller: "apps",
                        action: "hub",
                        parameters: [ VSS.getContribution().id ] })
            }
        },
        artifactUris: [],
        scopes: <VSS_Common_Contracts.EventScope[]>[
            {
                id: VSS.getWebContext().collection.id,
                type: "collection"
            },
            {
                id: VSS.getWebContext().project.id,
                type: "project"
            }
        ]
    };

    const notificationsClient = Service.getClient(Notification_Rest_Client.NotificationHttpClient4, undefined, ExtensionManagementServiceInstaceTypeId);
    return notificationsClient.publishEvent(notificationEvent);
}