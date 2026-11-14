import React from 'react';
import { LoginPage } from './pages';
import { RegistrationPage } from './pages/registration';
import { Route, Routes } from 'react-router-dom';
import {RoutesPaths} from './constants/commonConstants';
import { CoursesPage } from './pages/course';
import './styles/globalStyles.scss'

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path={RoutesPaths.Login} element={<LoginPage />} />
      <Route path={RoutesPaths.Registration} element={<RegistrationPage />} />
      <Route path={RoutesPaths.Courses} element={<CoursesPage />} />
      <Route path={'*'} element={<LoginPage />} />
    </Routes>
  );
};
