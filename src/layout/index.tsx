import Header from '@/layout/Header'
import Aside from '@/layout/Aside'
import Main from '@/layout/Main'
import Footer from '@/layout/Footer'

export default function Shared() {
  return (
    <div
      className='flex h-screen w-screen overflow-hidden dark:bg-neutral-900'
    >
      <div
        className='flex flex-1 flex-col'
      >
        <div
          className='flex-1'
        >
          <Main />
        </div>
      </div>
    </div>
  )
}