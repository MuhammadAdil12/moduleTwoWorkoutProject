class WorkoutTracker{
    constructor(_root){
        this.root = _root
        this.root.insertAdjacentHTML("afterbegin", WorkoutTracker.html())
        this.entries = [];

        this.loadEntries()
        this.updateView()

        this.root.querySelector(".tracker__add").addEventListener("click", () => {

            const date = new Date();
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, "0")
            const day = date.getDate().toString().padStart(2, "0")

              this.addEntries({
                date: `${day} - ${month} - ${year}`,
                workout: "running",
                duration: 30
              })
        })


        this.root.querySelector(".tracker__remove").addEventListener("click", () => {
            this.clearAll()
        })
    }

    static html(){
        return `
             <table class="tracker">
                <thead>
                    <tr class="tracker__row">
                        <th>Date</th>
                        <th>Workout</th>
                        <th>Duration</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody class="tracker__entries"></tbody>
                <tbody>
                    <tr class="tracker__row tracker__row__add">
                        <td colspan="2">
                            <button class="tracker__add">Add Entry &andd;</button>
                        </td>
                        <td colspan="2">
                            <button class="tracker__remove">Clear All &times;</button>
                        </td>
                    </tr>
                    
                </tbody>

            </table>
        `
    }

    static rowHtml(){
        return `
        <tr class="tracker__row">
            <td>
                <input type="date" class="tracker__date">
            </td>
            <td>
                <select class="tracker__workout">
                    <option value="walking">Walking</option>
                    <option value="running">Running</option>
                    <option value="outdoor-cycling">Outdoor Cycling</option>
                    <option value="indoor-cycling">Indoor Cycling</option>
                    <option value="swimming">Swimming</option>
                    <option value="yoga">Yoga</option>
                </select>
            </td>
            <td>
                <input type="number" class="tracker__duration">
                <span class="tracker__text">min</span>
            </td>
            <td>
                <button type="button" class="tracker__button tracker__delete">&times;</button>
            </td>
        </tr>
        `
    }

    loadEntries(){
        this.entries = JSON.parse(localStorage.getItem("list") || "[]");
    }

    saveEntries(){
        localStorage.setItem("list", JSON.stringify(this.entries))
    }

    updateView(){
        const tableBody = this.root.querySelector(".tracker__entries")
        const addRow = data => {
            const template = document.createElement("template")
            let row = null;

            template.innerHTML = WorkoutTracker.rowHtml().trim();
            row = template.content.firstElementChild;

            row.querySelector(".tracker__date").value = data.date
            row.querySelector(".tracker__workout").value = data.workout
            row.querySelector(".tracker__duration").value = data.duration


            row.querySelector(".tracker__date").addEventListener("change", ({target}) => {
                data.date = target.value  
                this.saveEntries(); 
            });

            row.querySelector(".tracker__workout").addEventListener("change", ({target}) => {
                data.workout = target.value 
                this.saveEntries();  
            });

            row.querySelector(".tracker__duration").addEventListener("change", ({target}) => {
                data.duration = target.value 
                this.saveEntries();  
            });

            row.querySelector(".tracker__delete").addEventListener("click", () => {
                this.deleteEntry(data)
            })

            tableBody.appendChild(row);

        };

        tableBody.querySelectorAll(".tracker__row").forEach(element => {
            element.remove();
        });

        this.entries.forEach(data => addRow(data))
    }

    addEntries(data){
        this.entries.push(data);
        this.saveEntries();
        this.updateView();
    }

    deleteEntry(dataToDelete){

        if(confirm("Are you Sure?")){
        this.entries = this.entries.filter(data => data !== dataToDelete)
        this.updateView();
        this.saveEntries();
        }
    }

    clearAll(){
        const tableBody = this.root.querySelector(".tracker__entries")

        tableBody.querySelectorAll(".tracker__row").forEach(element => {
            element.remove();
        })
        localStorage.removeItem("list")
    }
}

const main = document.getElementById("main")
let td = new WorkoutTracker(main)



// code for changing between account and profile
document.addEventListener("DOMContentLoaded", function () {
    const isAuthenticated = localStorage.getItem("isLoggedIn");
    const accountLink = document.getElementById("account-icon");

    if (isAuthenticated === 'true') {
        // User is logged in, show the account page
        accountLink.href = "/account-section/main-account-section/index.html";
    } else {
        // User is not logged in, show the make an account page
        accountLink.href = "/account-section/index.html";
    }
});
