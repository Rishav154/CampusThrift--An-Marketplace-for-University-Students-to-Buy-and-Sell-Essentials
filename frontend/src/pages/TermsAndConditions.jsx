import React from "react";

const TermsAndConditions = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10 mb-20">
            <h1 className="text-3xl font-bold mb-6 text-center">Terms and Conditions</h1>
            <p className="text-sm text-gray-500 text-right mb-4">Last updated: [21 April 2025]</p>

            <div className="space-y-6 text-gray-800 text-base leading-relaxed">
                <p>
                    Welcome to <strong>CampusThrift</strong>! These Terms and Conditions
                    ("Terms") govern your access to and use of the CampusThrift platform
                    (“Platform”, “we”, “our”, or “us”), a student-to-student marketplace
                    for buying and selling used goods. By accessing or using CampusThrift,
                    you agree to be bound by these Terms.
                </p>

                <p>
                    The content of the pages of this website is subject to change without notice. Neither we nor any
                    third parties provide any warranty
                    or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the
                    information and materials found or offered on this website for any particular purpose. You
                    acknowledge that such information and materials may contain inaccuracies or errors and we expressly
                    exclude liability for any such inaccuracies or errors to the fullest extent permitted by law. Your
                    use of any information or materials on our website and/or product pages is entirely at your own
                    risk, for which we shall not be liable. It shall be your own responsibility to ensure that any
                    products, services or information available through our website and/or product pages meet your
                    specific requirements. Our website contains material which is owned by or licensed to us. This
                    material includes, but is not limited to, the design, layout, look, appearance and graphics.
                    Reproduction is prohibited other than in accordance with the copyright notice, which forms part of
                    these terms and conditions. All trademarks reproduced in our website which are not the property of,
                    or licensed to, the operator are acknowledged on the website. Unauthorized use of information
                    provided by us shall give rise to a claim for damages and/or be a criminal offense. From time to
                    time our website may also include links to other websites. These links are provided for your
                    convenience to provide further information. You may not create a link to our website from another
                    website or document without prior written consent. Any dispute arising out of use of
                    our website and/or purchase with us and/or any engagement with us is subject to the laws of India.
                    We shall be under no liability whatsoever in respect of any loss or damage arising directly or
                    indirectly out of the decline of authorization for any transaction, on account of the cardholder
                    having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time.
                </p>

                <p>If you do not agree with these Terms, please do not use the Platform.</p>

                <h2 className="text-xl font-semibold mt-6">1. Eligibility</h2>
                <ul className="list-disc list-inside ml-4">
                    <li>CampusThrift is intended for <strong>university students only</strong>.</li>
                    <li>You must be at least 18 years old or legally capable to enter into these Terms.</li>
                </ul>

                <h2 className="text-xl font-semibold mt-6">2. Account Registration</h2>
                <ul className="list-disc list-inside ml-4">
                    <li>Register using accurate, up-to-date information.</li>
                    <li>You're responsible for maintaining the confidentiality of your account.</li>
                </ul>

                <h2 className="text-xl font-semibold mt-6">3. User Responsibilities</h2>
                <p>By using CampusThrift, you agree to:</p>
                <ul className="list-disc list-inside ml-4">
                    <li>Only list legal, non-prohibited, and personally owned items.</li>
                    <li>Refrain from fraudulent, misleading, or abusive behavior.</li>
                    <li>Communicate respectfully with other users.</li>
                    <li>Complete transactions in good faith.</li>
                </ul>

                <h2 className="text-xl font-semibold mt-6">4. Prohibited Items</h2>
                <p>The following items are strictly prohibited on CampusThrift:</p>
                <ul className="list-disc list-inside ml-4">
                    <li>Alcohol, tobacco, or drugs</li>
                    <li>Weapons or hazardous materials</li>
                    <li>Stolen or counterfeit goods</li>
                    <li>Items violating university policies or laws</li>
                </ul>

                <h2 className="text-xl font-semibold mt-6">5. Transactions and Payments</h2>
                <ul className="list-disc list-inside ml-4">
                    <li>CampusThrift is a facilitator, not a party to transactions.</li>
                    <li>Users must agree on prices and delivery themselves.</li>
                    <li>Online payments are managed by third-party providers (e.g., Razorpay).</li>
                </ul>

                <h2 className="text-xl font-semibold mt-6">6. Content and Listings</h2>
                <ul className="list-disc list-inside ml-4">
                    <li>You grant us a non-exclusive license to display your listing content.</li>
                    <li>Don't upload offensive or misleading content.</li>
                </ul>

                <h2 className="text-xl font-semibold mt-6">7. Termination</h2>
                <p>
                    We may suspend or terminate accounts that violate these Terms or engage
                    in harmful activities.
                </p>

                <h2 className="text-xl font-semibold mt-6">8. Liability and Disclaimers</h2>
                <p>
                    CampusThrift is not responsible for the quality, legality, or safety of
                    listed items, or for any harm resulting from platform use.
                </p>

                <h2 className="text-xl font-semibold mt-6">9. Modifications to Terms</h2>
                <p>
                    We may update these Terms. Continued use of the Platform after changes
                    means you accept the new Terms.
                </p>

                <h2 className="text-xl font-semibold mt-6">10. Contact</h2>
                <p>
                    For questions or concerns, contact us at:{" "}
                    <a href="mailto:rishav15045@gmail.com" className="text-blue-600 underline">
                        rishav15045@gmail.com
                    </a>
                </p>
            </div>
        </div>
    );
};

export default TermsAndConditions;
