/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/naming-convention */
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { PersistPartial } from 'redux-persist/es/persistReducer';

import googleIcon from 'assets/accounts/google.svg';

import { baseUrl, urls } from 'routing/urls';

import { AccountProvider } from 'services/accounts/AccountProvider';
import { AuthError } from 'services/accounts/providers';

import { RecipesState } from 'store/recipes';

// https://developers.google.com/drive/api/v3/reference/files

interface GoogleUserInfoResponse {
  family_name: string;
  given_name: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
}

interface GoogleTaskListItem {
  etag: string,
  id: string,
  kind: 'tasks#taskList',
  selfLink: string,
  title: string,
  updated: string,
}

interface GoogleTaskItem {
  etag: string,
  id: string,
  kind: 'tasks#taskList',
  selfLink: string,
  title: string,
  updated: string,
  position: string,
  status: string;
}

interface GoogleTaskListsResponse {
  etag: string;
  items: GoogleTaskListItem[];
  kind: 'tasks#taskLists'
}

interface GoogleDriveFileResponse {
  kind: 'drive#file';
  id: string;
  name: string;
  mimeType: string;
}

interface GoogleDriveFilesResponse {
  kind: 'drive#fileList';
  files: GoogleDriveFileResponse[];
}

interface AuthReturnedParams {
  access_token: string;
  refresh_token: string;
  expires_in: string;
  scope: string;
  token_type: 'Bearer';
  state?: string;
}

export class GoogleAccountProvider extends AccountProvider {
  static providerName = 'Google';

  static icon = googleIcon;

  private apiClient: AxiosInstance;

  private static URLS = {
    USER_INFO: 'https://www.googleapis.com/oauth2/v1/userinfo',
    TASKS_LIST: 'https://tasks.googleapis.com/tasks/v1/users/@me/lists',
    LOGOUT: 'https://oauth2.googleapis.com/revoke',
    ADD_TASK: 'https://tasks.googleapis.com/tasks/v1/lists/{tasklist}/tasks',
    FILE_GET: 'https://www.googleapis.com/drive/v3/files',
    FILE_UPLOAD: 'https://www.googleapis.com/upload/drive/v3/files/{fileId}',
    GET_TOKEN: 'https://oauth2.googleapis.com/token',
    AUTH: 'https://accounts.google.com/o/oauth2/v2/auth',
  };

