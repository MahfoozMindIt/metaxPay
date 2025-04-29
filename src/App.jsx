import { lazy, Suspense } from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import './App.css'
import Loader from './components/Loader';
import Layout from './Layout'
import ScrollToTop from './components/Scroll';
import Blog from './pages/CreateBlog';
import GetBlog from './pages/GetBlog';
import SingleBlog from './pages/SingleBlog';
import UpdateBlog from './pages/UpdateBlog';

const Home=lazy(()=>import('./pages/Home'));


function App() {

  return (
    <Router>
      <ScrollToTop>
      <Suspense fallback={<Loader/>}/>
        <Routes>
        <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='/create-blog' element={<Blog/>}/>
        <Route path='/all-blogs' element={<GetBlog/>}/>
        <Route path='/blog/:slug' element={<SingleBlog/>}/>
        <Route path='/update-blog/:slug' element={<UpdateBlog/>}/>
       
        </Route>
      </Routes></ScrollToTop>
    </Router>
  )
}

export default App
