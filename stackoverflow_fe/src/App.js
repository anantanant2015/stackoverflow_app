import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { fetchQuestions } from './api';
import { CircularProgress } from '@mui/material';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Sidebar from './components/common/Sidebar';
import QuestionList from './components/pages/question_list/QuestionList';
import QuestionDetail from './components/pages/question_detail/QuestionDetail';
import Users from './components/pages/users/Users';
import './assets/styles.css';
import { styles } from './components/styles/styles';
import Collectives from './components/pages/collectives/Collectives';
import Home from './components/pages/home/Home';
import Layout from './components/common/layout/Layout';
import CollectivesCard from './components/pages/collectives/CollectivesCard';
import SidebarWidgetCard from './components/pages/collectives/SidebarWidgetCard';

// Consolidated JavaScript for Theme & Page Size Settings

// Theme Variables
const theme = {
  primaryColor: getComputedStyle(document.documentElement).getPropertyValue('--primary-color') || '#3498db',
  secondaryColor: getComputedStyle(document.documentElement).getPropertyValue('--secondary-color') || '#2ecc71',
  backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--background-color') || '#ffffff',
  textColor: getComputedStyle(document.documentElement).getPropertyValue('--text-color') || '#333333'
};

// Page Size Variables
const pageSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

// Apply Theme
function applyTheme() {
  document.body.style.backgroundColor = theme.backgroundColor;
  document.body.style.color = theme.textColor;
}

// Resize Listener
window.addEventListener('resize', () => {
  pageSize.width = window.innerWidth;
  pageSize.height = window.innerHeight;
  console.log('Page resized:', pageSize);
});

// Initialize
applyTheme();
console.log('Theme and Page Size Settings Loaded:', { theme, pageSize });


const App = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuestions = async () => {
      const data = await fetchQuestions({ order: 'desc', filter: 'withbody' });
      setQuestions(data);
      setLoading(false);
    };
    loadQuestions();
  }, []);

  const collectivesData = localStorage.getItem('collectives');

  const collectives = collectivesData ? JSON.parse(collectivesData).data : [];

  return (
    <Router>
      <>
        <Layout
          appBarContent={<Header sx={styles.headerContent} />}
          leftSidebarContent={<Sidebar />}
          mainContent={<Routes>
            <Route path="/" element={loading ? <CircularProgress /> :
              <>
                <QuestionList questions={questions}  />
                {/* <Pagination /> */}
              </>} />
            <Route path="/question/:id" element={<QuestionDetail  />} />
            <Route path="/users" element={<Users />} />
            <Route path="/collectives" element={<Collectives />} />
            <Route path="/home" element={<Home />} />
          </Routes>}
          rightSidebarContent={<><SidebarWidgetCard /><CollectivesCard collectives={collectives.slice(0,3)}/></>}
          footerContent={<Footer />}
        />
      </>
    </Router >
  );
};

export default App;
