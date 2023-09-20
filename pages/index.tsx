import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Home } from '@/components/features/home';
import { Template } from '@/components/shared/layouts';

const inter = Inter({ subsets: ['latin'] })

function HomePage() {
  return (
    <Template>
      <Home/>
    </Template>
  )
}

HomePage.auth = false;
export default HomePage;