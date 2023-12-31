import { storeSearchHistory } from '@/store/searchHistory'
import { useRedirect } from '@/hooks/useRedirect'

export const SearchHistory = () => {

  const { searchHistory } = storeSearchHistory()
  
  const { toRedirect } = useRedirect()

  const handleSearchHistoryRedirect = (event: React.MouseEvent | React.KeyboardEvent, keyword: string) => {
    if (event.ctrlKey) {
      toRedirect(keyword, true)
    } else {
      toRedirect(keyword)
    }
  }

  return (
    <div
      className='mt-3 h-[56vh] overflow-x-hidden'
    >
      <div
        className='flex flex-wrap gap-2 p-1'
      >
        {
        searchHistory?.map((item) => (
          <div
            className='cursor-pointer rounded-sm px-2 py-1 text-sm duration-200 hover:bg-neutral-700 dark:bg-neutral-800'
            key={item.keyword}
            onClick={(e) => handleSearchHistoryRedirect(e, item.keyword)}
          >
            {item.keyword}
          </div>
        ))
      }
      </div>
    </div>
  )
} 