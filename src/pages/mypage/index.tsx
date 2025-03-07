import EditProfile from '@/components/Mypage/EditProfile';
import MyRecipes from '@/components/Mypage/MyRecipes';
import Image from 'next/image';
import { useState } from 'react';
import useNicknameStore from '@/stores/useNicknameStore';

export default function Mypage() {
  const [activeTab, setActiveTab] = useState('recipes');
  const { nickname } = useNicknameStore();

  return (
    <div className="flex gap-30 px-40 py-60 lg:gap-70 lg:px-80 lg:py-100">
      <div className="h-260 w-230 min-w-100 overflow-hidden rounded-10 border-2 border-gray-400 bg-white lg:h-430">
        <div className="flex h-160 w-full flex-col items-center justify-center gap-24 border-b-2 border-gray-400 lg:h-270">
          <div className="relative h-50 w-50 lg:h-85 lg:w-85">
            <Image src={'/icons/ic-profile-black.svg'} alt="profile" fill />
          </div>
          <p className="text-16 font-bold lg:text-20">{nickname}</p>
        </div>
        <div
          className={`flex h-50 w-full cursor-pointer items-center justify-center border-b-2 border-gray-400 text-14 font-bold hover:bg-orange-200 lg:h-80 lg:text-24 ${
            activeTab === 'recipes' ? 'bg-orange-200' : ''
          }`}
          onClick={() => setActiveTab('recipes')}
        >
          나의 레시피
        </div>
        <div
          className={`flex h-50 w-full cursor-pointer items-center justify-center rounded-b-10 pb-2 text-14 font-bold hover:bg-orange-200 lg:h-80 lg:text-24 ${
            activeTab === 'profile' ? 'bg-orange-200' : ''
          }`}
          onClick={() => setActiveTab('profile')}
        >
          개인정보 수정
        </div>
      </div>
      <div className="h-780 w-1000 overflow-y-auto rounded-10 border-2 border-gray-400 bg-white scrollbar-hide lg:h-850">
        {activeTab === 'recipes' ? <MyRecipes /> : <EditProfile />}
      </div>
    </div>
  );
}
