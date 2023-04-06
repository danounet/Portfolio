//déclaration des 
const gallerie = new Set();
const categories = new Set();
const objetSet = new Set();
const appartSet = new Set();
const hotelSet = new Set();

let administrateur = {'userId' : '', 'token' : ''};
let utilisateur = {'email' : '', 'password' : ''};
let connecte=false;





//déclaration de la fonction asynchrone permettant de récuperer le tableau des projets sur l'API
async function lectureBase () {
    try{
   const response = await fetch ('http://localhost:5678/api/works');

   if (response.ok) {
    const data = await response.json();
    console.log(data);
    return data;
   }
   
}
    catch (error){
        alert (error);
    }
}


//CallBack de la function lectureBase(), et remplissage des set

lectureBase().then(retour => {
    for (const image of retour ){
        gallerie.add(image);
    if (image.categoryId==1){
        objetSet.add(image);
    }else if  (image.categoryId==2 ) {
        appartSet.add(image);
    } else if (image.categoryId == 3) {
        hotelSet.add(image);
    }
    }

    afficheGallerie(gallerie);

    if (localStorage.getItem("administrateur") == undefined){  
      afficheFiltre(categories);
      evenement(categories);
    } else {
//      document.querySelector('#portfolio h2').innerHTML="Connecté"
      afficheModale();
      afficheModalGallery(gallerie);
      //afficheModalpage2();
    }
    
    
    
/*     afficheModalGallery(gallerie);
        $('.modal-gallery').css('display', 'block');
     
  
     $('.modal button').click(function() {
      $('.modal-div').hide();
     
    }); 
    */
})   
  


//déclaration de la fonction asynchrone permettant de récuperer les catégories des projets sur l'API

async function lectureCat () {
try{
    const response = await fetch ("http://localhost:5678/api/categories");
if (response.ok) {
    const data = await response.json();
    console.log(data);
    return data;

    }
}
 catch (error){
    alert(error);
}
}
//CallBack de la function lectureBase(), et remplissage des set

lectureCat().then(retour => {
  let categorie = {id: "0", name: "Tous"};
  categories.add(categorie);
  retour.forEach(categorie => {
    categories.add(categorie);
  });
  afficheFiltre(categories,false);
  evenement(categories);
  let bouton = document.getElementById("cat_0");      
  bouton.classList.add("filtreActif");

}
)

//Fonction qui va créer dans le code html le chemin dans lequel on implante les datas récupèrées sur l'API

 function afficheGallerie(magallerie ){
    
    for(const image of magallerie)
    {
        let chemin ="<figure><img src="+ image.imageUrl + " alt="+ image.title +"><figcaption>"+image.title+"</figacption></figure>"
        
        $(".gallery").append(chemin);
        }
    
  }

//Fonction qui va créer dans le code html le chemin dans lequel on implante les datas récupèrées sur l'API

  function afficheFiltre(tableau){
          let chemin= "<div class='filtre'>";
      for (const categorie of tableau){
        chemin+="<button class='btn' id='cat_" + categorie.id + "'>" + categorie.name + "</button>";
      //  console.log("Chemin = "+chemin);
      }
      chemin+="</div>"
    
      $("#portfolio h2").append(chemin);//On fait apparaitre ce chemin dans l'id #portfolio aprés le h2

  }

