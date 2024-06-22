"use client"
import React, { useState } from "react";
import { useRouter } from 'next/navigation';


const Buy = ({ carName }) => {

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter()


    const makePayment = async ({ productId = null }) => {
        // "use server"
        const key = process.env.RAZORPAY_KEY_ID;
        console.log(key);
        // Make API call to the serverless API
        const data = await fetch("https://uber-clone-chinmay.vercel.app/api/razorpay");
        const { order } = await data.json();
        console.log(order);

        const options = {
            key: key,
            name: "chinmay_test",
            currency: order.currency,
            amount: order.amount,
            order_id: order.id,
            description: "Understanding RazorPay Integration",
            // image: logoBase64,
            handler: async function (response) {
                // if (response.length==0) return <Loading/>;
                console.log(response);

                const data = await fetch("https://uber-clone-chinmay.vercel.app/api/paymentverify", {
                    method: "POST",
                    // headers: {
                    //   // Authorization: 'YOUR_AUTH_HERE'
                    // },
                    body: JSON.stringify({
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature,
                    }),
                });



                const res = await data.json();
                console.log(res);

                console.log("response verify==", res)

                if (res?.message == "success") {


                    console.log("redirected.......")
                    router.push("/paymentsuccess?paymentid=" + response.razorpay_payment_id)

                }

                // Validate payment at server - using webhooks is a better idea.
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature);
            },
            prefill: {
                name: "chinmay",
                email: "cjpai2003@gmail.com",
                contact: "0000000000",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

        paymentObject.on("payment.failed", function (response) {
            alert("Payment failed. Please try again. Contact support for help");
        });
    };

    return (

        <button
            className='p-3 bg-black text-white rounded-lg text-center '

            onClick={() => {
                makePayment({ productId: "example_cab" });
            }}
            disabled={isLoading}

        >
            Request {carName}
        </button>



    );
};

export default Buy;