import dynamic from 'next/dynamic';
import { defaultFlows } from '../../data/flows';

const App = dynamic(() => import('../../components/AppShell'), {
  ssr: false,
});

export async function generateStaticParams() {
  return [
    { all: ['home'] },
    { all: ['flows'] },
    { all: ['settings'] },
    { all: ['settings', 'delete-account'] },
    { all: ['progress'] },
    ...defaultFlows.map(flow => ({ all: ['flows', flow.id] })),
    ...defaultFlows.flatMap(flow =>
      flow.practices.map(practice => ({ 
        all: ['flows', flow.id, practice.id] 
      }))
    ),
  ];
}

export default function Page() {
  return <App />;
}
