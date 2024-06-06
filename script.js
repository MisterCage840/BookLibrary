//array
let myLibrary = [];


//selector of the DOM
const submitBtn = document.getElementById("submit");
const bookTitleInput = document.getElementById("bookTitle");
const authorInput = document.getElementById("author");
const noPagesInput = document.getElementById("noPages");
const readorNotInput = document.getElementsByName("readorNot");

const table1 = document.getElementById("tableBody");

//constructor   
function Book(title, author, numberOfPages, readorNot) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;

    this.checkRead = function(){
        for(let i=0; i<readorNotInput.length; i++){
            if(readorNotInput[i].checked == true){
                if(readorNotInput.value =="Yes")
                    return this.readorNot = "already read";

                else{
                    return this.readorNot = "not read yet";
                }
            }
    }
}

this.toggleRead = function(){
    if(this.readorNot == "already read"){
        this.readorNot = "not read yet";
    }else if(this.readorNot =="not read yet"){
        this.readorNot ="already read";
    }
}


    this.printInfo = function(){
        return this.title + "by " + this.author + ", " + this.numberOfPages + " pages, "+ this.checkRead();
    }
}

//add book function to library array
function addBook(Book){
    myLibrary.push(Book);
}



//adding book to library and table body

function addtoForm(event){
    event.preventDefault(); //prevent default submit button click response

    var bookTitle = bookTitleInput.value;
    var author = authorInput.value;
    var noPages = noPagesInput.value;
    for (i = 0; i < readorNotInput.length; i++) {
        if (readorNotInput[i].checked)
            readorNotInput.value = readorNotInput[i].value;
    }

    if(readorNotInput.value == "Yes"){
        var readorNot = "already read";
    }else{
        var readorNot = "not read";
    }

    var book = new Book (bookTitle,author,noPages,readorNot);
    myLibrary.push(book);

        let row = document.createElement("tr");
    
        let title = document.createElement("td");
        title.textContent = book.title;
        row.appendChild(title);
    
        let authortbl = document.createElement("td");
        authortbl.textContent = book.author;
        row.appendChild(authortbl);
    
        let numberOfPages = document.createElement("td");
        numberOfPages.textContent = book.numberOfPages;
        row.appendChild(numberOfPages);
    
        let readorNottbl = document.createElement("td");
        readorNottbl.innerHTML = "<span>"+book.checkRead()+"</span>";
        readorNottbl.classList.add("changeRead");    
        readorNottbl.addEventListener("click",changeReadStatus);
        row.appendChild(readorNottbl);

        let removeBtn = document.createElement("td");
        removeBtn.innerHTML += "<span class=\"material-symbols-outlined\">delete</span>";
        removeBtn.classList.add("removeBtn");
        removeBtn.addEventListener("click",removeBook);
        row.appendChild(removeBtn);
    
        table1.appendChild(row);

        bookTitleInput.value = "";
        authorInput.value = "";
        noPagesInput.value = "";
        for(let j=0; j<readorNotInput.length; j++){
            readorNotInput[j].checked = false;
        }
}
//selector for Remove Buttons
const removeBtns = document.querySelectorAll(".removeBtn");

submitBtn.addEventListener("click", addtoForm);
removeBtns.forEach(removeBtn => {
    removeBtn.addEventListener("click",removeBook);
});


//remove book from Array and table
function removeBook(event){
    var deleteTarget = event.target.parentNode.parentNode.rowIndex - 1;
    console.log(deleteTarget);
    table1.deleteRow(deleteTarget);
    myLibrary.splice(deleteTarget,1);
}

//changeRead Status function
function changeReadStatus(event){
    var index = event.target.parentNode.parentNode.rowIndex -1;
    console.log(index);
    myLibrary[index].toggleRead();
    console.log(myLibrary[index].readorNot);
    event.target.textContent = myLibrary[index].readorNot;
}
