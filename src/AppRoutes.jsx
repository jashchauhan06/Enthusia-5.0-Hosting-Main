import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';

// Lazy load event pages
const SITNovatePage = lazy(() => import('./events/sitnovate'));
const CodeSprintPage = lazy(() => import('./events/codesprint'));
const StrangerTechPage = lazy(() => import('./events/strangertech'));
const SITankPage = lazy(() => import('./events/sitank'));
const BuildBrandPage = lazy(() => import('./events/buildbrand'));

// Loading fallback component
const LoadingFallback = () => (
    <div style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#050505',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: '1.2rem',
        fontFamily: 'var(--font-heading, sans-serif)'
    }}>
        Loading...
    </div>
);

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Main Enthusia page */}
                <Route path="/" element={<App />} />

                {/* SITNovate event page - lazy loaded */}
                <Route
                    path="/sitnovate"
                    element={
                        <Suspense fallback={<LoadingFallback />}>
                            <SITNovatePage />
                        </Suspense>
                    }
                />

                {/* CodeSprint event page - lazy loaded */}
                <Route
                    path="/codesprint"
                    element={
                        <Suspense fallback={<LoadingFallback />}>
                            <CodeSprintPage />
                        </Suspense>
                    }
                />

                {/* Stranger Tech event page - lazy loaded */}
                <Route
                    path="/strangertech"
                    element={
                        <Suspense fallback={<LoadingFallback />}>
                            <StrangerTechPage />
                        </Suspense>
                    }
                />

                {/* SITank event page - lazy loaded */}
                <Route
                    path="/sitank"
                    element={
                        <Suspense fallback={<LoadingFallback />}>
                            <SITankPage />
                        </Suspense>
                    }
                />

                {/* BuildBrand event page - lazy loaded */}
                <Route
                    path="/buildbrand"
                    element={
                        <Suspense fallback={<LoadingFallback />}>
                            <BuildBrandPage />
                        </Suspense>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;

