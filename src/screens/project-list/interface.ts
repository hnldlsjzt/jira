export interface Users {
    id: number;
    name: string;
    email: string;
    title: string;
    organization: string;
    token: string;
}

export interface List {
    id: number | string;
    name: string;
    personId: number;
    organization: string;
    created: number;
}

export interface Param {
    name: string;
    personId: string;
}
