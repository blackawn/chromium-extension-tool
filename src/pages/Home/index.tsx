import { Search } from './component/Search'
import { SearchHistory } from './component/SearchHistory'

export default function Home() {
  return (
    <div
      className='flex h-full'
    >
      <div
        className='mt-80 flex w-[466px] flex-col'
      >
        <Search />
        <SearchHistory />
      </div>
    </div>
  )
}