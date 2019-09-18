import { ActionReturn } from '../../types';
import MessagesActionTypes from './action-types';

type MessagesActionsReturn = ActionReturn<MessagesActionTypes, MessagesPayload>;

export interface MessagesPayload {
    message: string;
    user: string;
}

export const SaveMessageAction = (user: string, message: string): MessagesActionsReturn => {
    return {
        type: MessagesActionTypes.SAVE_MESSAGE,
        payload: {
            user,
            message
        }
    };
};

export const ClearMessagesAction = (): MessagesActionsReturn => {
    return {
        type: MessagesActionTypes.CLEAR_MESSAGES,
        payload: null
    };
};
