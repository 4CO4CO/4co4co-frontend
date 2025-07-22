import { lazy } from 'react';

export const MainPage = lazy(() => import('@/pages/main/Main'));
export const UploadPage = lazy(() => import('@/pages/upload/Upload'));
export const EntryPage = lazy(() => import('@/pages/entry/Entry'));
export const LoadingPage = lazy(() => import('@/pages/loading/Loading'));
export const LanternPage = lazy(() => import('@/pages/lantern/Lantern'));
export const LanternDetailPage = lazy(() => import('@/pages/lanternDetail/LanternDetail'));
