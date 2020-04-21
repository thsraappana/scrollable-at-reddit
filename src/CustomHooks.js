import React, { useEffect } from 'react';

const useMountEffect = (fun) => useEffect(fun, []);

export { useMountEffect }
