import '../styles/App.css';
import Resume from './Resume';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { Login } from './Login';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Login />
        <Resume />
      </div>
    </Provider>
  );
}

export default App;
