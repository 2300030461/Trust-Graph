import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Award,
  Bell,
  Bot,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Cpu,
  FileSearch,
  GitBranch,
  Globe2,
  HelpCircle,
  KeyRound,
  Layers3,
  LayoutDashboard,
  Lock,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  Network,
  Play,
  Radar,
  Search,
  Shield,
  ShieldAlert,
  Sparkles,
  User,
  Users,
  X,
  Zap,
} from 'lucide-react';

import { mockCases, mockTransactions } from './data/mockData';
import { CaseItem, Transaction, UserRole, View } from './types';

import { LandingPage } from './components/landing/LandingPage';
import { LoginPage } from './components/auth/LoginPage';
import { OverviewView } from './components/views/OverviewView';
import { TrustGraphView } from './components/views/TrustGraphView';
import { TransactionsView } from './components/views/TransactionsView';
import { CasesView } from './components/views/CasesView';
import { MultiAgentView } from './components/views/MultiAgentView';
import { AppealsView } from './components/views/AppealsView';
import { NotificationView } from './components/views/NotificationView';
import { AnalyticsView } from './components/views/AnalyticsView';
import { HealthView } from './components/views/HealthView';

import { CopilotChat } from './components/common/CopilotChat';
import { DemoModeController } from './components/common/DemoModeController';
import { PrintReportModal } from './components/common/PrintReportModal';

