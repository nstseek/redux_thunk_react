import React from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import {
    MessagesState,
    SaveMessageAction,
    ClearMessagesAction,
    SaveAddressAction,
    MessagesActionsReturn,
    CepActionsReturn,
    AddressState,
    CepPayload
} from './stores/messagesStore';
import { Dispatch } from 'redux';
import { AppState } from '.';

enum UpdateTarget {
    message = 0,
    user,
    cep,
    image
}

interface State {
    message: string;
    user: string;
    cep: string;
    image: string;
}

interface Props {
    messagesStore: MessagesState;
    addressStore: AddressState;
    saveMessage(user: string, message: string, image: string): MessagesActionsReturn;
    clearMessages(): MessagesActionsReturn;
    getAddress(user: string, cep: string);
}

const mapStoreToProps = (state: AppState) => ({
    messagesStore: state.messagesReducer,
    addressStore: state.addressReducer
});

const mapDispatchToProps = (dispatch: Dispatch<MessagesActionsReturn | CepActionsReturn>) => ({
    saveMessage: (user: string, message: string, image: string) => dispatch(SaveMessageAction(user, message, image)),
    clearMessages: () => dispatch(ClearMessagesAction()),
    getAddress: (user: string, cep: string) => SaveAddressAction(dispatch, user, cep)
});

class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            message: '',
            user: '',
            cep: '',
            image: ''
        };
    }

    render() {
        const stateProps = Object.keys(this.props.messagesStore.messages);
        const items = stateProps.map((key: string) => {
            return (
                <li className='list-item' key={`${key} list container`}>
                    <div className='item-container' key={`${key} container`}>
                        <img
                            alt={`${key} profile pic`}
                            key={`${key} profile pic`}
                            src={this.props.messagesStore.messages[key].image}
                            className='profile-pic'
                        />
                        <div key={`${key} data`} className='user-data'>
                            <span className='user-text' key={`${key} username}`}>
                                {key}
                            </span>
                            <span className='user-text status' key={`${key} status`}>
                                {this.props.messagesStore.messages[key].message}
                            </span>
                        </div>
                        {this.parseAddress(this.props.addressStore.addresses[key].address, key)}
                    </div>
                </li>
            );
        });
        return (
            <div className='App'>
                <header className='App-header'>
                    <img src={logo} className='App-logo' alt='logo' />
                    <h3>Sistema de status e endereco usando Redux, Redux-Thunk e TypeScript</h3>
                    <div>
                        <span style={{ margin: 20 }}>Digite seu usuário</span>
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
                        <span style={{ margin: 20 }}>Digite uma URI para sua foto de perfil</span>
                        <input
                            placeholder='Digite a URI...'
                            type='text'
                            value={this.state.image}
                            onChange={(event: any) => this.updateInput(event.target.value, UpdateTarget.image)}
                        />
                    </div>
                    <div>
                        <span style={{ margin: 20 }}>Digite seu cep</span>
                        <input
                            placeholder='Digite seu cep...'
                            type='text'
                            value={this.state.cep}
                            onChange={(event: any) => this.updateInput(event.target.value, UpdateTarget.cep)}
                        />
                    </div>
                    <div>
                        <button style={{ margin: 20 }} onClick={this.saveUser}>
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

    parseAddress = (obj: CepPayload, key: string) => {
        const userAddress = this.props.addressStore.addresses[key].address
        return obj.cep ? (
            <div key={`${key} address`} className='address-data'>
                <span className='address-text' key={`${key} street`}>
                    {`${userAddress.logradouro}, ${userAddress.bairro}`}
                </span>
                <span className='address-text' key={`${key} state`}>
                    {`${userAddress.localidade} - ${userAddress.uf}`}
                </span>
                <span className='address-text' key={`${key} country`}>
                    Brasil
                </span>
            </div>
        ) : <span className='address-data'>{obj.errorMsg}</span>;
    };

    saveUser = () => {
        this.props.saveMessage(this.state.user, this.state.message, this.state.image);
        this.props.getAddress(this.state.user, this.state.cep);
    };

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
            case UpdateTarget.cep:
                this.setState((previousState: State) => ({
                    ...previousState,
                    cep: data
                }));
                return;
            case UpdateTarget.image:
                this.setState((previousState: State) => ({
                    ...previousState,
                    image: data
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
