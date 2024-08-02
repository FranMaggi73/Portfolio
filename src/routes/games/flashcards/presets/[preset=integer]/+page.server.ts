import { redirect, type ServerLoadEvent } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { kindeAuthClient, type SessionManager } from '@kinde-oss/kinde-auth-sveltekit';

type Word = {
  Text: string;
  ID: number;
};

type Flashcard = {
  Known: Word;
  Learn: Word;
};

export const load = async ({ params, url, request }: ServerLoadEvent) => {
  const isAuthenticated = await kindeAuthClient.isAuthenticated(
    request as unknown as SessionManager
  );
  let userProfile = null;
  if (isAuthenticated) {
    userProfile = await kindeAuthClient.getUser(request as unknown as SessionManager);

    console.log({
      isAuthenticated,
      userProfile
    });
  }
  if (!isAuthenticated) {
    redirect(307, '/api/auth/login');
  }
  let known: string = url.searchParams.get('known') || '';
  let learn: string = url.searchParams.get('learn') || '';
  const preset: number = parseInt(params.preset || '1');

  if (!Object.values(Language).includes(known as Language)) {
    known = Language.Spanish;
  }

  if (!Object.values(Language).includes(learn as Language)) {
    learn = Language.English;
  }

  const response = await fetch(
    `${env.API_URL}/api/v1/flashcards/presets/${preset}?known=${known}&learn=${learn}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  if (!response.ok) {
    throw new Error(`Error fetching flashcards. HTTP status: ${response.status}`);
  }

  const flashcards = (await response.json()) as Flashcard[];

  for (let i = flashcards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [flashcards[i], flashcards[j]] = [flashcards[j], flashcards[i]];
  }
  return {
    flashcards,
    isAuthenticated,
    userProfile
  };
};

enum Language {
  Spanish = 'es',
  English = 'en',
  German = 'de'
}
