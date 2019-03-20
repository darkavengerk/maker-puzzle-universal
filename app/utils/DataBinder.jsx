export class DataBinder {
  constructor(name='root', data, parent) {
    this.name = name;
    this.type = 'NODE';
    this.data = data;
    this.parent = parent;
    this.children = {};
    this.listeners = {};
  }

  listen(key, fn) {
    this.listeners[key] = fn;
  }

  child(name, key) {
    if(!key) key = name;
    if(!this.children[name]) {
      this.children[name] = new DataBinder(name, this.data[key], this);
    }
    return this.children[name];
  }

  getData() {
    for(const key in this.children) {
      const child = this.children[key];
      if(child.isModified()) {
        this.data[key] = child.getData();
      }
    }
    return this.data;
  }

  isModified() {
    for(const key in this.children) {
      if(this.children[key].isModified()) return true;
    }
    return false;
  }

  attach(name, key) {
    if(!key) key = name;
    if(!this.children[name] || !this.children[name].type !== 'LEAF') {
      this.children[name] = new Leaf(name, this.data[key], this);
    }
    return this.children[name];
  }

  update(node) {
    if(this.listeners[node.name]) {
      this.listeners[node.name](this.getData());
    }
    if(this.parent) this.parent.update(this);
  }

  flush() {
    for(const child in this.children) {
      this.children[child].flush();
    }
  }
}

class Leaf {
  constructor(name, data, parent) {
    this.name = name;
    this.type = 'LEAF';
    this.data = data;
    this.parent = parent;
    this.modified = false;
  }

  getData() {
    return this.data;
  }

  setData(data) {
    if(this.data !== data) {
      this.data = data;
      this.modified = true;
      this.parent.update(this);
    }
  }

  isModified() {
    return this.modified;
  }

  flush() {
    this.modified = false;
  }
}