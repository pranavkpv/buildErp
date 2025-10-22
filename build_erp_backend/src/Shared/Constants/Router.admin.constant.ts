export const ADMIN_ROUTES = {
  AUTH: {
    LOGIN: '/login',
    LOGOUT: '/logout',
  },

  SITE_ASSIGNMENT: {
    GET_SITEMANAGERS: '/addSiteToSiteData',
    ASSIGN_SITEMANAGER: '/addToSite',
    DELETE_SITEMANAGER: '/addToSite/:id/:sitemanagerId',
    GET_PROJECTS_WITH_SITEMANAGER: '/addToSite',
  },

  CATEGORY: {
    BASE: '/category',
  },

  UNIT: {
    BASE: '/unit',
    GET_ALL_UNITS: '/getUnit',
  },

  BRAND: {
    BASE: '/brand',
  },

  MATERIAL: {
    BASE: '/material',
    ADD: '/addmaterial',
    EDIT: '/editmaterial/:id',
    FETCH_UNIQUE: '/fetchMaterial',
    FETCH_BY_UNIT: '/fetMatbyUnit/:material',
    FETCH_BY_BRAND: '/fetchMatbyBrand/:material',
    UNIT_RATE: '/unitRate',
    GET_BY_ID: '/getmaterial/:id',
  },

  PROJECT: {
    BASE: '/project',
    ADD: '/addproject',
    ALL: '/getAllproject',
    PENDING: '/pendingProjects',
    STATUS: '/status/:id',
    DELETE: '/project/:id',
  },

  LABOUR: {
    BASE: '/labour',
    FETCH_ALL: '/fetchlabour',
    GET_BY_ID: '/getLabour/:id',
  },

  SITEMANAGER: {
    BASE: '/sitemanager',
  },

  SPECIFICATION: {
    BASE: '/spec',
    GET_ALL: '/getSpec',
    GET_MATERIAL_SUM: '/getMatsum',
    GET_LABOUR_SUM: '/getLabSum',
    FETCH_SUM: '/fetchSum',
    DELETE: '/deleteSpec/:id',
  },

  ESTIMATION: {
    SAVE: '/saveEstimation',
    SEND: '/sendEstimation/:id',
    UPDATE: '/updateEstimation',
    FETCH_ALL: '/fetchEstimation',
    UPLOAD_IMAGE: '/uploadEstimateImage/:id',
    EXISTING: '/fetchExistEstimation/:id',
    IMAGE: '/EstimationImage/:id',
  },

  STAGE: {
    FETCH_BUDGET: '/fetchbudget/:id',
    SAVE: '/saveStage',
    FETCH_ALL: '/fetchstage',
    DELETE: '/stageDelete/:id',
    EDIT: '/editStage/:id',
    FETCH_BY_ID: '/stageFetch/:id',
    FOR_VERIFY: '/stageForverify',
    VERIFY_PAY: '/verifyPay/:id',
  },

  DASHBOARD: {
    OVERALL: '/budgetActual',
    MATERIAL: '/budgetActualMaterial',
    LABOUR: '/budgetActualLabour',
  },

  BANNER: {
    ADD: '/addBanner',
    GET: '/banner',
    EDIT: '/banner/:id',
    DELETE: '/banner/:id',
  },
};
