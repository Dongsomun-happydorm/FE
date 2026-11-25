import { BrowserRouter, Routes, Route } from 'react-router-dom'

import SharingMapPage from '@/pages/SharingMapPage'
import Mypage from '@/pages/Mypage'
import SharingRegisterPage from '@/pages/SharingRegisterPage'
import SharingListPage from '@/pages/SharingListPage'
import SharingProvider from '@/data/SharingProvider'

export default function App() {
  return (
    <BrowserRouter>
      <SharingProvider>
        <Routes>
          <Route path="/" element={<SharingMapPage />} />
          <Route path="/list" element={<SharingListPage />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/register" element={<SharingRegisterPage />} />
        </Routes>
      </SharingProvider>
    </BrowserRouter>
  )
}
