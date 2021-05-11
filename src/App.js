import React from 'react'
import Header from './components/Header'
import { Route } from 'react-router-dom'
import Footer from './components/Footer'
import Category from './components/Category'
import Science from './components/Science'
import Maths from './components/Maths'
import Plants from './components/Plants';
import Tech from './components/Tech';

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Route path='/' component={Category} exact />
        <Route path='/Science' component={Science} />
        <Route path='/Maths' component={Maths} />
        <Route path='/Plants' component={Plants} />
        <Route path='/Tech' component={Tech} />
      </main>
      <Footer />
    </>
  );
}

export default App;
