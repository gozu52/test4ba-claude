import React, { useState } from 'react';
import './RequestForm.css';

export default function RequestForm({ service, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    short_description: '',
    requested_on_site_date: '',
    location_type: '',
    hotel_cube: '',
    conference_room: '',
    whiteboards: false,
    projector: false,
    special_notes: '',
    priority: '2'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const submitData = {
        ...formData,
        state: 'draft'
      };
      
      await service.create(submitData);
      onSubmit();
    } catch (err) {
      setError(err.message || 'リクエストの作成に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAndSend = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const submitData = {
        ...formData,
        state: 'submitted'
      };
      
      await service.create(submitData);
      onSubmit();
    } catch (err) {
      setError(err.message || 'リクエストの提出に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="request-form">
      <div className="form-header">
        <h2>新規オンサイト作業リクエスト</h2>
        <button className="btn-cancel" onClick={onCancel}>キャンセル</button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>基本情報</h3>
          
          <div className="form-group">
            <label htmlFor="short_description">作業内容 *</label>
            <input
              type="text"
              id="short_description"
              name="short_description"
              value={formData.short_description}
              onChange={handleChange}
              required
              maxLength="160"
              placeholder="作業内容を簡潔に記入してください"
            />
          </div>

          <div className="form-group">
            <label htmlFor="requested_on_site_date">希望作業日 *</label>
            <input
              type="date"
              id="requested_on_site_date"
              name="requested_on_site_date"
              value={formData.requested_on_site_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="priority">優先度</label>
            <select
              id="priority"
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
            <label htmlFor="location_type">場所タイプ *</label>
            <select
              id="location_type"
              name="location_type"
              value={formData.location_type}
              onChange={handleChange}
              required
            >
              <option value="">選択してください</option>
              <option value="room">部屋</option>
              <option value="conference">会議室</option>
            </select>
          </div>

          {formData.location_type === 'room' && (
            <div className="form-group">
              <label htmlFor="hotel_cube">ホテルキューブ</label>
              <select
                id="hotel_cube"
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
              <label htmlFor="conference_room">会議室</label>
              <select
                id="conference_room"
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
            <label htmlFor="special_notes">特記事項</label>
            <textarea
              id="special_notes"
              name="special_notes"
              value={formData.special_notes}
              onChange={handleChange}
              rows="4"
              placeholder="追加の要求事項や特記事項があれば記入してください"
            />
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn-secondary"
            disabled={loading}
          >
            {loading ? '保存中...' : '下書きとして保存'}
          </button>
          <button 
            type="button" 
            className="btn-primary"
            onClick={handleSubmitAndSend}
            disabled={loading}
          >
            {loading ? '提出中...' : '提出'}
          </button>
        </div>
      </form>
    </div>
  );
}