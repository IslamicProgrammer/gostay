'use client';

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { ContainerProps } from "react-select";

interface CounterProps {
    title: string;
    subtitle: string;
    value: number;
    onChange: (value: number) => void;
}

const Counter = ({
    title,
    subtitle,
    value,
    onChange
}: CounterProps) => {

    const onAdd = useCallback(() => {
        onChange(value + 1);
    }, [value, onChange]);

    const onReduce = useCallback(() => {
        if (value === 1) {
            return;
        }
        onChange(value - 1);
    }, [value, onChange]);

    return (
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col">
                <div className="font-medium">
                    {title}
                </div>
                <div className="font-light text-gray-600">
                    {subtitle}
                </div>
            </div>
            <div className="flex flex-row items-center gap-4">
                <div
                    onClick={onReduce}
                    className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80"
                >
                    <AiOutlineMinus />
                </div>
                <div className="font-light text-xl text-neutral-600">
                    {value}
                </div>
                <div
                    onClick={onAdd}
                    className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80"
                >
                    <AiOutlinePlus />
                </div>
            </div>
        </div>
    );
}

export default Counter;