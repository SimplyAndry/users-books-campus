import { useForm } from "react-hook-form";
import { useAuthStore } from "@/src/store/useUserStore";
import { useEffect } from "react";
import { Api } from "@/src/lib/api";
import { toast } from "sonner";

export interface BookFormData {
  name: string;
  description: string;
  picture: string;
  buyUrl: string;
  sellerId: string;
}

export function useBookForm() {
  const user = useAuthStore((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BookFormData>({
    defaultValues: {
      sellerId: "",
    },
  });
  useEffect(() => {
    if (user?.id){
      reset((prev) => ({
        ...prev, 
        sellerId: user.id,
      }));
    }
  }, [user?.id, reset]);

  const onSubmit = async (data: BookFormData) => {
    try {
      const id = crypto.randomUUID();
      const createdAt = new Date().toISOString();
  
      await Api.createArticle({
        id,
        createdAt,
        name: data.name,
        description: data.description,
        picture: data.picture,
        buyUrl: data.buyUrl,
        sellerId: data.sellerId,
      });
  
      reset();
      toast.success("Book created successfully");
      window.location.href = "/books";
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    user,
  };
}