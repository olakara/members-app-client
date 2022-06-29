export default class Observable {
  _value = null;
  observers = [];
  parent = {};

  constructor(parent) {
    this.value = parent;
  }

  set value(newValue) {
    this._value = newValue;
  }

  get value() {
    return this._value;
  }

  subscribe = func => {
    this.observers.push(func);
    this.notify();
  };

  notify = () => {
    this.observers.forEach(observer => {
      observer(this._value);
    });
  };
}