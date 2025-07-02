import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import ExamList from './pages/ExamList'
import ExamDetail from './pages/ExamDetail'
import CreateExam from './pages/CreateExam'
import ApplicantList from './pages/ApplicantList'
import CreateApplicant from './pages/CreateApplicant'
import ExamSessions from './pages/ExamSessions'
import Reports from './pages/Reports'
import SystemInfo from './pages/SystemInfo'
import Home from './pages/Home'
import Login from './pages/Login'
import { useAuth } from '@clerk/clerk-react';

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isSignedIn } = useAuth();
  return isSignedIn ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="*"
        element={
          <Layout>
            <Routes>
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/exams" element={<PrivateRoute><ExamList /></PrivateRoute>} />
              <Route path="/exams/create" element={<PrivateRoute><CreateExam /></PrivateRoute>} />
              <Route path="/exams/:id" element={<PrivateRoute><ExamDetail /></PrivateRoute>} />
              <Route path="/applicants" element={<PrivateRoute><ApplicantList /></PrivateRoute>} />
              <Route path="/applicants/create" element={<PrivateRoute><CreateApplicant /></PrivateRoute>} />
              <Route path="/sessions" element={<PrivateRoute><ExamSessions /></PrivateRoute>} />
              <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
              <Route path="/system" element={<PrivateRoute><SystemInfo /></PrivateRoute>} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  )
}

export default App