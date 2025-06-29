import { lazy } from 'react';

export const MainPage = lazy(() => import('@/pages/main/Main'));
export const FormPage = lazy(() => import('@/pages/form/Form'));
export const EntryPage = lazy(() => import('@/pages/entry/Entry'));
export const LanternPage = lazy(() => import('@/pages/lantern/Lantern'));
export const LanternDetailPage = lazy(() => import('@/pages/lantern/LanternDetail'));
