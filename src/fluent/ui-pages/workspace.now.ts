import '@servicenow/sdk/global';
import { UiPage } from '@servicenow/sdk/core';
import workspacePage from '../../client/index.html';

export const hotel_equipment_workspace = UiPage({
  $id: Now.ID['hotel-equipment-workspace'],
  endpoint: 'x_snc_hotel_equipm_workspace.do',
  html: workspacePage,
  direct: true
});