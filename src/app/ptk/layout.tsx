import FooterPtk from '@/widgets/FooterPtk';
import HeaderPtk from '@/widgets/HeaderPtk';
import Sidebar from '@/widgets/Sidebar';

export default function PtkLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<HeaderPtk />
			<main>
				<Sidebar />
				{children}
			</main>
			<FooterPtk />
		</>
	);
}
