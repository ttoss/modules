export type Result = { id: string | number; value: string };

export type Results = Result[] | null;

export type OnSearch = (query: string) => void;

export type OnClickResult = (idValue: string | number) => void;