//Fonction qui va permettre aux boutons créés ci dessus de comorendre quoi afficher, on leur mets des condtitions 

  function evenement(tableau){
  for (let categorie of tableau)
  {
    let bouton = document.getElementById("cat_"+ categorie.id);      
    bouton.addEventListener('click', () => {
      $(".gallery").empty();
      $("button").attr("class","btn");
      if (bouton.id =="cat_0") {
        afficheGallerie(gallerie);//En fonction de l'id du bouton on affiche tel ou tel set 
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

    
 

   function afficheModale(){
    
    let chemin = "<div class='pre_header'>";
    chemin += "<a href=#modal1 id='edition1' class= 'js-modal'><i class='fa-regular fa-pen-to-square' ><p id='lien1'>Mode Edition</p></i></a>";
    chemin+="<button class=btn_header><a href=#> Publier les changements</a></button>";
    chemin+="</div>";
    $('header').append(chemin);

    let chemin2 = "<a href=#modal2  class= 'js-modal'><i class='fa-regular fa-pen-to-square'><p id='lien2'>Mode Edition</p></i></a>";
    chemin2+= "</div>";
    $('#introduction figure').append(chemin2)

   let chemin3="<a href=#modal3 id = 'edition3' class= 'js-modal'><i class='fa-regular fa-pen-to-square'><p id='lien3'>Mode Edition</p></i></a>";
    $('#portfolio h2').append(chemin3);
 
   

    $('#portfolio h2 ').css({
      'display':'flex',
      'justify-content':'center',
      'gap':'18px' 
    })

    $('#portfolio h2  a').css({
      'text-decoration': 'none',
    });


    $('#portfolio h2 i').css({
      'display': 'flex',
      'gap': '7px',
      'font-size': '14px',
      'color': 'black',
      
      'margin-top': '10px'
    });

    $('#portfolio h2 p').css({
      'font-size': '16px',
      'font-weight': '400',
      'font-family': 'Work Sans',
    })
   

    $('header .pre_header').css({
      'display': 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      'gap': '25px',
      'width': '100%',
      'height': '59px',
      'background-color': 'black',
      'position': 'absolute',
      'top': '0',
      'left': '0'
    });
    
    $('#introduction a').css({
      'text-decoration': 'none',
      
    });

    

    $('#introduction i').css({
      'display': 'flex',
      'gap': '7px',
      'font-size': '14px',
      'color': 'black',
      'margin-left': '58px',
      'margin-top': '10px'
    });

    $('#introduction figure p').css({
      'font-size': '14px',
      'font-weight': '400',
      'font-family': 'Work Sans',
      
    });

    $('header .pre_header a').css({
      'text-decoration': 'none'
    });



    $('header .pre_header i').css({
      'display': 'flex',
      'gap': '7px',
      'font-size': '16px',
      'color': 'white'
    });

    $('header .pre_header p').css({
      'font-size': '16px',
      'font-weight': '400',
      'font-family': 'Work Sans'
    });

    $('header .btn_header').css({
      'width': '216px',
      'height': '38px',
      'border-radius': '60px',
      'border': 'none',
      'font-size': '15px',
      'font-weight': '500',
      'font-family': 'Work Sans'
    });    

    document.getElementById("lien1").addEventListener('click', montre);
    document.getElementById("lien2").addEventListener('click', montre); 
    document.getElementById("lien3").addEventListener('click', montre); 
    
   }

   function afficheModalGallery(magallerie ){
    let chemin4="<aside id='modal1' class='modal' aria-hidden= true aria-modal='false'>";
    chemin4+="<div id=modal-div><a href=#><i id='cross' class='fa-solid fa-xmark'></i></a><h3>Galerie photo</h3><div class=gallery-modal></div>";
    chemin4+="<button id='btnAjout' class='btn filtreActif edition'>Ajouter une photo</button>";
    chemin4+="<a href=#>Supprimer la galerie</a></div></aside>"; 
    alert(chemin4);
    $('header').append(chemin4);
    
    for(const image of magallerie)
    {
        let chemin ="<figure><div class= trash ><img src="+ image.imageUrl + " alt="+ image.title +"> <a href=#><i class='fa-solid fa-trash-can'></i></a></div><figcaption>éditer</figacption></figure>"
        
        $("#gallery-modal").append(chemin);
        }

      }
  

 function montre(){
  } 

 function ajoutWork() {
  let modalDiv = document.getElementById("modal-div");
   $(modalDiv).attr("display","flex");
   afficheModalpage2();
  }

 function afficheModalpage2(){
  let chemin="<div class=modal2 ><a href=#><i id= arrow class='fa-solid fa-arrow-left'></i></a><a href=#><i id= cross class='fa-solid fa-xmark'> </a></i>";
  chemin+="<div class=modal2-content><h3>Ajout photo</h3><div class=add-img><i class='fa-solid fa-image'></i><button class= btn-modal2>+ Ajouter photo</button><p>jpg, png: 4mo max</p></div>";
  chemin+="<form><label for= title>Titre</label><input type=text id=title></input><label for= categrories>Categorie</label><input type=text id= categories></input></form>"
  chemin+="<button class=Valid>Valider</button</div></div>";
  $('aside').prepend(chemin);
 }

   $(document).ready(function(){
    lectureBase();
})


