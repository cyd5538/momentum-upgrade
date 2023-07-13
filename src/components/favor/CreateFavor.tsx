import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";
import { Favor } from "@/types/type";
import { toast } from "react-hot-toast";
import { Edit } from "lucide-react";

interface handleFavorChangeProps {
  title?: string
  setFavorList: React.Dispatch<React.SetStateAction<Favor[]>>;
  id?: string
  link?: string
  text?: string
  image?: string
}

const CreateFavor: React.FC<handleFavorChangeProps> = ({ title, setFavorList, id, link, text, image }) => {
  const [favor, setFavor] = useState<Favor>({
    id: id || "",
    title: text || "",
    link: link || "",
    image: image || "",
    status: "high"
  });

  const handleFavorChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const uniqueId = Math.random().toString(16).slice(2);
    setFavor((prevFavor) => ({
      ...prevFavor,
      id: uniqueId,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (favor.title.length < 1 ||
      favor.link.length < 1
    ) {
      return toast.error("빈칸은 안됩니다");
    }

    if (!id) {
      setFavorList((prev) => {
        const list = [...prev, favor];
        localStorage.setItem("favor", JSON.stringify(list));
        return list;
      });

      toast.success("즐겨찾기에 추가했습니다.");

    } else {
      setFavorList((prev) => {
        const updatedList = prev.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              title: favor.title,
              link: favor.link,
              image: favor.image
            };
          }
          return item;
        });
        localStorage.setItem("favor", JSON.stringify(updatedList));
        return updatedList;
      });
      toast.success("즐겨찾기를 수정했습니다.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {title ?
          <Button variant="outline">{title}</Button> :
          <button className=" hover:bg-zinc-800 hover:text-white p-1 rounded-full"><Edit className="w-[16px] h-[16px]" /></button>
        }
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{id ? "즐겨찾기 수정" : "즐겨찾기"}</DialogTitle>
          <DialogDescription>
            {id ? "수정해주세요 " : "제목과 링크를 넣어주세요"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-left">
                제목
              </Label>
              <Input
                id="name"
                name="title"
                value={favor.title}
                onChange={handleFavorChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Link" className="text-left">
                링크주소
              </Label>
              <Input
                id="link"
                name="link"
                value={favor.link}
                onChange={handleFavorChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Link" className="text-left">
                이미지 주소
              </Label>
              <Input
                id="image"
                name="image"
                value={favor.image}
                onChange={handleFavorChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{!id ? "즐겨찾기 추가" : "수정"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFavor;
