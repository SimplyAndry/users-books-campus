'use server'

import { redirect } from 'next/navigation';
import { Api } from '@/src/lib/api';
import { useAuthStore } from "@/src/store/useUserStore";


export async function deleteBookAction(formData: FormData ): Promise<void>{
    const id = formData.get('id') as string;
    const sellerId = formData.get('sellerId') as string;
    const user = useAuthStore((state) => state.user);

    if ()

    if (!id) {
        console.error('Book ID is required for deletion.');
        return;
    }
    
    try {
        await Api.deleteArticle(id);
    } catch (error) {
        console.error('Error deleting book:', error);
        return;
    }
    
    redirect('/books');
}