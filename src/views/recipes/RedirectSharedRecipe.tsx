import { useEffect, VFC } from 'react';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import { urls } from 'routing/urls';

export const RedirectSharedRecipe: VFC = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const recipeUrl = params.get('url');
    if (!recipeUrl) return;

    const internalUrl = urls.recipes.byUrl({
      recipeUrl: encodeURIComponent(recipeUrl),
    });

    navigate(internalUrl, { replace: true });
  }, [navigate, params]);

  return null;
};
