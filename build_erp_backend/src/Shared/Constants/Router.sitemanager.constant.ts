export const SITEMANAGER_ROUTES = {
  // 🔹 Auth
  LOGIN: '/login',
  LOGOUT: '/logout',
  CHANGE_PASSWORD: '/changepass',

  // 🔹 Project
  SITE_PROJECT: '/siteproject',
  PROJECT_WITH_COMPLETION: '/projectWithCompletion',

  // 🔹 Stage Status
  STATUS_UPDATE: '/status/:id',
  UPLOAD_STAGE_IMAGES: '/upload',
  SITE_STAGE: '/siteStage/:id',

  // 🔹 Attendance
  ATTENDANCE: '/attendance',
  EDIT_ATTENDANCE: '/editAttendance/:id',
  ATTENDANCE_ID: '/attendance/:id',
  EDIT_FETCH_ATTENDANCE: '/editfetchattendance/:id',

  // 🔹 Purchase
  PURCHASE: '/purchase',
  PURCHASE_ID: '/purchase/:id',
  LAST_INVOICE: '/lastInvoice',

  // 🔹 Transfer
  TRANSFER: '/transfer',
  TRANSFER_ID: '/transfer/:id',
  RECEIVE_TRANSFER: '/receiveTransfer/:id',
  FETCH_STOCK_LIST: '/fetchstockList/:id',
  TO_PROJECT: '/toProject/:id',
  LAST_TRANSFER: '/transferId',

  // 🔹 Receive
  RECEIVE: '/receive',
  RECEIVE_ID: '/receive/:id',

  // 🔹 Chat
  CHAT_PROJECT: '/chatProject',
  CHATS_BY_ID: '/chats/:id',

  // 🔹 Material & Labour
  FETCH_MATERIAL: '/fetchMaterial',
  FETCH_MAT_BY_BRAND: '/fetchMatbyBrand/:material',
  FETCH_MAT_BY_UNIT: '/fetMatbyUnit/:material',
  UNIT_RATE: '/unitRate',
  FETCH_LABOUR: '/fetchlabour',
  STOCK: '/stock',

  // 🔹 Dashboard / Estimation
  GET_ESTIMATION: '/getEstimation/:id',
  GET_MATERIAL_ESTIMATION: '/getMaterialEstimation/:id',
  GET_LABOUR_ESTIMATION: '/getLabourEstimation/:id',
  GET_ADDITION_ESTIMATION: '/getAdditionEstimation/:id',
  EXPECT_IMAGE: '/expectImage/:id',
};
