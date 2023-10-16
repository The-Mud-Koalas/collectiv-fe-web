import { Button } from "@/components/shared/elements";
import { Arrow } from "@/components/shared/svg/icons";
import { COLORS } from "@/utils/constants/colors";
import { inter } from "@/utils/constants/fonts";
import { FC } from "react";

interface SelectableButtonProps {
    selected: boolean;
    label: string;
    onClick: () => void;
}

const SelectableButton: FC<SelectableButtonProps> = ({
    selected,
    label,
    onClick,
}) => {
    return (
        <div>
            <Button
                className={`my-1 px-4 py-1 rounded-full flex gap-3 items-center ${
                    selected
                        ? "bg-secondary-200 text-secondary-500 font-semibold"
                        : "text-sky-500"
                }  hover:text-secondary-500 hover:font-semibold
                transition duration-300 ease-in-out`}
                onClick={onClick}
            >
                <p className={`${inter.className}`}>{label}</p>

                {selected ? (
                    <Arrow
                        color={COLORS.secondary[500]}
                        dimensions={{ width: 15 }}
                    />
                ) : null}
            </Button>
        </div>
    );
};

export default SelectableButton;
