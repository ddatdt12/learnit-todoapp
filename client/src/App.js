import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import ProtectedRoute from './component/Routing/ProtectedRoute';
import About from './pages/About';
import { AuthProvider } from './contexts/AuthContext';
import { PostContextProvider } from './contexts/PostContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route
            exact
            path='/login'
            render={(props) => <Auth {...props} authRoute='login' />}
          />
          <Route
            exact
            path='/register'
            render={(props) => <Auth {...props} authRoute='register' />}
          />
          <ProtectedRoute exact path='/about' component={About} />
          <PostContextProvider>
            <ProtectedRoute exact path='/dashboard' component={Dashboard} />
          </PostContextProvider>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
