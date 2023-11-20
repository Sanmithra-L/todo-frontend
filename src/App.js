import './App.css';
import Register from './Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import TodoList from './TodoList';
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/users/:userId" element={<TodoList />} />
        </Routes>
      </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
