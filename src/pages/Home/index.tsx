import { Search } from './component/Search'
import { SearchHistory } from './component/SearchHistory'

export default function Home() {
  return (
    <div
      className='flex h-full'
    >
      <div
        className='mt-80'
      >
        <Search />
        <SearchHistory />
      </div>
    </div>
  )
}