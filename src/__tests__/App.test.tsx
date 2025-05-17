import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

jest.mock('../pages/LoginPage', () => () => <div>Login Page</div>);
jest.mock('../pages/Dashboards/Admin', () => () => <div>Admin Dashboard</div>);
jest.mock('../components/ProtectedRoutes', () => ({ children }: any) => <>{children}</>);

describe('App', () => { 
  it('renders the LoginPage on the root route', () => {
    render(<App />);
    expect(screen.getByText(/login page/i)).toBeInTheDocument();
  });

  it('renders Admin Dashboard on /admin-dashboard', () => {
    window.history.pushState({}, '', '/admin-dashboard');
    render(<App />);
    expect(screen.getByText(/admin dashboard/i)).toBeInTheDocument();
  });

  it('renders 404 for unknown route', () => {
    window.history.pushState({}, '', '/unknown/path');
    render(<App />);
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });
});