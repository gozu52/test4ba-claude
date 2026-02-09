# On-Site Work Request アプリケーション - 技術設計書

## 1. アプリケーション概要

### 1.1 目的
ホテル内設備対応依頼の効率化とタスク管理の自動化

### 1.2 解決する課題
- 設備担当者への連携ミス削減
- 不在時の自動エスカレーション
- タスク管理の可視化
- 受付担当者の作業負荷軽減

### 1.3 スコープ
- ✅ 申請フォームの作成
- ✅ 自動振り分けワークフロー
- ✅ 担当者アサインメント
- ✅ 承認フロー（会議室のみ）
- ✅ メール通知
- ✅ ステータス管理
- ❌ 外部システム連携（今回は実装しない）

---

## 2. データモデル設計

### 2.1 メインテーブル: On-Site Work Request (x_xxxxx_onsite_work_request)

| フィールド名 | タイプ | 必須 | 説明 |
|------------|--------|------|------|
| number | String | Yes | 申請番号（自動採番：ONSITEREQ0000001）|
| short_description | String | Yes | 概要 |
| requested_on_site_date | Date | Yes | 予約日 |
| requester | Reference (User) | Yes | 申請者 |
| location_type | Choice | Yes | 設備種類（客室 / 会議室）|
| room_option | String | No | オプション（設備項目のID等）|
| hotel_cube | Choice | No | Hotel Cube（個室）|
| conference_room | Choice | No | 会議室 |
| whiteboards | Boolean | No | ホワイトボード |
| projector | Boolean | No | プロジェクター |
| special_notes | Text | No | 特記事項 |
| state | Choice | Yes | ステータス（Draft / Submitted / In Progress / Completed / Cancelled）|
| assigned_to | Reference (User) | No | 担当者 |
| assignment_group | Reference (Group) | No | 担当グループ |
| priority | Choice | Yes | 優先度（1-Low, 2-Medium, 3-High, 4-Critical）|
| work_notes | Journal | No | 作業メモ |
| closed_at | DateTime | No | 完了日時 |

### 2.2 関連テーブル

#### 2.2.1 設備マスタ（参考用）
- Hotel Cube選択肢
- 会議室選択肢
- 設備オプション

#### 2.2.2 ユーザーグループ
- **Hotel Cube G（客室担当グループ）**
- **Conference Approvers（会議室承認者グループ）**
- **Conference Room Prep G（会議室準備グループ）**

---

## 3. ワークフロー設計

### 3.1 ワークフロー全体図

```
[申請] → [自動振り分け] → [アサイン/承認] → [完了] → [通知]
```

### 3.2 詳細フロー

#### Phase 1: 申請
1. ユーザーが申請フォームを入力
2. 「Submit」ボタンをクリック
3. State: Draft → Submitted

#### Phase 2: 自動振り分け（Business Rule）
**トリガー**: State = Submitted

**条件分岐**:
```
IF location_type == "客室"
  THEN
    assignment_group = "Hotel Cube G"
    assigned_to = Hotel Cube Gの担当者（ラウンドロビン）
    state = "In Progress"
    
ELSE IF location_type == "会議室"
  THEN
    assignment_group = "Conference Approvers"
    state = "Pending Approval"
```

#### Phase 3: 承認フロー（会議室のみ）
**Approval Flow**:
1. Conference Approversグループに承認依頼
2. 承認者が「Approve」または「Reject」
3. Approve → assignment_group = "Conference Room Prep G"
4. Reject → state = "Cancelled"

#### Phase 4: 完了処理
- 担当者が作業完了後、state = "Completed"
- closed_at に現在日時を記録

---

## 4. UI/UX設計

### 4.1 申請フォーム（Form Layout）

**セクション1: 基本情報**
- 申請者（自動入力：ログインユーザー）
- 予約日
- 概要

**セクション2: 設備選択**
- ラジオボタン: ○客室 / ○会議室
  
**セクション2-1: 客室の場合**
- ドロップダウン: Hotel Cube（個室）選択
- オプション: 設備項目のID等を記入

**セクション2-2: 会議室の場合**
- ドロップダウン: 会議室選択
- チェックボックス: □ ホワイトボード □ プロジェクター

**セクション3: 詳細**
- テキストエリア: 特記事項

**アクション**
- [Submit] ボタン: 申請を送信
- [Save] ボタン: 下書き保存

### 4.2 申請完了画面

申請完了後、以下を表示:
```
✓ 申請が完了しました
申請番号: ONSITEREQ0000001
担当グループ: Hotel Cube G（または Conference Approvers）
ステータス: 処理中（または 承認待ち）

メール通知を送信しました。
```

### 4.3 承認実行画面（会議室のみ）

Conference Approversグループメンバーに表示:
- 申請内容の確認
- [Approve] ボタン
- [Reject] ボタン
- コメント欄

### 4.4 一覧画面（List View）

