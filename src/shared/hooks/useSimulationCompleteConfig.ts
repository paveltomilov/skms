import { useMemo } from 'react';
import { SubscriptionType } from '@/shared/hooks/useSubscription'; 

export interface SimulationCompleteConfig {
	messageText: string;
	buttonText: string;
	buttonWidth: number;
	width: string;
}

export const useSimulationCompleteConfig = (
	subscriptionType: SubscriptionType
): SimulationCompleteConfig => {
	return useMemo(() => {
		if (subscriptionType === 'free') {
				return {
					messageText: 'Вы закончили, чтобы узнать результат пройдите опрос',
					buttonText: 'Пройти опрос',
					buttonWidth: 290,
					width: '540px',
				};
            }
			else {
				return {
					messageText: 'Вы успешно справились c\u00A0заданием! Ознакомьтесь c\u00A0вашим результатом.',
					buttonText: 'Узнать результат',
					buttonWidth: 341,
					width: '590px',
				};
            }
	}, [subscriptionType]);
};