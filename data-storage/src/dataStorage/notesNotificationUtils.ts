import Locations = require("VSS/Locations");
import VSS_Common_Contracts = require("VSS/WebApi/Contracts");
import Notifications_Extensions = require("Notifications/Extensions");
import Notes_Contracts = require("./notesContracts");

export function publishEvent(note: Notes_Contracts.Note, action: string) {

    const notificationEvent: VSS_Common_Contracts.VssNotificationEvent = {
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

    Notifications_Extensions.publishEvent(notificationEvent);
}