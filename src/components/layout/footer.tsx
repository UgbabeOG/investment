import Link from 'next/link';
import { Logo } from '@/components/icons';

export function AppFooter() {
  return (
    <footer className="border-t bg-background sm:pl-14">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-semibold">CoinSnap</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CoinSnap. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
