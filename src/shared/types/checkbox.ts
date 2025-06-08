export interface CheckboxSize {
	sm: {
		width: string;
		height: string;
        iconSize: string;
    }
	lg: {
		width: string;
		height: string;
        iconSize: string;
	};
}

export const CHECKBOX_SIZE: CheckboxSize = {
    sm: {
        width: '20',
        height: '20',
        iconSize: 'xs',
    },
    lg: {
        width: '24',
        height: '24',
        iconSize: 'sm',
    },
};