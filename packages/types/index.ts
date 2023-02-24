export type NominalType<T extends string> = { __type: T };
export type u<T = string> = T & { __micro: true };
