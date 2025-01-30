import './App.css';
import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'; // Provider를 임포트
import store from './store'; // store를 임포트

import NavBar from './components/views/NavBar/NavBar';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import IndexPage from './components/views/IndexPage';
import MovieDetail from './components/MovieDetail/MovieDetail';
import FavoritePage from './components/views/FavoritePage/FavoritePage'
import Auth from './hoc/auth';

function App() {
    // option:
    // null -> 누구나 접근 가능한 페이지
    // true -> 로그인한 사용자만 접근 가능한 페이지
    // false -> 로그인한 사용자는 접근할 수 없는 페이지
  //const ProtectedIndexgPage = Auth(IndexPage, null)
  const ProtectedLandingPage = Auth(LandingPage, null)
  const ProtectedLoginPage = Auth(LoginPage, false)
  const ProtectedRegisterPage = Auth(RegisterPage, false)
  const ProtectedrMovieDetailPage = Auth(MovieDetail, true)
  const ProtectedrFavoritePage = Auth(FavoritePage, true)
  
  return (
    <Provider store={store}> {/* Provider로 애플리케이션 감싸기 */}
      <BrowserRouter>
        <div>
          <NavBar/>
          <Routes>
            {/* <Route path="/" element={<LandingPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage/>} /> */}

            {/* <Route path="/" element={Auth(LandingPage,null)} />
            <Route path="/login" element={Auth(LoginPage,false)} />
            <Route path="/register" element={Auth(RegisterPage, false)} />  */}
      
            {/* <Route path="/" element={<Auth SpecificComponent={LandingPage} option={null} />} />
            <Route path="/login" element={<Auth SpecificComponent={LoginPage} option={false} />} />
            <Route path="/register" element={<Auth SpecificComponent={RegisterPage} option={false} />} />
            */}
         
            <Route path="/" element={<LandingPage />} />  {/*메인페이지 권한 필요 없음음*/}
            <Route path="/login" element={<ProtectedLoginPage />} />
            <Route path="/register" element={<ProtectedRegisterPage />} />
            <Route path="/movie/:movieId" element={<ProtectedrMovieDetailPage />} />
            <Route path="/favorite" element={<ProtectedrFavoritePage />} />

          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
