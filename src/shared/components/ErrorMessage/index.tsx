import Button from '@/shared/UI/Button';
import { FC } from 'react';

interface ErrorMessageProps {
    message: string,
    refetch: () => Promise<void>,
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message, refetch }) => {
    if (!message) {
        return null;
    }

    return (
        <div role="alert">
            {message}
            <Button 
            width={200}
            height={40}
            text='попробовать снова'
            onClick={refetch}/>
        </div>
    );
};

export default ErrorMessage;