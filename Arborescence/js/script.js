function ChargerInfo(el) {
  var type = document.getElementById("typefichier").value;
  var code = el.value;


  switch(type){
    case "json" :
      GetDisplayJson(code)
      break;
      
    default:
      GetDisplayXML(code)
      break;
  }
}

function GetDisplayXML(code){
  var id = code;
  var xhr = new XMLHttpRequest();
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			DisplayXMLResponse(xhr.responseXML,id);
		}
	}
	
	xhr.open("GET", "ajax/peintures.xml", true);
	xhr.send();
}

function DisplayXMLResponse(xml,code){
  var peinture = xml.getElementsByTagName("peinture");

  for(i=0;i< peinture.length;i++){
    if(peinture[i].getElementsByTagName("code")[0].firstChild.nodeValue == code){
      var titre = peinture[i].getElementsByTagName("titre")[0].firstChild.nodeValue;
      var artiste = peinture[i].getElementsByTagName("artiste")[0].firstChild.nodeValue;
      var image = peinture[i].getElementsByTagName("image")[0].firstChild.nodeValue;
      var prix = peinture[i].getElementsByTagName("prix")[0].firstChild.nodeValue;
    }

  }

//Changer le titre sans innerHtml
var node = document.getElementById("titre");

while(node.firstChild){
  node.removeChild(node.firstChild);
}
node.appendChild( document.createTextNode(titre) );

//Changer l'artiste sans innerHtml
var node = document.getElementById("artiste");

while(node.firstChild){
  node.removeChild(node.firstChild);
}
node.appendChild( document.createTextNode(artiste) );

//Changer le prix sans innerHtml
var node = document.getElementById("prix");

while(node.firstChild){
  node.removeChild(node.firstChild);
}
node.appendChild( document.createTextNode(prix) );

document.getElementById("peinture").src = "img/" + image;

GetDesc(code);
  
  
}
function GetDisplayJson(code){
  var id = code;
  var xhr = new XMLHttpRequest();
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			DisplayJSONResponse(JSON.parse(xhr.responseText),id);
		}
	}
	
	xhr.open("GET", "ajax/peintures.json", true);
	xhr.send();
}

function DisplayJSONResponse(json,code) {

	var peinture = json.peinture;
	
	for (i = 0; i < peinture.length; i++) {
    if(peinture[i].code == code){
      var titre = peinture[i].titre;
      var artiste = peinture[i].artiste;
      var image = peinture[i].image;
      var prix = peinture[i].prix;
    }
	}
  //Changer le titre sans innerHtml
  var node = document.getElementById("titre");

  while(node.firstChild){
    node.removeChild(node.firstChild);
  }
  node.appendChild( document.createTextNode(titre) );

  //Changer l'artiste sans innerHtml
  var node = document.getElementById("artiste");

  while(node.firstChild){
    node.removeChild(node.firstChild);
  }
  node.appendChild( document.createTextNode(artiste) );

  //Changer le prix sans innerHtml
  var node = document.getElementById("prix");

  while(node.firstChild){
    node.removeChild(node.firstChild);
  }
  node.appendChild( document.createTextNode(prix) );

  document.getElementById("peinture").src = "img/" + image;
  
  GetDesc(code);
}

function GetDesc(code){
  var xhr = new XMLHttpRequest();
  
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
      var node = document.getElementById("info");

      while(node.firstChild){
        node.removeChild(node.firstChild);
      }
      node.appendChild( document.createTextNode(xhr.responseText) );
    }
  }

  xhr.open("GET","../ajax/"+code+".txt",true);
  xhr.send();
}
