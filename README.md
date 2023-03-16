[![CodeFactor](https://www.codefactor.io/repository/github/yaperson/musique-web/badge)](https://www.codefactor.io/repository/github/yaperson/musique-web)

Version 2.1 - version en ligne 2.0
# Musique-web 
Une PWA mélodieuse ;)

## Test avec Node.js
    
 installer [`npm install`](https://www.npmjs.com/install)

 modifier l'url qui appel l'API dans le fichier /src/services/music.js 
 modifier les variables dans le fichier server.js

 lancer [`npm start`](https://www.npmjs.com/start) ou [`node server`]


## Objectif : API

La première version de WeekSong est completement statique, il était donc compliqué d'ajouter des nouveau morceaux.

En effet, il fallait ajouter le morceau en format mp3 dans le dossier `/musique/` et ajouter une image dans le dossier `/img/` nommée `nom_morceau.png`.
Ensuite, dans le fichier `/js/script.js` ajouter le morceau dans la liste des morceaux.

Un vrai calvaire, mais c'est fonctionnel. <br>
Pour palier a ce problème, l'idée d'une API m'est venu en tête. Le principe est simple : 
- L'API qui permet de récupérer la liste des morceaux, le tout en scannant un répertoir donné.
<br>

Grace à cette méthode, il sufit de mettre un morceau dans ce répertoir, et il sera automatiquement ajouté à la liste.
<br>
L'objectif est maintenant de faire la même chose pour les images et faire en sorte de pouvoir ajouter des morceau et leur images grace a une interface d'administration.

### Fonctionnement de l'API

API rest fonctionnant avec Node.js (express, fs, body-parser).

 - GET /music/musicRepertory : récupère la liste des morceaux
--------------------------------------------------------------------------------------------------------------------
<br>

## Deux mots sur l'addaptation au mobiles

L'objectif est de rendre la PWA 100% compatible avec les mobiles, de tout faire pour la faire ressembler a une native application.
<br>
Objectif qui parait simple mais qui s'avère plus complexe que prévu. Il faut prendre en compte tous les evenement qui peuvent arriver dans une application mobile (swipe, touchevent). Je commence a peine a prendre en compte ces point au quels je n'avais pas pensé, ils arrivent donc tard dans le developpement de la PWA.

# Dernières fonctionnalitées 
    - Compatibilité avec les mobile et optimisation du swipe
    - Assignation des touches clavier sur pc (play avec la barre d'espace, suivant ou précédent avec les flêches)
