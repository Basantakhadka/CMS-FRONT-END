import axios, { AxiosError } from 'axios';
import { BASE_URL, JWT_TOKEN, PERMISSION_KEY } from '../constants';
import history from './history';

import { clearLocalStorage, getLocalStorage, setLocalStorage } from './storageUtils';
// import { setSessionTime, setSessionId } from '../features/slice/sessionSlice';
// import { store } from '../store';
// import { useNavigate } from 'react-router-dom';

export function httpBase(isDownloadable: boolean = false, signal?: any) {
    const normalHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': getLocalStorage(JWT_TOKEN),

    };
    const downloadableHeaders = {
        Accept: '*/*',
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': getLocalStorage(JWT_TOKEN),
    };
    const api = axios.create({
        baseURL: `${ BASE_URL }`,
        headers: isDownloadable ? downloadableHeaders : normalHeaders,
        responseType: isDownloadable ? 'blob' : 'json',
        signal: signal,
    });

    api.interceptors.response.use(
        (response) => {
            if (response.headers && response.headers['x-xsrf-token']) {
                setLocalStorage(JWT_TOKEN, response.headers['x-xsrf-token']);
                // store.dispatch(setSessionTime(540));
                // store.dispatch(setSessionId());
            }
            return response;
        },
        (error) => {
            if (error instanceof AxiosError) {
                if (error.response?.status == 401) {
                    clearLocalStorage(JWT_TOKEN);
                    clearLocalStorage('id');
                    clearLocalStorage(PERMISSION_KEY);
                    // navigate('/');
                    history.push('/')
                }
                if (error.response?.status === 503) {
                    // navigate('/503');\
                    history.push('/503')
                }
            }

            return Promise.reject(error);
        }
    );

    return api;
}
