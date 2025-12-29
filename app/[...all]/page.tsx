import dynamic from 'next/dynamic';
import { flows} from '../../data';

const App = dynamic(() => import('../../components/AppShell'), {
  ssr: false,
});

export async function generateStaticParams() {
  return [
    { all: ['home'] },
    { all: ['flows'] },
    { all: ['settings'] },
    { all: ['progress'] },
    ...flows.map(flow => ({ all: ['flows', flow.id] })),
    ...flows.flatMap(flow => 
      flow.practices.map(practice => ({ 
        all: ['flows', flow.id, practice.id] 
      }))
    ),
  ];
}

export default function Page() {
  return <App />;
}
