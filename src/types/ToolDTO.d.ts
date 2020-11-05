/* eslint-disable camelcase */
export interface ToolDto {
    id?: number;
    title: string;
    description: string;
    link: string;
    tags: Array<string>;
    registered_by?: string;
}
