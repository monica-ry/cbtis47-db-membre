let selectedPlan = null
let ticketCountValue = 1

document.addEventListener("DOMContentLoaded", () => {

    loadMemberships()

    const overlay = document.getElementById("modalOverlay")
    overlay.addEventListener("click", closeModal)

})


async function loadMemberships() {

    try {

        const response = await fetch("/memberships")

        if (!response.ok) {
            console.error("HTTP error:", response.status)
            return
        }

        const plans = await response.json()

        const container = document.getElementById("membershipContainer")
        const template = document.getElementById("membershipTemplate")

        container.innerHTML = ""

        plans.forEach(plan => {

            const clone = template.content.cloneNode(true)

            clone.querySelector(".planType").textContent = plan.plan_type

            clone.querySelector(".planDescription").textContent = plan.description

            clone.querySelector(".planPrice").textContent =
                "$" + Number(plan.price).toFixed(2)

            clone.querySelector(".planDuration").textContent =
                "Duración: " + plan.duration_days + " días"

            const btn = clone.querySelector(".buy-btn")

            btn.addEventListener("click", () => {
                openBuyModal(plan)
            })

            container.appendChild(clone)

        })

    }
    catch (error) {

        console.error("Fetch error:", error)

    }

}


function openBuyModal(plan) {

    selectedPlan = plan
    ticketCountValue = 1

    const modal = document.getElementById("buyModal")
    const overlay = document.getElementById("modalOverlay")

    document.getElementById("planType").textContent = plan.plan_type

    document.getElementById("planDescription").textContent = plan.description

    document.getElementById("planDuration").textContent =
        "Duración: " + plan.duration_days + " días"

    document.getElementById("planPrice").textContent =
        "$" + Number(plan.price).toFixed(2)


    const startInput = document.getElementById("startDate")
    const endInput = document.getElementById("endDate")


    const today = new Date()
    const todayString = today.toISOString().split("T")[0]

    startInput.min = todayString
    startInput.value = todayString


    updateEndDate(plan.duration_days)


    startInput.onchange = () => {
        updateEndDate(plan.duration_days)
    }


    const minusBtn = document.getElementById("minusTicket")
    const plusBtn = document.getElementById("plusTicket")
    const ticketCount = document.getElementById("ticketCount")
    const totalPrice = document.getElementById("totalPrice")


    ticketCount.textContent = 1


    function updateTotal() {

        const total = plan.price * ticketCountValue
        totalPrice.textContent = "$" + total.toFixed(2)

    }

    updateTotal()


    plusBtn.onclick = () => {

        ticketCountValue++

        ticketCount.textContent = ticketCountValue

        updateTotal()

    }


    minusBtn.onclick = () => {

        if (ticketCountValue > 1) {

            ticketCountValue--

            ticketCount.textContent = ticketCountValue

            updateTotal()

        }

    }
    document.getElementById("confirmBuy").onclick = buyMembership


    modal.style.display = "block"
    overlay.style.display = "block"

}


function updateEndDate(duration) {

    const startInput = document.getElementById("startDate")
    const endInput = document.getElementById("endDate")

    const start = new Date(startInput.value)

    const end = new Date(start)

    end.setDate(end.getDate() + duration)

    endInput.valueAsDate = end

}


function closeModal() {

    document.getElementById("buyModal").style.display = "none"

    document.getElementById("modalOverlay").style.display = "none"

}
async function buyMembership() {
    if (!selectedPlan) return;

    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    try {
        const response = await fetch("/purchase", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: 1,
                plan_id: selectedPlan.id_affiliation,
                start_date: startDate,
                end_date: endDate,
                quantity: ticketCountValue
            })
        });

        const data = await response.json();
        if (!data.success) return alert("Error al realizar la compra");

        // ---------- PDF con jsPDF y QR ----------
        const doc = new window.jspdf.jsPDF();

        doc.setFontSize(18);
        doc.text("Ticket de Membresía", 20, 20);

        doc.setFontSize(12);
        doc.text(`Plan: ${selectedPlan.plan_type}`, 20, 40);
        doc.text(`Descripción: ${selectedPlan.description}`, 20, 50);
        doc.text(`Duración: ${selectedPlan.duration_days} días`, 20, 60);
        doc.text(`Cantidad de entradas: ${ticketCountValue}`, 20, 70);
        doc.text(`Fecha de inicio: ${startDate}`, 20, 80);
        doc.text(`Fecha de fin: ${endDate}`, 20, 90);
        doc.text(`Precio total: $${(selectedPlan.price * ticketCountValue).toFixed(2)}`, 20, 100);
        doc.text(`ID de compra: ${data.purchase_id}`, 20, 110);

        // Generar QR único
        const qrData = JSON.stringify({
            purchase_id: data.purchase_id,
            user_id: 1,
            plan_id: selectedPlan.id_affiliation,
            quantity: ticketCountValue
        });

        // Generar QR usando API pública
        const qrURL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`;

        // convertir a imagen para jsPDF
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = qrURL;

        await new Promise(resolve => {
            img.onload = resolve;
        });

        doc.addImage(img, 'PNG', 150, 20, 40, 40);

        // Descargar PDF
        doc.save(`Ticket_${selectedPlan.plan_type}_${data.purchase_id}.pdf`);

        closeModal();

    } catch (error) {
        console.error("Error:", error);
    }
}