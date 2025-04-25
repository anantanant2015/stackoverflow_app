import React, { useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { fetchQuestions, searchQuestions } from "./api";
import { CircularProgress } from "@mui/material";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Sidebar from "./components/common/Sidebar";
import QuestionList from "./components/pages/question_list/QuestionList";
import "./assets/styles.css";
import { styles } from "./components/styles/styles";
import Layout from "./components/common/layout/Layout";
import CollectivesCard from "./components/pages/collectives/CollectivesCard";
import SidebarWidgetCard from "./components/pages/collectives/SidebarWidgetCard";
import { AuthProvider } from "./components/auth/AuthProvider";

const QuestionDetail = lazy(
  () => import("./components/pages/question_detail/QuestionDetail"),
);
const Users = lazy(() => import("./components/pages/users/Users"));
const Collectives = lazy(
  () => import("./components/pages/collectives/Collectives"),
);
const Home = lazy(() => import("./components/pages/home/Home"));
const AuthCallback = lazy(() => import("./components/pages/auth/AuthCallback"));

// Consolidated JavaScript for Theme & Page Size Settings

// Theme Variables
const theme = {
  primaryColor:
    getComputedStyle(document.documentElement).getPropertyValue(
      "--primary-color",
    ) || "#3498db",
  secondaryColor:
    getComputedStyle(document.documentElement).getPropertyValue(
      "--secondary-color",
    ) || "#2ecc71",
  backgroundColor:
    getComputedStyle(document.documentElement).getPropertyValue(
      "--background-color",
    ) || "#ffffff",
  textColor:
    getComputedStyle(document.documentElement).getPropertyValue(
      "--text-color",
    ) || "#333333",
};

// Page Size Variables
const pageSize = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Apply Theme
function applyTheme() {
  document.body.style.backgroundColor = theme.backgroundColor;
  document.body.style.color = theme.textColor;
}

// Initialize
applyTheme();
console.log("Theme and Page Size Settings Loaded:", { theme, pageSize });

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuestions = async () => {
      const data = await fetchQuestions({ order: "desc", filter: "withbody" });
      setQuestions(data);
      setLoading(false);
    };
    loadQuestions();
  }, []);

  useEffect(() => {
    // Apply Theme
    document.body.style.backgroundColor = theme.backgroundColor;
    document.body.style.color = theme.textColor;

    const handleResize = () => {
      console.log("Page resized:", {
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    console.log("Theme and Page Size Settings Loaded:", {
      theme,
      width: window.innerWidth,
      height: window.innerHeight,
    });

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearch = async (params) => {
    setLoading(true);
    try {
      const results = await searchQuestions(params);
      setQuestions(results || []);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const collectives = React.useMemo(() => {
    try {
      const raw = localStorage.getItem("collectives");
      return raw ? JSON.parse(raw).data || [] : [];
    } catch (e) {
      console.error("Failed to parse collectives from localStorage:", e);
      return [];
    }
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<CircularProgress />}>
          <Layout
            appBarContent={
              <Header sx={styles.headerContent} onSearch={handleSearch} />
            }
            leftSidebarContent={<Sidebar />}
            mainContent={
              <Routes>
                <Route
                  path="/"
                  element={
                    loading ? (
                      <CircularProgress />
                    ) : (
                      <>
                        <QuestionList questions={questions} />
                        {/* <Pagination /> */}
                      </>
                    )
                  }
                />
                <Route path="/question/:id" element={<QuestionDetail />} />
                <Route path="/users" element={<Users />} />
                <Route path="/collectives" element={<Collectives />} />
                <Route path="/home" element={<Home />} />
                <Route path="/callback" element={<AuthCallback />} />
                <Route path="*" element={<div>Page Not Found</div>} />
              </Routes>
            }
            rightSidebarContent={
              <>
                <SidebarWidgetCard />
                <CollectivesCard collectives={collectives.slice(0, 3)} />
              </>
            }
            footerContent={<Footer />}
          />
        </Suspense>
      </Router>
    </AuthProvider>
  );
};

export default App;
