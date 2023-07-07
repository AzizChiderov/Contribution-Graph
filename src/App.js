import './App.css';
import Contribution from './components/Contribution/index';
import { Month } from './components/month/index'
import { Day } from './components/weekday/index'

function App() {
  return (
    <div>
      <Contribution />
      <Month />
      <Day />
    </div>
  );
}

export default App;
