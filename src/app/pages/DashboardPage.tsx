import React, { useEffect, useState } from 'react';

function DashboardPage() {
  const [state, setState] = useState<string>();

  useEffect(() => {
    setState('Dashboard');
  }, []);

  return (
    <div>{state}</div>
  );
}

export default DashboardPage;
