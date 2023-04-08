'use client';

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "@/app/constants/categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";

enum STEP {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

const RentModal = () => {
    const rentModal = useRentModal();

    const [step, setStep] = useState(STEP.CATEGORY);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCoun: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: '',
        }
    });

    const category = watch('category');

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        });
    }

    const onBack = () => {
        setStep((value) => value - 1);
    }

    const onNext = () => {
        setStep((value) => value + 1);
    }

    const actionLabel = useMemo(() => {
        if (step === STEP.PRICE) {
            return 'Create';
        }
        return 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEP.CATEGORY) {
            return undefined;
        }
        return 'Back';
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Which of these best describe your place?"
                subtitle="Pick a category"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto pb-2">
                {categories.map((item) => (
                    <div
                        key={item.label}
                        className="">
                        <CategoryInput
                            onClick={(category) => {
                                setCustomValue('category', category)
                            }}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    );

    if (step === STEP.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Where is your place located"
                    subtitle="Help guest find you"
                />
                <CountrySelect />
            </div>
        );
    }

    return (
        <Modal
            title="Gostay your home!"
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={onNext}
            actionLabel={actionLabel}
            secondaryAction={step === STEP.CATEGORY ? undefined : onBack}
            secondaryActionLabel={secondaryActionLabel}
            body={bodyContent}
        />
    );
}

export default RentModal;