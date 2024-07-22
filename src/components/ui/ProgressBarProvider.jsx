'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const ProgressBars = ({ children }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="3px"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default ProgressBars;