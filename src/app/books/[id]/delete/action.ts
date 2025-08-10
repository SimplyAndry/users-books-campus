'use server'

import { redirect } from 'next/navigation';
import { Api } from '@/src/lib/api';


export async function deleteBookAction(formData: FormData ): Promise<void>{
    const id = formData.get('id') as string;
    // console.alert('are you sure to delete this book?');

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