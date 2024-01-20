import { ModeToggle } from '@/components/Toggletheme';
import { Button } from '@/components/ui/button'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();
  return (
    <div
      className="relative h-screen w-screen flex justify-center items-center flex-col dark:bg-black dark:text-white"
      suppressHydrationWarning
    >
      <p className="font-bold text-2xl m-4">
        Built with ConnectKit, AAVE, Chainlink CCIP for LFGHO
      </p>
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <Button onClick={() => router.push("/connectwallet")}>Get Started</Button>
    </div>
  )
}
