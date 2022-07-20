
export class createTagDto{

    public name : string;

    public type : string;

    public key : string;

    public conditions : [{ condition: string; keywords: string | string[]; field: string; }];
    
    public isDynamic : boolean;

    public resource : string;

    public resourceId : string;

    public resourceType : string;

    public createdBy : string;

    public updatedBy : string;

    public isDeleted : boolean;

    public deletedAt : Date;

    public deletedBy : string;


}
