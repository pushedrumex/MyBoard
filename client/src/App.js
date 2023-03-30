import './App.css';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Write from './pages/Write'
import Detail from './pages/Detail'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <RecoilRoot>
          <Routes>
            <Route path='/' element={<Main />}></Route>
            <Route path='/write' element={<Write />}></Route>
            <Route path='/write/:id' element={<Write />}></Route>
            <Route path='/detail/:id' element={<Detail />}></Route>
          </Routes>
        </RecoilRoot>
      </BrowserRouter>
    </div>
  );
}

export default App;