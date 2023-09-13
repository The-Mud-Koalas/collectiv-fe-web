import { FC, useState, useRef, useEffect } from "react";

interface OTPpopupProps {
    phoneNumber: string;
    handleOTPChange: (otp: string[]) => void;
}

const OTPpopup: FC<OTPpopupProps> = ({ phoneNumber, handleOTPChange }) => {
    const [field, setField] = useState(["", "", "", "", "", ""]);
    const inputRefs: React.RefObject<HTMLInputElement>[] = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
    ];

    const handleInputChange = (index: number, value: string) => {
        const newInputValues = [...field];
        newInputValues[index] = value;
        setField(newInputValues);

        if (value.length === 1 && index < inputRefs.length - 1) {
            inputRefs[index + 1]?.current?.focus();
        }
    };

    useEffect(() => {
        handleOTPChange(field);
    }, [field]);

    return (
        // <div className="otp-modal-container">
        //     <div className="otp-modal">
        //         <button className="close-button" onClick={onClose}>
        //             Close
        //         </button>
        //         <input
        //             type="text"
        //             placeholder="Enter OTP"
        //             value={otp}
        //             onChange={(e) => handleOTPChange(e)}
        //         />
        //     </div>
        // </div>
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
            <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <div className="font-semibold text-3xl">
                            <p>SMS Verification</p>
                        </div>
                        <div className="flex flex-row text-sm font-medium text-gray-400">
                            <p>
                                We have sent a code to your messages
                                {phoneNumber}
                            </p>
                        </div>
                    </div>

                    <div>
                        <form action="" method="post">
                            <div className="flex flex-col space-y-16">
                                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                                    {field.map((value, index) => (
                                        <div key={index} className="w-16 h-16">
                                            <input
                                                className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                                type="text"
                                                value={value}
                                                ref={inputRefs[index]}
                                                maxLength={1}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        index,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OTPpopup;
