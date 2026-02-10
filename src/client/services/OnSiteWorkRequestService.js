export class OnSiteWorkRequestService {
  constructor() {
    this.tableName = "x_snc_hotel_equipm_on_site_work_request";
  }

  async list(filters = {}) {
    let query = `/api/now/table/${this.tableName}?sysparm_display_value=all&sysparm_order=DESCsys_created_on`;
    
    // フィルタを追加
    if (filters.state) {
      query += `&state=${filters.state}`;
    }
    if (filters.assigned_to) {
      query += `&assigned_to=${filters.assigned_to}`;
    }
    if (filters.location_type) {
      query += `&location_type=${filters.location_type}`;
    }

    try {
      const response = await fetch(query, {
        headers: {
          "Accept": "application/json",
          "X-UserToken": window.g_ck
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Request failed');
      }

      const data = await response.json();
      return data.result || [];
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async create(data) {
    try {
      const response = await fetch(`/api/now/table/${this.tableName}?sysparm_display_value=all`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-UserToken": window.g_ck
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Request failed');
      }

      return response.json();
    } catch (error) {
      console.error('Create Error:', error);
      throw error;
    }
  }

  async update(sysId, data) {
    try {
      const response = await fetch(`/api/now/table/${this.tableName}/${sysId}?sysparm_display_value=all`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-UserToken": window.g_ck
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Request failed');
      }

      return response.json();
    } catch (error) {
      console.error('Update Error:', error);
      throw error;
    }
  }

  async delete(sysId) {
    try {
      const response = await fetch(`/api/now/table/${this.tableName}/${sysId}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "X-UserToken": window.g_ck
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Delete failed');
      }

      return response.ok;
    } catch (error) {
      console.error('Delete Error:', error);
      throw error;
    }
  }

  async getById(sysId) {
    try {
      const response = await fetch(`/api/now/table/${this.tableName}/${sysId}?sysparm_display_value=all`, {
        headers: {
          "Accept": "application/json",
          "X-UserToken": window.g_ck
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Request failed');
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Get By ID Error:', error);
      throw error;
    }
  }
}