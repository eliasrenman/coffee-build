export class User {
  constructor(
    public avatar: string,
    public name: string,
    public eid: string,
    private _token: string,
    private _subscriptions?: Subscription[]
  ) { }

  get token() {
    return this._token;
  }

  set subscriptions(subscriptions: Subscription[]) {
    this._subscriptions = subscriptions;
  }

}

export interface Subscription {
  device: string;
  id: number;
}