**フィルター**:
- My Requests（自分の申請）
- Assigned to Me（自分にアサインされた依頼）
- My Group's Requests（自分のグループの依頼）
- All Open Requests（すべての未完了依頼）

**表示カラム**:
- Number
- Short Description
- Requested On-Site Date
- Location Type
- State
- Priority
- Assigned To
- Assignment Group

---

## 5. 自動化設定

### 5.1 Business Rules

#### BR1: 自動振り分け
- **When**: After Insert
- **Condition**: State = Submitted
- **Action**: 
  - location_typeに基づいてassignment_groupを設定
  - 客室 → Hotel Cube G
  - 会議室 → Conference Approvers

#### BR2: 優先度の自動設定
- **When**: Before Insert
- **Condition**: Priority is empty
- **Action**: priority = "2-Medium"（デフォルト）

#### BR3: 完了日時の記録
- **When**: After Update
- **Condition**: State changed to Completed
- **Action**: closed_at = now()

### 5.2 Notifications

#### N1: 申請者への確認通知
- **When**: State = Submitted
- **To**: Requester
- **Subject**: 【申請完了】On-Site Work Request #{number}
- **Body**: 申請が受け付けられました。担当グループ: {assignment_group}

#### N2: 担当者への通知
- **When**: Assignment Group または Assigned To が設定された
- **To**: Assigned To（または Assignment Group）
- **Subject**: 【新規依頼】On-Site Work Request #{number}
- **Body**: 新しい設備申請が割り当てられました。

#### N3: 承認者への通知
- **When**: State = Pending Approval
- **To**: Conference Approvers
- **Subject**: 【承認依頼】On-Site Work Request #{number}
- **Body**: 会議室設備申請の承認をお願いします。

#### N4: 完了通知
- **When**: State = Completed
- **To**: Requester
- **Subject**: 【完了】On-Site Work Request #{number}
- **Body**: 設備申請の対応が完了しました。

---

## 6. セキュリティ設計

### 6.1 ACL（Access Control Lists）

#### 申請者（Requester）
- ✅ Create: 自分の申請を作成可能
- ✅ Read: 自分の申請を閲覧可能
- ❌ Update: 提出後は編集不可
- ❌ Delete: 削除不可

#### 担当者（Assigned To / Assignment Group）
- ❌ Create: 不可
- ✅ Read: アサインされた申請を閲覧可能
- ✅ Update: work_notes、stateを更新可能
- ❌ Delete: 削除不可

#### 承認者（Conference Approvers）
- ❌ Create: 不可
- ✅ Read: 承認待ちの申請を閲覧可能
- ✅ Update: Approve/Reject可能
- ❌ Delete: 削除不可

#### 管理者（Admin）
- ✅ All: すべての操作が可能

---

## 7. テスト計画

### 7.1 機能テスト

#### TC1: 客室申請
1. 客室を選択して申請
2. Hotel Cube Gにアサインされることを確認
3. 担当者にメール通知が送信されることを確認

#### TC2: 会議室申請（承認フロー）
1. 会議室を選択して申請
2. Conference Approversに承認依頼が送信されることを確認
3. 承認後、Conference Room Prep Gにアサインされることを確認

#### TC3: ステータス遷移
1. Draft → Submitted → In Progress → Completed
2. 各ステータス変更時にメール通知が送信されることを確認

### 7.2 パフォーマンステスト
- 複数の同時申請処理
- 大量データでのリストビュー表示速度

### 7.3 セキュリティテスト
- ACLの権限確認
- 他人の申請を編集できないことを確認

---

## 8. 実装ステップ

### Step 1: データモデル作成
- テーブル作成
- フィールド定義
- Choice Listの設定

### Step 2: UI作成
- フォームレイアウト
- リストビュー
- 関連リスト

### Step 3: ワークフロー実装
- Business Rules
- Workflow（Approval）

### Step 4: 通知設定
- Email Notifications
- テンプレート作成

### Step 5: セキュリティ設定
- ACL
- ロール定義

### Step 6: テスト
- 機能テスト
- ユーザー受入テスト

---

## 9. 今後の拡張案

### Phase 2機能（将来実装）
- ダッシュボード（申請状況の可視化）
- レポート機能
- SLA設定（対応時間の管理）
- モバイルアプリ対応
- 外部システム連携
  - メールシステム連携
  - 予約管理システム連携
  - 在庫管理システム連携

---

## 10. 付録

### 10.1 用語集
- **Hotel Cube G**: ホテル客室設備担当グループ
- **Conference Approvers**: 会議室利用承認者グループ  
- **Conference Room Prep G**: 会議室準備担当グループ
- **Requester**: 申請者
- **Fulfiller**: 実務対応者

### 10.2 参考資料
- ServiceNow Service Catalog開発ガイド
- ServiceNow Workflow設計ベストプラクティス
- ServiceNow Security Best Practices

---

**作成日**: 2026年2月9日
**作成者**: AI-Assisted Design
**バージョン**: 1.0
