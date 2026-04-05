import api from './api';
import type { AppInfoResponse } from '../types/app';

export const appInfoApi = {
  getAppInfo: () => api.get<AppInfoResponse>('/app/info').then((r) => r.data),
};
