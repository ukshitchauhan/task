class User{
    constructor(name){
        this.name=name;
        this.role="User";
    }

    write(text){
        let h1=document.createElement("h1");
        h1.textContent=`${this.name} : ${text}`;
        document.body.append(h1);
    }
}

class Admin extends User{
    constructor(name){
        super(name);
        this.role="admin";
    }

    remove(){
        document.querySelectorAll("h1")
        .forEach(function(ele){
            ele.remove();
        });
    }
}

let u1 =new User("Ukshit");
let u2 =new User("Vivek");
let u3 =new User("Prachi");
let a1 =new Admin("Admin");


