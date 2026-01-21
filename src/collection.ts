export class Collection<T> {

  constructor(private items: T[] = []) {}


  getAll(): T[] {
    return this.items;
  }

  getByNumber(index: number): T | undefined {
    return this.items[index];
  }

  clearCollection(): void{
    this.items = [];
  }

  remove(index: number): T | undefined {
    return this.items.splice(index, 1)[0];
  }

  replace(index: number, newСomponent: T): void {
   this.items[index] = newСomponent;
  }

}
