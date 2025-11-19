function getUser(){
fetch("https://randomuser.me/api/?results=3")
    .then((rawdata)=>rawdata.json())
    .then((data)=>{
        document.querySelector(".users").innerHTML = "";  
        data.results.forEach((user) => {
                const card = document.createElement("div");
                card.className =
                "w-72 bg-[#1e293b] p-5 rounded-xl shadow-sm border border-white/10 flex items-center gap-4";

                const img = document.createElement("img");
                img.src = user.picture.large;
                img.className = "w-14 h-14 rounded-full object-cover";

                const right = document.createElement("div");
                right.className = "flex-1";

                const name = document.createElement("h3");
                name.className = "text-white font-semibold text-sm";
                name.textContent = `${user.name.first} ${user.name.last}`;
                
                const email = document.createElement("p");
                email.className = "text-gray-400 text-xs";
                email.textContent = user.email;

                const status = document.createElement("span");
                status.className =
                "inline-block mt-2 px-3 py-0.5 text-xs bg-blue-600 text-white rounded-full";
                status.textContent = "Active";

                right.appendChild(name);
                right.appendChild(email);
                right.appendChild(status);

                card.appendChild(img);
                card.appendChild(right);

                document.querySelector(".users").appendChild(card);  
        });
    })
}

getUser();

document.querySelector(".refreshBtn").addEventListener("click",function(){
    getUser();
});