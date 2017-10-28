export class ParseUser{
  private _user: any;

  get user(): any{
    return this._user;
  }

  set user(user: any){
    this._user = user;
  }

  constructor(user: any){
    this._user = user;
  }

  get(key: string){
    return this._user.get(key);
  }

  fetch(){
    return new Promise((resolve: Function, reject: Function)=>{
      if(this._user){
        this._user.fetch().then((user: any)=>{
          resolve(new ParseUser(user));
        }).catch((err: any)=>{
          reject({
            error: err
          })
        })
      }else{
        reject({
          error: true,
          message: 'Parse User not found'
        })
      }
    })
  }

}

export class ParseObject{
  private _parseObj: any;

    get user(): any{
      return this._parseObj;
    }

    set user(user: any){
      this._parseObj = user;
    }

    constructor(user: any){
      this._parseObj = user;
    }

    get(key: string){
      return this._parseObj.get(key);
    }
}
