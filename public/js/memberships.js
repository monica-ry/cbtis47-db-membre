let selectedPlan = null

document.addEventListener("DOMContentLoaded", () => {
    loadMemberships()
    loadUserSubscriptions()
    document.getElementById("modalOverlay").addEventListener("click", closeModal)
    document.getElementById("cardOverlay").addEventListener("click", closeCardModal)
    document.getElementById("cancelBuy").addEventListener("click", closeModal)
    document.getElementById("cancelCard").addEventListener("click", closeCardModal)

    const cardInput = document.getElementById("cardNumber")
    if (cardInput) {
        cardInput.addEventListener("input", (e) => {
            let value = e.target.value.replace(/\D/g, "").substring(0, 16)
            e.target.value = value.replace(/(\d{4})/g, "$1 ").trim()
        })
    }
})

async function loadMemberships() {
    try {
        const response = await fetch("/api/memberships")
        if (!response.ok) return
        const plans = await response.json()
        const container = document.getElementById("membershipContainer")
        const template = document.getElementById("membershipTemplate")
        container.innerHTML = ""
        plans.forEach(plan => {
            const clone = template.content.cloneNode(true)
            clone.querySelector(".planType").textContent = plan.name
            clone.querySelector(".planDescription").textContent = plan.description
            clone.querySelector(".planBenefits").textContent = plan.benefits
            clone.querySelector(".planPrice").textContent = "$" + Number(plan.price).toFixed(2)
            clone.querySelector(".planDuration").textContent = plan.duration + " days"
            clone.querySelector(".buy-btn").addEventListener("click", () => openBuyModal(plan))
            container.appendChild(clone)
        })
    } catch (e) {
        console.error("Error loading memberships:", e)
    }
}

async function loadUserSubscriptions() {
    const userData = JSON.parse(localStorage.getItem("loggedUser"))
    if (!userData || !userData.id) return

    try {
        const response = await fetch("/api/user/subscriptions?userId=" + userData.id)
        if (!response.ok) return
        const subs = await response.json()
        if (!subs.length) return

        const section = document.getElementById("myMemberships")
        const list = document.getElementById("membershipList")
        const template = document.getElementById("userMembershipTemplate")
        section.style.display = "block"
        list.innerHTML = ""

        subs.forEach(sub => {
            const clone = template.content.cloneNode(true)
            clone.querySelector(".umc-plan-name").textContent = sub.plan_name
            clone.querySelector(".umc-dates").textContent =
                formatDate(sub.start_date) + " – " + formatDate(sub.finish_date)

            const statusEl = clone.querySelector(".umc-status")
            const now = new Date()
            const finish = new Date(sub.finish_date)
            if (sub.used) {
                statusEl.textContent = "Used"
                statusEl.classList.add("used")
            } else if (finish < now) {
                statusEl.textContent = "Expired"
                statusEl.classList.add("expired")
            } else {
                statusEl.textContent = "Active"
            }

            clone.querySelector(".umc-ticket-btn").addEventListener("click", () =>
                downloadTicket(sub, userData)
            )

            list.appendChild(clone)
        })
    } catch (e) {
        console.error("Error loading subscriptions:", e)
    }
}

function formatDate(d) {
    const dt = new Date(d)
    return dt.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
}

async function downloadTicket(sub, userData) {
    await generateTicket({
        purchase_id: sub.id,
        plan_name: sub.plan_name,
        price: sub.price,
        duration: sub.duration,
        start_date: sub.start_date,
        end_date: sub.finish_date
    }, userData)
}

function openBuyModal(plan) {
    selectedPlan = plan
    document.getElementById("planType").textContent = plan.name
    document.getElementById("planDescription").textContent = plan.description
    document.getElementById("planBenefits").textContent = "Benefits: " + plan.benefits
    document.getElementById("planPrice").textContent = "$" + Number(plan.price).toFixed(2)

    const startInput = document.getElementById("startDate")
    const today = new Date().toISOString().split("T")[0]
    startInput.min = today
    startInput.value = today
    updateEndDate(plan.duration)
    startInput.onchange = () => updateEndDate(plan.duration)

    document.getElementById("confirmBuy").onclick = openCardModal
    document.getElementById("buyModal").style.display = "block"
    document.getElementById("modalOverlay").style.display = "block"
}

function updateEndDate(duration) {
    const start = new Date(document.getElementById("startDate").value)
    const end = new Date(start)
    end.setDate(end.getDate() + Number(duration))
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
    if (!number || !holder) { alert("Please fill all fields"); return }
    if (number.length !== 16) { alert("Card number must be 16 digits"); return }
    closeCardModal()
    buyMembership()
}

