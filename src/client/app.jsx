import React, { useState, useEffect, useMemo } from 'react';
import { OnSiteWorkRequestService } from './services/OnSiteWorkRequestService.js';
import RequestList from './components/RequestList.jsx';
import RequestForm from './components/RequestForm.jsx';
import RequestDetail from './components/RequestDetail.jsx';
import Dashboard from './components/Dashboard.jsx';
import './app.css';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [viewParams, setViewParams] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});
  
  const service = useMemo(() => new OnSiteWorkRequestService(), []);

  // ハッシュベースルーティング
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'dashboard';
      const [view, ...params] = hash.split('/');
      setCurrentView(view);
      setViewParams(params.join('/'));
    };
    
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // データ読み込み
  const loadRequests = async (newFilters = filters) => {
    setLoading(true);
    try {
      const data = await service.list(newFilters);
      setRequests(data);
    } catch (error) {
      console.error('Failed to load requests:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentView === 'requests' || currentView === 'dashboard') {
      loadRequests();
    }
  }, [currentView, service]);

  const navigate = (view, params) => {
    window.location.hash = params ? `${view}/${params}` : view;
  };

  const onRequestCreated = () => {
    loadRequests();
    navigate('requests');
  };

  const onRequestUpdated = () => {
    loadRequests();
  };

  const renderNavigation = () => (
    <nav className="workspace-nav">
      <div className="nav-brand">
        <h1>ホテル設備リクエスト管理</h1>
      </div>
      <div className="nav-links">
        <button 
          className={currentView === 'dashboard' ? 'nav-link active' : 'nav-link'}
          onClick={() => navigate('dashboard')}
        >
          ダッシュボード
        </button>
        <button 
          className={currentView === 'requests' ? 'nav-link active' : 'nav-link'}
          onClick={() => navigate('requests')}
        >
          リクエスト一覧
        </button>
        <button 
          className={currentView === 'create' ? 'nav-link active' : 'nav-link'}
          onClick={() => navigate('create')}
        >
          新規作成
        </button>
      </div>
    </nav>
  );

  const renderView = () => {
    switch(currentView) {
      case 'requests':
        return (
          <RequestList 
            requests={requests}
            loading={loading}
            onSelectRequest={(id) => navigate('request', id)}
            onRefresh={loadRequests}
            filters={filters}
            onFiltersChange={setFilters}
          />
        );
      case 'create':
        return (
          <RequestForm 
            service={service}
            onSubmit={onRequestCreated}
            onCancel={() => navigate('requests')}
          />
        );
      case 'request':
        return (
          <RequestDetail 
            requestId={viewParams}
            service={service}
            onBack={() => navigate('requests')}
            onUpdate={onRequestUpdated}
          />
        );
      default:
        return (
          <Dashboard 
            requests={requests}
            onNavigateToRequests={() => navigate('requests')}
            onNavigateToCreate={() => navigate('create')}
          />
        );
    }
  };

  return (
    <div className="workspace-app">
      {renderNavigation()}
      <main className="workspace-content">
        {renderView()}
      </main>
    </div>
  );
}