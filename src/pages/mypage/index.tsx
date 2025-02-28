import EditProfile from '@/components/Mypage/EditProfile';
import MyRecipes from '@/components/Mypage/MyRecipes';
import Image from 'next/image';
import { useState } from 'react';
import useNicknameStore from '@/stores/useNicknameStore';

export default function Mypage() {
  const [activeTab, setActiveTab] = useState('recipes');
  const { nickname } = useNicknameStore();

  return (
    <div className="flex gap-70 px-80 py-100">
      <div className="h-430 w-230 overflow-hidden rounded-10 border-2 border-gray-400 bg-white">
        <div className="flex h-270 w-full flex-col items-center justify-center gap-24 border-b-2 border-gray-400">
          <Image src={'/icons/ic-profile-black.svg'} alt="profile" width={85} height={85} />
          <p className="text-20 font-bold">{nickname}</p>
        </div>
        <div
          className={`flex h-80 w-full cursor-pointer items-center justify-center border-b-2 border-gray-400 text-24 font-bold hover:bg-orange-200 ${
            activeTab === 'recipes' ? 'bg-orange-200' : ''
          }`}
          onClick={() => setActiveTab('recipes')}
        >
          나의 레시피
        </div>
        <div
          className={`flex h-80 w-full cursor-pointer items-center justify-center rounded-b-10 text-24 font-bold hover:bg-orange-200 ${
            activeTab === 'profile' ? 'bg-orange-200' : ''
          }`}
          onClick={() => setActiveTab('profile')}
        >
          개인정보 수정
        </div>
      </div>
      <div className="h-850 w-1000 overflow-y-auto rounded-10 border-2 border-gray-400 bg-white scrollbar-hide">
        {activeTab === 'recipes' ? <MyRecipes /> : <EditProfile />}
      </div>
    </div>
  );
}
