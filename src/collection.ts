export class Collection<T> {

  private items: T[] = [];

  getAll() {
    return this.items;
  }

  getByNumber(index: number) {
    return this.items[index];
  }

  clearCollection() {
    this.items = [];
  }

  remove(index: number) {
    return this.items.slice(index, 1);
  }

  replace(index: number, newСomponent: T) {
    return  this.items[index] = newСomponent;
  }

}
