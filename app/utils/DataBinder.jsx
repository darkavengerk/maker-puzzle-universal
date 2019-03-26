
class DataBinderNode {
  constructor(name='root', data, parent) {
    this.name = name;
    this.data = data;
    this.parent = parent;
    this.modified = false;
    this.children = {};
    this.listeners = {};
    this.handler = new EventHandler(this);
  }

  listen(key, fn) {
    this.listeners[key] = fn;
  }

  access(name, key) {
    if(!key) key = name;
    if(!this.children[name]) {
      this.children[name] = new DataBinderNode(name, this.data[key], this);
    }
    return this.children[name];
  }

  map(fn=x=>x) {
    if(this.data.length > 0) {
      return this.data.map((item, i) => fn(this.access(i), i));
    }
    return [];
  }

  get(route) {
    if(route) {
      return this.access(route).get();
    }
    for(const key in this.children) {
      const child = this.children[key];
      if(child.isModified()) {
        this.data[key] = child.get();
      }
    }
    return this.data;
  }

  set(data) {
    if(this.data !== data) {
      this.data = data;
      this.modified = true;
      this.parent.update(this);
    }
  }

  push(data) {
    if(this.data.length !== undefined) {
      const raw = [...this.get(), data];
      this.set(raw);
    }
  }

  remove(name) {
    const updated = {};
    for(const c in this.children) {
      if(c !== name) {
        updated[c] = this.children[c];
      }
    }
    this.children = updated;
  }

  removeRow(index) {
    const raw = [...this.get()];
    index = index.name || index; // in case index is the node object itself
    raw.splice(index, 1);
    this.children= {}; // remove all children and render again. Can save them if performance is issue
    this.set(raw);
  }

  swapRows(index1, index2) {
    const raw = [...this.get()];
    if(index1 < 0 || index2 < 0 || index1 >= raw.length || index2 >= raw.length) return;
    raw[index1] = this.get()[index2];
    raw[index2] = this.get()[index1];
    this.children= {}; // remove all children and render again. Can save them if performance is issue
    this.set(raw);
  }

  isModified() {
    for(const key in this.children) {
      if(this.children[key].isModified()) return true;
    }
    return this.modified;
  }

  attach(accessType='normal') {
    return this.handler.get(accessType);
  }

  update(node) {
    if(this.listeners[node.name]) {
      this.listeners[node.name](this.get());
    }
    this.parent.update(this);
  }

  flush() {
    for(const child in this.children) {
      this.children[child].flush();
    }
    this.modified = false;
  }
}

export class DataBinder extends DataBinderNode {
  constructor(component, route='state') {
    super('root', component[route]);
    this.component = component;
    this.data = component[route];
    this.modified = false;
    this.children = {};
    this.listeners = {};
    this.handler = new EventHandler(this);
  }

  listen(key, fn) {
    if(!this.listeners[key]) this.listeners[key] = [];
    if(fn) {
      this.listeners[key].push(fn);      
    }
    else {
      this.listeners[key].push(this.defaultListener(key).bind(this));
    }
  }

  defaultListener(key) {
    return data => {
      this.component.setState({ [ key ] : data });
      this.flush();
    }
  }

  update(node) {
    if(this.listeners[node.name]) {
      this.listeners[node.name].map(fn => fn(this.get()));
    }
  }
}

class EventHandler {
  constructor(controler) {
    this.controler = controler;
    this.handlers = {};
  }

  get(accessType) {
    if(!this.handlers[accessType]) {
      this.handlers[accessType] = this[accessType].bind(this);
    }
    return this.handlers[accessType];
  }

  normal(event) {
    return this.controler.set(event.target.value);
  }

  direct(value) {
    return this.controler.set(value);
  }

  checkbox(event) {
    return this.controler.set(event.target.checked);
  }

  callback(err, data) {
    if(!err) {
      return this.controler.set(data);
    }
  }

  innerText(event) {
    return this.controler.set(event.target.innerText);
  }

  testInput(a, b) {
    console.log(a, b);
    // return this.controler.set(data);
  }
}