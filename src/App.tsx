import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './component/layout/layout'
import BoardList from './page/BoardListPage'
import BoardDetail from './page/BoardDetailPage'
import BoardWrite from './page/BoardWritePage'

function App() {

  return (
    <>
      <Layout>
        <Routes>
          <Route path='/' element={<BoardList />} />
          <Route path='/detail/:id' element={<BoardDetail />} />
          <Route path='/write' element={<BoardWrite />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
