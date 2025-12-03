import { getCookie } from 'cookies-next';

export type SubscriptionType = 'free' | 'paid';

export const useSubscription = (): SubscriptionType => {
	const subscriptionType = getCookie('subscription_type');

	// Если подписка не найдена в cookie, по умолчанию считаем бесплатной
	// В будущем можно заменить на реальную логику из API
	if (subscriptionType === 'paid' || subscriptionType === 'premium') {
		return 'paid';
	}

	return 'free';
};
