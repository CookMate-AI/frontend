import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Image from 'next/image';

interface FindModalProps {
  type: 'id' | 'password';
  onClose: () => void;
}

export default function FindModal({ type, onClose }: FindModalProps) {
  return (
    <div
      className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-40"
      onClick={onClose}
    >
      <div className="relative h-536 w-632 rounded-24 border-2 border-orange-400 bg-beige-200 p-24 shadow-lg">
        <Image
          src="/icons/ic-close.svg"
          alt="close"
          width={18}
          height={18}
          className="absolute right-24 cursor-pointer"
          onClick={onClose}
        />
        <div className="flex items-center justify-center gap-8 text-20 font-bold">
          {type === 'id' ? <p>아이디</p> : <p>비밀번호</p>}
          <p>찾기</p>
        </div>
        {type === 'id' ? (
          <div className="mt-30 flex h-420 w-full flex-col items-center justify-center gap-30 rounded-20 bg-white p-24">
            <div className="flex w-full items-center gap-16">
              <Input type="email" placeholder="이메일을 입력해주세요" className="h-45 flex-grow" />
              <Button
                label="인증번호 발송"
                className="h-35 w-105 flex-shrink-0 text-12"
                variant="outlinePrimary"
              />
            </div>
            <div className="flex w-full items-center gap-16">
              <Input type="text" placeholder="인증번호를 입력해주세요" className="h-45 flex-grow" />
              <Button
                label="확인"
                className="h-35 w-105 flex-shrink-0 text-12"
                variant="outlinePrimary"
              />
            </div>
            <Button label="찾기" className="h-40 w-120" />
          </div>
        ) : (
          <div className="mt-30 flex h-420 w-full flex-col items-center justify-center gap-30 rounded-20 bg-white p-24">
            <div className="flex w-full items-center gap-16">
              <Input type="email" placeholder="이메일을 입력해주세요" className="h-45 flex-grow" />
            </div>
            <div className="flex w-full items-center gap-16">
              <Input type="text" placeholder="아이디를 입력해주세요" className="h-45 flex-grow" />
            </div>
            <Button label="찾기" className="h-40 w-120" />
          </div>
        )}
      </div>
    </div>
  );
}
