`withClickHandler` is a High Order Component that binds a click handler
to the passed in Component. It allows onClickValues to be passed to the Component
that are accessible as params when the click handler is invoked. This aims to
reduce boilerplate and encourage writing more Stateless Functional Components in projects.


```
import React from 'react';
import ReactDOM from 'react-dom';
import withClickHandler from './withClickHandler';

// this must be assigned outside of render

const Child = withClickHandler('li');

// can also be a component:
// const ExampleComponent = props => <li onClick={props.onClick}><button>{props.children}</button></li>
// const Child = withClickHandler(ExampleComponent);

const Parent = props =>
  <ul>
    {props.values.map((item, index) =>
      <Child key={item} onClick={props.clicker} onClickValues={{ index, item }}>
        {item}
      </Child>
    )}
  </ul>;

const alertChild = (e, { item, index }) => alert(`${item} was clicked from index ${index}`);

const App = props =>
  <Parent values={['one fish', 'two fish', 'red fish', 'blue fish']} clicker={alertChild} />;

ReactDOM.render(<App />, document.querySelector('#react-entry'));
```
