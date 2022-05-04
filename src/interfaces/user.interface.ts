export interface UserI {
  readonly id: number;
  readonly userName: string;
  readonly password?: string;
  readonly name: string;
  readonly phone: string;
  readonly role: number;
  readonly status: number;
}
