import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguageStore } from '../stores/languageStore';

export function useLanguageInit() {
  const [searchParams] = useSearchParams();
  const { setLanguage } = useLanguageStore();

  useEffect(() => {
    const langParam = searchParams.get('lang');
    if (langParam === 'en' || langParam === 'es') {
      setLanguage(langParam);
    }
  }, [searchParams, setLanguage]);
}
