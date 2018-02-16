import React, {Component} from 'react';
import getDisplayName from './utils/getDisplayName';


/** `withClickHandler` is a High Order Component that binds a click handler
 * to the passed in Component. It allows onClickValues to be passed to the Component
 * that are accessible as params when the click handler is invoked. This aims to
 * reduce boilerplate and encourage writing more Stateless Functional Components in projects.
**/

const withClickHandler = WrappedComponent => {
  class ClickHandler extends Component {
    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
      this.props.onClick(e, this.props.onClickValues);
    }

    render() {
      // remove click specific props
      const childProps = Object.keys(this.props).reduce((acc, curr)=>{
        if(curr !== 'onClickValues' && curr !== 'onClick'){
            acc[curr] = this.props[curr];
        }
        return acc;
      },{});
      return (
        <WrappedComponent onClick={this.handleClick} {...childProps}>
          {this.props.children}
        </WrappedComponent>
      );
    }
  }

  ClickHandler.displayName = `ClickHandler(${getDisplayName(WrappedComponent)})`;

  return ClickHandler;
};

export default withClickHandler;
