import { Home } from '@/components/home';
import getURL from '@/utils/get-url';

async function fetchData() {
  const res = await fetch(getURL('/api/db'), {
    cache: 'no-cache',
  });
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(res.json());
    }, 100);
  });
}

export default async function HomePage() {
  const fetchedData = (await fetchData()) as IDB;

  return (
    <>
      <Home
        accordions={fetchedData.home.accordions}
        videos={fetchedData.home.videos}
      />
    </>
  );
}
