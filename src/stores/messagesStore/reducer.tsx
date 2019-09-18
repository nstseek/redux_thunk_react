import { ActionReturn } from '../../types';
import MessagesActionTypes from './action-types';
import { MessagesPayload } from './actions';

export interface MessagesState {
    messages: {
        [user: string]: string[];
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
                    [action.payload.user]: action.payload.message
                }
            };
        case MessagesActionTypes.CLEAR_MESSAGES:
            return initialState;
        default:
            return state;
    }
};
