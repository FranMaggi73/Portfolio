import { kindeAuthClient, type SessionManager } from '@kinde-oss/kinde-auth-sveltekit';
import { type Actions, redirect, type RequestEvent, error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { HttpStatus, type Word } from '$lib/types';
import type { PageServerLoad } from './$types';

type Language = {
  id: number;
  name: string;
  code: string;
};

type Gender = {
  id: number;
  name: string;
  code: string;
  language_code: string;
};

type Classification = {
  ID: number;
  Name: string;
  Code: string;
};

type ClassifiedWord = {
  id: number;
  word: string;
  pronunciation: string;
  gender: string;
  gender_code: string;
  classification: string;
  classification_code: string;
  language_code: string;
};

export const load: PageServerLoad = async ({ request }) => {
  const isAuthenticated = await kindeAuthClient.isAuthenticated(
    request as unknown as SessionManager
  );
  let userProfile = null;
  if (isAuthenticated) {
    userProfile = await kindeAuthClient.getUser(request as unknown as SessionManager);
  }
  if (!isAuthenticated) {
    redirect(307, '/api/auth/login');
  }

  const languageRequest = await fetch(`${env.API_URL}/api/v1/languages`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!languageRequest.ok) {
    error(HttpStatus.INTERNAL_SERVER_ERROR, { message: 'Failed to fetch languages.' });
  }

  const languages = (await languageRequest.json()) as Language[];

  const languagesMap: { [key: string]: string } = languages.reduce(
    (acc, language) => {
      acc[language.code] = language.name;
      return acc;
    },
    {} as { [key: string]: string }
  );

  const classificationRequest = await fetch(`${env.API_URL}/api/v1/classifications`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!classificationRequest.ok) {
    error(HttpStatus.INTERNAL_SERVER_ERROR, { message: 'Failed to fetch classifications.' });
  }

  const classifications = (await classificationRequest.json()) as Classification[];

  const genderRequest = await fetch(`${env.API_URL}/api/v1/genders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!genderRequest.ok) {
    error(HttpStatus.INTERNAL_SERVER_ERROR, { message: 'Failed to fetch genders.' });
  }

  const genders = (await genderRequest.json()) as Gender[];

  const wordRequest = await fetch(`${env.API_URL}/api/v1/words`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!wordRequest.ok) {
    error(HttpStatus.INTERNAL_SERVER_ERROR, { message: 'Failed to fetch words.' });
  }

  const words = (await wordRequest.json()) as Word[];

  const classifiedWordRequest = await fetch(`${env.API_URL}/api/v1/classified-words`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!classifiedWordRequest.ok) {
    error(HttpStatus.INTERNAL_SERVER_ERROR, { message: 'Failed to fetch classified words.' });
  }

  const classifiedWords = (await classifiedWordRequest.json()) as ClassifiedWord[];

  const translationWordRequest = await fetch(`${env.API_URL}/api/v1/translations`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!translationWordRequest.ok) {
    error(HttpStatus.INTERNAL_SERVER_ERROR, { message: 'Failed to fetch translated words.' });
  }

  const translation = await translationWordRequest.json();

  return {
    isAuthenticated,
    userProfile,
    languages,
    languagesMap,
    classifications,
    genders,
    words,
    classifiedWords,
    translation
  };
};

export const actions: Actions = {
  createPreset: async ({ request }: RequestEvent) => {
    const formData = await request.formData();

    const name = formData.get('name');

    const data = {
      name: name
    };
    try {
      const response = await fetch(`${env.API_URL}/api/v1/presets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        error(HttpStatus.INTERNAL_SERVER_ERROR, { message: 'Failed to create preset.' });
      }
    } catch (e) {
      error(HttpStatus.INTERNAL_SERVER_ERROR, { message: 'Failed to create preset.' });
    }

    return {
      success: true
    };
  },

  deletePreset: async ({ request }: RequestEvent) => {
    const formData = await request.formData();

    const id = Number(formData.get('id'));

    try {
      const response = await fetch(`${env.API_URL}/api/v1/presets/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        error(HttpStatus.INTERNAL_SERVER_ERROR, { message: 'Failed to delete preset.' });
      }
    } catch (e) {
      error(HttpStatus.INTERNAL_SERVER_ERROR, { message: (e as Error).message });
    }

    return {
      success: true
    };
  },

  updatePreset: async ({ request }: RequestEvent) => {
    const formData = await request.formData();

    const id = Number(formData.get('id'));
    const name = formData.get('name');

    const data = {
      name: name
    };

    try {
      const response = await fetch(`${env.API_URL}/api/v1/presets/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        error(HttpStatus.INTERNAL_SERVER_ERROR, { message: 'Failed to update preset.' });
      }
    } catch (e) {
      error(HttpStatus.INTERNAL_SERVER_ERROR, { message: 'Failed to update preset.' });
    }

    return {
      success: true
    };
  },

  createTranslation: async ({ request }: RequestEvent) => {
    const formData = await request.formData();

    const wordID = formData.get('classifiedWordID');
    const translationID = formData.get('classifiedWordID2');
    const invertValues = formData.get('invertValues') === 'on';

    let parsedWordID, parsedTranslationID;

    try {
      parsedWordID = typeof wordID === 'string' ? parseInt(wordID) : null;
    } catch (error) {
      parsedWordID = null;
    }

    try {
      parsedTranslationID = typeof translationID === 'string' ? parseInt(translationID) : null;
    } catch (error) {
      parsedTranslationID = null;
    }

    if (parsedWordID !== null && parsedTranslationID !== null) {
      await postToDatabase(parsedWordID, parsedTranslationID);
    }

    if (invertValues && parsedWordID !== null && parsedTranslationID !== null) {
      await postToDatabase(parsedTranslationID, parsedWordID);
    }

    async function postToDatabase(wordID: number, translationID: number) {
      const data = {
        word_id: wordID,
        translation_id: translationID
      };

      try {
        const response = await fetch(`${env.API_URL}/api/v1/translations`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          error(HttpStatus.INTERNAL_SERVER_ERROR, { message: 'Failed to create translation.' });
        }
      } catch (e) {
        error(HttpStatus.INTERNAL_SERVER_ERROR, { message: (e as Error).message });
      }
    }
  },
  createClassifiedWord: async ({ request }: RequestEvent) => {
    const formData = await request.formData();

    const word = formData.get('word');
    const classification = formData.get('classification');
    const gender = formData.get('gender');

    let parsedWord, parsedClassification, parsedGender;

    try {
      parsedWord = typeof word === 'string' ? parseInt(word) : null;
    } catch (error) {
      parsedWord = null;
    }

    try {
      parsedClassification = typeof classification === 'string' ? parseInt(classification) : null;
    } catch (error) {
      console.error('Error parsing classification:', error);
      parsedClassification = null;
    }

    try {
      parsedGender = typeof gender === 'string' ? parseInt(gender) : null;
    } catch (error) {
      parsedGender = null;
    }

    const data = {
      word_id: parsedWord,
      classification_id: parsedClassification,
      gender_id: parsedGender
    };

    try {
      const response = await fetch(`${env.API_URL}/api/v1/classified-words`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        error(HttpStatus.INTERNAL_SERVER_ERROR, { message: 'Failed to create classified word.' });
      }
    } catch (e) {
      error(HttpStatus.INTERNAL_SERVER_ERROR, { message: (e as Error).message });
    }

    return {
      success: true
    };
  },

  updateClassifiedWord: async ({ request }: RequestEvent) => {
    const formData = await request.formData();

    const id = Number(formData.get('id'));
    const word = Number(formData.get('word'));
    const gender = Number(formData.get('gender'));
    const classification = Number(formData.get('classification'));

    const data = {
      word_id: word,
      gender_id: gender,
      classification_id: classification
    };

    try {
      const response = await fetch(`${env.API_URL}/api/v1/classified-words/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        error(HttpStatus.INTERNAL_SERVER_ERROR, { message: 'Failed to edit word.' });
      }
    } catch (e) {
      error(HttpStatus.INTERNAL_SERVER_ERROR, { message: (e as Error).message });
    }

    return {
      success: true
    };
  },

  deleteClassifiedWord: async ({ request }: RequestEvent) => {
    const formData = await request.formData();

    const id = Number(formData.get('id'));

    try {
      const response = await fetch(`${env.API_URL}/api/v1/classified-words/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        error(HttpStatus.INTERNAL_SERVER_ERROR, { message: 'Failed to delete word.' });
      }
    } catch (e) {
      error(HttpStatus.INTERNAL_SERVER_ERROR, { message: (e as Error).message });
    }

    return {
      success: true
    };
  },

  createWord: async ({ request }: RequestEvent) => {
    const formData = await request.formData();

    const word = formData.get('word');
    const pronunciation = formData.get('pronunciation');
    const languagecode = formData.get('language');

    const data = {
      name: word,
      pronunciation: pronunciation,
      language_code: languagecode
    };

    try {
      const response = await fetch(`${env.API_URL}/api/v1/words`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        error(HttpStatus.INTERNAL_SERVER_ERROR, { message: 'Failed to create word.' });
      }
    } catch (e) {
      error(HttpStatus.INTERNAL_SERVER_ERROR, { message: (e as Error).message });
    }

    return {
      success: true
    };
  },

  updateWord: async ({ request }: RequestEvent) => {
    const formData = await request.formData();

    const id = Number(formData.get('id'));
    const word = formData.get('word');
    const pronunciation = formData.get('pronunciation');
    const languagecode = formData.get('language');

    const data = {
      name: word,
      pronunciation: pronunciation,
      language_code: languagecode
    };

    try {
      const response = await fetch(`${env.API_URL}/api/v1/words/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        error(HttpStatus.INTERNAL_SERVER_ERROR, { message: 'Failed to edit word.' });
      }
    } catch (e) {
      error(HttpStatus.INTERNAL_SERVER_ERROR, { message: (e as Error).message });
    }

    return {
      success: true
    };
  },

  deleteWord: async ({ request }: RequestEvent) => {
    const formData = await request.formData();

    const id = Number(formData.get('id'));

    try {
      const response = await fetch(`${env.API_URL}/api/v1/words/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        error(HttpStatus.INTERNAL_SERVER_ERROR, { message: 'Failed to delete word.' });
      }
    } catch (e) {
      error(HttpStatus.INTERNAL_SERVER_ERROR, { message: (e as Error).message });
    }

    return {
      success: true
    };
  },

  createClassification: async ({ request }: RequestEvent) => {
    const formData = await request.formData();

    const classification = formData.get('classification');
    const code = formData.get('classification_code');

    const data = {
      name: classification,
      code: code
    };

    try {
      const response = await fetch(`${env.API_URL}/api/v1/classifications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        error(HttpStatus.INTERNAL_SERVER_ERROR, { message: 'Failed to create classification.' });
      }
    } catch (e) {
      error(HttpStatus.INTERNAL_SERVER_ERROR, { message: (e as Error).message });
    }

    return {
      success: true
    };
  },

  updateClassification: async ({ request }: RequestEvent) => {
    const formData = await request.formData();

    const id = Number(formData.get('id'));
    const classification = formData.get('classification');
    const code = formData.get('classification_code');

    const data = {
      name: classification,
      code: code
    };

    try {
      const response = await fetch(`${env.API_URL}/api/v1/classifications/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        error(HttpStatus.INTERNAL_SERVER_ERROR, { message: 'Failed to edit classification.' });
      }
    } catch (e) {
      error(HttpStatus.INTERNAL_SERVER_ERROR, { message: (e as Error).message });
    }

    return {
      success: true
    };
  },

  deleteClassification: async ({ request }: RequestEvent) => {
    const formData = await request.formData();

    const id = Number(formData.get('id'));

    try {
      const response = await fetch(`${env.API_URL}/api/v1/classifications/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        error(HttpStatus.INTERNAL_SERVER_ERROR, { message: 'Failed to delete classification.' });
      }
    } catch (e) {
      error(HttpStatus.INTERNAL_SERVER_ERROR, { message: (e as Error).message });
    }

    return {
      success: true
    };
  },

  deleteGender: async ({ request }: RequestEvent) => {
    const formData = await request.formData();

    const id = Number(formData.get('id'));

    try {
      const response = await fetch(`${env.API_URL}/api/v1/genders/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        error(HttpStatus.INTERNAL_SERVER_ERROR, { message: 'Failed to delete gender.' });
      }
    } catch (e) {
      error(HttpStatus.INTERNAL_SERVER_ERROR, { message: (e as Error).message });
    }

    return {
      success: true
    };
  },
  updateGender: async ({ request }: RequestEvent) => {
    const formData = await request.formData();

    const id = Number(formData.get('id'));
    const gender = formData.get('gender');
    const code = formData.get('gender_code');
    const language = formData.get('language_code');

    const data = {
      name: gender,
      code: code,
      language_code: language
    };
    try {
      const response = await fetch(`${env.API_URL}/api/v1/genders/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        error(HttpStatus.INTERNAL_SERVER_ERROR, { message: 'Failed to edit gender.' });
      }
    } catch (e) {
      error(HttpStatus.INTERNAL_SERVER_ERROR, { message: (e as Error).message });
    }

    return {
      success: true
    };
  },

  createGender: async ({ request }: RequestEvent) => {
    const formData = await request.formData();

    const gender = formData.get('gender');
    const code = formData.get('gender_code');
    const language = formData.get('language_code');

    const data = {
      name: gender,
      code: code,
      language_code: language
    };
    try {
      const response = await fetch(`${env.API_URL}/api/v1/genders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        error(HttpStatus.INTERNAL_SERVER_ERROR, { message: 'Failed to create gender.' });
      }
    } catch (e) {
      error(HttpStatus.INTERNAL_SERVER_ERROR, { message: (e as Error).message });
    }

    return {
      success: true
    };
  },

  deleteLanguage: async ({ request }: RequestEvent) => {
    const formData = await request.formData();

    const id = Number(formData.get('id'));

    try {
      const response = await fetch(`${env.API_URL}/api/v1/languages/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        error(HttpStatus.INTERNAL_SERVER_ERROR, { message: 'Failed to delete language.' });
      }
    } catch (e) {
      error(HttpStatus.INTERNAL_SERVER_ERROR, { message: (e as Error).message });
    }

    return {
      success: true
    };
  },

  updateLanguage: async ({ request }: RequestEvent) => {
    const formData = await request.formData();

    const id = Number(formData.get('id'));
    const language = formData.get('language');
    const code = formData.get('language_code');

    const data = {
      name: language,
      code: code
    };
    try {
      const response = await fetch(`${env.API_URL}/api/v1/languages/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        error(HttpStatus.INTERNAL_SERVER_ERROR, { message: 'Failed to edit language.' });
      }
    } catch (e) {
      error(HttpStatus.INTERNAL_SERVER_ERROR, { message: (e as Error).message });
    }

    return {
      success: true
    };
  },

  createLanguage: async ({ request }: RequestEvent) => {
    const formData = await request.formData();

    const language = formData.get('language');
    const code = formData.get('language_code');

    const data = {
      name: language,
      code: code
    };

    try {
      const response = await fetch(`${env.API_URL}/api/v1/languages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        error(HttpStatus.INTERNAL_SERVER_ERROR, { message: 'Failed to create language.' });
      }
    } catch (e) {
      error(HttpStatus.INTERNAL_SERVER_ERROR, { message: (e as Error).message });
    }

    return {
      success: true
    };
  }
};
