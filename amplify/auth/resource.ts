import { defineAuth } from '@aws-amplify/backend';

/**
 * Define authentication resource
 * - Only email/password allowed
 * - Admin users only (initially)
 */
export const auth = defineAuth({
    loginWith: {
        email: true,
    },
    userAttributes: {
        "custom:role": {
            dataType: "String",
            mutable: true,
        }
    }
});
