# ServiceNow Build Agent 実装プロンプト

## アプリケーション名
On-Site Work Request（オンサイト業務設備申請システム）

## 概要
ホテル内の設備対応依頼を効率化するServiceNowアプリケーション。
メール依頼による連携ミス、タスク管理の不備、担当者の負荷を解消します。

## 実装要件

### 1. テーブル作成

**テーブル名**: On-Site Work Request
**Table Label**: On-Site Work Request
**Table Name**: x_xxxxx_onsite_work_request

**フィールド定義**:

| Label | Column Name | Type | Mandatory | Default | Choices |
|-------|-------------|------|-----------|---------|---------|
| Number | number | String | Yes | Auto-numbered: ONSITEREQ0000001 | - |
| Short Description | short_description | String | Yes | - | - |
| Requested On-Site Date | requested_on_site_date | Date | Yes | - | - |
| Requester | requester | Reference (User) | Yes | Current User | - |
| Location Type | location_type | Choice | Yes | - | "room" (客室), "conference" (会議室) |
| Room Option | room_option | String | No | - | - |
| Hotel Cube | hotel_cube | Choice | No | - | "cube_a", "cube_b", "cube_c" |
| Conference Room | conference_room | Choice | No | - | "room_101", "room_102", "room_201" |
| Whiteboards | whiteboards | Boolean | No | false | - |
| Projector | projector | Boolean | No | false | - |
| Special Notes | special_notes | Text | No | - | - |
| State | state | Choice | Yes | draft | "draft", "submitted", "pending_approval", "in_progress", "completed", "cancelled" |
| Assigned To | assigned_to | Reference (User) | No | - | - |
| Assignment Group | assignment_group | Reference (Group) | No | - | - |
| Priority | priority | Choice | Yes | 2 | 1-Low, 2-Medium, 3-High, 4-Critical |
| Work Notes | work_notes | Journal | No | - | - |
| Closed At | closed_at | DateTime | No | - | - |

See full technical design document for complete implementation details.
