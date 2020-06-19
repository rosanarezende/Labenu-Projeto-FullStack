import { BaseError } from "./BaseError/BaseError";

export class UnauthorizedError extends BaseError {
  constructor(message: string) {
    super(message, 401);
  }
} 