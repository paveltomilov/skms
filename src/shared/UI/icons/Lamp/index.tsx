import { FC } from 'react';

interface Props {
	className?: string;
}

const Lamp: FC<Props> = () => {
	return (
		<svg width="50" height="51" viewBox="0 0 50 51" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_dii_23_4333)">
<circle cx="25" cy="25.5" r="15" fill="#ED3932"/>
<circle cx="25" cy="25.5" r="14" stroke="#C0C0C0" stroke-width="2"/>
</g>
<circle cx="25" cy="25.5" r="14" stroke="url(#paint0_linear_23_4333)" stroke-width="2"/>
<g contentStyleType="mix-blend-mode:color" filter="url(#filter1_f_23_4333)">
<circle cx="25" cy="25.5" r="15" fill="#ED3932"/>
<circle cx="25" cy="25.5" r="16" stroke="#C0C0C0" stroke-width="2"/>
</g>
<defs>
<filter id="filter0_dii_23_4333" x="8" y="8.5" width="34" height="34" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="0.5" dy="0.5"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.541667 0 0 0 0 0.541667 0 0 0 0 0.541667 0 0 0 1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_23_4333"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_23_4333" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="2" dy="2"/>
<feGaussianBlur stdDeviation="1.5"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
<feBlend mode="normal" in2="shape" result="effect2_innerShadow_23_4333"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="-2" dy="-2"/>
<feGaussianBlur stdDeviation="1.5"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/>
<feBlend mode="normal" in2="effect2_innerShadow_23_4333" result="effect3_innerShadow_23_4333"/>
</filter>
<filter id="filter1_f_23_4333" x="0" y="0.5" width="50" height="50" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="4" result="effect1_foregroundBlur_23_4333"/>
</filter>
<linearGradient id="paint0_linear_23_4333" x1="17" y1="15.5" x2="21.5" y2="23" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="#999999"/>
</linearGradient>
</defs>
</svg>

	);
};

export default Lamp;
