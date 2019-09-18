import { ActionReturn } from '../../types';
import MessagesActionTypes from './action-types';
import { MessagesPayload, AddressPayload } from './actions';

export interface MessagesState {
    messages: {
        [user: string]: {
            message: string;
            address: string;
        };
    };
}

const initialState = {
    messages: {}
};

export const messagesReducer = (
    state = initialState,
    action: ActionReturn<MessagesActionTypes, MessagesPayload>
): MessagesState => {
    switch (action.type) {
        case MessagesActionTypes.SAVE_MESSAGE:
            return {
                messages: {
                    ...state.messages,
                    [action.payload.user]: {
                        message: action.payload.message
                    }
                }
            };
        case MessagesActionTypes.CLEAR_MESSAGES:
            return initialState;
        default:
            return state;
    }
};

export const addressReducer = (
    state = initialState,
    action: ActionReturn<MessagesActionTypes, AddressPayload>
): MessagesState => {
    switch (action.type) {
        case `${MessagesActionTypes.GET_ADDRESS}_PENDING`:
            return {
                messages: {
                    ...state.messages,
                    [action.payload.user]: {
                        ...state.messages[action.payload.user],
                        address: 'Loading...'
                    }
                }
            };
        case `${MessagesActionTypes.GET_ADDRESS}_SUCCESS`:
            return {
                messages: {
                    ...state.messages,
                    [action.payload.user]: {
                        ...state.messages[action.payload.user],
                        address: action.payload.address
                    }
                }
            };
        case `${MessagesActionTypes.GET_ADDRESS}_FAILED`:
            return {
                messages: {
                    ...state.messages,
                    [action.payload.user]: {
                        ...state.messages[action.payload.user],
                        address: 'Failed to fetch address'
                    }
                }
            };
    }
};
