import { Home } from '@/components/home';
import getURL from '@/utils/get-url';
import db from '@/data/db';

export default async function HomePage() {
  const fetchedData = db;

  return (
    <>
      <Home
        accordions={fetchedData.home.accordions}
        videos={fetchedData.home.videos}
      />
    </>
  );
}
