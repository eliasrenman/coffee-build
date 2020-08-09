export class User {
  constructor(
    public avatar: string,
    public displayName: string,

    private _token: string,
    private subscriptions?: [{
      device: string;
      id: number;
    }]
  ) { }

  get token() {
    return this._token;
  }
}