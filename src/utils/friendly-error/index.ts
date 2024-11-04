export class FriendlyError extends Error {
  readonly originalError?: unknown;
  readonly context: string;

  constructor({
    message,
    originalError,
    context,
    log = true,
  }: {
    message: string;
    originalError?: unknown;
    context: string;
    log?: boolean;
  }) {
    super(message);
    this.originalError = originalError;
    this.context = context;
    this.name = "FriendlyError";

    if (log) this.log();
  }

  toString() {
    return `⛔ [${this.name} on ${this.context}]\nDisplayable message: ${this.message}\nOriginal message: ${this.originalError}`;
  }

  log() {
    console.log(this.toString());
  }
}
