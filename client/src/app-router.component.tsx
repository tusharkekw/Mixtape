import LoginScreen from 'Login/login.component';
import MainScreen from 'main/components/home-screen.component';
import ProtectedRoute from 'main/components/protected-route.component';
import UnAuthenticatedRoute from 'main/components/unauthenticated-route.component';
import { Route, Routes } from 'react-router-dom';
import TransferProgress from 'stepper/components/transfer-progress.component';
import TransferComponent from 'stepper/components/transfer.component';

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainScreen />}></Route>
        <Route path="/login" element={<UnAuthenticatedRoute element={<LoginScreen />} />} />
        <Route
          path="/transfer"
          element={<ProtectedRoute element={<TransferComponent />} />}
        />
        <Route
          path="/transfer/progress/:jobId"
          element={<ProtectedRoute element={<TransferProgress />} />}
        />
      </Routes>
    </>
  );
};

export default AppRouter;
