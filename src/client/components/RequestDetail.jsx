import React, { useState, useEffect } from 'react';
import { display, value } from '../utils/fields.js';
import './RequestDetail.css';

export default function RequestDetail({ requestId, service, onBack, onUpdate }) {
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    loadRequest();
  }, [requestId]);

  const loadRequest = async () => {
    if (!requestId) return;
    
    setLoading(true);
    try {
      const data = await service.getById(requestId);
      setRequest(data);
      setFormData({
        short_description: display(data.short_description),
        requested_on_site_date: display(data.requested_on_site_date),
        location_type: value(data.location_type),
        hotel_cube: value(data.hotel_cube),
        conference_room: value(data.conference_room),
        whiteboards: display(data.whiteboards) === 'true',
        projector: display(data.projector) === 'true',
        special_notes: display(data.special_notes),
        state: value(data.state),
        priority: value(data.priority),
        assigned_to: value(data.assigned_to),
        assignment_group: value(data.assignment_group),
        work_notes: display(data.work_notes)
      });
    } catch (err) {
      setError('リクエストの読み込みに失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await service.update(requestId, formData);
      await loadRequest();
      setEditing(false);
      onUpdate();
    } catch (err) {
      setError('更新に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleStateChange = async (newState) => {
    setLoading(true);
    try {
      const updateData = { state: newState };
      if (newState === 'completed') {
        updateData.closed_at = new Date().toISOString();
      }
      await service.update(requestId, updateData);
      await loadRequest();
      onUpdate();
    } catch (err) {
      setError('状態の更新に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !request) {
    return <div className="loading">読み込み中...</div>;
  }

  if (!request) {
    return <div className="error">リクエストが見つかりません</div>;
  }

  const getStateClass = (state) => {
    const stateValue = display(state).toLowerCase().replace(' ', '_');
    return `state-${stateValue}`;
  };

  const canEdit = ['draft', 'submitted'].includes(value(request.state));
  const canChangeState = !['completed', 'cancelled'].includes(value(request.state));

  return (
    <div className="request-detail">
      <div className="detail-header">
        <button className="btn-back" onClick={onBack}>← 戻る</button>
        <div className="header-info">
          <h2>{display(request.number)}</h2>
          <span className={`state-badge ${getStateClass(request.state)}`}>
            {display(request.state)}
          </span>
        </div>
        {canEdit && !editing && (
          <button className="btn-edit" onClick={() => setEditing(true)}>
            編集
          </button>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="detail-content">
        {editing ? (
          <div className="edit-form">
            <div className="form-section">
              <h3>基本情報</h3>
              
              <div className="form-group">
                <label>作業内容</label>
                <input
                  type="text"
                  name="short_description"
                  value={formData.short_description}
                  onChange={handleChange}
                  maxLength="160"
                />
              </div>

              <div className="form-group">
                <label>希望作業日</label>
                <input
                  type="date"
                  name="requested_on_site_date"
                  value={formData.requested_on_site_date}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>優先度</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="1">1 - 低</option>
                  <option value="2">2 - 中</option>
                  <option value="3">3 - 高</option>
                  <option value="4">4 - 緊急</option>
                </select>
              </div>
            </div>

            <div className="form-section">
              <h3>場所情報</h3>
              
              <div className="form-group">
                <label>場所タイプ</label>
                <select
                  name="location_type"
                  value={formData.location_type}
                  onChange={handleChange}
                >
                  <option value="room">部屋</option>
                  <option value="conference">会議室</option>
                </select>
              </div>

              {formData.location_type === 'room' && (
                <div className="form-group">
                  <label>ホテルキューブ</label>
                  <select
                    name="hotel_cube"
                    value={formData.hotel_cube}
                    onChange={handleChange}
                  >
                    <option value="">選択してください</option>
                    <option value="cube_a">キューブ A</option>
                    <option value="cube_b">キューブ B</option>
                    <option value="cube_c">キューブ C</option>
                  </select>
                </div>
              )}

              {formData.location_type === 'conference' && (
                <div className="form-group">
                  <label>会議室</label>
                  <select
                    name="conference_room"
                    value={formData.conference_room}
                    onChange={handleChange}
                  >
                    <option value="">選択してください</option>
                    <option value="boardroom_1">ボードルーム 1</option>
                    <option value="boardroom_2">ボードルーム 2</option>
                    <option value="meeting_room_a">ミーティングルーム A</option>
                    <option value="meeting_room_b">ミーティングルーム B</option>
                    <option value="conference_center">カンファレンスセンター</option>
                  </select>
                </div>
              )}
            </div>

            <div className="form-section">
              <h3>必要設備</h3>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="whiteboards"
                    checked={formData.whiteboards}
                    onChange={handleChange}
                  />
                  ホワイトボード
                </label>
                
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="projector"
                    checked={formData.projector}
                    onChange={handleChange}
                  />
                  プロジェクター
                </label>
              </div>
            </div>

            <div className="form-section">
              <div className="form-group">
                <label>特記事項</label>
                <textarea
                  name="special_notes"
                  value={formData.special_notes}
                  onChange={handleChange}
                  rows="4"
                />
              </div>
            </div>

            <div className="form-actions">
              <button className="btn-cancel" onClick={() => setEditing(false)}>
                キャンセル
              </button>
              <button className="btn-primary" onClick={handleSave} disabled={loading}>
                {loading ? '保存中...' : '保存'}
              </button>
            </div>
          </div>
        ) : (
          <div className="detail-view">
            <div className="info-section">
              <h3>基本情報</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>作業内容:</label>
                  <span>{display(request.short_description)}</span>
                </div>
                <div className="info-item">
                  <label>希望作業日:</label>
                  <span>{display(request.requested_on_site_date)}</span>
                </div>
                <div className="info-item">
                  <label>リクエスト者:</label>
                  <span>{display(request.requester)}</span>
                </div>
                <div className="info-item">
                  <label>優先度:</label>
                  <span>{display(request.priority)}</span>
                </div>
                <div className="info-item">
                  <label>作成日:</label>
                  <span>{display(request.sys_created_on)}</span>
                </div>
              </div>
            </div>

            <div className="info-section">
              <h3>場所情報</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>場所タイプ:</label>
                  <span>{display(request.location_type)}</span>
                </div>
                {display(request.hotel_cube) && (
                  <div className="info-item">
                    <label>ホテルキューブ:</label>
                    <span>{display(request.hotel_cube)}</span>
                  </div>
                )}
                {display(request.conference_room) && (
                  <div className="info-item">
                    <label>会議室:</label>
                    <span>{display(request.conference_room)}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="info-section">
              <h3>必要設備</h3>
              <div className="equipment-list">
                {display(request.whiteboards) === 'true' && (
                  <span className="equipment-item">ホワイトボード</span>
                )}
                {display(request.projector) === 'true' && (
                  <span className="equipment-item">プロジェクター</span>
                )}
                {display(request.whiteboards) !== 'true' && display(request.projector) !== 'true' && (
                  <span>なし</span>
                )}
              </div>
            </div>

            {display(request.special_notes) && (
              <div className="info-section">
                <h3>特記事項</h3>
                <p>{display(request.special_notes)}</p>
              </div>
            )}

            <div className="info-section">
              <h3>割り当て情報</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>担当者:</label>
                  <span>{display(request.assigned_to) || '未割り当て'}</span>
                </div>
                <div className="info-item">
                  <label>担当グループ:</label>
                  <span>{display(request.assignment_group) || '未割り当て'}</span>
                </div>
              </div>
            </div>

            {display(request.work_notes) && (
              <div className="info-section">
                <h3>作業メモ</h3>
                <p>{display(request.work_notes)}</p>
              </div>
            )}
          </div>
        )}

        {canChangeState && !editing && (
          <div className="state-actions">
            <h3>状態変更</h3>
            <div className="state-buttons">
              {value(request.state) !== 'submitted' && (
                <button 
                  className="btn-state" 
                  onClick={() => handleStateChange('submitted')}
                  disabled={loading}
                >
                  提出
                </button>
              )}
              {value(request.state) !== 'in_progress' && (
                <button 
                  className="btn-state" 
                  onClick={() => handleStateChange('in_progress')}
                  disabled={loading}
                >
                  進行中にする
                </button>
              )}
              <button 
                className="btn-state" 
                onClick={() => handleStateChange('completed')}
                disabled={loading}
              >
                完了
              </button>
              <button 
                className="btn-state btn-cancel" 
                onClick={() => handleStateChange('cancelled')}
                disabled={loading}
              >
                キャンセル
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}