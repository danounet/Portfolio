
const gallerie = new Set();
const categories = new Set();
const objetSet = new Set();
const appartSet = new Set();
const hotelSet = new Set();
let administrateur = {'userId' : '', 'token' : ''};
let utilisateur = {'email' : '', 'password' : ''};
let connecte=false;



window.addEventListener("message", function(event) {
  if (event.origin !== window.location.origin) return;

  // Vérifie si les données ont été envoyées par la page de connexion
  if (event.data.userId && event.data.token) {
    // Stocke les données de la variable administrateur dans le stockage persistant
    localStorage.setItem("administrateur", JSON.stringify(event.data));
  }
});


async function lectureBase () {
    try {
    const response = await fetch ("http://localhost:5678/api/works");
    if (response.ok) {
        const data = await response.json();
        return data;
    }
  }
  catch (error){
    {
      alert(error);
   }
    }
}



lectureBase().then(retour => {
  
  const categorie = {id: "0", name: "Tous"};
  categories.add(categorie);
  
  retour.forEach(image => {
    gallerie.add(image);
    
    let trouve = false;
    for (const cat of categories){
      if (cat.id == image.category.id) {
        trouve = true;
       }
     }
     if (!trouve){
      categories.add(image.category);
     }   
    if (image.category.id == 1) {
     objetSet.add(image);
    } else if (image.category.id == 2) {
     appartSet.add(image);
    } else if (image.category.id == 3){
     hotelSet.add(image); 
    } 
  });

if (localStorage.getItem("administrateur") == undefined){  
  afficheFiltre(categories);
  evenement(categories);
} else {
  document.querySelector('#portfolio h2').innerHTML="Connecté"
}
  afficheGallerie(gallerie);

}
)


 function afficheGallerie(magallerie ){
    
  for (image of magallerie){
      let chemin= "<figure class=img_" + image.category.id +"><img src='" + image.imageUrl + "' alt='" + image.title + "'>" ;
    chemin+="<figcaption>" +image.title + "</figcaption></figure>";
    $(".gallery").append(chemin);
   }
  }

  function afficheFiltre(tableau){
    let chemin= "<div class='filtre'>";
    for (const categorie of tableau){
      chemin+="<button class='btn' id='cat_"+ categorie.id+ "'>"+categorie.name;
      console.log("Chemin = "+chemin);
     }
    chemin+="</div>"
    $("#portfolio h2").append(chemin);
  }

  function evenement(tableau){

  for (let categorie of tableau)
  {
    let bouton = document.getElementById("cat_"+ categorie.id);      
    bouton.addEventListener('click', () => {
      $(".gallery").empty();
      $("button").attr("class","btn");
      if (bouton.id =="cat_0") {
        afficheGallerie(gallerie);
        bouton.classList.add("filtreActif");
      } else if (bouton.id == "cat_1") {
        afficheGallerie(objetSet);
        bouton.classList.add("filtreActif");
      } else if (bouton.id == "cat_2") {
        bouton.classList.add("filtreActif");
      afficheGallerie(appartSet);
      } else if (bouton.id == "cat_3") {
        bouton.classList.add("filtreActif");
        afficheGallerie(hotelSet);
      }   
    })
  }
  }

  
    $(document).ready(function(){
      lectureBase();
//      lectureCat();
  }
   );
   
