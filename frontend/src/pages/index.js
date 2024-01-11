import { Button } from '@/components/ui/button'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();
  return (
    <div
      className="h-screen w-screen flex justify-center items-center flex-col"
      suppressHydrationWarning
    >
      <p className="font-bold text-2xl m-4">
        Get Started with Metamask Auth (Built with Wagmi)
      </p>
      <Button onClick={() => router.push("/connectwallet")}>Get Started</Button>
    </div>
  )
}
