import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Main from './Pages/Main';
import User from './Pages/User';

const Routes = createAppContainer(
    createStackNavigator(
        {
            Main,
            User,
        },
        {
            headerBackTitleVisible: false,
            headerLayoutPreset: 'center',
            defaultNavigationOptions: {
                headerStyle: {
                    backgroundColor: '#7159c1',
                },
                headerTintColor: '#fff',
            },
        }
    )
);

export default Routes;

// Importante deixar TODAS as páginas dentro do container
