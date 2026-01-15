import { Suspense } from 'react';
import Loading from '@/app/loading';
import Questions from '@/page-views/questions';

export default function QuestionsPage() {
	return (
		<Suspense fallback={<Loading />}>
			<Questions />
		</Suspense>
	);
}
