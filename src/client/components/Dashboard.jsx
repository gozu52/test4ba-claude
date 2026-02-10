import React from 'react';
import { display } from '../utils/fields.js';
import './Dashboard.css';

export default function Dashboard({ requests, onNavigateToRequests, onNavigateToCreate }) {
  // 統計情報を計算
  const stats = {
    total: requests.length,
    draft: requests.filter(r => display(r.state) === 'Draft').length,
    submitted: requests.filter(r => display(r.state) === 'Submitted').length,
    in_progress: requests.filter(r => display(r.state) === 'In Progress').length,
    completed: requests.filter(r => display(r.state) === 'Completed').length
  };

  // 最近のリクエスト（上位5件）
  const recentRequests = requests.slice(0, 5);

  // 優先度別統計
  const priorityStats = {
    critical: requests.filter(r => display(r.priority) === '4 - Critical').length,
    high: requests.filter(r => display(r.priority) === '3 - High').length,
    medium: requests.filter(r => display(r.priority) === '2 - Medium').length,
    low: requests.filter(r => display(r.priority) === '1 - Low').length
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>ダッシュボード</h2>
        <button className="btn-primary" onClick={onNavigateToCreate}>
          新規リクエスト作成
        </button>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>総リクエスト数</h3>
          <div className="stat-number">{stats.total}</div>
        </div>
        <div className="stat-card">
          <h3>下書き</h3>
          <div className="stat-number">{stats.draft}</div>
        </div>
        <div className="stat-card">
          <h3>提出済み</h3>
          <div className="stat-number">{stats.submitted}</div>
        </div>
        <div className="stat-card">
          <h3>進行中</h3>
          <div className="stat-number">{stats.in_progress}</div>
        </div>
        <div className="stat-card">
          <h3>完了</h3>
          <div className="stat-number">{stats.completed}</div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <h3>最近のリクエスト</h3>
          {recentRequests.length > 0 ? (
            <div className="recent-requests">
              {recentRequests.map(request => (
                <div key={display(request.sys_id)} className="recent-request-card">
                  <div className="request-info">
                    <div className="request-number">{display(request.number)}</div>
                    <div className="request-description">{display(request.short_description)}</div>
                    <div className="request-meta">
                      <span className={`state-badge ${display(request.state).toLowerCase()}`}>
                        {display(request.state)}
                      </span>
                      <span className="request-date">{display(request.requested_on_site_date)}</span>
                    </div>
                  </div>
                </div>
              ))}
              <button className="view-all-btn" onClick={onNavigateToRequests}>
                すべてのリクエストを表示
              </button>
            </div>
          ) : (
            <div className="empty-state">
              <p>リクエストがありません</p>
              <button className="btn-primary" onClick={onNavigateToCreate}>
                最初のリクエストを作成
              </button>
            </div>
          )}
        </div>

        <div className="dashboard-section">
          <h3>優先度別統計</h3>
          <div className="priority-stats">
            <div className="priority-stat critical">
              <span className="priority-label">緊急</span>
              <span className="priority-count">{priorityStats.critical}</span>
            </div>
            <div className="priority-stat high">
              <span className="priority-label">高</span>
              <span className="priority-count">{priorityStats.high}</span>
            </div>
            <div className="priority-stat medium">
              <span className="priority-label">中</span>
              <span className="priority-count">{priorityStats.medium}</span>
            </div>
            <div className="priority-stat low">
              <span className="priority-label">低</span>
              <span className="priority-count">{priorityStats.low}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}