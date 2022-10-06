import React from 'react';
import { Provider } from 'react-redux';
import store from '@features/store';
import { NavigationContainer } from '@react-navigation/native';
import MainRouter from '@navigations/MainRouter';

const App = () => {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<MainRouter />
            </NavigationContainer>
		</Provider>
	);
};

export default App;
