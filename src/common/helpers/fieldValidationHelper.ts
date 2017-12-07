import * as commonTypes from "../typings/commonTypes";

export const REQUIRED = "required";
export const REQUIRED_IF_DEVELOPER = "required-if-developer";
export const AT_LEAST_ONE_PHONE = "at-least-one-phone";
export const MAX_LENGTH_50 = "max-length-50";
export const MAX_LENGTH_60 = "max-length-80";
export const MAX_LENGTH_80 = "max-length-80";
export const MAX_LENGTH_500 = "max-length-500";
export const USER_NAME_IS_TAKEN = "user-name-is-taken";

export function validateRequired(value: any) {
    return (value === null || value === undefined || value === "") ? REQUIRED : undefined;
}

export function validateMaxLength50(value: string) {
    if (!value) {
        return undefined;
    }
    return value.length > 50 ? MAX_LENGTH_50 : undefined;
}

export function validateMaxLength60(value: string) {
    if (!value) {
        return undefined;
    }
    return value.length > 60 ? MAX_LENGTH_60 : undefined;
}

export function validateMaxLength80(value: string) {
    if (!value) {
        return undefined;
    }
    return value.length > 80 ? MAX_LENGTH_80 : undefined;
}

export function validateMaxLength500(value: string) {
    if (!value) {
        return undefined;
    }
    return value.length > 500 ? MAX_LENGTH_500 : undefined;
}

export function validationRequiredIfDeveloper(value: any, user: commonTypes.UserProfile) {
    return (user.type === commonTypes.UserProfileType.RECRUITER && (value === null || value === undefined || value === "")) ? REQUIRED_IF_DEVELOPER : undefined;
}

export function getValidatorsForField(fieldName: keyof commonTypes.UserProfile): Array<(value: any, user: commonTypes.UserProfile) => string> {
    switch (fieldName) {
        case "name":
            return [validateRequired, validateMaxLength50];
        case "displayName":
            return [validateRequired, validateMaxLength50];
        case "title":
            return [validateRequired, validateMaxLength80];
        case "bio":
            return [validationRequiredIfDeveloper, validateMaxLength500];
        case "address":
            return [validateRequired];
        default:
            return [];
    }
}

export function validate(user: commonTypes.UserProfile) {
    const errors: { [key: string]: string } = {};
    for (const key in user) {
        if (user.hasOwnProperty(key)) {
            const value: any = user[key];
            const fieldValidators = getValidatorsForField(key);
            if (fieldValidators.length) {
                let error;
                for (const fieldValidator of fieldValidators) {
                    error = fieldValidator(value, user);
                    if (error) break;
                }
                if (error) {
                    errors[key] = error;
                }
            }
        }
    }
    return errors;
}
