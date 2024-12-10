export type TNullable<T> = T | null | undefined;

export interface IApiResponseState<T> {
    loading: boolean;
    error: string | null;
    payload: T | null;
}

export const ApiResponseInitialState = {
    loading: false,
    error:null,
    payload: null
}