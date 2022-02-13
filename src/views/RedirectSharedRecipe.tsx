import { reverse } from 'named-urls';
import { useEffect, VFC } from 'react';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { urls } from 'urls';

export const RedirectSharedRecipe: VFC = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const recipeUrl = params.get('url');
    if (recipeUrl) {
      const internalUrl = reverse(urls.recipes.recipeByUrl, {
        recipeUrl: encodeURIComponent(recipeUrl),
      });
      navigate(internalUrl, { replace: true });
    }
  }, [navigate, params]);

  return null;
};
