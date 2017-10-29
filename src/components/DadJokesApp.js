import React from 'react';
import Form from './Form';
import Header from './Header';

export default () => {
  return (
    <div>
      <Header title="dad jokes" subtitle="you supply the number, we supply the jokes"/>
      <div className="container">
        <div className="widget z-depth-2">
          <Form />
        </div>
      </div>
    </div>
  );
}