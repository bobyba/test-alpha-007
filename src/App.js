import { connect } from 'react-redux'
import { getAnimalsThunk } from './redux/thunk'

import { ReactComponent as HeartIcon } from './assets/heart.svg'
import { ReactComponent as HeartIconBold } from './assets/heartBold.svg'
import { ReactComponent as SearchIcon } from './assets/search.svg'
import { useCallback, useEffect, useMemo } from 'react'
import { useDynamicList, useToggle } from 'ahooks'

function App({ getAnimalsThunk, animals }) {
  useEffect(() => {
    animals.length === 0 && getAnimalsThunk()
    animals.length !== 0 && resetList(animals)
  }, [animals])

  const { list, replace, resetList, remove } = useDynamicList()
  const [state, { toggle }] = useToggle()

  const renderList = useMemo(() => {
    return list
      .map((data, i) => {
        const { id, image_link, name, statusLike } = data
        const item = (
          <li key={id} className='px-4 py-2 border-b border-gray-200 flex gap-4'>
            <div className='w-14'>
              <img src={image_link} className='h-14 w-14 rounded-lg border object-cover' alt='img' />
            </div>
            <div className='w-40 flex items-center'>{name}</div>
            <div className='w-8 flex justify-end items-center cursor-pointer'>
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
              className='w-4 flex justify-end items-center cursor-pointer'
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
        {renderList.length !== 0 ? (
          renderList
        ) : (
          <li className='px-6 py-2 border-b border-gray-200'>
            <div className='w-80 text-center'>No Data</div>
          </li>
        )}
      </ul>
      <div>
        <SearchIcon
          className='cursor-pointer'
          onClick={() => {
            toggle()
          }}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({ animals: state.main_info.animals })

const mapDispatchToProps = { getAnimalsThunk }

export default connect(mapStateToProps, mapDispatchToProps)(App)
