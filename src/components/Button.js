import React from 'react';

const Action = props => {
  return (
    <button onClick={props.handleClick} className="big-button z-depth-3">
      {props.title}
    </button>
  );
};

export default Action;
