const locksStorage = {};

const lock = {
  acquire(id) {
    // limit the amount of parallel running puppeteer tabs
    if (Object.keys(locksStorage).length > 10) {
      const isLocked = true;
      return isLocked;
    }

    if (!locksStorage[id]) {
      locksStorage[id] = true;
      // console.log(`Lock is acquired for ${id}`);
      const isLocked = false;
      return isLocked;
    } else {
      // console.log(`Lock is already acquired for ${id}`);
      const isLocked = true;
      return isLocked;
    }
  },

  release(id) {
    if (!locksStorage[id]) return;
    // console.log(`Lock is released from ${id}`);
    delete locksStorage[id];
  }
};

module.exports = lock;