async function buyMembership() {
    if (!selectedPlan) return

    const userData = JSON.parse(localStorage.getItem("loggedUser"))
    if (!userData || !userData.id) {
        alert("You must be logged in to purchase a membership")
        return
    }

    const startDate = document.getElementById("startDate").value
    const endDate = document.getElementById("endDate").value

    try {
        const response = await fetch("/purchase", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: userData.id,
                plan_id: selectedPlan.id,
                start_date: startDate,
                end_date: endDate
            })
        })

        const data = await response.json()
        if (!data.success) {
            return alert("Error purchasing membership: " + (data.error || "Unknown error"))
        }

        await generateTicket({
            purchase_id: data.purchase_id,
            plan_name: selectedPlan.name,
            price: selectedPlan.price,
            duration: selectedPlan.duration,
            start_date: startDate,
            end_date: endDate
        }, userData)

        closeModal()
        loadUserSubscriptions()
    } catch (e) {
        console.error("Purchase error:", e)
        alert("Error processing purchase")
    }
}

async function generateTicket(info, userData) {
    const doc = new window.jspdf.jsPDF({ unit: 'mm', format: 'a5' })
    const W = 148, H = 210

    function toDate(s) {
        return s ? new Date(s).toISOString().split("T")[0] : ""
    }

    function mix(c) {
        const r = parseInt(c.slice(1, 3), 16)
        const g = parseInt(c.slice(3, 5), 16)
        const b = parseInt(c.slice(5, 7), 16)
        return [r, g, b]
    }

    const bg = mix('#fce4e8')
    const pk = mix('#d6345e')
    const yw = mix('#c99212')
    const wh = [255, 255, 255]
    const txMain = [60, 25, 38]
    const txLabel = [140, 115, 125]

    doc.setFillColor(bg[0], bg[1], bg[2])
    doc.rect(0, 0, W, H, 'F')

    const GS = window.jspdf.GState

    doc.setFillColor(pk[0], pk[1], pk[2])
    doc.setGState(new GS({ opacity: 0.15 }))
    doc.rect(0, 0, W, 2, 'F')
    doc.rect(0, H - 2, W, 2, 'F')
    doc.rect(2, 2, 1.2, H - 4, 'F')

    doc.setGState(new GS({ opacity: 0.08 }))
    doc.setDrawColor(pk[0], pk[1], pk[2])
    doc.setLineWidth(0.2)
    if (doc.setDashPattern) doc.setDashPattern([2, 3])
    doc.line(0, 2, W, 2)
    doc.line(0, H - 2, W, H - 2)
    if (doc.setDashPattern) doc.setDashPattern([])
    doc.setGState(new GS({ opacity: 1 }))

    const logo = new Image()
    logo.crossOrigin = "anonymous"
    logo.src = window.location.origin + "/images/logo.jpeg"
    await new Promise(resolve => { logo.onload = resolve; logo.onerror = resolve })

    const lx = 20, ly = 20, ls = 30
    doc.setFillColor(wh[0], wh[1], wh[2])
    doc.setGState(new GS({ opacity: 0.95 }))
    doc.roundedRect(lx - 2, ly - 2, ls + 4, ls + 4, 5, 5, 'F')
    doc.setGState(new GS({ opacity: 1 }))

    if (logo.complete && logo.naturalWidth > 0) {
        doc.addImage(logo, 'JPEG', lx, ly, ls, ls)
        doc.setDrawColor(pk[0], pk[1], pk[2])
        doc.setGState(new GS({ opacity: 0.3 }))
        doc.setLineWidth(0.4)
        doc.roundedRect(lx - 2, ly - 2, ls + 4, ls + 4, 5, 5, 'S')
        doc.setGState(new GS({ opacity: 1 }))
    } else {
        doc.setFillColor(pk[0], pk[1], pk[2])
        doc.roundedRect(lx, ly, ls, ls, 4, 4, 'F')
        doc.setTextColor(wh[0], wh[1], wh[2])
        doc.setFontSize(14)
        doc.setFont("helvetica", "bold")
        doc.text("LL", lx + ls / 2, ly + ls / 2 + 5, { align: 'center' })
    }

    const tx = lx + ls + 16
    doc.setFont("helvetica", "bold")
    doc.setFontSize(18)
    doc.setTextColor(pk[0], pk[1], pk[2])
    doc.text("LU LOO LAND", tx, 31)

    doc.setFont("helvetica", "normal")
    doc.setFontSize(9)
    doc.setTextColor(yw[0], yw[1], yw[2])
    doc.text("Membership Ticket", tx, 41)

    doc.setDrawColor(txLabel[0], txLabel[1], txLabel[2])
    doc.setGState(new GS({ opacity: 0.15 }))
    doc.setLineWidth(0.2)
    doc.line(20, 56, W - 20, 56)
    doc.setGState(new GS({ opacity: 1 }))

    function detail(label, value, x, y, vs) {
        doc.setFont("helvetica", "bold")
        doc.setFontSize(7)
        doc.setTextColor(txLabel[0], txLabel[1], txLabel[2])
        doc.text(label, x, y)
        doc.setFont("helvetica", "normal")
        doc.setFontSize(vs || 10)
        doc.setTextColor(txMain[0], txMain[1], txMain[2])
        doc.text(value, x, y + 5.5)
    }

    detail("PLAN", info.plan_name, 20, 72, 11)
    detail("DURATION", info.duration + " days", 82, 72, 11)
    detail("START DATE", toDate(info.start_date), 20, 98, 10)
    detail("END DATE", toDate(info.end_date), 82, 98, 10)

    doc.setFont("helvetica", "bold")
    doc.setFontSize(7)
    doc.setTextColor(txLabel[0], txLabel[1], txLabel[2])
    doc.text("TOTAL", 20, 122)

    doc.setFillColor(pk[0], pk[1], pk[2])
    doc.setGState(new GS({ opacity: 0.08 }))
    doc.roundedRect(20, 125, 75, 16, 4, 4, 'F')
    doc.setDrawColor(pk[0], pk[1], pk[2])
    doc.setGState(new GS({ opacity: 0.15 }))
    doc.setLineWidth(0.3)
    doc.roundedRect(20, 125, 75, 16, 4, 4, 'S')
    doc.setGState(new GS({ opacity: 1 }))
    doc.setTextColor(pk[0], pk[1], pk[2])
    doc.setFont("helvetica", "bold")
    doc.setFontSize(12)
    doc.text("$" + Number(info.price).toFixed(2), 25, 137)

    doc.setFont("helvetica", "italic")
    doc.setFontSize(6.5)
    doc.setTextColor(txLabel[0], txLabel[1], txLabel[2])
    doc.text("Non-transferable", 105, 137)

    const qrData = JSON.stringify({
        purchase_id: info.purchase_id,
        user_id: userData.id,
        plan_id: info.purchase_id
    })
    const qrURL = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" + encodeURIComponent(qrData)

    let qrY = 145
    try {
        const qrImg = new Image()
        qrImg.crossOrigin = "anonymous"
        qrImg.src = qrURL
        await new Promise((resolve) => { qrImg.onload = resolve; qrImg.onerror = resolve })

        const qrSize = 32
        const qrX = W / 2 - qrSize / 2
        qrY = 145
        doc.setFillColor(wh[0], wh[1], wh[2])
        doc.roundedRect(qrX - 2, qrY - 2, qrSize + 4, qrSize + 4, 3, 3, 'F')
        doc.addImage(qrImg, 'PNG', qrX, qrY, qrSize, qrSize)

        doc.setFont("helvetica", "normal")
        doc.setFontSize(5.5)
        doc.setTextColor(txLabel[0], txLabel[1], txLabel[2])
        doc.text("Scan at entrance", W / 2, qrY + qrSize + 5.5, { align: 'center' })
    } catch (_) { }

    doc.setFont("helvetica", "normal")
    doc.setFontSize(6.5)
    doc.setTextColor(txLabel[0], txLabel[1], txLabel[2])
    doc.text("ID: #" + info.purchase_id, W / 2, qrY + 46, { align: 'center' })

    doc.setFont("helvetica", "italic")
    doc.setFontSize(7.5)
    doc.setTextColor(txLabel[0], txLabel[1], txLabel[2])
    doc.text("Thank you for choosing Lu Loo Land", W / 2, H - 13, { align: 'center' })
    doc.setFont("helvetica", "normal")
    doc.setFontSize(6)
    doc.setTextColor(txLabel[0], txLabel[1], txLabel[2])
    doc.text("www.lulooland.com", W / 2, H - 7, { align: 'center' })

    doc.save("Ticket_" + info.plan_name.replace(/\s/g, "_") + "_" + info.purchase_id + ".pdf")
}
