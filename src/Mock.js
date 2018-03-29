/* eslint-disable no-param-reassign */

class Mock {
  constructor() {
    this.instances = [];
  }

  addInstance(instance) {
    this.instances.push(instance);
  }

  clear() {
    this.instances = [];
  }
}

export default Mock;
