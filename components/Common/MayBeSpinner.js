import React from 'react';

const MayBeSpinner = ({ test, spinner, children }) => <>{test ? spinner : children}</>;

export default MayBeSpinner;