export function App() {
  const [currentView, setCurrentView] = useState<View>('Landing');
  const [selectedNode, setSelectedNode] = useState<string>('node-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Authentication state
  const [userRole, setUserRole] = useState<UserRole>('Admin');
  const [userName, setUserName] = useState<string>('Arjun Kapoor');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Copilot Assistant state
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);

  // Demo Presentation Mode state
  const [isDemoModeActive, setIsDemoModeActive] = useState(false);

  // Print / Report Modal state
  const [reportModalData, setReportModalData] = useState<CaseItem | Transaction | null>(null);

  const navItems: { view: View; label: string; icon: React.ReactNode; badge?: string }[] = [
    { view: 'Landing', label: '3D Perimeter Home', icon: <Globe2 size={18} /> },
    { view: 'Overview', label: 'SOC Command Center', icon: <LayoutDashboard size={18} /> },
    { view: 'Trust Graph', label: 'Trust Graph Explorer', icon: <Network size={18} />, badge: '12 Rings' },
    { view: 'Transactions', label: 'Transaction Telemetry', icon: <Activity size={18} /> },
    { view: 'Cases', label: 'Case Command Center', icon: <FileSearch size={18} />, badge: '4 New' },
    { view: 'Multi-Agent', label: 'AI Agent Pipeline', icon: <Cpu size={18} />, badge: '16 Active' },
    { view: 'Appeals', label: 'Appeals Operations', icon: <Clock3 size={18} />, badge: '3 SLA' },
    { view: 'Notifications', label: 'Notification Gateway', icon: <Bell size={18} /> },
    { view: 'Analytics', label: 'Analytics & Patterns', icon: <GitBranch size={18} /> },
    { view: 'Health', label: 'System Telemetry', icon: <Zap size={18} /> },
  ];

  const handleLoginSuccess = (role: UserRole, name: string) => {
    setUserRole(role);
    setUserName(name);
    setIsLoggedIn(true);
    setShowLoginModal(false);
    if (currentView === 'Landing') {
      setCurrentView('Overview');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('Fraud Analyst');
    setUserName('Guest User');
    setCurrentView('Landing');
  };

  return (
    <div className="app-shell">
      {/* Top Demo Mode Controller Banner */}
      <DemoModeController
        isActive={isDemoModeActive}
        onEndDemo={() => setIsDemoModeActive(false)}
        onNavigateView={(v) => setCurrentView(v)}
      />

      {/* Main App Layout */}
      <div className="app-main-layout">
        {/* Left Sidebar Navigation (Hidden on Landing Page unless navigated) */}
        {currentView !== 'Landing' && (
          <aside className={`sidebar ${isSidebarOpen ? 'open' : 'collapsed'}`}>
            <div className="sidebar-brand">
              <div className="brand-icon">
                <Radar size={22} strokeWidth={2.5} />
              </div>
              <div className="brand-text">
                <span className="brand-name">STEELSHIELD AI</span>
                <span className="brand-sub">TRUST GRAPH PLATFORM</span>
              </div>
            </div>

            <div className="sidebar-role-card">
              <div className="role-avatar">{userName.charAt(0)}</div>
              <div className="role-info">
                <strong>{userName}</strong>
                <span className="role-badge">{userRole}</span>
              </div>
            </div>

            <nav className="sidebar-nav">
              <div className="nav-section-label">COMMAND & NAVIGATION</div>
              {navItems.map((item) => (
                <button
                  key={item.view}
                  className={`nav-link ${currentView === item.view ? 'active' : ''}`}
                  onClick={() => setCurrentView(item.view)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                  {item.badge && <span className="nav-badge">{item.badge}</span>}
                </button>
              ))}
            </nav>

            <div className="sidebar-footer">
              <button
                className="button button-primary demo-mode-sidebar-btn"
                onClick={() => {
                  setIsDemoModeActive(true);
                  setCurrentView('Landing');
                }}
              >
                <Play size={14} fill="currentColor" />
                <span>Judge Demo Mode (5-8 min)</span>
              </button>

              <button className="nav-link logout-link" onClick={handleLogout}>
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          </aside>
        )}

        {/* Right Content View Area */}
        <div className="content-shell">
          {/* Global Header Bar */}
          <header className="top-header">
            <div className="header-left">
              {currentView !== 'Landing' && (
                <button className="icon-button" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                  <Menu size={18} />
                </button>
              )}

              {currentView === 'Landing' && (
                <div className="header-brand-landing" onClick={() => setCurrentView('Landing')}>
                  <Radar size={22} className="text-red-500" />
                  <strong>STEELSHIELD AI</strong>
                </div>
              )}

              <div className="global-search-bar">
                <Search size={15} />
                <input
                  type="text"
                  placeholder="Search entities, IPs, transactions, case IDs (Press ⌘K)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="header-right">
              {/* Demo Mode Button */}
              <button
                className="button button-ghost header-demo-btn"
                onClick={() => {
                  setIsDemoModeActive(true);
                  setCurrentView('Landing');
                }}
              >
                <Play size={14} fill="currentColor" />
                <span>Run Demo Mode</span>
              </button>

              {/* AI Copilot Toggle Button */}
              <button
                className={`button copilot-header-btn ${isCopilotOpen ? 'active' : ''}`}
                onClick={() => setIsCopilotOpen(!isCopilotOpen)}
              >
                <Sparkles size={15} />
                <span>AI Copilot</span>
              </button>

              {/* System Notification Bell */}
              <button className="icon-button relative" onClick={() => setCurrentView('Notifications')}>
                <Bell size={18} />
                <span className="dot-badge" />
              </button>

              {/* Login / Role Selector */}
              {isLoggedIn ? (
                <button className="user-profile-btn" onClick={() => setShowLoginModal(true)}>
                  <User size={16} />
                  <span>{userName}</span>
                  <ChevronDown size={14} />
                </button>
              ) : (
                <button className="button button-primary" onClick={() => setShowLoginModal(true)}>
                  Sign In
                </button>
              )}
            </div>
          </header>

          {/* Dynamic View Router */}
          <main className="view-body">
            {currentView === 'Landing' && (
              <LandingPage
                onEnterApp={() => setCurrentView('Overview')}
                onLaunchDemo={() => {
                  setIsDemoModeActive(true);
                  setCurrentView('Landing');
                }}
                onNavigateView={(v) => setCurrentView(v)}
              />
            )}

            {currentView === 'Overview' && (
              <OverviewView
                onNavigate={(v) => setCurrentView(v)}
                onSelectNode={(id) => {
                  setSelectedNode(id);
                  setCurrentView('Trust Graph');
                }}
                selectedNode={selectedNode}
              />
            )}

            {currentView === 'Trust Graph' && (
              <TrustGraphView
                selectedNode={selectedNode}
                onSelectNode={(id) => setSelectedNode(id)}
              />
            )}

            {currentView === 'Transactions' && (
              <TransactionsView
                transactions={mockTransactions}
                query={searchQuery}
                setQuery={setSearchQuery}
                onNavigateToGraph={() => setCurrentView('Trust Graph')}
                onOpenReportModal={(tx) => setReportModalData(tx)}
              />
            )}

            {currentView === 'Cases' && (
              <CasesView
                onNavigate={(v) => setCurrentView(v)}
                onOpenReportModal={(c) => setReportModalData(c)}
              />
            )}

            {currentView === 'Multi-Agent' && <MultiAgentView />}

            {currentView === 'Appeals' && <AppealsView />}

            {currentView === 'Notifications' && <NotificationView />}

            {currentView === 'Analytics' && <AnalyticsView />}

            {currentView === 'Health' && <HealthView />}
          </main>
        </div>
      </div>

      {/* Slide-out AI Copilot Drawer */}
      <CopilotChat
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        onNavigateView={(v) => setCurrentView(v)}
      />

      {/* Enterprise Authentication Modal */}
      {showLoginModal && (
        <LoginPage
          onLogin={handleLoginSuccess}
          onCancel={() => setShowLoginModal(false)}
        />
      )}

      {/* Printable Case/Transaction Report Modal */}
      {reportModalData && (
        <PrintReportModal
          isOpen={Boolean(reportModalData)}
          onClose={() => setReportModalData(null)}
          data={reportModalData}
        />
      )}
    </div>
  );
}

export default App;
