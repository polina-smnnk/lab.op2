class BiPriorityQueue {
  constructor() {
    this.data = [];
    this.counter = 0;
  }

  enqueue(value, priority) {
    this.data.push({
      value,
      priority,
      id: this.counter++
    });
  }

  peek(type) {
    const idx = this._selectIndex(type);
    return idx === -1 ? null : this.data[idx].value;
  }

  dequeue(type) {
    const idx = this._selectIndex(type);
    if (idx === -1) return null;

    const [removed] = this.data.splice(idx, 1);
    return removed.value;
  }

  _selectIndex(type) {
    if (this.data.length === 0) return -1;

    let resultIndex = 0;

    for (let i = 1; i < this.data.length; i++) {
      const a = this.data[i];
      const b = this.data[resultIndex];

      if (type === "highest") {
        if (
          a.priority > b.priority ||
          (a.priority === b.priority && a.id < b.id)
        ) {
          resultIndex = i;
        }
      } else if (type === "lowest") {
        if (
          a.priority < b.priority ||
          (a.priority === b.priority && a.id < b.id)
        ) {
          resultIndex = i;
        }
      } else {
        throw new Error('Use "highest" or "lowest"');
      }
    }

    return resultIndex;
  }
}