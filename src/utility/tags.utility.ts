export class utility{
    public static createKey(name:string){
        let key = name.split(" ").join("-") + "-" + Math.random().toString(36).slice(2)
        return key
    }
}