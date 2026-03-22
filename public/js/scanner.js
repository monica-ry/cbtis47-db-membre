function onScanSuccess(decodedText) {

    try {

        const data = JSON.parse(decodedText);

        fetch("/validate-ticket", {

            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                purchase_id: data.purchase_id
            })

        })
            .then(res => res.json())
            .then(result => {

                const resultDiv = document.getElementById("result");

                if (result.success) {

                    resultDiv.innerHTML = "✅ ACCESO PERMITIDO";
                    resultDiv.style.color = "green";

                } else {

                    resultDiv.innerHTML = "❌ " + result.message;
                    resultDiv.style.color = "red";

                }

            });

    } catch (err) {

        console.error(err);

    }

}

const scanner = new Html5QrcodeScanner(
    "reader",
    { fps: 10, qrbox: 250 }
);

scanner.render(onScanSuccess);