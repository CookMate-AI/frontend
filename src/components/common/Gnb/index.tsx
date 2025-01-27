import Image from 'next/image';
import { useRouter } from 'next/router';
import useDropdownStore from '@/stores/useDropdownStore';
import Dropdown from './Dropdown';

export default function Gnb() {
  const router = useRouter();
  const { openDropdown } = useDropdownStore();

  return (
    <div className="flex h-100 w-full items-center justify-between bg-orange-400 px-24 py-16">
      <div
        className="flex cursor-pointer items-center justify-center text-20 text-navy"
        onClick={() => router.push('/')}
      >
        <Image src={'/icons/ic-logo.svg'} alt="logo" width={80} height={80} />
        <div>Cook Mate</div>
      </div>
      <div className="relative">
        <Image
          src={'/icons/ic-profile.svg'}
          alt="profile"
          width={80}
          height={80}
          className="cursor-pointer"
          onClick={openDropdown}
        />
        <Dropdown />
      </div>
    </div>
  );
}
