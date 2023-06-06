// Get All Variables :

    let balance = document.getElementById("balance");
    let totalAmount = document.getElementById("total-amount");
    let totalBudget = document.getElementById("total-budget");
    let description = document.getElementById("description");
    let inputAmount = document.getElementById("input-amount");
    let inputDate = document.getElementById("input-date");
    let expence = document.getElementById("expence");
    let expenceList = document.getElementById("add-expence-list");
    let checkButton = document.getElementById("check-button");

    // Build Budget Button and Save In Localstorage :

    function setBudget() {

        if (totalAmount.value === "" || totalAmount.value < 0) {
            alert("validation not allow.");
        } else {
            localStorage.setItem("totalAmount", totalAmount.value);
            location.href = location.href;
        }
    }

    // Build Check Button and Save In Localstorage :

    function check() {

        if (description.value === "" || inputAmount.value <= 0) {
            alert("validation not allow.");
        } else {
            let p_description = description.value;
            let p_inputAmount = +inputAmount.value;
            let p_inputDate = inputDate.value;
            let data = {
                p_description: p_description,
                p_inputAmount: +p_inputAmount,
                p_inputDate: p_inputDate
            }
            let str = JSON.stringify(data);
            localStorage.setItem("value: " + description.value, str);
            location.href = location.href;
        }

    }

    // Build All_Data Function and retrive data from localstorage :

    function all_data() {

        for (let i = 0; i < localStorage.length; i++) {
            let keys = localStorage.key(i);

            if (keys.match("value: ")) {
                let json_data = localStorage.getItem(keys);
                let json_parse = JSON.parse(json_data);
                expenceList.innerHTML += `<div class="row"><div class="column" ><h5 class = "name">${json_parse.p_description}</h5><h5 class = "price amount" >${json_parse.p_inputAmount}</h5><h5 class = "date">${json_parse.p_inputDate}</h5><div class="icons"><i class="fa-regular fa-pen-to-square icon-1 edit-btn" title = "Edit"></i><i class="fa fa-trash-can delete-btn icon-2" title = "Delete"></i></div></div></div>`;
            }
        }

        let price = document.getElementsByClassName("price");
        let priceArr = [];
        for (let i = 0; i < price.length; i++) {
            priceArr[i] = +price[i].innerHTML;
        }

        let finalPrice = 0;
        for (let i = 0; i < priceArr.length; i++) {
            finalPrice += priceArr[i];
        }
        expence.innerText = finalPrice;

        totalBudget.innerText = localStorage.getItem("totalAmount");
        balance.innerHTML = totalBudget.innerHTML - expence.innerHTML;

        // Delete Button Coding :

        var deleteBtn = document.getElementsByClassName("delete-btn");
        for (let i = 0; i < deleteBtn.length; i++) {
            deleteBtn[i].onclick = function () {
                var areYouSure = window.confirm("Do You Want Delete It !");
                if (areYouSure) {
                    var del_parent = this.parentElement;
                    var h5 = del_parent.parentElement.childNodes[0].innerHTML;
                    localStorage.removeItem("value: " + h5);
                    location.href = location.href;
                } else {
                    alert("Your Data Is Safe");
                }
            }
        }
        // Edit Button Coding  &&  Update Button Coding :

        let editBtn = document.getElementsByClassName("edit-btn");
        for (let i = 0; i < editBtn.length; i++) {
            editBtn[i].onclick = function () {
                let areYouSure = window.confirm("Do You Want Update It ??");
                if (areYouSure === true) {

                    let edit_parent = this.parentElement;
                    let h5_description = edit_parent.parentElement.childNodes[0].innerHTML;
                    let h5_amount = edit_parent.parentElement.childNodes[1].innerHTML;
                    let h5_date = edit_parent.parentElement.childNodes[2].innerHTML;

                    description.value = h5_description;
                    inputAmount.value = h5_amount;
                    inputDate.value = h5_date;
                    description.focus();
                    checkButton.innerHTML = "Update";
                    checkButton.style.backgroundColor = "#000";

                    checkButton.onclick = function () {
                        localStorage.removeItem("value: " + h5_description);
                        let p_description = description.value;
                        let p_inputAmount = +inputAmount.value;
                        let p_inputDate = inputDate.value;
                        let data = {
                            p_description: p_description,
                            p_inputAmount: +p_inputAmount,
                            p_inputDate: p_inputDate
                        }
                        let str = JSON.stringify(data);
                        localStorage.setItem("value: " + description.value, str);
                        location.href = location.href;
                    }

                } else {
                    alert("your data is save! ");
                }
            }
        }
    };

    all_data();
