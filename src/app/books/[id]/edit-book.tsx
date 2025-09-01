'use client';
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Api } from "@/src/lib/api";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type FormData = {
  name: string;
  picture: string;
  description: string;
  buyUrl: string;
};

type EditBookProps = {
  bookId: string;
  onClose?: () => void; // opzionale, utile se usi modal
};

export default function EditBook({ bookId, onClose }: EditBookProps) {
  const [bookinfo, setBookinfo] = useState<FormData | null>(null);
  const router = useRouter();
  const { register, handleSubmit, reset, watch } = useForm<FormData>({
    defaultValues: {
      name: "",
      picture: "",
      description: "",
      buyUrl: "",
    },
  });

  useEffect(() => {
    if (bookId) {
      const fetchBook = async () => {
        try {
          const data = await Api.getBookById(bookId);
          setBookinfo(data);
          reset(data);
        } catch (err) {
          console.error("Failed to fetch book:", err);
        }
      };
      fetchBook();
    }
  }, [bookId, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await Api.updateArticle(bookId, {
        name: data.name,
        description: data.description,
        picture: data.picture,
        buyUrl: data.buyUrl,
      });
      toast.success("Book updated successfully");
      if (onClose) onClose();
      router.refresh();
    } catch (err) {
      console.error("Failed to update book:", err);
      toast.error("Failed to update book");
    }
  };

  const watchedFields = watch();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-10">
      <div className="space-y-4">
        <div className="border border-gray-700 pb-2 rounded-md">
          <label htmlFor="name" className="w-24 text-sm text-gray-500 font-medium mb-1 px-4">Name</label><br />
          <input
            id="name"
            {...register("name")}
            defaultValue={bookinfo?.name}
            className="w-full px-2 py-2 text-xl font-semibold border-none outline-none focus:outline-none focus:ring-0 focus:ring-offset-0"
          />
        </div>

        <div className="border border-gray-700 pb-2 rounded-md">
          <label htmlFor="picture" className="w-24 text-sm text-gray-500 font-medium mb-1 px-4">Picture</label><br />
          <input
            id="picture"
            {...register("picture")}
            defaultValue={bookinfo?.picture}
            className="w-full px-2 py-2 font-semibold border-none outline-none focus:outline-none focus:ring-0 focus:ring-offset-0"
          />
        </div>

        <div className="border border-gray-700 pb-2 rounded-md">
          <label htmlFor="description" className="w-24 text-sm text-gray-500 font-medium mb-1 px-4">Description</label><br />
          <textarea
            id="description"
            {...register("description")}
            defaultValue={bookinfo?.description}
            className="w-full font-semibold px-2 py-2 border-none outline-none focus:outline-none focus:ring-0 focus:ring-offset-0"
          />
        </div>

        <div className="border border-gray-700 pb-2 rounded-md">
          <label htmlFor="buyUrl" className="w-24 text-sm text-gray-500 font-medium mb-1 px-4">Buy URL</label><br />
          <input
            id="buyUrl"
            {...register("buyUrl")}
            defaultValue={bookinfo?.buyUrl}
            className="w-full px-2 py-2 font-semibold border-none outline-none focus:outline-none focus:ring-0 focus:ring-offset-0"
          />
        </div>
      </div>

      <div className="mt-4 p-4 border rounded-md border-gray-700 bg-[#FFEFBA]">
        <h2 className="text-lg font-semibold mb-2">Preview Changes</h2>
        <p><strong>Name:</strong> <span className="truncate inline-block max-w-[280px] align-bottom">{watchedFields.name}</span></p>
        <p>
          <strong>Picture:</strong>
          <img src={watchedFields.picture || "/no-image-svgrepo-com.svg"} alt={watchedFields.name} className="w-50 h-32 rounded-md" />
        </p>
        <p><strong>Description:</strong> <span className="truncate inline-block max-w-[280px] align-bottom">{watchedFields.description}</span></p>
        <p><strong>Buy URL:</strong> <span className="truncate inline-block max-w-[280px] align-bottom">{watchedFields.buyUrl}</span></p>
      </div>

      <div className="flex justify-end py-4 gap-3">
        {onClose && (
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        )}
        <Button type="submit" className="flex-1">Save</Button>
      </div>
    </form>
  );
}