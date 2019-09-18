import React from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { MessagesState, SaveMessageAction, ClearMessagesAction, MessagesPayload } from './stores/messagesStore';
import { Dispatch } from 'redux';
import { ActionReturn } from './types';
import MessagesActionTypes from './stores/messagesStore/action-types';
import { AppState } from '.';

enum UpdateTarget {
    message = 0,
    user
}

type MessagesActionsReturn = ActionReturn<MessagesActionTypes, MessagesPayload>;

interface State {
    message: string;
    user: string;
}

interface Props {
    messagesStore: MessagesState;
    saveMessage(user: string, message: string): MessagesActionsReturn;
    clearMessages(): MessagesActionsReturn;
}

const mapStoreToProps = (state: AppState) => ({
    messagesStore: state.messagesReducer
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    saveMessage: (user: string, message: string) => dispatch(SaveMessageAction(user, message)),
    clearMessages: () => dispatch(ClearMessagesAction())
});

class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            message: '',
            user: ''
        };
    }

    render() {
        const stateProps = Object.keys(this.props.messagesStore.messages);
        let index = 0;
        const items = stateProps.map((key: string) => {
            index = index + 2;
            return (
                <li key={index}>
                    <span key={index + 1}>{`Usuário: ${key} - Status: ${this.props.messagesStore.messages[key]}`}</span>
                </li>
            );
        });
        return (
            <div className='App'>
                <header className='App-header'>
                    <img src={logo} className='App-logo' alt='logo' />
                    <h3>Sistema de status usando Redux (futuramente Redux Thunk pra linkar fotos da web)</h3>
                    <div>
                        <span style={{ margin: 20 }}>Digite um usuário de destino</span>
                        <input
                            placeholder='Digite um usuário...'
                            type='text'
                            value={this.state.user}
                            onChange={(event: any) => this.updateInput(event.target.value, UpdateTarget.user)}
                        />
                    </div>
                    <div>
                        <span style={{ margin: 20 }}>Digite uma mensagem</span>
                        <input
                            placeholder='Digite sua mensagem...'
                            type='text'
                            value={this.state.message}
                            onChange={(event: any) => this.updateInput(event.target.value, UpdateTarget.message)}
                        />
                    </div>
                    <div>
                        <button
                            style={{ margin: 20 }}
                            onClick={() => this.props.saveMessage(this.state.user, this.state.message)}
                        >
                            Send
                        </button>
                        <button style={{ margin: 20 }} onClick={this.props.clearMessages}>
                            Clear
                        </button>
                    </div>
                    <ul>{items}</ul>
                </header>
            </div>
        );
    }

    sendMessage = (user: string, message: string) => {};

    updateInput = (data: any, target: UpdateTarget) => {
        switch (target) {
            case UpdateTarget.user:
                this.setState((previousState: State) => ({
                    ...previousState,
                    user: data
                }));
                return;
            case UpdateTarget.message:
                this.setState((previousState: State) => ({
                    ...previousState,
                    message: data
                }));
                return;
            default:
                return;
        }
    };
}
export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(App);
