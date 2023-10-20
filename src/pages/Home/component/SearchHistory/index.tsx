import { storeSearchHistory } from '@/store/searchHistory'

export const SearchHistory = () => {
  const { searchHistory } = storeSearchHistory()

  return (
    <div
      className='flex gap-4'
    >
      {
        searchHistory?.map((item) => (
          <div
            className='bg-neutral-700 px-2 py-1'
            key={item.keyword}
          >
            {item.keyword}
          </div>
        ))
      }
    </div>
  )
} 