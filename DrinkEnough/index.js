function init() {
    localStorage.clear()
    const liter = document.getElementById("liter").value
    const time = document.getElementById("time").value
    const date = new Date()

    localStorage.setItem("timestamp", date.getTime())
    localStorage.setItem("day", date.getDate())
    localStorage.setItem("liter", liter)
    localStorage.setItem("endTimestamp", new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.substring(0, 2), time.substring(2, 4), 0, 0).getTime())
    localStorage.setItem("ml_per_ms", liter * 1000 / ((parseInt(localStorage.getItem("endTimestamp") - parseInt(localStorage.getItem("timestamp"))))))
    calculate()
}

function calculate() {
    document.getElementById("initInputContainer").style.display = "none"
    document.getElementById("toDrinkContainer").style.display = "unset"
    const toDrink = setInterval(() => {
        var ml_toDrink = ((Date.now() - localStorage.getItem("timestamp")) * localStorage.getItem("ml_per_ms")) - localStorage.getItem("ml_drunk")

        console.log(ml_toDrink)

        if (ml_toDrink < 0 ) ml_toDrink = 0

        if (ml_toDrink > (parseInt(localStorage.getItem("liter")) * 1000) - parseInt(localStorage.getItem("ml_drunk"))) ml_toDrink = (parseInt(localStorage.getItem("liter")) * 1000) - parseInt(localStorage.getItem("ml_drunk"))

        document.getElementById("toDrink").innerHTML = ml_toDrink.toFixed(2) + "ml"

        if (parseInt(localStorage.getItem("ml_drunk")) / 1000 >= localStorage.getItem("liter")) {
            document.getElementById("toDrink").innerHTML = "🎉 You have reached your goal! 🎉"
            clearInterval(toDrink)
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
            drunk = parseInt(localStorage.getItem("ml_drunk"))
        }
        localStorage.setItem("ml_drunk", drunk + parseInt(document.getElementById("drunk").value))
    })

    if (localStorage.getItem("timestamp")) {
        if (!dayPassed(localStorage.getItem("timestamp"), localStorage.getItem("day"))) {
            calculate()
        }
    }
})