import { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import NavImagePic from "./NavImagePic"
import { useDispatch } from 'react-redux';
import { setBgImage } from '@/features/backgroundSlice'; 

export function NavBackgroundPic() {
  const [base64Bg, setBase64Bg] = useState('');

  const dispatch = useDispatch();

  const bgImageGet = (base64: string) => {
    setBase64Bg(base64);
  };

  const handleBackgroundChange = () => {
    dispatch(setBgImage(base64Bg));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Bg Choice</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>배경을 골라봅시다.</DialogTitle>
          <DialogDescription>
            배경은 가능한 한 큰 이미지로 골라주세요.!
          </DialogDescription>
        </DialogHeader>
        <NavImagePic onChange={bgImageGet}/>
        <Button onClick={handleBackgroundChange}>Change</Button>
      </DialogContent>
    </Dialog>
  )
}
