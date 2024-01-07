import Header from './Header'
import Main from '@/layout/Main'
import texture from '@/assets/texture.png'

export default function Shared() {
  return (
    <div
      className='x h-screen w-screen overflow-hidden bg-neutral-100 dark:bg-neutral-900'
      style={{
        backgroundImage: `url(${texture})`
      }}
    >
      <div>
        <Header />
        <Main />
      </div>
    </div>
  )
}