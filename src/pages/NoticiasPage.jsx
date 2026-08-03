import News from '../components/News/News';
import PageHeader from '../components/PageHeader/PageHeader';

export default function NoticiasPage() {
  return (
    <>
      <PageHeader title="Notícias" subtitle="Fique por dentro dos comunicados e novidades do Sindicato." />
      <News limit={50} showViewAll={false} />
    </>
  );
}
