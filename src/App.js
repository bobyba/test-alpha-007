import { connect } from 'react-redux'
import { getTopCoinsThunk } from './redux/thunk'

import { ReactComponent as HeartIcon } from './assets/heart.svg'
import { ReactComponent as HeartIconBold } from './assets/heartBold.svg'
import { ReactComponent as SearchIcon } from './assets/search.svg'
import { useCallback, useEffect } from 'react'
import { useDynamicList, useToggle } from 'ahooks'

function App({ getTopCoinsThunk, coins }) {
  useEffect(() => {
    coins.length === 0 && getTopCoinsThunk()
    coins.length !== 0 && resetList(coins.slice(0, 17))
  }, [coins])

  const { list, replace, resetList, remove } = useDynamicList()
  const [state, { toggle }] = useToggle()

  const renderList = useCallback(() => {
    return list
      .map((data, i) => {
        const { id, symbol, name, priceUsd, statusLike } = data

        const item = (
          <li key={id} className='px-4 py-2 border-b border-gray-200 flex gap-4'>
            <div className='w-10'>{symbol}</div>
            <div className='w-28'>{name}</div>
            <div className='w-16'>{priceUsd.match(/^\d+\.?\d{0,2}/)}</div>
            <div className='w-8 flex justify-end cursor-pointer'>
              {!statusLike ? (
                <HeartIcon
                  onClick={() => {
                    replace(i, { ...data, statusLike: !statusLike })
                  }}
                />
              ) : (
                <HeartIconBold
                  onClick={() => {
                    replace(i, { ...data, statusLike: !statusLike })
                  }}
                />
              )}
            </div>
            <div
              className='w-4 flex justify-end cursor-pointer'
              onClick={() => {
                remove(i)
              }}
            >
              X
            </div>
          </li>
        )

        return state ? statusLike && item : item
      })
      .filter((item) => typeof item === 'object')
  }, [list, state])

  return (
    <div className='h-screen w-screen flex justify-center items-center gap-6'>
      <ul className='bg-white rounded-lg border border-gray-200 text-gray-900 select-none'>
        {renderList().length !== 0 ? (
          renderList()
        ) : (
          <li className='px-6 py-2 border-b border-gray-200'>
            <div className='w-80 text-center'>No Data</div>
          </li>
        )}
      </ul>
      <div>
        <SearchIcon
          onClick={() => {
            toggle()
          }}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({ coins: state.main_info.coins })

const mapDispatchToProps = { getTopCoinsThunk }

export default connect(mapStateToProps, mapDispatchToProps)(App)
