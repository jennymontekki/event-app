let addEditEventData = { event: null };

export const getAddEditEventData = () => addEditEventData;
export const setAddEditEventData = data => addEditEventData = { ...addEditEventData, ...data };

let authData = { authCreds: { password: '', name: '', email: '' } };

export const getAuthData = () => authData;
export const setAuthData = data => authData = { ...authData, ...data };
