function init() {
    localStorage.clear()
    const liter = document.getElementById("liter").value
    const time = document.getElementById("time").value
    const date = new Date()

    localStorage.setItem("timestamp", date.getTime())
    localStorage.setItem("day", date.getDate())
    localStorage.setItem("liter", liter)
    localStorage.setItem("endTimestamp", new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.substring(0, 2), time.substring(2, 4), 0, 0).getTime())
    localStorage.setItem("ml_per_ms", liter * 1000 / ((parseFloat(localStorage.getItem("endTimestamp") - parseFloat(localStorage.getItem("timestamp"))))))
    calculate()
}

function calculate() {
    document.getElementById("initContainer").style.display = "none"
    document.getElementById("container").style.display = "unset"
    const toDrinkInput = setInterval(() => {
        var ml_toDrinkInput = ((Date.now() - localStorage.getItem("timestamp")) * localStorage.getItem("ml_per_ms")) - localStorage.getItem("ml_drunk")

        console.log(ml_toDrinkInput)

        if (ml_toDrinkInput < 0 ) ml_toDrinkInput = 0

        if (ml_toDrinkInput > (parseFloat(localStorage.getItem("liter")) * 1000) - parseFloat(localStorage.getItem("ml_drunk"))) ml_toDrinkInput = (parseFloat(localStorage.getItem("liter")) * 1000) - parseFloat(localStorage.getItem("ml_drunk"))

        document.getElementById("toDrinkInput").innerHTML = ml_toDrinkInput.toFixed(2) + "ml"

        if (parseFloat(localStorage.getItem("ml_drunk")) / 1000 >= localStorage.getItem("liter")) {
            document.getElementById("toDrinkInput").innerHTML = "🎉 You have reached your goal! 🎉"
            clearInterval(toDrinkInput)
        }
    }, 1000)
    
}


function dayPassed(timestamp, day) {
    const date = new Date()
    if (day != date.getDate()) {
        return true
    } else if (date.getTime() - timestamp > 24*60*60*1000) {
        return true
    } else {
        return false
    }
}

document.addEventListener("DOMContentLoaded", async (event) => {
    document.getElementById("initData").addEventListener("click", init)

    document.getElementById("saveDrunk").addEventListener("click", () => {
        var drunk = 0
        if (localStorage.getItem("ml_drunk")) {
            drunk = parseFloat(localStorage.getItem("ml_drunk"))
        }
        localStorage.setItem("ml_drunk", drunk + parseFloat(document.getElementById("drunk").value))
    })

    if (localStorage.getItem("timestamp")) {
        if (!dayPassed(localStorage.getItem("timestamp"), localStorage.getItem("day"))) {
            calculate()
        }
    }
})