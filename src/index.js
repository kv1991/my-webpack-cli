import './index.css';
import './index.less';

console.log('Hello');

// test babel module
new Promise((resolve, reject) => {
  resolve('Test babel loader');
}).then(res => {
  console.log(res);
});

[1, 2, 4].map(item => {
  console.log(item);
});

class Animal {
  constructor(name) {
    this.name = name || 'Tom';
  }
  getName() {
    return this.name;
  }
};

let dog = new Animal('Hash');
console.log('Dog\'s name: ', dog.getName());