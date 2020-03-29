export interface CounterState {
    actionTime: number,
    count: number,
    countPowered: number,
    rootRandom: number,
}

export interface NestedState {
    nestedCount: number,
    nestedRandom: number,
}

export interface ActionSet {
    [key: string]: any
}

export interface MutationSet {
    [key: string]: any
}

export interface GetterSet {
    [key: string]: any
}
