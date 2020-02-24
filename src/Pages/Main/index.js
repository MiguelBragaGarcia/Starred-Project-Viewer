import React, {Component} from 'react';
import {Keyboard, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage'; // Usa o banco de dados local do celular é como se fosse local storage tem até as funções similares
import PropTypes from 'prop-types';
import api from '../../services/api';
import {
    Container,
    Form,
    Input,
    SubmitButton,
    List,
    User,
    Avatar,
    Name,
    Bio,
    ProfileButton,
    ProfileButtonText,
} from './styles';

export default class Main extends Component {
    static navigationOptions = {
        title: 'Usuários',
    };

    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
        }).isRequired,
    };

    state = {
        newUser: '',
        users: [],
        loading: false,
    };

    async componentDidMount() {
        console.tron.log(this.props);
        const users = await AsyncStorage.getItem('users');
        if (users) {
            this.setState({users: JSON.parse(users)});
        }
    }

    componentDidUpdate(_, prevState) {
        const {users} = this.state;

        if (prevState !== users) {
            AsyncStorage.setItem('users', JSON.stringify(users));
        }
    }

    handleAddUser = async () => {
        const {newUser, users} = this.state;
        this.setState({
            loading: true,
        });
        const response = await api.get(`/users/${newUser}`);

        const data = {
            name: response.data.name,
            login: response.data.login,
            bio: response.data.bio,
            avatar: response.data.avatar_url,
        };

        this.setState({
            users: [...users, data],
            newUser: '',
            loading: false,
        });

        Keyboard.dismiss();
    };

    handleNavigate = user => {
        const {navigation} = this.props;

        navigation.navigate('User', {user});
    };

    render() {
        const {users, newUser, loading} = this.state;

        return (
            <Container>
                <Form>
                    <Input
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Adicionar usuário"
                        value={newUser}
                        onChangeText={text => this.setState({newUser: text})}
                        returnKeyType="send"
                        onSubmitEditing={this.handleAddUser}
                    />
                    <SubmitButton
                        loading={loading}
                        onPress={this.handleAddUser}>
                        {loading ? (
                            <ActivityIndicator color="#FFF" />
                        ) : (
                            <Icon name="add" size={20} color="#FFF" />
                        )}
                    </SubmitButton>
                </Form>

                <List
                    data={users}
                    // A partir desse momento todo nosso objeto users se chama item
                    keyExtractor={user => user.login}
                    // Pega de dentro de data o valor para o item
                    renderItem={({item}) => (
                        <User>
                            <Avatar source={{uri: item.avatar}} />
                            <Name>{item.name}</Name>
                            <Bio>{item.bio}</Bio>

                            <ProfileButton
                                onPress={() => this.handleNavigate(item)}>
                                <ProfileButtonText>
                                    Ver perfil
                                </ProfileButtonText>
                            </ProfileButton>
                        </User>
                    )}
                />
            </Container>
        );
    }
}
