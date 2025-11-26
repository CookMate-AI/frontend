import { FeatureSection } from '@/features/home/components/FeatureSection';
import { HeroSection } from '@/features/home/components/HeroSection';
import { StartButton } from '@/features/home/components/StartButton';
import { useHomeNavigation } from '@/features/home/hooks/useHomeNavigation';

export default function Index() {
  const { handleMove } = useHomeNavigation();

  return (
    <div className="relative flex flex-col items-center justify-center">
      <HeroSection />
      <FeatureSection />
      <StartButton onClick={handleMove} />
    </div>
  );
}
