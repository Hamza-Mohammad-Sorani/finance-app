import { useState, useContext, createContext, type ReactNode } from 'react';

// ----------------------------------------------------------------------

type ViewType = 'website' | 'dashboard';

interface ViewContextType {
  currentView: ViewType;
  toggleView: VoidFunction;
  setView: (view: ViewType) => void;
}

// ----------------------------------------------------------------------

const ViewContext = createContext<ViewContextType | undefined>(undefined);

// ----------------------------------------------------------------------

export function ViewProvider({ children }: { children: ReactNode }) {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  const toggleView = () => {
    setCurrentView(currentView === 'website' ? 'dashboard' : 'website');
  };

  const setView = (view: ViewType) => {
    setCurrentView(view);
  };

  return (
    <ViewContext.Provider
      value={{
        currentView,
        toggleView,
        setView,
      }}
    >
      {children}
    </ViewContext.Provider>
  );
}

// ----------------------------------------------------------------------

export function useView() {
  const context = useContext(ViewContext);
  if (context === undefined) {
    throw new Error('useView must be used within a ViewProvider');
  }
  return context;
}
