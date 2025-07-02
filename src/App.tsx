import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import ExamManagement from './pages/ExamManagement'
import ApplicantManagement from './pages/ApplicantManagement'
import ProcessingMonitor from './pages/ProcessingMonitor'
import Reports from './pages/Reports'
import SystemLogs from './pages/SystemLogs'

function App() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/exams" element={<ExamManagement />} />
          <Route path="/applicants" element={<ApplicantManagement />} />
          <Route path="/processing" element={<ProcessingMonitor />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/logs" element={<SystemLogs />} />
        </Routes>
      </Layout>
    </motion.div>
  )
}

export default App