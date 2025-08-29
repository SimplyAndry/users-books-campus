'use client';
import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Api } from "@/src/lib/api";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAuthStore } from "@/src/store/useUserStore";
import { Input } from "@/components/ui/input";

type FormData = {
  name: string;
  picture: string;
  description: string;
  buyUrl: string;
};

export default function EditBook () {
  const params = useParams();
  const { user } = useAuthStore();
  const id = params?.id as string;
  const[ bookinfo, setBookinfo] = useState<FormData | null>(null);
  const router = useRouter();

  const { register, handleSubmit, reset, watch } = useForm<FormData>({
    defaultValues: {
      name: bookinfo?.name || '',
      picture: bookinfo?.picture || '',
      description: bookinfo?.description || '',
      buyUrl: bookinfo?.buyUrl || '',
    },
  });

  useEffect(() => {
    if (id) {
      const fetchBook = async () => {
        try {
          const data = await Api.getBookById(id);
          setBookinfo(data);
          reset(data);
        } catch (err) {
          console.error('Failed to fetch book:', err);
        }
      };
      fetchBook();
    }
  }, [id, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await Api.updateArticle(id, { title: data.name, description: data.description, picture: data.picture, buyUrl: data.buyUrl });
      toast.success('Book updated successfully');
      router.push(`/books/${id}`);
    } catch (err) {
      console.error('Failed to update book:', err);
      toast.error('Failed to update book');
    }
  };

  const watchedFields = watch();
  return (
    <main className="flex min-h-screen p-4 bg-gradient-to-br from-[#FFFFFF] to-[#FFEFBA]">
      <aside className="w-64 mr-4">
        <SidebarProvider>
          <AppSidebar />
        </SidebarProvider>
      </aside>

      <div className="flex-1 relative">
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto">
            <div className="space-y-4">
              <Input id="name" {...register('name')} value={bookinfo?.name} placeholder="Name" className="w-full border-none focus:ring-0 focus:ring-offset-0"/>
              <Input id="picture" {...register('picture')} value={bookinfo?.picture} placeholder="Picture" className="w-full border-none focus:ring-0 focus:ring-offset-0"/>
              <Input id="description" {...register('description')} value={bookinfo?.description} placeholder="Description" className="w-full border-none focus:ring-0 focus:ring-offset-0"/>
              <Input id="buyUrl" {...register('buyUrl')} value={bookinfo?.buyUrl} placeholder="Buy URL" className="w-full my-5 border-none focus:ring-0 focus:ring-offset-0"/>
            </div>
            <div className="flex justify-end gap-3">
              <Button type="submit" className="flex-1">Save</Button>
            </div>
          </form>
      </div>
    </main>
  )
}
