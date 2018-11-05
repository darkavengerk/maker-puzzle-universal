import React from 'react';
import ReactDOM from 'react-dom';
import { FullPage, Slide } from 'react-full-page';
// import ReactFullpage from '@fullpage/react-fullpage/dist/react-fullpage-commonjs';

// console.log(ReactFullpage);

const Fullpage = ({ children }) => {
  if(typeof(window) === 'undefined') return null;
  return (<FullPage>
            {children.map((child, i) => <Slide key={i}>{child}</Slide>)}
          </FullPage>);
};

export default Fullpage;

