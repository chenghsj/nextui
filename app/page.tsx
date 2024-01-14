import { Home } from '@/components/home';
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
