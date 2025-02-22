export class ApiError extends Error {
  constructor(
    public response: Pick<Response, 'status' | 'statusText'>,
    public json: Record<string, unknown> | null,
    public text: string | undefined,
  ) {
    super()
  }
}
