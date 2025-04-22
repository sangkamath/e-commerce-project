"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient());
    
    return (
        <QueryClientProvider client={queryClient}>
        {children}
        </QueryClientProvider>
    );
    };

export default ReactQueryProvider;
// This component wraps the application with the React Query Provider, allowing us to use React Query hooks throughout the app.
// It creates a new instance of QueryClient and provides it to the children components.
// The useState hook is used to ensure that the QueryClient instance is only created once, preventing unnecessary re-renders.
// The QueryClientProvider component is imported from the @tanstack/react-query library, which is a powerful data-fetching and state management library for React.