class CitizenAddress {
  public street!: string;
  public number!: number;
  public neighborhood!: string;

  public getNeighborhood(): string {
    return this.neighborhood;
  }

  public setNeighborhood(neighborhood: string): void {
    this.neighborhood = neighborhood;
  }

  // Other getters and setters
}
