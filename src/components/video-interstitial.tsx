'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type VideoInterstitialProps = {
  open: boolean;
  onClose: () => void;
};

export function VideoInterstitial({ open, onClose }: VideoInterstitialProps) {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (open) {
      setCountdown(5);
      const timer = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen && countdown === 0) onClose()}}>
      <DialogContent className="sm:max-w-[425px] p-0" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader className="p-4 pb-0">
          <DialogTitle>Sponsored Content</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <Image
            src="https://placehold.co/1600x900.png"
            width={1600}
            height={900}
            alt="Video Advertisement"
            className="w-full h-auto rounded-md"
            data-ai-hint="advertisement video"
          />
        </div>
        <DialogFooter className="p-4 pt-0">
          <Button onClick={onClose} disabled={countdown > 0}>
            {countdown > 0 ? `Skip in ${countdown}` : 'Close'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
