export abstract class SubWithCount {
  private _subs = 0
  private _unsubscribe: VoidFunction | undefined

  protected abstract subscribeImpl(): VoidFunction

  private doUnsubscribe = (): void => {
    this._subs = Math.max(0, this._subs - 1)

    if (!this._subs) {
      this._unsubscribe?.()
      this._unsubscribe = void 0
    }
  }

  doSubscribe = (): VoidFunction => {
    if (!this._subs) {
      this._unsubscribe = this.subscribeImpl()
    }

    this._subs += 1
    return this.doUnsubscribe
  }
}
