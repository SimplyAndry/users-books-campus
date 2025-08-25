'use client'
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Api } from "@/src/lib/api";
import { useAuthStore } from "@/src/store/useUserStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function DeleteButton({ id, sellerId }: { id: string, sellerId: string }) {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  async function deleteBook() {
    await Api.deleteArticle(id);
    toast.success("Book deleted successfully");
    router.push("/books");
  }

  if (!id) {
    toast.error("Book ID is required for deletion.");
    return null;
  }

  if (user?.id === sellerId) {
    return (
      <Button onClick={() => deleteBook()} variant="destructive" size="lg" className="w-sm h-12 bg-red-600">
        <Trash2 className="w-4 h-4 mr-2" />
        <span className="text-xl">Delete Book</span>
      </Button>
    );
  } else {
    return null;
  }
}

export default DeleteButton;