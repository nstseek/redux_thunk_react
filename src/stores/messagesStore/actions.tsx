import { ActionReturn } from '../../types';
import MessagesActionTypes from './action-types';
import { Dispatch } from 'react';

export type MessagesActionsReturn = ActionReturn<MessagesActionTypes, MessagesPayload>;

export type CepActionsReturn = ActionReturn<MessagesActionTypes, CepPayload>;

export interface CepPayload {
    errorMsg: string;
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    unidade: string;
    ibge: string;
    gia: string;
    user: string;
}

export interface MessagesPayload {
    message: string;
    user: string;
    image: string;
}

export const SaveMessageAction = (user: string, message: string, image: string): MessagesActionsReturn => {
    return {
        type: MessagesActionTypes.SAVE_MESSAGE,
        payload: {
            user,
            message,
            image
        }
    };
};

export const ClearMessagesAction = (): MessagesActionsReturn => {
    return {
        type: MessagesActionTypes.CLEAR_MESSAGES,
        payload: null
    };
};

export const SaveAddressAction = (dispatch: Dispatch<CepActionsReturn>, user: string, cep: string) => {
    dispatch({
        type: MessagesActionTypes.GET_ADDRESS_PENDING,
        payload: {
            cep: null,
            logradouro: null,
            complemento: null,
            bairro: null,
            localidade: null,
            uf: null,
            unidade: null,
            ibge: null,
            gia: null,
            user,
            errorMsg: 'Loading...'
        }
    });
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((data) => data.json())
        .then((json) => {
            dispatch({ type: MessagesActionTypes.GET_ADDRESS_SUCCESS, payload: Object.assign(json, { user }) });
        })
        .catch(() => {
            dispatch({
                type: MessagesActionTypes.GET_ADDRESS_FAILED,
                payload: {
                    cep: null,
                    logradouro: null,
                    complemento: null,
                    bairro: null,
                    localidade: null,
                    uf: null,
                    unidade: null,
                    ibge: null,
                    gia: null,
                    user,
                    errorMsg: 'Failed to fetch address'
                }
            });
        });
};
