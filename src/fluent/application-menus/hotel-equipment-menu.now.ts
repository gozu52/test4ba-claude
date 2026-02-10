import '@servicenow/sdk/global';
import { ApplicationMenu, Record } from '@servicenow/sdk/core';

// ホテル設備リクエスト管理用アプリケーションメニュー
export const hotelEquipmentMenu = ApplicationMenu({
  $id: Now.ID['hotel_equipment_menu'],
  title: 'ホテル設備リクエスト',
  hint: 'ホテル設備のオンサイト作業リクエスト管理',
  description: 'ホテル設備のオンサイト作業リクエストを管理するアプリケーション',
  active: true,
  order: 100
});

// ワークスペースへのモジュール
export const workspaceModule = Record({
  $id: Now.ID['workspace_module'],
  table: 'sys_app_module',
  data: {
    title: 'ワークスペース',
    application: hotelEquipmentMenu.$id,
    link_type: 'DIRECT',
    query: 'x_snc_hotel_equipm_workspace.do',
    hint: 'ホテル設備リクエスト管理ワークスペース',
    description: 'メインワークスペース',
    active: true,
    order: 100
  }
});

// オンサイト作業リクエストテーブルへのモジュール
export const requestsTableModule = Record({
  $id: Now.ID['requests_table_module'],
  table: 'sys_app_module',
  data: {
    title: 'リクエスト一覧（テーブル）',
    application: hotelEquipmentMenu.$id,
    link_type: 'LIST',
    name: 'x_snc_hotel_equipm_on_site_work_request',
    hint: 'オンサイト作業リクエストの標準テーブルビュー',
    description: 'ServiceNow標準のリストビュー',
    active: true,
    order: 200
  }
});

// 新規リクエスト作成へのモジュール
export const newRequestModule = Record({
  $id: Now.ID['new_request_module'],
  table: 'sys_app_module',
  data: {
    title: '新規リクエスト作成（フォーム）',
    application: hotelEquipmentMenu.$id,
    link_type: 'NEW',
    name: 'x_snc_hotel_equipm_on_site_work_request',
    hint: '新しいオンサイト作業リクエストを作成',
    description: 'ServiceNow標準のフォームビュー',
    active: true,
    order: 300
  }
});

// レポートセクション
export const reportsModule = Record({
  $id: Now.ID['reports_separator'],
  table: 'sys_app_module',
  data: {
    title: 'レポート',
    application: hotelEquipmentMenu.$id,
    link_type: 'SEPARATOR',
    hint: 'レポートとダッシュボード',
    active: true,
    order: 400
  }
});

// 状態別リクエストモジュール
export const pendingRequestsModule = Record({
  $id: Now.ID['pending_requests_module'],
  table: 'sys_app_module',
  data: {
    title: '承認待ちリクエスト',
    application: hotelEquipmentMenu.$id,
    link_type: 'LIST',
    name: 'x_snc_hotel_equipm_on_site_work_request',
    filter: 'state=pending_approval',
    hint: '承認待ち状態のリクエスト一覧',
    active: true,
    order: 500
  }
});

export const inProgressRequestsModule = Record({
  $id: Now.ID['in_progress_requests_module'],
  table: 'sys_app_module',
  data: {
    title: '進行中リクエスト',
    application: hotelEquipmentMenu.$id,
    link_type: 'LIST',
    name: 'x_snc_hotel_equipm_on_site_work_request',
    filter: 'state=in_progress',
    hint: '進行中のリクエスト一覧',
    active: true,
    order: 600
  }
});