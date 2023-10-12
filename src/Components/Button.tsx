'use client';
import React from 'react';

interface Props {
	doAction: (...args: any) => void;
	id: string;
	children: React.ReactNode;
	text?: string;
	hoverColor?: string;
}

const Button = ({ doAction, text, id, children, hoverColor }: Props) => {
	return (
		<button
			className={`flex justify-end items-end hover:${hoverColor} rounded-full ml-2 p-0 text-2xl max-w-full`}
			onClick={() => doAction(id)}>
			<span>{children}</span>
		</button>
	);
};

export default Button;
