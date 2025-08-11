'use server';

import { redirect } from 'next/navigation';
import { Api } from '@/src/lib/api';

export async function createBookAction(formData: FormData): Promise<void> {
  
  const name = formData.get('name') as string;
  const picture = formData.get('picture') as string;
  const description = formData.get('description') as string;
  const buyUrl = formData.get('buyUrl') as string;
  const sellerId = formData.get('sellerId') as string;
  const id = crypto.randomUUID();
  const createAt = new Date().toISOString();
  if (!name || !picture || !description || !buyUrl) {
    console.error('All fields are required.');
    return;
  }

  try {
    await Api.createArticle({
      createdAt: createAt, 
      name: name, 
      description: description,
      picture: picture, 
      buyUrl: buyUrl, 
      sellerId: sellerId,
      id: id
    });
  } catch (error) {
    console.error('Error creating book:', error);
    return;
  }
  redirect('/books');
  }
