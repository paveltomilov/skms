import { FC } from 'react';

const ErrorMessage: FC<{ message: string | null }> = ({ message }) => {
    if (!message) {
        return null;
    }

    return (
        <div role="alert">
            {message}
        </div>
    );
};

export default ErrorMessage;