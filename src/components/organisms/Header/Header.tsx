import { HeaderMenu } from '@/components/organisms/HeaderMenu'

const Header = () => {
  return (
    <>
      <div className="w-full mx-auto h-16 flex items-center justify-between bg-white dark:bg-gray-700 border-b dark:border-gray-600 sticky top-0 z-50">
        <div className="w-full flex justify-end px-8 ">
          <HeaderMenu />
        </div>
      </div>
    </>
  )
}

export default Header
