import { FC, Suspense } from 'react';
import QuestionsList from '@/widgets/landing/QuestionsList';
import Loading from '@/app/loading';

const Questions: FC = () => {
	return (
		<Suspense fallback={<Loading />}>
			<QuestionsList />
		</Suspense>
	);
};

export default Questions;
