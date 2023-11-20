export default {
  failed: { message: 'Failed', code: 400 },
  unauthenticated: { message: 'Unauthenticated', code: 401 },
  unauthorized: { message: 'Unauthorized', code: 403 },
  notfound: (payload) => {
    return { message: `${payload} not found`, code: 404 };
  },
};
