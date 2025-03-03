import Image from 'next/image';
import { useRouter } from 'next/router';
import useDropdownStore from '@/stores/useDropdownStore';
import Dropdown from './Dropdown';

export default function Gnb() {
  const router = useRouter();
  const { openDropdown } = useDropdownStore();

  const hideProfilePages = ['/login', '/signup'];

  const isHideProfile = hideProfilePages.includes(router.pathname);

  return (
    <div className="flex h-50 w-full items-center justify-between bg-orange-400 px-24 py-16 lg:h-100">
      <div
        className="flex cursor-pointer items-center justify-center text-16 lg:text-20 text-navy"
        onClick={() => router.push('/')}
      >
        <div className="relative h-40 w-40 lg:h-80 lg:w-80">
          <Image src={'/icons/ic-logo.svg'} alt="logo" fill className="object-contain" />
        </div>
        <div>Cook Mate</div>
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
