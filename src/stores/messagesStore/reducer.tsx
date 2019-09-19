import { ActionReturn } from '../../types';
import MessagesActionTypes from './action-types';
import { MessagesPayload, CepPayload } from './actions';

export interface MessagesState {
    messages: {
        [user: string]: {
            message: string;
            image: string;
        };
    };
}

export interface AddressState {
    addresses: {
        [user: string]: {
            address: CepPayload;
        };
    };
}

const initialMessagesState = {
    messages: {}
};

const initialAddressesState = {
    addresses: {}
};

export const messagesReducer = (
    state = initialMessagesState,
    action: ActionReturn<MessagesActionTypes, MessagesPayload>
): MessagesState => {
    switch (action.type) {
        case MessagesActionTypes.SAVE_MESSAGE:
            return {
                messages: {
                    ...state.messages,
                    [action.payload.user]: {
                        message: action.payload.message,
                        image: action.payload.image
                    }
                }
            };
        case MessagesActionTypes.CLEAR_MESSAGES:
            return initialMessagesState;
        default:
            return state;
    }
};

export const addressReducer = (
    state = initialAddressesState,
    action: ActionReturn<MessagesActionTypes, CepPayload>
): AddressState => {
    switch (action.type) {
        case MessagesActionTypes.GET_ADDRESS_PENDING:
        case MessagesActionTypes.GET_ADDRESS_SUCCESS:
        case MessagesActionTypes.GET_ADDRESS_FAILED:
            return {
                addresses: {
                    ...state.addresses,
                    [action.payload.user]: {
                        address: action.payload
                    }
                }
            };
        default:
            return state;
    }
};
