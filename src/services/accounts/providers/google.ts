/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import ky, { HTTPError } from 'ky';
import { KyInstance } from 'ky/distribution/types/ky';
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

// interface AuthReturnedParams {
//   access_token: string;
//   refresh_token: string;
//   expires_in: string;
//   scope: string;
//   token_type: 'Bearer';
//   state?: string;
// }

export class GoogleAccountProvider extends AccountProvider {
  static providerName = 'Google' as const;

  static icon = googleIcon;

  private _apiClient: KyInstance;

  private static URLS = {
    USER_INFO: 'https://www.googleapis.com/oauth2/v1/userinfo',
    LOGOUT: 'https://oauth2.googleapis.com/revoke',
    FILE_GET: 'https://www.googleapis.com/drive/v3/files',
    FILE_UPLOAD: 'https://www.googleapis.com/upload/drive/v3/files/{fileId}',
    GET_TOKEN: 'https://oauth2.googleapis.com/token',
    AUTH: 'https://accounts.google.com/o/oauth2/v2/auth',
  };

  constructor(accessToken: string) {
    super(accessToken);
    this.accessToken = accessToken;

    this._apiClient = ky.create({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  static startLogin(this: void) {
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
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/drive.appdata',
      ].join(' '),
    });

    const authUrl = new URL(GoogleAccountProvider.URLS.AUTH);
    authUrl.search = params.toString();

    window.location.href = authUrl.toString();
  }

  // static async completeLogin() {
  // if (typeof import.meta.env.VITE_GOOGLE_CLIENT_ID !== 'string') {
  //   throw Error('Google client_id not provided');
  // }

  //   const params = new URLSearchParams(window.location.search);
  //   const code_verifier = window.sessionStorage.getItem('code_verifier') as string;

  //   const data = new URLSearchParams({
  //     client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  //     grant_type: 'authorization_code',
  //     code: params.get('code') as string,
  //     redirect_uri: baseUrl + urls.authRedirect.google(),
  //     code_verifier,
  //   });

  //   const response = await axios.post<AuthReturnedParams>(
  //     GoogleAccountProvider.URLS.GET_TOKEN,
  //     data,

  //     {
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //       },
  //     },
  //   );

  //   return response.data;
  // }

  static async refreshAccessToken(refreshToken: string) {
    if (typeof import.meta.env.VITE_GOOGLE_CLIENT_ID !== 'string') throw Error('Google client_id not provided');

    const data = new URLSearchParams({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    });

    const response = await ky.post(GoogleAccountProvider.URLS.GET_TOKEN, {
      searchParams: data,
    }).json<{ access_token: string }>();

    return response.access_token;
  }

  private _handleError(this: void, error: HTTPError) {
    switch (error.response?.status) {
      case 401:
        return Promise.reject(new AuthError());
      default:
        return Promise.reject(error);
    }
  }

  async getUserInfo() {
    const { family_name, given_name, picture } = await this._apiClient
      .get(GoogleAccountProvider.URLS.USER_INFO)
      .then((res) => res.json<GoogleUserInfoResponse>())
      .catch(this._handleError);

    return {
      firstName: given_name,
      lastName: family_name,
      image: picture,
    };
  }

  async logout() {
    const body = new FormData();
    body.append('token', this.accessToken);

    await this._apiClient.post(GoogleAccountProvider.URLS.LOGOUT, { body });
  }

  private async _findRecipesFile() {
    return this._apiClient
      .get(GoogleAccountProvider.URLS.FILE_GET, {
        searchParams: {
          q: "name='recipes.json'",
          spaces: 'appDataFolder',
        },
      })
      .then((res) => res.json<GoogleDriveFilesResponse>())
      .catch(this._handleError);
  }

  private async _createBackupFile(content: string) {
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

    return this._apiClient
      .post(GoogleAccountProvider.URLS.FILE_UPLOAD.replace('{fileId}', ''), {
        searchParams: {
          uploadType: 'multipart',
        },
        body: formData,
      })
      .then((res) => res.json<GoogleDriveFileResponse>())
      .catch(this._handleError);
  }

  async uploadRecipes(recipes: RecipesState & PersistPartial) {
    const searchResponse = await this._findRecipesFile();
    const fileId = searchResponse.files?.[0]?.id;

    if (!fileId) {
      await this._createBackupFile(JSON.stringify(recipes));
    } else {
      await this._apiClient
        .patch(GoogleAccountProvider.URLS.FILE_UPLOAD.replace('{fileId}', fileId), {
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(recipes),
          searchParams: {
            uploadType: 'media',
          },
        })
        .then((res) => res.json())
        .catch(this._handleError);
    }
  }

  async downloadRecipes() {
    const searchResponse = await this._findRecipesFile();
    let fileId = searchResponse.files?.[0]?.id;

    if (!fileId) {
      fileId = (await this._createBackupFile('')).id;
    }

    const fileContent = await this._apiClient
      .get(`${GoogleAccountProvider.URLS.FILE_GET}/${fileId}`, {
        searchParams: {
          alt: 'media',
        },
      })
      .then((res) => res.json<(RecipesState & PersistPartial) | undefined>())
      .catch(this._handleError);

    return fileContent;
  }
}
