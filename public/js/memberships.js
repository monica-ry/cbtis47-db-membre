console.log("MEMBERSHIPS JS LOADED")

let selectedPlan = null
let ticketCountValue = 1

document.addEventListener("DOMContentLoaded", () => {

    loadMemberships()

    document.getElementById("modalOverlay")
        .addEventListener("click", closeModal)

    document.getElementById("cardOverlay")
        .addEventListener("click", closeCardModal)

    // 💳 SOLO NÚMEROS + FORMATO TARJETA
    const cardInput = document.getElementById("cardNumber")

    if (cardInput) {
        cardInput.addEventListener("input", (e) => {

            let value = e.target.value

            value = value.replace(/\D/g, "")
            value = value.substring(0, 16)
            value = value.replace(/(\d{4})/g, "$1 ").trim()

            e.target.value = value
        })
    }

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

            clone.querySelector(".planType").textContent = plan.name
            clone.querySelector(".planDescription").textContent = plan.description
            clone.querySelector(".planBenefits").textContent = "Benefits: " + plan.benefits
            clone.querySelector(".planPrice").textContent = "$" + Number(plan.price).toFixed(2)
            clone.querySelector(".planDuration").textContent = "Duration: " + plan.duration + " days"

            clone.querySelector(".buy-btn").addEventListener("click", () => {
                openBuyModal(plan)
            })

            container.appendChild(clone)
        })

    } catch (error) {
        console.error("Fetch error:", error)
    }
}

function openBuyModal(plan) {

    selectedPlan = plan
    ticketCountValue = 1

    const modal = document.getElementById("buyModal")
    const overlay = document.getElementById("modalOverlay")

    document.getElementById("planType").textContent = plan.name
    document.getElementById("planDescription").textContent = plan.description
    document.getElementById("planBenefits").textContent = "Benefits: " + plan.benefits
    document.getElementById("planDuration").textContent = "Duration: " + plan.duration + " days"
    document.getElementById("planPrice").textContent = "$" + Number(plan.price).toFixed(2)

    const startInput = document.getElementById("startDate")
    const endInput = document.getElementById("endDate")

    const today = new Date().toISOString().split("T")[0]

    startInput.min = today
    startInput.value = today

    updateEndDate(plan.duration)
    startInput.onchange = () => updateEndDate(plan.duration)

    document.getElementById("ticketCount").textContent = 1

    function updateTotal() {
        const total = plan.price * ticketCountValue
        document.getElementById("totalPrice").textContent = "$" + total.toFixed(2)
    }

    updateTotal()

    document.getElementById("plusTicket").onclick = () => {
        ticketCountValue++
        document.getElementById("ticketCount").textContent = ticketCountValue
        updateTotal()
    }

    document.getElementById("minusTicket").onclick = () => {
        if (ticketCountValue > 1) {
            ticketCountValue--
            document.getElementById("ticketCount").textContent = ticketCountValue
            updateTotal()
        }
    }

    document.getElementById("confirmBuy").onclick = openCardModal

    modal.style.display = "block"
    overlay.style.display = "block"
}

function updateEndDate(duration) {

    const start = new Date(document.getElementById("startDate").value)
    const end = new Date(start)

    end.setDate(end.getDate() + duration)

    document.getElementById("endDate").valueAsDate = end
}

function closeModal() {
    document.getElementById("buyModal").style.display = "none"
    document.getElementById("modalOverlay").style.display = "none"
}

function openCardModal() {

    document.getElementById("cardModal").style.display = "block"
    document.getElementById("cardOverlay").style.display = "block"

    document.getElementById("confirmCard").onclick = validateCard
}

function closeCardModal() {
    document.getElementById("cardModal").style.display = "none"
    document.getElementById("cardOverlay").style.display = "none"
}

function validateCard() {

    const number = document.getElementById("cardNumber").value.replace(/\s/g, "")
    const holder = document.getElementById("cardHolder").value

    if (!number || !holder) {
        alert("Please fill all fields")
        return
    }

    if (number.length !== 16) {
        alert("Card number must be 16 digits")
        return
    }

    closeCardModal()
    buyMembership()
}

async function buyMembership() {

    if (!selectedPlan) return

    const startDate = document.getElementById("startDate").value
    const endDate = document.getElementById("endDate").value

    try {

        const response = await fetch("/purchase", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: 1,
                plan_id: selectedPlan.id,
                start_date: startDate,
                end_date: endDate,
                quantity: ticketCountValue
            })
        })

        const data = await response.json()

        if (!data.success) {
            return alert("Error purchasing membership")
        }

        const doc = new window.jspdf.jsPDF()

        doc.setFontSize(18)
        doc.text("Membership Ticket", 20, 20)

        doc.setFontSize(12)
        doc.text(`Plan: ${selectedPlan.name}`, 20, 40)

        const desc = doc.splitTextToSize(
            `Description: ${selectedPlan.description}`,
            120
        )
        doc.text(desc, 20, 50)

        doc.text(`Duration: ${selectedPlan.duration} days`, 20, 70)
        doc.text(`Tickets: ${ticketCountValue}`, 20, 80)
        doc.text(`Start: ${startDate}`, 20, 90)
        doc.text(`End: ${endDate}`, 20, 100)

        doc.text(
            `Total: $${(selectedPlan.price * ticketCountValue).toFixed(2)}`,
            20,
            110
        )

        doc.text(`Purchase ID: ${data.purchase_id}`, 20, 120)

        // 🔥 QR SEGURO (NO BLOQUEA TODO SI FALLA)
        const qrData = JSON.stringify({
            purchase_id: data.purchase_id,
            user_id: 1,
            plan_id: selectedPlan.id,
            quantity: ticketCountValue
        })

        const qrURL =
            `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`

        try {
            const img = new Image()
            img.crossOrigin = "anonymous"
            img.src = qrURL

            await new Promise((resolve) => {
                img.onload = resolve
                img.onerror = resolve // 👈 IMPORTANTE: no rompe flujo
            })

            doc.addImage(img, 'PNG', 150, 30, 40, 40)

        } catch (e) {
            console.warn("QR failed, continuing PDF without it")
        }

        doc.save(`Ticket_${selectedPlan.name}_${data.purchase_id}.pdf`)

        closeModal()

    } catch (error) {
        console.error("Error:", error)
    }
}