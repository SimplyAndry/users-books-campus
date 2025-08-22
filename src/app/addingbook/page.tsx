'use client';

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { useBookForm } from "@/hooks/useBookForm";
import { HandleNotLogged } from "@/components/handlenotlogged";
import { useHydratedAuth } from "@/hooks/usehydratedauth";
import { Skeleton } from "@/components/ui/skeleton";

export default function AddingBookPage() {

  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
  } = useBookForm();

  const { user, hydrated } = useHydratedAuth();

  if (!hydrated) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#FFFFFF] to-[#FFEFBA]">
        <Skeleton className="h-24 w-24 rounded-full" />
      </div>
    );
  }

  if (!user?.id) {
    return (
      HandleNotLogged()
    );
  }

  return (
    <main className="flex min-h-screen p-4 bg-gradient-to-br from-[#FFFFFF] to-[#FFEFBA]">
      <aside className="w-64 mr-4">
        <SidebarProvider>
          <AppSidebar />
        </SidebarProvider>
      </aside>

      <div className="flex-1 relative">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Add New Book</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <div>
              <label className="block mb-1 font-medium">Title</label>
              <input
                {...register("name", { required: "Title is required" })}
                type="text"
                className="w-full border rounded px-3 py-2"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Description</label>
              <input
                {...register("description", { required: "Description is required" })}
                type="text"
                className="w-full border rounded px-3 py-2"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Image URL</label>
              <input
                {...register("picture", {
                  required: "Image URL is required",
                  pattern: {
                    value: /^https?:\/\/.+/,
                    message: "Please enter a valid URL"
                  }
                })}
                type="url"
                className="w-full border rounded px-3 py-2"
              />
              {errors.picture && (
                <p className="text-red-500 text-sm mt-1">{errors.picture.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Buy URL</label>
              <input
                {...register("buyUrl", {
                  required: "Buy URL is required",
                  pattern: {
                    value: /^https?:\/\/.+/,
                    message: "Please enter a valid URL"
                  }
                })}
                type="url"
                className="w-full border rounded px-3 py-2"
              />
              {errors.buyUrl && (
                <p className="text-red-500 text-sm mt-1">{errors.buyUrl.message}</p>
              )}
            </div>

            {/* sellerId è hidden, viene già gestito da defaultValues */}
            <input {...register("sellerId")} type="hidden" />

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
