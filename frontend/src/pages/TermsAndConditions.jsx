import {ArrowLeft} from "lucide-react";
import React from "react";
import {useNavigate} from "react-router-dom";

function TermsAndConditions() {

    const navigate = useNavigate();

    return (
        <>
            <div className="bg-black text-white p-12 h-screen">
                <button
                className="absolute top-10 left-10 text-gray-700 hover:text-orange-400 transition-colors flex items-center gap-1"
                onClick={() => navigate('/signup')}
                >
                <ArrowLeft className="h-7 w-7 text-white" />
            </button>
                <h1 className="mt-12">This is terms and conditions.</h1>
                <p>Example terms and conditions, actual one will be added later.</p>
            </div>
        </>
    );
}

export default TermsAndConditions;