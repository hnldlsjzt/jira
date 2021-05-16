


export interface Users {
    id: string | number,
    name: string
}

export interface List {
    id: number | string,
    name: string,
    personId: number,
    organization: string,
    created: number
}

export interface Param {
    name: string,
    personId: string
}