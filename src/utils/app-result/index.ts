class AppResult<T> {
  private message: string;
  private data: T;
  private statusCode: number;

  constructor(message: string, data: T, statusCode: number) {
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
  }

  public isError() {
    return this.statusCode > 300;
  }

  public hasData() {
    return !!this.data;
  }

  public addMessage(newMessage: string) {
    this.message = newMessage;
  }

  public setData(data: T) {
    this.data = data;
  }

  public setMessages(message: string) {
    this.message = message;
  }

  public getStatusCode() {
    return this.statusCode;
  }

  public getData(): T {
    return this.data;
  }

  public getMessage() {
    return this.message;
  }
}

export default AppResult;
