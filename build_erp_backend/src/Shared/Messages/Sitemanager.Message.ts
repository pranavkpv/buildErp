export const SitemanagerSuccessMessage = {
    LOGIN: 'Sitemanager logged in successfully',
    UPDATE_PASSWORD: 'Sitemanager password updated successfully',
    FETCH: 'Sitemanager data fetched successfully',
    ADD: 'Project added successfully by the sitemanager',
    DELETE: 'Sitemanager deleted successfully',
    SAVED: 'Sitemanager saved successfully',
    UPDATE: 'Sitemanager data updated successfully',
};

export const SitemanagerFailedMessage = {
    INVALID_EMAIL: 'Invalid email for sitemanager',
    INVALID_PASSWORD: 'Invalid password for sitemanager',
    NOT_EXIST: 'Sitemanager does not exist',
    PASSWORD_WRONG: 'Incorrect sitemanager password',
    EXIST: 'Sitemanager already exists',
    EMAIL_SEND_FAIL: 'Failed to send password via email',

    STAGE_ID_REQUIRED: 'stageId is required and must be a valid non-empty string',
    STAGE_ID_FORMAT: 'Invalid stageId format. Must be a 24-character MongoDB ObjectId',

    PROGRESS_REQUIRED: 'newProgress is required and must be a number',
    PROGRESS_NUMBER: 'newProgress must be a number',
    PROGRESS_BETWEEN: 'newProgress must be between 0 and 100',

    DATE_REQUIRE: 'Date is required and must be a valid ISO date string',
    DATE_FORMAT: 'Invalid date format. Must be a valid date (ISO 8601 preferred)',
    DATE_CANNOT_FUTURE: 'Date cannot be in the future',

    USER_NAME_REQUIRED: 'Username is required and must be a non-empty string',
    USERNAME_MIN: 'Username must be at least 3 characters long',
    USER_NAME_MAX: 'Username cannot exceed 30 characters',
    USERNAME_EXIST: 'Username can only contain letters, numbers, and underscores',

    EMAIL_REQUIRED: 'Email is required and must be a non-empty string',
    EMAIL_MAX: 'Email cannot exceed 50 characters',

    SITEMANAGER_EXIST_PROJECT : 'Already this project has exist sitemanager',
    USED_PURCHASE : 'Should not remove sitemanager in this project because the purchase exist in the project',

    PASSWORD_REQUIRED : 'Password is required',
    PASSWORD_MIN : 'Password length should be greater than 6',
    PASSWORD_MAX : 'Password length should be less than 20',
    ADD_PROJECT : 'Sitemanager already add to project',
    DATA_EXIST : 'This sitemanagers entry is  pending to approve after approve this deletion is work ...',
};
