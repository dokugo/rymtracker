class Lock {
  constructor() {
    this._locksStorage = {};
  }

  acquire(id) {
    // limit the amount of parallel running puppeteer tabs
    if (Object.keys(this._locksStorage).length > 10) return true;

    if (!this._locksStorage[id]) {
      this._locksStorage[id] = true;
      // console.log(`Lock acquired for ${id}`);
      return false;
    } else {
      // console.log(`Already locked for ${id}`);
      return true;
    }
  }

  release(id) {
    if (!this._locksStorage[id]) return;
    // console.log(`Lock released from ${id}`);
    delete this._locksStorage[id];
  }
}

module.exports = Lock;
