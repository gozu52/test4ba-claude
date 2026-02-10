import React, { useState } from 'react';
import { display, value } from '../utils/fields.js';
import './RequestList.css';

export default function RequestList({ requests, loading, onSelectRequest, onRefresh, filters, onFiltersChange }) {
  const [sortField, setSortField] = useState('sys_created_on');
  const [sortOrder, setSortOrder] = useState('desc');

  const handleFilterChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    if (!value) {
      delete newFilters[field];
    }
    onFiltersChange(newFilters);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedRequests = [...requests].sort((a, b) => {
    const aVal = display(a[sortField]);
    const bVal = display(b[sortField]);
    
    if (sortOrder === 'asc') {
      return aVal.localeCompare(bVal);
    }
    return bVal.localeCompare(aVal);
  });

  const getStateClass = (state) => {
    const stateValue = display(state).toLowerCase().replace(' ', '_');
    return `state-${stateValue}`;
  };

  const getPriorityClass = (priority) => {
    const priorityNum = display(priority).charAt(0);
    return `priority-${priorityNum}`;
  };

  return (
    <div className="request-list">
      <div className="list-header">
        <h2>オンサイト作業リクエスト一覧</h2>
        <button className="btn-refresh" onClick={onRefresh} disabled={loading}>
          {loading ? '読み込み中...' : '更新'}
        </button>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label htmlFor="stateFilter">状態:</label>
          <select 
            id="stateFilter"
            value={filters.state || ''}
            onChange={(e) => handleFilterChange('state', e.target.value)}
          >
            <option value="">すべて</option>
            <option value="draft">下書き</option>
            <option value="submitted">提出済み</option>
            <option value="pending_approval">承認待ち</option>
            <option value="in_progress">進行中</option>
            <option value="completed">完了</option>
            <option value="cancelled">キャンセル</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="locationFilter">場所タイプ:</label>
          <select 
            id="locationFilter"
            value={filters.location_type || ''}
            onChange={(e) => handleFilterChange('location_type', e.target.value)}
          >
            <option value="">すべて</option>
            <option value="room">部屋</option>
            <option value="conference">会議室</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading">読み込み中...</div>
      ) : (
        <div className="table-container">
          <table className="request-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('number')} className="sortable">
                  番号 {sortField === 'number' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('short_description')} className="sortable">
                  説明 {sortField === 'short_description' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('state')} className="sortable">
                  状態 {sortField === 'state' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('priority')} className="sortable">
                  優先度 {sortField === 'priority' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th>場所</th>
                <th>リクエスト者</th>
                <th onClick={() => handleSort('requested_on_site_date')} className="sortable">
                  希望日 {sortField === 'requested_on_site_date' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th>担当者</th>
              </tr>
            </thead>
            <tbody>
              {sortedRequests.map(request => (
                <tr 
                  key={value(request.sys_id)} 
                  className="request-row"
                  onClick={() => onSelectRequest(value(request.sys_id))}
                >
                  <td className="request-number">{display(request.number)}</td>
                  <td className="request-description">{display(request.short_description)}</td>
                  <td>
                    <span className={`state-badge ${getStateClass(request.state)}`}>
                      {display(request.state)}
                    </span>
                  </td>
                  <td>
                    <span className={`priority-badge ${getPriorityClass(request.priority)}`}>
                      {display(request.priority)}
                    </span>
                  </td>
                  <td>
                    <div className="location-info">
                      <div>{display(request.location_type)}</div>
                      {display(request.hotel_cube) && <small>キューブ: {display(request.hotel_cube)}</small>}
                      {display(request.conference_room) && <small>会議室: {display(request.conference_room)}</small>}
                    </div>
                  </td>
                  <td>{display(request.requester)}</td>
                  <td>{display(request.requested_on_site_date)}</td>
                  <td>{display(request.assigned_to)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {sortedRequests.length === 0 && (
            <div className="empty-results">
              <p>条件に一致するリクエストが見つかりません</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}