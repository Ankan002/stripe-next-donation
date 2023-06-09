"use client";

import { useState } from "react";

const SessionCheckoutMethod = () => {
    const [amount, setAmount] = useState<number>(0);

    return (
        <main className="min-h-screen w-full bg-[#F1F6F9] flex flex-col justify-center items-center p-5">
            <div className="xl:w-1/3 lg:w-2/3 md:w-4/5 w-full flex flex-col">
                <p className="text-black text-lg">
                    Enter the amount
                </p>
                <input type="number" className="w-full mt-3 px-4 py-2 border-2 border-black rounded-md focus:outline-none text-black focus:shadow-lg appearance-none" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
            </div>

            <button className="mt-5 px-5 py-2 bg-[#FFE569] border-2 border-black rounded-md text-black text-xl">
                Pay Now
            </button>
        </main>
    );
};

export default SessionCheckoutMethod;
