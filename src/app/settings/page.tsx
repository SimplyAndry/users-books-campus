'use client';

import { Api } from "@/src/lib/api";
import { useAuthStore } from "@/src/store/useUserStore";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormData = {
  name: string;
  avatar: string;
  birthdate: string;
  password: string;
};

export default function SettingsPage() {
  const router = useRouter();
  const { user, logout, updateUser } = useAuthStore();

  const { register, handleSubmit, reset, watch } = useForm<FormData>({
    defaultValues: {
      name: user?.name ?? '',
      avatar: user?.avatar ?? '',
      birthdate: user?.birthdate ?? '',
      password: user?.password ?? '',
    },
  });
  const deleteAccount = async () => {
    if (!user) return;
    await Api.deleteUser(user.id);
    toast.success('Account deleted successfully');
    logout();
    router.push('/');
  };
  const watchedFields = watch();

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        avatar: user.avatar,
        birthdate: user.birthdate,
        password: user.password,
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: FormData) => {
    if (!user) return;

    const updatedUser = await Api.updateUser(user.id, data);
    updateUser(updatedUser);
    toast.success('Account updated successfully');
    router.push('/');
  };

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#FFFFFF] to-[#FFEFBA]">
        <p className="text-gray-600">Loading settings...</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#FFFFFF] to-[#FFEFBA] p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">Account Settings</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex gap-4 items-end">
            <div className="flex-1 flex flex-col">
              <label htmlFor="name" className="text-sm font-medium mb-1">Name</label>
              <input
                id="name"
                className="border border-gray-300 rounded-md p-2"
                {...register('name', { required: true })}
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label htmlFor="avatar" className="text-sm font-medium mb-1">Avatar URL</label>
              <input
                id="avatar"
                className="border border-gray-300 rounded-md p-2"
                {...register('avatar', { required: true })}
              />
            </div>
          </div>


          <div className="flex gap-4 items-end">
            <div className="flex-1 flex flex-col">
              <label htmlFor="birthdate" className="text-sm font-medium mb-1">Birthdate</label>
              <input
                id="birthdate"
                type="date"
                className="border border-gray-300 rounded-md p-2"
                {...register('birthdate', { required: true })}
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label htmlFor="password" className="text-sm font-medium mb-1">Password</label>
              <input
                id="password"
                type="password"
                className="border border-gray-300 rounded-md p-2"
                {...register('password', { required: true })}
              />
            </div>
          </div>
          <div className="mt-4 p-4 border rounded-md bg-gray-50">
            <h2 className="text-lg font-semibold mb-2">Preview Changes</h2>
            <p><strong>Name:</strong><span className="truncate inline-block max-w-[380px] align-bottom">{watchedFields.name}</span></p>
            <p><strong>Avatar:</strong><span className="truncate inline-block max-w-[480px] align-bottom">{watchedFields.avatar}</span></p>
            <p><strong>Birthdate:</strong><span className="truncate inline-block max-w-[380px] align-bottom">{watchedFields.birthdate}</span></p>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="submit" className="flex-1">Update</Button>
            <Button type="button" onClick={logout} className="flex-1 bg-red-400 hover:bg-red-600 cursor-pointer">Logout</Button>
            <Button type="button" variant="destructive" onClick={deleteAccount} className="flex-1 hover:bg-gray-200 cursor-pointer">Delete Account</Button>
          </div>
        </form>



      </div>
    </main>
  );
}