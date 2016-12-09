export interface Note {

    title: string;
    userOnly: boolean;
    id?: string;
    __etag?: number;
}

export enum NoteStatus {
    None = 0,
    Created = 1,
    Completed = 2,
}