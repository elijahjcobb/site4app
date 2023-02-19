export class APIError {
  public readonly code: number;
  public readonly message: string;
  public readonly error?: any;

  public constructor(
    code: number,
    message = "Internal server error.",
    error?: any
  ) {
    this.code = code;
    this.message = message;
    this.error = error;
  }
}
