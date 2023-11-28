'use client';

import { useState, useEffect } from 'react';

// fix the Error: Hydration failed because the initial UI does not match what was rendered on the server.
export const useHandleHydrationError = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return [mounted];
};
