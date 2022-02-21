import {useEffect, useReducer} from 'react';
import axios from 'axios';

const fetchReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return {...state, data: action.payload};
    case 'SET_NOT_LOADING':
      return {...state, isLoading: false};
    case 'SET_ERROR':
      return {...state, error: action.payload};
    default:
      throw new Error('Unrecognized fetchReducer action');
  }
};

const useHttp = (method, url, body) => {
  const [{data, error, isLoading}, dispatch] = useReducer(
    fetchReducer, {data: '', error: '', isLoading: true});

  const controller = new AbortController();

  useEffect(() => {
    axios({
      method,
      url,
      data: body,
      signal: controller.signal
    })
      .then((resp) => {
        if (resp.status === 200) {
          dispatch({type: 'SET_DATA', payload: resp.data});
          dispatch({type: 'SET_NOT_LOADING'});
        }
      })
      .catch((errorTMP) => {
        dispatch({type: 'SET_ERROR', payload: errorTMP});
        dispatch({type: 'SET_NOT_LOADING'});
      });

    return () => controller.abort();
  }, [method, url, body]);

  return [data, error, isLoading];
};


export default useHttp;
