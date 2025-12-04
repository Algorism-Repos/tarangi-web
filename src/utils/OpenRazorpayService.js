export const OpenRazorpayService = async (formValues, total) => {
  console.log("total", total);

  let LIVE_KEY ="rzp_live_Rn4qnpr6YvvPQB"
  
  return new Promise((resolve, reject) => {
    if (!window.Razorpay) {
      reject("Razorpay SDK not loaded");
      return;
    }
      let rzpKey = "rzp_test_RdxFig2YBKXz59";
      const options = {
        key: rzpKey,
        amount: total * 100,
        currency: "INR",
        name: "Transaction Details",
        description: "Event Registration Payment",
        handler: function (response) {
          console.log("Handler called!", response);
          resolve(response);
        },
        modal: {
          ondismiss: function () {
            console.log("Payment popup closed");
          },
        },
        prefill: {
          name: formValues.name,
          email: formValues.email,
          contact: formValues.phone,
        },
        notes: {
          address: "some address",
        },
        theme: {
          color: "#b94945ff",
        },
      };

    const rzp = new window.Razorpay(options);
    rzp.open();
  });
};


