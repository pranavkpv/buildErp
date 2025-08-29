export const ProjectSuccessMessage = {
    FETCH: 'Project Fetch successfully',
    ADD: 'Project Added successfully',
    STATUS_CHANGE: 'Project status changes into ',
    DELETE: 'Project is deleted successfully',
    UPDATE: 'Project is Updated successfully',
};

export const ProjectFailedMessage = {
    NOT_ADD_SITEMANAGER: 'Sitemanager is not addedd this project',
    EXIST_PROJECT: 'Project Already exist',
    ALREADY_USED: 'This project is already used',
    REQUIRED_FIELD: 'project_name, user_id, address, mobile_number, and email are required',
    PROJECT_NAME_CHAR: 'project_name must be a non-empty string',
    PROJECT_NAME_MAX: 'project_name should not exceed 100 characters',
    USER_VALID: 'user_id must be a valid string or number',
    ADDRESS_NON_EMPTY: 'address must be a non-empty string',
    ADDRESS_MAX: 'address should not exceed 200 characters',
    MOBILE_CHAR: 'mobile_number must be a string or number',
    MOBILE_MAX: 'mobile_number must be 10–15 digits',
    EMAIL_VALLID: 'email must be a valid email address',
    AREA_VALID: 'area must be a string or number if provided',
    DESCRIPTION_VALID: 'description must be a string',
    DESCRIPTION_MAX: 'description should not exceed 500 characters',
    LATITUDE_CHAR: 'latitude must be a number between -90 and 90',
    LONGITUDE_CHAR: 'longitude must be a number between -180 and 180',
};
