import { NextResponse } from "next/server"

import { API_ERROR_CODES } from "./api-errors"

export type APIErrorCode = (typeof API_ERROR_CODES)[number]

export type SuccessfulStatusCodes = 200 | 201 | 202
export type ClientStatusCodes = 400 | 401 | 403 | 404 | 409 | 429
export type ServerErrorResponses = 500
export type StatusCodes =
  | SuccessfulStatusCodes
  | ClientStatusCodes
  | ServerErrorResponses

export class APIError extends Error {
  public readonly code: APIErrorCode
  public readonly statusCode: StatusCodes
  public readonly message: string

  public constructor({
    code,
    statusCode,
    message,
  }: {
    code: APIErrorCode
    statusCode: StatusCodes
    message: string
  }) {
    super(message)
    this.code = code
    this.statusCode = statusCode
    this.message = message
  }

  public toString(): string {
    return `(${this.statusCode}) ${this.code}: ${this.message}`
  }

  public toJSON(): { code: APIErrorCode; message: string } {
    return {
      code: this.code,
      message: this.message,
    }
  }

  public toResponse(): NextResponse {
    return NextResponse.json(this.toJSON(), { status: this.statusCode })
  }
}
