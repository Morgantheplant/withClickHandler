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
