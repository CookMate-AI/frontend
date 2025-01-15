import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Gnb() {
  const router = useRouter();

  return (
    <div className="h-100 flex w-full items-center justify-between bg-orange-400 px-24 py-16">
      <div
        className="text-20 flex cursor-pointer items-center justify-center text-navy"
        onClick={() => router.push('/')}
      >
        <Image src={'/icons/ic-logo.svg'} alt="logo" width={80} height={80} />
        <div>Cook Mate</div>
      </div>
      <Image
        src={'/icons/ic-profile.svg'}
        alt="profile"
        width={80}
        height={80}
        className="cursor-pointer"
      />
    </div>
  );
}
