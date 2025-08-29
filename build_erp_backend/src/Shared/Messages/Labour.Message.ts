export const LabourSuccessMessage = {
    ADD: 'Labour type added successfully',
    DELETE: 'Labour type deleted successfully',
    FETCH: 'Labour type fetch successfully',
    UPDATE: 'Labour type updated successfully',
};

export const LabourFailedMessage = {
    EXIST_LABOUR: 'Labour already exist',
    EXIST_SPEC: 'Labour Already Used In Spec',
    FETCH: 'Fetch labour data is failed',
    REQUIRED_FIELD: 'labour_type and daily_wage are required',
    LABOUR_TYPE_CHAR: 'labour_type must be a non-empty string',
    LABOUR_TYPE_SIZE: 'labour_type should not exceed 50 characters',
    DAILYWAGE_CHAR: 'daily_wage must be a valid number',
    DAILYWAGE_GREATER_ZERO: 'daily_wage must be greater than 0',
    DAILY_WAGE_MAX: 'daily_wage is too high, must be less than 100000',
};
