import type { CharGetResponse } from 'entities/char/char.types'
import type { FormStoreStructure } from 'shared/store-form'
import { charCacheService } from 'entities/char-cache'
import { routerConfig } from 'entities/router'
import { StoreForm } from 'shared/store-form'

export type CharForm = FormStoreStructure<CharGetResponse>

export class CharEditService extends StoreForm<CharGetResponse> {
  // url будет являться идентификатором сущности, тк API не предоставляет отдельное поле id
  readonly readonlyFields: Set<keyof CharGetResponse> = new Set(['url'])

  constructor(fields: CharGetResponse) {
    super(fields)
  }

  // all fields deps logic, validation, etc. goes here
  protected override subscribeImpl(): VoidFunction {
    return () => void 0
  }

  handleCancel = (): void => {
    this.reset()
  }

  handleSave = (): void => {
    const value = this.getValue()
    charCacheService.handleSave(value)
    void routerConfig.router.navigate('/chars')
  }
}
