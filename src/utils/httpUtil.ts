import { httpBase } from './httpBaseUtils';

export function fetch(endpoint: any, data?: any, signal?: any) {
    return httpBase(false, signal).get(`/${ endpoint }`, data);
}

export function store(endpoint: any, data: any, signal?: any) {
    return httpBase(false, signal).post(`/${ endpoint }`, data);
}

export function update(endpoint: any, data?: any, signal?: any) {
    return httpBase(false, signal).put(`/${ endpoint }`, data);
}

export function destroy(endpoint: any, data?: Record<string, any>, signal?: any) {
    return httpBase(false, signal).delete(`/${ endpoint }`, { data });
}

export function download(endpoint: any, params?: any) {
    return httpBase(true).get(`/${ endpoint }`, { params });
}

export function downloadFile(endpoint: any, data?: any) {
    return httpBase(true).post(`/${ endpoint }`, data);
}
