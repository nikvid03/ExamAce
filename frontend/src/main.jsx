import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import FreeTrialForm from './components/freeTrial.jsx'
import DiscussionForums from './components/discussion.jsx'
import MentorshipProgram from './components/mentorship.jsx'
import AssessmentPlatform from './components/assesment.jsx'
import QuestionSolutions from './components/solutions.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
    
  </StrictMode>,
)
