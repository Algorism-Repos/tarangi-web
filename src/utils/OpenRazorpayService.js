// const OpenRazorpayService = async (registerData) => {
//   console.log("regDatdfa", registerData);

//   // Save form data to localStorage before opening Razorpay
//   localStorage.setItem("pendingRegistration", JSON.stringify(registerData));



//   let rzpKey = "rzp_test_lhgk1rynp6eQ76";
//   const options = {
//     key: rzpKey,
//     amount: registerData.amount * 100,
//     currency: "INR",
//     name: "Transaction Details",
//     description: "Event Registration Payment",
//     image:
//     //   "https://womennetworkignclub.azurewebsites.net/static/images/wnc-logo.JPG",
//     handler:async function (response) {
//       console.log("Handler called!", response);
//       try{
//         // Push to DB only after successful payment
// //   await UploadRegistration({
// //         ...registerData,
// //         PaymentKey: response.razorpay_payment_id,
// //       });
// //               // Remove from localStorage after success
//         localStorage.removeItem("pendingRegistration");

//       }catch (err) {
//         console.error("Failed to upload registration:", err);
//         alert("Payment succeeded but saving data failed. Please contact support.");
//       }
//     },         
//     // Keep data in localStorage so they can retry
//     modal: {
//       ondismiss: function () {
//         console.log("Payment popup closed");
//         alert("You closed the payment before completing. You can retry later.");
//       },
//     },
//     prefill: {
//       name: registerData.name,
//       email: registerData.email,
//       contact: registerData.phone,
//     },
//     notes: {
//       address: "some address",
//     },
//     theme: {
//       color: "#6a3669",
        
//     },
//   };

//   let rzp = new window.Razorpay(options);
//   rzp.open();
// };

// module.exports = { OpenRazorpayService };