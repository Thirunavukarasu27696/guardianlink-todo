import { Provider } from 'react-redux';
import './App.scss';

import Routing from './components/Routing';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Routing />
      </div>
    </Provider>

  );
}

export default App;
