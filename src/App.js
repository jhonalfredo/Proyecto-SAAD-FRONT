import logo from './logo.svg';
import './App.css';
import Menu from './components/Menu';
import MenuSimple from './components/MenuSimple';
import IniciarSesion from './components/IniciarSesion';
import ContenidoApp from './components/ContenidoApp';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function(config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

function App() {

  return (
    <div className="App">
      <ContenidoApp />
    </div>
  );
}

export default App;
