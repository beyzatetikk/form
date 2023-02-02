var selectedRow = null;

function showAlert(message, className){
    const div = document.createElement("div");
    div.className = `alert alert-${className}`; // bilgiler eklendi,güncellendi,silindi tek tek gösterrir

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div,main);

    setTimeout(() => document.querySelector(".alert").remove(),3000);

}

//telefon
function isNumberKey(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

//alanları temizle
function Clear(){
    document.querySelector("#ad").value = "";
    document.querySelector("#soyad").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#telefon").value = "";
}

//veri ekleme
document.querySelector("#form").addEventListener("submit", (event) =>{
    event.preventDefault();

    const ad = document.querySelector("#ad").value;
    const soyad = document.querySelector("#soyad").value;
    const email = document.querySelector("#email").value;
    const telefon = document.querySelector("#telefon").value;

    //doğrulama
    if(ad == " " || soyad == "" || email == "" || telefon == ""){
        showAlert("Lütfen tüm alanları doldurun..", "danger");
    } 
else{
    if(selectedRow == null){
        const list = document.querySelector("#liste");
        const row = document.createElement("tr");

        row.innerHTML =  `
        <td>${ad}</td>
        <td>${soyad}</td>
        <td>${email}</td>
        <td>${telefon}</td>
        <td>
        <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
        <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
        `;
        list.appendChild(row);
        selectedRow = null;
        showAlert("Girilen Kullanıcı Bilgileri Eklendi", "success");
    }

    else{
        selectedRow.children[0].textContent = ad;
        selectedRow.children[1].textContent = soyad;
        selectedRow.children[2].textContent = email;
        selectedRow.children[3].textContent = telefon;
        selectedRow = null;
        showAlert("Girilen Bilgiler Güncellendi..", "info");
    }
    Clear();
}

});

// düzenleme
document.querySelector("#liste").addEventListener("click", (event) =>{
    target = event.target;
    if(target.classList.contains("edit")){
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#ad").value = selectedRow.children[0].textContent;
        document.querySelector("#soyad").value = selectedRow.children[1].textContent;
        document.querySelector("#email").value = selectedRow.children[2].textContent;
        document.querySelector("#telefon").value = selectedRow.children[3].textContent;
    }
});


//veri silme
document.querySelector("#liste").addEventListener("click", (e) => {
    target = e.target;
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        showAlert("Girilen Kullanıcı Bilgileri Silindi", "danger");
    }
})