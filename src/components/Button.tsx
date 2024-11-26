import React from 'react';

export type PropsButtonType = {
    title: string
    onClick: () => void
}
export const Button = ({title, onClick}: PropsButtonType) => {
    return (
        <button onClick={onClick}>{title}</button>
    );
};