  constructor(accessToken: string) {
    super(accessToken);
    this.accessToken = accessToken;

    this.apiClient = axios.create({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  static startLogin() {
    if (typeof import.meta.env.VITE_GOOGLE_CLIENT_ID !== 'string') throw Error('Google client_id not provided');

    // const code_verifier = base64url(randomBytes(96));
    // window.sessionStorage.setItem('code_verifier', code_verifier);

    const params = new URLSearchParams({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      redirect_uri: baseUrl + urls.authRedirect.google(),
      // response_type: 'code',
      response_type: 'token',
      state: window.location.pathname,
      // code_challenge_method: 'S256',
      // code_challenge: await generateCodeChallenge(code_verifier),
      scope: [
        'https://www.googleapis.com/auth/tasks',
        'https://www.googleapis.com/auth/tasks.readonly',
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/drive.appdata',
      ].join(' '),
    });

    const authUrl = new URL(GoogleAccountProvider.URLS.AUTH);
    authUrl.search = params.toString();

    window.location.href = authUrl.toString();
  }

  static async completeLogin() {
    if (typeof import.meta.env.VITE_GOOGLE_CLIENT_ID !== 'string') throw Error('Google client_id not provided');

    const params = new URLSearchParams(window.location.search);
    const code_verifier = window.sessionStorage.getItem('code_verifier') as string;

    const data = new URLSearchParams({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      grant_type: 'authorization_code',
      code: params.get('code') as string,
      redirect_uri: baseUrl + urls.authRedirect.google(),
      code_verifier,
    });

    const response = await axios.post<AuthReturnedParams>(
      GoogleAccountProvider.URLS.GET_TOKEN,
      data,

      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    return response.data;
  }

  static async refreshAccessToken(refreshToken: string) {
    if (typeof import.meta.env.VITE_GOOGLE_CLIENT_ID !== 'string') throw Error('Google client_id not provided');

    const data = new URLSearchParams({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    });

    return axios
      .post<{ access_token: string }>(GoogleAccountProvider.URLS.GET_TOKEN, data)
      .then((res) => res.data.access_token);
  }

  private static handleError<T>(error: AxiosError<T>) {
    switch (error.response?.status) {
      case 401:
        return Promise.reject(new AuthError());
      default:
        return Promise.reject(Error(error.message));
    }
  }

  private static handleResponse<T>(response: AxiosResponse<T>) {
    return response.data;
  }

  async getUserInfo() {
    const { family_name, given_name, picture } = await this.apiClient
      .get<GoogleUserInfoResponse>(GoogleAccountProvider.URLS.USER_INFO)
      .then(GoogleAccountProvider.handleResponse)
      .catch(GoogleAccountProvider.handleError);

    return {
      firstName: given_name,
      lastName: family_name,
      image: picture,
    };
  }

  async getTaskLists() {
    const listsResponse = await this.apiClient
      .get<GoogleTaskListsResponse>(GoogleAccountProvider.URLS.TASKS_LIST)
      .then(GoogleAccountProvider.handleResponse)
      .catch(GoogleAccountProvider.handleError);

    return listsResponse.items.map((list) => ({
      id: list.id,
      name: list.title,
    }));
  }

  async logout() {
    const body = new FormData();
    body.append('token', this.accessToken);

    await this.apiClient.post(GoogleAccountProvider.URLS.LOGOUT, body);
  }

  async addIngredientsToList(listId: string, ingredients: string[], recipeTitle: string) {
    const rootTask = await this.apiClient
      .post<GoogleTaskItem>(
      GoogleAccountProvider.URLS.ADD_TASK.replace('{tasklist}', listId),
      { title: recipeTitle },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then(GoogleAccountProvider.handleResponse)
      .catch(GoogleAccountProvider.handleError);

    await Promise.all(ingredients.map((i) => (
      this.apiClient.post(`${GoogleAccountProvider.URLS.ADD_TASK.replace('{tasklist}', listId)}?parent=${rootTask.id}`, {
        title: i,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ))).catch(GoogleAccountProvider.handleError);
  }

  private async findRecipesFile() {
    return this.apiClient
      .get<GoogleDriveFilesResponse>(GoogleAccountProvider.URLS.FILE_GET, {
      params: {
        q: "name='recipes.json'",
        spaces: 'appDataFolder',
      },
    })
      .then(GoogleAccountProvider.handleResponse)
      .catch(GoogleAccountProvider.handleError);
  }

  private async createBackupFile(content: string) {
    const formData = new FormData();

    const metadata = new Blob([JSON.stringify({
      name: 'recipes.json',
      parents: ['appDataFolder'],
    })], {
      type: 'application/json',
    });

    const file = new Blob([content], {
      type: 'application/json',
    });

    formData.append('metadata', metadata);
    formData.append('file', file);

    return this.apiClient
      .post<GoogleDriveFileResponse>(GoogleAccountProvider.URLS.FILE_UPLOAD.replace('{fileId}', ''), formData, {
      params: {
        uploadType: 'multipart',
      },
    })
      .then(GoogleAccountProvider.handleResponse)
      .catch(GoogleAccountProvider.handleError);
  }

  async backupRecipes(recipes: RecipesState & PersistPartial) {
    const searchResponse = await this.findRecipesFile();
    const fileId = searchResponse.files?.[0]?.id;

    if (!fileId) {
      await this.createBackupFile(JSON.stringify(recipes));
    } else {
      await this.apiClient
        .patch(GoogleAccountProvider.URLS.FILE_UPLOAD.replace('{fileId}', fileId), JSON.stringify(recipes), {
          headers: {
            'Content-type': 'application/json',
          },
          params: {
            uploadType: 'media',
          },
        })
        .then(GoogleAccountProvider.handleResponse)
        .catch(GoogleAccountProvider.handleError);
    }
  }

  async restoreRecipes() {
    const searchResponse = await this.findRecipesFile();
    let fileId = searchResponse.files?.[0]?.id;

    if (!fileId) {
      fileId = (await this.createBackupFile('')).id;
    }

    const fileContent = await this.apiClient
      .get<(RecipesState & PersistPartial) | undefined>(`${GoogleAccountProvider.URLS.FILE_GET}/${fileId}`, {
      params: {
        alt: 'media',
      },
    })
      .then(GoogleAccountProvider.handleResponse)
      .catch(GoogleAccountProvider.handleError);

    return fileContent;
  }
}
