import React, { PropsWithChildren } from 'react';
import { useView } from '@contexts/view.context';
import RouteLoading from '@components/common/route-loading/route-loading.component';

import WebsiteLayout from './components/website-layout.component';
import DashboardLayout from './components/dashboard-layout.component';

// ----------------------------------------------------------------------

function RootLayoutContent({ children }: PropsWithChildren) {
  const { currentView } = useView();

  return (
    <>
      <RouteLoading />
      {currentView === 'website' ? (
        <WebsiteLayout>{children}</WebsiteLayout>
      ) : (
        <DashboardLayout>{children}</DashboardLayout>
      )}
    </>
  );
}

// ----------------------------------------------------------------------

export default RootLayoutContent;
