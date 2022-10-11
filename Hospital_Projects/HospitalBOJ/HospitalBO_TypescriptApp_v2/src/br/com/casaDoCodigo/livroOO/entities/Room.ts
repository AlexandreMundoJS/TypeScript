import { IRoom } from "../interfaces/entities/IRoom";

export class Room implements IRoom{
  private name!: string;

  public Room() {}

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }
  
}
