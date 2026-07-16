import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './layouts/AppShell';
import { AuthPage } from './pages/AuthPage';
import { HomeFeed } from './pages/HomeFeed';
import { SearchPage } from './pages/SearchPage';
import { ExplorePage } from './pages/ExplorePage';
import { ChatInterface } from './pages/ChatInterface';
import { NotificationsFeed } from './pages/NotificationsFeed';
import { UserProfile } from './pages/UserProfile';
import { SettingsDashboard } from './pages/SettingsDashboard';

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Standalone Authentication Landing Gateway Route */}
        <Route path="/" element={<AuthPage />} />

        {/* Core Application Flow Wrapped in our Responsive Shell Layout */}
        <Route 
          path="/*" 
          element={
            <AppShell>
              <Routes>
                <Route path="home" element={<HomeFeed />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="explore" element={<ExplorePage />} />
                <Route path="messages" element={<ChatInterface />} />
                <Route path="notifications" element={<NotificationsFeed />} />
                <Route path="profile/:userId" element={<UserProfile />} />
                <Route path="settings" element={<SettingsDashboard />} />
                <Route path="*" element={<Navigate to="/home" replace />} />
              </Routes>
            </AppShell>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;