export class User {
  constructor(
    public avatar: string,
    public displayName: string,

    private _token: string,
  ) { }

  get token() {
    return this._token;
  }
}