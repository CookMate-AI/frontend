import Image from 'next/image';
import { useRouter } from 'next/router';
import useDropdownStore from '@/stores/useDropdownStore';
import Dropdown from './Dropdown';

export default function Gnb() {
  const router = useRouter();
  const { openDropdown } = useDropdownStore();

  const hideProfilePages = ['/login', '/signup'];

  const pushRecipesPages = ['/'];

  const isHideProfile = hideProfilePages.includes(router.pathname);

  const isHidePushRecipes = pushRecipesPages.includes(router.pathname);

  const handleMove = () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      router.push('/recipes');
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="flex h-50 w-full items-center justify-between bg-orange-400 px-24 py-16 lg:h-100">
      <div
        className="flex cursor-pointer items-center justify-center text-16 text-navy lg:text-20"
        onClick={() => router.push('/')}
      >
        <div className="relative h-40 w-40 lg:h-80 lg:w-80">
          <Image src={'/icons/ic-logo.svg'} alt="logo" fill className="object-contain" />
        </div>
        <div>Cook Mate</div>
        {isHidePushRecipes && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleMove();
            }}
            className="ml-20 h-full text-13 text-navy lg:ml-30 lg:text-16"
          >
            이용하기
          </div>
        )}
      </div>
      {!isHideProfile && (
        <div className="relative h-50 w-50 lg:h-80 lg:w-80">
          <Image
            src={'/icons/ic-profile.svg'}
            alt="profile"
            fill
            className="cursor-pointer object-contain"
            onClick={openDropdown}
          />
          <Dropdown />
        </div>
      )}
    </div>
  );
}
