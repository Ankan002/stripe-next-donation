"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const SuccessPage = () => {
    const params = useSearchParams();

    useEffect(() => {
        console.log(params.get("payment_intent"));
        console.log(params.get("redirect_status"));
    }, [params]);

    return (
        <main className="min-h-screen w-full bg-[#F1F6F9] flex flex-col justify-center items-center">
            <h1 className="text-3xl text-[#00DFA2]">
                SUCCESS
            </h1>
        </main>
    );
};

export default SuccessPage;
