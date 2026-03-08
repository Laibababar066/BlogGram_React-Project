import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Sidebar from './Components/Sidebar';
import CreatePost from './Components/CreatePost';
import PostList from './Components/PostList';
import React, { useState } from 'react';
import PostListProvider from './store/Post-list-store';
import LoginPage from './Components/LoginPage';

function App() {
  const [selectedTab, setSelectedTab] = useState("Home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Function to handle login
  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setSelectedTab("Home");
  };

  // If not logged in, show only the login page
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // If logged in, show the full app
  return (
    <PostListProvider>
      <Header user={user} onLogout={handleLogout} />
      <div className="app">
        <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <div className="content">
          {selectedTab === "Home" ? (
            <PostList />
          ) : (
            <CreatePost />
          )}
          <Footer />
        </div>
      </div>
    </PostListProvider>
  );
}

export default App;