import './App.css';
import Dashboard from './components/Dashboard/Dashboard';

function App({fbApp}) {
  return (
    <div className="App">
      <Dashboard fbApp={fbApp}/>
    </div>
  );
}

export default App;
