const startPaisaPayPayment = async (amount) => {
  if (paymentLoading) return;

  const numericAmount = Number(amount);

  const mobile = String(
    addressdata?.[0]?.contact ||
    addressdata?.[0]?.mobile ||
    ""
  )
    .replace(/\D/g, "")
    .slice(-10);

  if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
    alert("Invalid payment amount");
    return;
  }

  if (mobile.length !== 10) {
    alert("Please add a valid 10 digit mobile number in delivery address");
    return;
  }

  try {
    setPaymentLoading(true);

    // STEP 1: Call our backend API
    const response = await fetch("/api/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: numericAmount.toFixed(2),
        mobile: mobile,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(
        result?.message || "Unable to start payment"
      );
    }

    // Save reference
    localStorage.setItem(
      "orderReference",
      result.orderId
    );

    localStorage.setItem(
      "ordertotal",
      numericAmount.toFixed(2)
    );

    // STEP 2: POST token + encrypted payload
    // directly to PaisaPay
    const gatewayForm = document.createElement("form");

    gatewayForm.method = "POST";
    gatewayForm.action = result.paymentUrl;

    const tokenInput = document.createElement("input");
    tokenInput.type = "hidden";
    tokenInput.name = "token";
    tokenInput.value = result.token;

    const payloadInput = document.createElement("input");
    payloadInput.type = "hidden";
    payloadInput.name = "payload";
    payloadInput.value = result.payload;

    gatewayForm.appendChild(tokenInput);
    gatewayForm.appendChild(payloadInput);

    document.body.appendChild(gatewayForm);

    // STEP 3: Open PaisaPay checkout
    gatewayForm.submit();

  } catch (error) {
    console.error("PaisaPay Error:", error);

    setPaymentLoading(false);

    alert(
      error?.message ||
      "Payment gateway open nahi hua. Please try again."
    );
  }
};