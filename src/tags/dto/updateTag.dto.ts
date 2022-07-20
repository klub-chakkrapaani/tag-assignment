export class UpdateTagDto{
    public name ?: string;

    public type ?: string;

    public conditions ?: [{ condition: string; keywords: string | string[]; field: string; }];

    public resource ?: string;

    public resourceType : string;

    public resourceId ?: string;

    public isDynamic ?: boolean;

    public updatedBy ?: string;
}