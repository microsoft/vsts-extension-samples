/// <reference types="vss-web-extension-sdk" />

class SearchEngineMenuSource implements IContributedMenuSource {
    public execute(): void {
        // no-op
    }

    public getMenuItems(): IContributedMenuItem[] | IPromise<IContributedMenuItem[]> {
        return [
            {
                text: "Bing!",
                title: "Go to bing.com",
                id: "bing",
                groupId: "search-engines",
                href: "http://www.bing.com",
                noIcon: true
            },
            {
                text: "Google",
                title: "Go to google.com",
                id: "google",
                groupId: "search-engines",
                href: "http://www.google.com",
                noIcon: true
            }
        ];
    }
}

class DialogOpenerSource implements IContributedMenuSource {
    private menuContext: any;

    public execute(): void {
        this.openDialog();
    }

    public openDialog(): void {
        VSS.getService(VSS.ServiceIds.Dialog).then((dialogService: IHostDialogService) => {

            let dialogOptions = {
                title: "Sample Dialog",
                width: 400,
                height: 250,
                okText: "Yes",
                cancelText: "No",
                getDialogResult: () => {
                    return true;
                },
                okCallback: () => {
                    this.updateMenuItems();
                }
            };

            let contributionConfig = {};

            let extensionContext = VSS.getExtensionContext();
            let dialogId = `${extensionContext.publisherId}.${extensionContext.extensionId}.dialog-content`;

            dialogService.openDialog(dialogId, dialogOptions, contributionConfig).then((dialog: IExternalDialog) => {
                // Make yes button enabled any case
                dialog.updateOkButton(true);
            });
        });
    }

    public getMenuItems(context: any): IContributedMenuItem[] | IPromise<IContributedMenuItem[]> {
        this.menuContext = context;
        return [
            {
                id: "open-dialog",
                groupId: "dialog-samples",
                text: "Open dialog",
                title: "Open a dialog in the host window",
                icon: "css://bowtie-icon bowtie-briefcase"
            }
        ];
    }


    private updateMenuItems(): void {
        if (this.menuContext) {
            let items: IContributedMenuItem[] = [
                {
                    id: "open-dialog",
                    groupId: "dialog-samples",
                    text: "Dialog opened!",
                    icon: "css://bowtie-icon bowtie-approve",
                    disabled: true
                }
            ];

            this.menuContext.updateMenuItems(items);
        }
    }
}

export function init() {
    VSS.register("l2-search-engines", new SearchEngineMenuSource());
    VSS.register("l2-dialog-opener", new DialogOpenerSource());
}